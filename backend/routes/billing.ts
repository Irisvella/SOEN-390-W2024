import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

const Billing = z.object({
  address: z.string().min(4),
  unitNumber: z.string(),
  amount: z.number(),
  payBefore: z.date(),
});

router.post(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            console.log("err from /billing POST ---- ", err);
            return res.status(401).json({ message: "Unauthorized" });
          }

          const { id, role, email } = (<any>decoded).data;
          if (role !== "company") {
            console.log(
              `user with email ${email} and role ${role} tried to access /billing POST`,
            );
            return res.status(401).json({ message: "Unauthorized" });
          }

          const parse = Billing.safeParse(req.body);
          if (!parse.success) {
            console.log(parse.error.issues);
            return res.status(400);
          }

          const parsedBody = parse.data;
          const propertyExists = await prisma.property.findFirst({
            where: {
              company_id: id,
              address: parsedBody.address,
            },
          });
          if (!propertyExists) {
            return res.status(400).json({
              message: "Property with provided address doesn't exist",
            });
          }

          const condoExists = await prisma.condo_unit.findFirst({
            where: {
              unit_number: parsedBody.unitNumber,
              property_id: propertyExists.id,
            },
          });
          if (!condoExists) {
            return res.status(400).json({ message: "Condo does not exist" });
          }

          const condoUser = await prisma.registration.findFirst({
            where: {
              condo_id: condoExists.id,
              end_date: null,
            },
          });
          if (!condoUser) {
            return res
              .status(400)
              .json({ message: "No current owner/renter for this condo" });
          }

          const billing = await prisma.billing.create({
            data: {
              condo_id: condoExists.id,
              public_user_id: condoUser.public_user_id,
              pay_before: parsedBody.payBefore,
              amount: parsedBody.amount,
            },
          });

          return res.status(201).json({ message: "success" });
        },
      );
    } catch (err) {
      console.log("err from /billing POST ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

export default router;
