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
  email: z.string().email(),
  password: z.string().min(6),
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

      const userExists = await prisma.users.findFirst({
        where: {
          email: body.email,
        },
      });
      if (!userExists) {
        console.log("a");
        return res.status(401).json({ message: "Unauthorized" });
      }

      const checkPassword = bcrypt.compareSync(
        body.password,
        userExists.hashed_password,
      );
      if (!checkPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: { id: userExists.id, role: body.role, email: body.email },
        },
        process.env.SECRET as jwt.Secret,
      );

      let subUserExists;
      if (body.role === "publicUser") {
        subUserExists = await prisma.public_users.findFirst({
          where: {
            id: userExists.id,
          },
        });
        if (!subUserExists) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          return res.status(200).json({
            token,
            data: {
              username: subUserExists.username,
              imageKey: subUserExists.profile_image_key,
            },
          });
        }
      } else {
        subUserExists = await prisma.management_companies.findFirst({
          where: {
            id: userExists.id,
          },
        });
        if (!subUserExists) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          return res.status(200).json({
            token,
            data: {
              data: {
                companyName: subUserExists.company_name,
              },
            },
          });
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues);
        return res.status(401).json({ message: "Unauthorized" });
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
