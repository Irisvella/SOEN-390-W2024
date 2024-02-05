var express = require("express");
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
        return res.status(401).json({ message: "Unauthorized" });
      }

      // check password
      await bcrypt.compare(
        body.password,
        userExists.hashed_password,
        function (err: Error, result: boolean) {
          if (!result) {
            console.log("incorrect pass");
            return res.status(401).json({ message: "Unauthorized" });
          }
        },
      );

      let subUserExists;
      if (body.role === "publicUser") {
        subUserExists = await prisma.users.findFirst({
          where: {
            id: userExists.id,
          },
        });
        if (!subUserExists) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      } else {
        subUserExists = await prisma.users.findFirst({
          where: {
            id: userExists.id,
          },
        });
        if (!subUserExists) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: { id: userExists.id, role: body.role, email: body.email },
        },
        process.env.SECRET,
      );

      return res.status(200).json({ message: token });
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues);
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
      }

      console.log("error from /login ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

module.exports = router;
