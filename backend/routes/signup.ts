import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import multer from "multer";
const upload = multer();

import { Request, Response, NextFunction } from "express";

const User1 = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
});

const User = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(10),
});

const Company = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  companyName: z.string().min(1),
  phoneNumber: z.string().min(10),
  country: z.string().min(1).optional(), // by default 'Canada'
  province: z.string().min(1),
  city: z.string().min(1),
  streetName: z.string().min(1),
  postalCode: z.string().length(7), // format is 'A3A 3A3'
  apartmentNumber: z.string().min(1).optional(),
});

const Company1 = z.object({
  companyName: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(4),
  password: z.string().min(6),
  phone: z.string(),
});

/* Allow a public user to register */
// router.post(
//   "/public-user",
//   upload.none(),
//   async function (req: Request, res: Response, next: NextFunction) {
//     try {
//       const body = req.body;

//       const result = User1.safeParse(body);
//       if (!result.success) {
//         console.log("error ---- ", result.error);
//         console.log("formatted ---- ", result.error.format());
//         return res.status(400).json(result.error.issues);
//       }

//       const userExists = await prisma.users.findFirst({
//         where: {
//           email: body.email,
//         },
//       });
//       if (userExists) {
//         return res.status(409).json({ message: "User already exists" });
//       }

//       async function createPublicUser(hashed_password: string) {
//         await prisma.$transaction(async (tx) => {
//           const user = await prisma.users.create({
//             data: {
//               email: body.email,
//               hashed_password,
//             },
//           });
//           const publicUser = await prisma.public_users.create({
//             data: {
//               id: user.id,
//               username: body.username,
//               phone_number: body.phone,
//             },
//           });
//         });
//       }

//       bcrypt.hash(
//         body.password,
//         10,
//         function (err: Error | null, hash: string) {
//           createPublicUser(hash);
//         },
//       );

//       return res.status(201).json({ message: "User created successfully" });
//     } catch (err) {
//       if (err instanceof z.ZodError) {
//         console.log(err.issues);
//         return res.status(400).json({ message: "One or more fields invalid" });
//       }

//       if (err instanceof Prisma.PrismaClientKnownRequestError) {
//         return res.status(409).json({ message: "User already exists" });
//       }

//       return res.status(500).json({ message: "Unexpected error" });
//     }
//   },
// );

/* Allow a management company to register */
// router.post(
//   "/management-company",
//   async function (req: Request, res: Response, next: NextFunction) {
//     try {
//       const body = req.body;

//       const result = Company1.safeParse(body);
//       if (!result.success) {
//         console.log("error ---- ", result.error);
//         console.log("formatted ---- ", result.error.format());
//         return res.status(400).json(result.error.issues); // change this later
//       }

//       const userExists = await prisma.users.findFirst({
//         where: {
//           email: body.email,
//         },
//       });
//       if (userExists) {
//         return res.status(409).json({ message: "Email already exists" });
//       }

//       async function createCompanyUser(hashed_password: string) {
//         await prisma.$transaction(async (tx) => {
//           const user = await prisma.users.create({
//             data: {
//               email: body.email,
//               hashed_password,
//             },
//           });
//           const company = await prisma.management_companies.create({
//             data: {
//               id: user.id,
//               company_name: body.companyName,
//               address: body.address,
//               phone_number: body.phone,
//             },
//           });
//         });
//       }

//       bcrypt.hash(
//         body.password,
//         10,
//         function (err: Error | null, hash: string) {
//           createCompanyUser(hash);
//         },
//       );

//       return res.status(201).json({ message: "User created successfully" });
//     } catch (err) {
//       if (err instanceof z.ZodError) {
//         console.log(err.issues);
//         return res.status(400).json({ message: "One or more fields invalid" });
//       }

//       if (err instanceof Prisma.PrismaClientKnownRequestError) {
//         return res.status(409).json({ message: "User exists already" });
//       }

//       return res.status(500).json({ message: "Unexpected error" });
//     }
//   },
// );

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

      const userExists = await prisma.users.findFirst({
        where: {
          email: body.email,
        },
      });
      if (userExists) {
        return res.status(409).json({ message: "User already exists" });
      }

      async function createPublicUser(hashed_password: string) {
        await prisma.$transaction(async (tx) => {
          const user = await prisma.users.create({
            data: {
              email: body.email,
              hashed_password,
            },
          });

          const publicUser = await prisma.public_users.create({
            data: {
              user_id: user.id,
              first_name: body.firstName,
              last_name: body.lastName,
              phone_number: body.phoneNumber,
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
      if (err instanceof z.ZodError) {
        console.log(err.issues);
        return res.status(400).json({ message: "One or more fields invalid" });
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(409).json({ message: "User already exists" });
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

      const userExists = await prisma.users.findFirst({
        where: {
          email: body.email,
        },
      });
      if (userExists) {
        return res.status(409).json({ message: "User exists already" });
      }

      async function createCompanyUser(hashed_password: string) {
        await prisma.$transaction(async (tx) => {
          const user = await prisma.users.create({
            data: {
              email: body.email,
              hashed_password,
            },
          });

          const company = await prisma.management_companies.create({
            data: {
              user_id: user.id,
              company_name: body.companyName,
              phone_number: body.phoneNumber,
            },
          });

          const companyAddress = await prisma.company_address.create({
            data: {
              company_id: company.user_id,
              country: body.country,
              province: body.province,
              city: body.city,
              street_name: body.streetName,
              postal_code: body.postalCode,
              apartment_number: body.apartmentNumber,
            },
          });
        });
      }

      bcrypt.hash(
        body.password,
        10,
        async function (err: Error | null, hash: string) {
          await createCompanyUser(hash);
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

      console.log("error from /signup/management-company ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);
export default router;
