import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

router.get(
  "/",
  verifyToken,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            console.log("err from /profile GET ---- ", err);
            return res.status(401).json("Unauthorized");
          }

          const { id, role, email } = (<any>decoded).data;
          if (role === "company") {
            const companyUser = await prisma.management_companies.findFirst({
              where: {
                user_id: id,
              },
            });

            return res.status(200).json({
              id: id,
              role: "company",
              email: email,
              companyName: companyUser?.company_name,
              phoneNumber: companyUser?.phone_number,
              unitCount: companyUser?.unit_count,
            });
          } else if (role === "publicUser") {
            const publicUser = await prisma.public_users.findFirst({
              where: {
                user_id: id,
              },
            });
            console.log("b");
            return res.status(200).json({
              id: id,
              firstName: publicUser?.first_name,
              lastName: publicUser?.last_name,
              phoneNumber: publicUser?.phone_number,
              role,
              subRole: publicUser?.role,
              profileImageKey: publicUser?.profile_image_key,
            });
          } else {
            const employeeUser = await prisma.employee_users.findFirst({
              where: {
                user_id: id,
              },
            });
            return res.status(200).json({
              id: id,
              firstName: employeeUser?.first_name,
              lastName: employeeUser?.last_name,
              phoneNumber: employeeUser?.phone_number,
              role,
              profileImageKey: employeeUser?.profile_image_key,
            });
          }
        },
      );
    } catch (err) {
      console.log("error from /profile GET ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

router.put("/", verifyToken, async (req: Request, res: Response) => {
  console.log("Received payload for update:", req.body);
  try {
    const decoded = jwt.verify(
      req.token as string,
      process.env.SECRET as jwt.Secret,
    );
    const { id, role } = (<any>decoded).data;

    const { phoneNumber, firstName, lastName, companyName, address } = req.body; // Extract fields from request body

    if (role === "company") {
      const company = await prisma.management_companies.update({
        where: { user_id: id },
        data: {
          company_name: companyName,
          phone_number: phoneNumber,
          address: address,
        },
      });
      console.log("Updated user data:", company);
      return res.json({
        message: "Company Profile updated successfully",
        company,
      });
    } else if (role === "publicUser") {
      // Update public user profile
      const public_users = await prisma.public_users.update({
        where: { user_id: id },
        data: {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          //profile_image_key: avatar,
        },
      });
      console.log("Updated user data:", public_users);
      return res.json({
        message: "Public User profile updated successfully",
        public_users,
      });
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Unexpected error", error });
  }
});

export default router;
