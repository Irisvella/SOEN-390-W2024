import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

import { Request, Response, NextFunction } from "express";

const User = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6).max(64),
  firstName: z.string().trim().toLowerCase().min(1),
  lastName: z.string().trim().toLowerCase().min(1),
  phoneNumber: z.string().trim().min(10),
});

const Company = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(6).max(64),
  companyName: z.string().trim().toLowerCase().min(1),
  phoneNumber: z.string().trim().min(10),
  address: z.string().min(4),
});

const EmployeeUser = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6).max(64),
  firstName: z.string().trim().toLowerCase().min(1),
  lastName: z.string().trim().toLowerCase().min(1),
  phoneNumber: z.string().trim().min(10),
  role: z.enum(["manager", "daily_operations", "finance", "other"]),
});

/* Allow a public user to register */
router.post(
  "/public-user",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const parse = User.safeParse(req.body);
      if (!parse.success) {
        console.log("error ---- ", parse.error);
        console.log("formatted ---- ", parse.error.format());
        return res.status(400).json(parse.error.issues);
      }

      const parsedBody = parse.data;
      const userExists = await prisma.users.findFirst({
        where: {
          email: parsedBody.email,
        },
      });
      if (userExists) {
        return res.status(409).json({ message: "User already exists" });
      }

      bcrypt.hash(
        parsedBody.password,
        10,
        async function (err: Error | null, hash: string) {
          const publicUser = await prisma.users.create({
            data: {
              email: parsedBody.email,
              hashed_password: hash,
              public_users: {
                create: {
                  first_name: parsedBody.firstName,
                  last_name: parsedBody.lastName,
                  phone_number: parsedBody.phoneNumber,
                },
              },
            },
          });
          return res.status(201).json({ message: "User created successfully" });
        },
      );
    } catch (err) {
      console.log("err from /signup/public-user ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

/* Allow a management company to register */
router.post(
  "/management-company",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const parse = Company.safeParse(req.body);
      if (!parse.success) {
        console.log("error ---- ", parse.error);
        console.log("formatted ---- ", parse.error.format());
        return res.status(400).json(parse.error.issues); // change this later
      }

      const parsedBody = parse.data;
      const userExists = await prisma.users.findFirst({
        where: {
          email: parsedBody.email,
        },
      });
      if (userExists) {
        return res.status(409).json({ message: "Email already exists" });
      }

      bcrypt.hash(
        parsedBody.password,
        10,
        async function (err: Error | null, hash: string) {
          const companyUser = await prisma.users.create({
            data: {
              email: parsedBody.email,
              hashed_password: hash,
              management_companies: {
                create: {
                  company_name: parsedBody.companyName,
                  address: parsedBody.address,
                  phone_number: parsedBody.phoneNumber,
                },
              },
            },
          });
          return res.status(201).json({ message: "User created successfully" });
        },
      );
    } catch (err) {
      console.log("err from /signup/management-company ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

router.post(
  "/employee-user",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const parse = EmployeeUser.safeParse(req.body);
      if (!parse.success) {
        console.log("error ---- ", parse.error);
        console.log("formatted ---- ", parse.error.format());
        return res.status(400);
      }

      const parsedBody = parse.data;
      const userExists = await prisma.users.findFirst({
        where: {
          email: parsedBody.email,
        },
      });
      if (userExists) {
        return res.status(409).json({ message: "User exists already" });
      }

      bcrypt.hash(
        parsedBody.password,
        10,
        async function (err: Error | null, hash: string) {
          const employeeUser = await prisma.users.create({
            data: {
              email: parsedBody.email,
              hashed_password: hash,
              employee_users: {
                create: {
                  first_name: parsedBody.firstName,
                  last_name: parsedBody.lastName,
                  phone_number: parsedBody.phoneNumber,
                  role: parsedBody.role,
                },
              },
            },
          });
          return res.status(201).json({ message: "User created successfully" });
        },
      );
    } catch (err) {
      console.log("err from /signup/employee-user ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

export default router;
