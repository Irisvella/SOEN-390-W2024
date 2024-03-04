import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as z from "zod";
import verifyToken from "../middleware/verify-token";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
const upload = multer();
import { putObject } from "../lib/s3/put-object";
import { deleteObject } from "../lib/s3/delete-object";

import { Request, Response, NextFunction } from "express";

// we disallow changes to emails imo bc we dont have email verification atm
const publicUser = z.object({
  firstName: z.string().trim().toLowerCase().min(1),
  lastName: z.string().trim().toLowerCase().min(1),
  phoneNumber: z.string().trim().min(10),
  isUpload: z.enum(["0", "1"]), // "0" for no profile pic change, and "1" for yes
  profileImageKey: z.string().optional(),
});

const passwordReset = z.object({
  oldPassword: z.string().min(6).max(64),
  newPassword: z.string().min(6).max(64),
});

router.get(
  "/",
  verifyToken,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err instanceof jwt.TokenExpiredError) {
            console.log("jwt expired in GET /profile ", err);
            return res.status(401).json({ message: "Expired token" });
          } else if (err) {
            console.log("error from jwt.verify in GET /profile ", err);
            return res.status(401).json({ message: "Unauthorized" });
          } else {
            console.log("decoded ---- ", decoded);
            const { id, role, email } = (<any>decoded).data;
            if (role === "company") {
              const company = await prisma.management_companies.findFirst({
                where: {
                  user_id: id,
                },
              });
              const companyAddress = await prisma.company_address.findFirst({
                where: {
                  company_id: id,
                },
              });
              return res.status(200).json({
                email,
                companyName: company?.company_name,
                phoneNumber: company?.phone_number,
                unitCount: company?.unit_count,
                country: companyAddress?.country,
                province: companyAddress?.province,
                city: companyAddress?.city,
                streetName: companyAddress?.street_name,
                postalCode: companyAddress?.postal_code,
                apartmentNumber: companyAddress?.postal_code,
              });
            } else if (role === "publicUser") {
              const publicUser = await prisma.public_users.findFirst({
                where: {
                  user_id: id,
                },
              });
              return res.status(200).json({
                email,
                firstName: publicUser?.first_name,
                lastName: publicUser?.last_name,
                phoneNumber: publicUser?.phone_number,
                role,
                subRole: publicUser?.role,
                profileImageKey: publicUser?.profile_image_key,
              });
            }
            console.log("fdfkj");
            return res.status(500).json({ message: "Unexpected error" });
          }
        },
      );
    } catch (err) {
      console.log("error from /profile ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

router.patch(
  "/public-user",
  verifyToken,
  upload.single("avatar"),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err instanceof jwt.TokenExpiredError) {
            console.log("jwt expired in PATCH /public-user ", err);
            return res.status(401).json({ message: "Expired token" });
          } else if (err) {
            console.log(
              "error from jwt verify in PATCH /profile/public-user ",
              err,
            );
            return res.status(401).json({ message: "Unauthorized" });
          } else {
            console.log("decoded ---- ", decoded);
            const { id, role, email } = (<any>decoded).data;
            if (role !== "publicUser") {
              console.log(`a user with role ${role} accessed this route`);
              return res.status(401).json({ message: "Unauthorized" });
            }

            const result = publicUser.safeParse(req.body);
            if (!result.success) {
              console.log("error ---- ", result.error);
              console.log("formatted ---- ", result.error.format());
              return res.status(400).json(result.error.issues);
            }

            const parsedUser = result.data;
            if (parsedUser.isUpload == "0") {
              console.log("parsedUser.isUpload ", parsedUser.isUpload);
              const updateUser = await prisma.public_users.update({
                where: {
                  user_id: id,
                },
                data: {
                  first_name: parsedUser.firstName,
                  last_name: parsedUser.lastName,
                  phone_number: parsedUser.phoneNumber,
                },
              });
              return res.status(200).json({
                firstName: updateUser.first_name,
                lastName: updateUser.last_name,
                phoneNumber: updateUser.phone_number,
                profileImageKey: updateUser.profile_image_key,
              });
            } else {
              console.log("parsedUser.isUpload ", parsedUser.isUpload);
              const file = req.file;
              if (!file) {
                return res.status(400).json({ message: "no file" });
              }

              const validTypes = ["image/jpeg", "image/png"]; // could add more
              const maxSize = 1000000; // 1 MB maximum size

              if (
                validTypes.indexOf(file.mimetype) === -1 ||
                file.size > maxSize
              ) {
                return res
                  .status(400)
                  .json({ message: "Invalid file type or size too big" });
              }

              if (parsedUser.profileImageKey) {
                await deleteObject(parsedUser.profileImageKey);
              }
              const key = await putObject(file.buffer);
              const updateUser = await prisma.public_users.update({
                where: {
                  user_id: id,
                },
                data: {
                  first_name: parsedUser.firstName,
                  last_name: parsedUser.lastName,
                  phone_number: parsedUser.phoneNumber,
                  profile_image_key: key,
                },
              });
              return res.status(200).json({
                firstName: updateUser.first_name,
                lastName: updateUser.last_name,
                phoneNumber: updateUser.phone_number,
                profileImageKey: key,
              });
            }
          }
        },
      );
    } catch (err) {
      console.log("error from /profile/public-user ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

router.patch(
  "/reset-password",
  verifyToken,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            console.log("error within jwt.verify ---- ", err);
            return res.status(401).json({ message: "Unauthorized" });
          }
          const result = passwordReset.safeParse(req.body);
          if (!result.success) {
            return res.status(400);
          }

          const { id } = (<any>decoded).data;
          const { oldPassword, newPassword } = result.data;

          const userExists = await prisma.users.findFirst({
            where: {
              id,
            },
          });
          if (!userExists) {
            return res.status(401).json({ message: "User does not exist" });
          }

          const checkPassword = bcrypt.compareSync(
            oldPassword,
            userExists.hashed_password,
          );
          if (!checkPassword) {
            return res.status(401).json({ message: "Incorrect password" });
          }

          bcrypt.hash(
            newPassword,
            10,
            async function (err: Error | null, hash: string) {
              const updateUser = await prisma.users.update({
                where: {
                  id,
                },
                data: {
                  hashed_password: hash,
                },
              });

              return res
                .status(200)
                .json({ message: "Password successfully changed" });
            },
          );

          return res.status(500);
          ////////////////
        },
      );
    } catch (err) {
      console.log("error from /profile/reset-password ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

export default router;
