import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";

const User = z.object({
  role: z.enum(["publicUser", "company", "employeeUser"]),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6).max(64),
});

router.post(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const result = User.safeParse(body);
      if (!result.success) {
        return res.status(400).json(result.error.issues);
      }

      const parsedUser = result.data;
      const userExists = await prisma.users.findFirst({
        where: {
          email: parsedUser.email,
        },
      });
      if (!userExists) {
        return res.status(401).json({ message: "User does not exist" });
      }

      const checkPassword = bcrypt.compareSync(
        parsedUser.password,
        userExists.hashed_password,
      );
      if (!checkPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          data: {
            id: userExists.id,
            role: parsedUser.role,
            email: parsedUser.email,
          },
        },
        process.env.SECRET as jwt.Secret,
      );

      if (parsedUser.role === "publicUser") {
        const publicUserExists = await prisma.public_users.findFirst({
          where: {
            user_id: userExists.id,
          },
        });
        if (!publicUserExists) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json({
          token,
          data: {
            email: parsedUser.email,
            firstName: publicUserExists.first_name,
            lastName: publicUserExists.last_name,
            role: "publicUser",
            subRole: publicUserExists.role,
            imageKey: publicUserExists.profile_image_key,
          },
        });
      } else if (parsedUser.role === "company") {
        const companyUserExists = await prisma.management_companies.findFirst({
          where: {
            user_id: userExists.id,
          },
        });
        if (!companyUserExists) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json({
          token,
          data: {
            email: parsedUser.email,
            companyName: companyUserExists.company_name,
            role: parsedUser.role,
          },
        });
      } else {
        const employeeUserExists = await prisma.employee_users.findFirst({
          where: {
            user_id: userExists.id,
          },
        });
        if (!employeeUserExists) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json({
          token,
          data: {
            email: parsedUser.email,
            firstName: employeeUserExists.first_name,
            lastName: employeeUserExists.last_name,
            role: "employeeUser",
            imageKey: employeeUserExists.profile_image_key,
          },
        });
      }
    } catch (err) {
      console.log("error from /login ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

export default router;
