import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

import { Request, Response, NextFunction } from "express";

const User = z.object({
  role: z.enum(["publicUser", "company"]),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
});

const Company = z.object({
  companyName: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(4),
  password: z.string().min(6),
  phone: z.string(),
});

/* (we will prob scrap this route) Allow a new user to sign up */
router.post(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const result = User.safeParse(body);
      if (!result.success) {
        console.log("error ---- ", result.error);
        console.log("formatted ---- ", result.error.format());
        return res.status(400).json(result.error.issues);
      }

      const userExists = await prisma.users.findFirst({
        where: {
          email: body.email,
        },
      });
      if (userExists) {
        return res.status(400).json({ message: "Email already exists" });
      }

      async function createUser(hashed_password: string) {
        const user = await prisma.users.create({
          data: {
            email: body.email,
            hashed_password: hashed_password,
          },
        });
        const publicUser = await prisma.public_users.create({
          data: {
            id: user.id,
            username: body.username,
            phone_number: body.phone,
          },
        });
      }

      bcrypt.hash(
        body.password,
        10,
        function (err: Error | null, hash: string) {
          createUser(hash);
        },
      );

      return res.status(200).json({ message: "User created successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues);
        return res.status(400).json({ message: "One or more fields invalid" });
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ message: "Email taken" });
      }

      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

/* Allow a public user to register */
router.post(
  "/public-user",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {}
  },
);

/* Allow a management company to register */
router.post(
  "/management-company",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const result = Company.safeParse(body);
      if (!result.success) {
        console.log("error ---- ", result.error);
        console.log("formatted ---- ", result.error.format());
        return res.status(400).json(result.error.issues); // change this later
      }

      const userExists = await prisma.users.findFirst({
        where: {
          email: body.email,
        },
      });
      if (userExists) {
        return res.status(400).json({ message: "Email already exists" });
      }

      async function createCompanyUser(hashed_password: string) {
        await prisma.$transaction(async (tx) => {
          const user = await prisma.users.create({
            data: {
              email: body.email,
              hashed_password: hashed_password,
            },
          });
          const company = await prisma.management_companies.create({
            data: {
              id: user.id,
              company_name: body.companyName,
              address: body.address,
              phone_number: body.phone,
            },
          });
        });
      }

      bcrypt.hash(
        body.password,
        10,
        function (err: Error | null, hash: string) {
          createCompanyUser(hash);
        },
      );

      return res.status(200).json({ message: "User created successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues);
        return res.status(400).json({ message: "One or more fields invalid" });
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ message: "Email taken" });
      }

      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

export default router;
