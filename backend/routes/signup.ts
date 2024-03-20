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
      const body = req.body;

      const result = User.safeParse(body);
      if (!result.success) {
        console.log("error ---- ", result.error);
        console.log("formatted ---- ", result.error.format());
        return res.status(400).json(result.error.issues);
      }

      const parsedUser = result.data;
      const userExists = await prisma.users.findFirst({
        where: {
          email: parsedUser.email,
        },
      });
      if (userExists) {
        return res.status(409).json({ message: "User already exists" });
      }

      async function createPublicUser(hashed_password: string) {
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
          const user = await prisma.users.create({
            data: {
              email: body.email,
              hashed_password,
            },
          });
          const publicUser = await prisma.public_users.create({
            data: {
              user_id: user.id,
              first_name: parsedUser.firstName,
              last_name: parsedUser.lastName,
              phone_number: parsedUser.phoneNumber,
            },
          });
        });
      }

      bcrypt.hash(
        body.password,
        10,
        function (err: Error | null, hash: string) {
          createPublicUser(hash);
        },
      );

      return res.status(201).json({ message: "User created successfully" });
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
      const body = req.body;

      const result = Company.safeParse(body);
      if (!result.success) {
        console.log("error ---- ", result.error);
        console.log("formatted ---- ", result.error.format());
        return res.status(400).json(result.error.issues); // change this later
      }

      const parsedCompany = result.data;
      const userExists = await prisma.users.findFirst({
        where: {
          email: parsedCompany.email,
        },
      });
      if (userExists) {
        return res.status(409).json({ message: "Email already exists" });
      }

      async function createCompanyUser(hashed_password: string) {
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
          const user = await prisma.users.create({
            data: {
              email: body.email,
              hashed_password,
            },
          });
          const company = await prisma.management_companies.create({
            data: {
              user_id: user.id,
              company_name: parsedCompany.companyName,
              address: parsedCompany.address,
              phone_number: parsedCompany.phoneNumber,
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

      return res.status(201).json({ message: "User created successfully" });
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
      const body = req.body;

      const result = EmployeeUser.safeParse(body);
      if (!result.success) {
        console.log("error ---- ", result.error);
        console.log("formatted ---- ", result.error.format());
        return res.status(400);
      }

      const parsedUser = result.data;
      const userExists = await prisma.users.findFirst({
        where: {
          email: parsedUser.email,
        },
      });
      if (userExists) {
        return res.status(409).json({ message: "User exists already" });
      }

      async function createEmployeeUser(hashed_password: string) {
        await prisma.$transaction(async (tx) => {
          const user = await prisma.users.create({
            data: {
              email: parsedUser.email,
              hashed_password,
            },
          });

          const employeeUser = await prisma.employee_users.create({
            data: {
              user_id: user.id,
              first_name: parsedUser.firstName,
              last_name: parsedUser.lastName,
              phone_number: parsedUser.phoneNumber,
              role: parsedUser.role,
            },
          });
        });
      }

      bcrypt.hash(
        parsedUser.password,
        10,
        function (err: Error | null, hash: string) {
          createEmployeeUser(hash);
        },
      );

      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.log("err from /signup/employee-user ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

export default router;
