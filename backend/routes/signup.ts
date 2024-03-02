import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

import { Request, Response, NextFunction } from "express";

const User = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().trim().min(6),
  firstName: z.string().trim().toLowerCase().min(1),
  lastName: z.string().trim().toLowerCase().min(1),
  phoneNumber: z.string().trim().min(10),
});

const Company = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().trim().min(6),
  companyName: z.string().trim().toLowerCase().min(1),
  phoneNumber: z.string().trim().min(10),
  country: z.string().trim().toLowerCase().min(1).optional(), // by default 'Canada'
  province: z.string().trim().toLowerCase().min(1),
  city: z.string().trim().toLowerCase().min(1),
  streetName: z.string().trim().toLowerCase().min(1),
  postalCode: z.string().trim().toUpperCase().length(7), // format is 'A3A 3A3'
  apartmentNumber: z.string().trim().min(1).optional(),
});

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
        return res.status(409).json({ message: "User exists already" });
      }

      async function createPublicUser(hashed_password: string) {
        await prisma.$transaction(async (tx) => {
          const user = await prisma.users.create({
            data: {
              email: parsedUser.email,
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
        parsedUser.password,
        10,
        function (err: Error | null, hash: string) {
          createPublicUser(hash);
        },
      );

      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues);
        return res.status(400).json({ message: "One or more fields invalid" });
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(409).json({ message: "User exists already" });
      }

      console.log("unexpected error from /signup/public-user ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

router.post(
  "/management-company",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const result = Company.safeParse(body);
      if (!result.success) {
        console.log("error ---- ", result.error);
        console.log("formatted ---- ", result.error.format());
        return res.status(400).json(result.error.issues);
      }
      const parsedCompany = result.data;

      const userExists = await prisma.users.findFirst({
        where: {
          email: parsedCompany.email,
        },
      });
      if (userExists) {
        return res.status(409).json({ message: "User exists already" });
      }

      async function createCompanyUser(hashed_password: string) {
        await prisma.$transaction(async (tx) => {
          const user = await prisma.users.create({
            data: {
              email: parsedCompany.email,
              hashed_password,
            },
          });

          const company = await prisma.management_companies.create({
            data: {
              user_id: user.id,
              company_name: parsedCompany.companyName,
              phone_number: parsedCompany.phoneNumber,
            },
          });

          const companyAddress = await prisma.company_address.create({
            data: {
              company_id: company.user_id,
              country: parsedCompany.country,
              province: parsedCompany.province,
              city: parsedCompany.city,
              street_name: parsedCompany.streetName,
              postal_code: parsedCompany.postalCode,
              apartment_number: parsedCompany.apartmentNumber,
            },
          });
        });
      }

      bcrypt.hash(
        parsedCompany.password,
        10,
        async function (err: Error | null, hash: string) {
          await createCompanyUser(hash);
        },
      );

      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(409).json({ message: "User exists already" });
      }

      console.log("error from /signup/management-company ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);
export default router;
