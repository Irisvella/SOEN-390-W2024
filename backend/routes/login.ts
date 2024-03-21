import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Prisma } from "@prisma/client";

import { Request, Response, NextFunction } from "express";

const User = z.object({
  role: z.enum(["publicUser", "company"]),
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
      const { role, email, password } = result.data;
      console.log("result.data is " + result.data.email);

      const userExists = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });
      if (!userExists) {
        return res.status(401).json({ message: "User does not exist" });
      }

      const checkPassword = bcrypt.compareSync(
        password,
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
            role,
            email,
            // might need "subRole" here for public users ('none', 'renter', 'owner')
          },
        },
        process.env.SECRET as jwt.Secret,
      );

      if (role === "publicUser") {
        const publicUserExists = await prisma.public_users.findFirst({
          where: {
            user_id: userExists.id,
          },
        });
        if (!publicUserExists) {
          console.log("user was confirmed to not be a public user");
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          return res.status(200).json({
            token,
            data: {
              email,
              firstName: publicUserExists.first_name,
              lastName: publicUserExists.last_name,
              role,
              subRole: publicUserExists.role,
              imageKey: publicUserExists.profile_image_key,
            },
          });
        }
      } else {
        const companyUserExists = await prisma.management_companies.findFirst({
          where: {
            user_id: userExists.id,
          },
        });
        if (!companyUserExists) {
          console.log("user was confirmed to not be a company");
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          return res.status(200).json({
            token,
            data: {
              email,
              companyName: companyUserExists.company_name,
              role,
            },
          });
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues);
        return res.status(400).json({ message: "Bad request" });
      }

      if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(err);
        return res.status(401).json({ message: "User does not exist" });
      }

      console.log("error from /login ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

export default router;
