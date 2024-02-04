var express = require("express");
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
const bcrypt = require("bcryptjs");
import { Prisma } from "@prisma/client";

import { Request, Response, NextFunction } from "express";

const User = z.object({
  role: z.enum(["condoOwner", "company"]),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
});

/* Allow a new user to sign up */
router.post(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      console.log("body --- ", body);
      const result = User.safeParse(body);
      console.log("user parse result --- ", result);

      if (!result.success) {
        console.log("error ---- ", result.error);
        console.log("formatted ---- ", result.error.format());
        return res.status(400).send(result.error.issues);
      }

      const userExists = await prisma.users.findFirst({
        where: {
          email: body.email,
        },
      });

      if (userExists) {
        return res.status(400).send({ message: "Email already exists" });
      }

      const test = await bcrypt.hash(
        body.password,
        10,
        async function (err: Error, hash: string) {
          const user = await prisma.users.create({
            data: {
              email: body.email,
              hashed_password: hash,
            },
          });
          const publicUser = await prisma.public_users.create({
            data: {
              id: user.id,
              username: body.username,
              phone_number: body.phone,
            },
          });
        },
      );
      console.log("test ---- ", test);

      return res.status(200).send({ message: "User created successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues);
        return res.json({ message: "One or more fields invalid" });
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.json({ message: "Email taken" });
      }

      return res.status(500).send({ message: "Unexpected error" });
    }
  },
);

module.exports = router;
