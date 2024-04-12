import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt, { Jwt } from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

const Billing = z.object({
  address: z.string().min(4),
  unitNumber: z.string(),
  amount: z.number(),
  payBefore: z.coerce.date(),
});

const StatusChange = z.object({
  billingId: z.number(),
  status: z.enum(["paid", "unpaid"]),
});

/*
router.get(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            console.log("err from /billing GET ---- ", err);
            return res.status(401).json("Unauthorized");
          }

          const { id, role, email } = (<any>decoded).data;
          if (role === "employeeUser") {
            console.log(
              `user with email ${email} and role employeeUser accessed /billing GET`,
            );
            return res.status(401).json("Unauthorized");
          } else if (role === "publicUser") {
            const publicUserExists = await prisma.public_users.findFirst({
              where: {
                user_id: id,
              },
              include: {
                billing: true,
              },
            });

            if (!publicUserExists) {
              console.log("public user doesn't exist");
              return res.status(401).json("Unauthorized");
            }

            return res
              .status(200)
              .json({ message: "success", data: publicUserExists.billing });
          } else if (role === "company") {
            const companyUserExists =
              await prisma.management_companies.findFirst({
                where: {
                  user_id: id,
                },
                include: {
                  property: {
                    include: {
                      condo_unit: {
                        include: {
                          billing: true,
                        },
                      },
                    },
                  },
                },
              });

            if (!companyUserExists) {
              console.log("company user doesn't exist");
              return res.status(401).json("Unauthorized");
            }

            const data = [];
            const properties = companyUserExists.property;
            for (let i = 0; i < properties.length; i += 1) {
              const condos = properties[i].condo_unit;
              for (let j = 0; j < condos.length; j += 1) {
                data.push(condos[i].billing);
*/

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
            return res.status(401).json("Unauthorized");
          }

          const { id, role, email } = (<any>decoded).data;
          if (role !== "company") {
            console.log(
              `user with email ${email} and role ${role} tried to access /billing POST`,
            );
            return res.status(401).json("Unauthorized");
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
            console.log("property doesn't exist");
            return res.status(400).json({
              message: "Property with provided address does not exist",
            });
          }

          const condoExists = await prisma.condo_unit.findFirst({
            where: {
              unit_number: parsedBody.unitNumber,
              property_id: propertyExists.id,
            },
          });
          if (!condoExists) {
            console.log("condo doesn't exist");
            return res.status(400).json({
              message: "Condo with provided unit number does not exist",
            });
          }

          const condoUser = await prisma.registration.findFirst({
            where: {
              condo_id: condoExists.id,
              end_date: null,
            },
          });
          if (!condoUser) {
            console.log("no owner/renter for this condo");
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

router.get("/all-bills", verifyToken, async (req: express.Request, res: express.Response) => {
  try {
      const decoded = jwt.verify(req.token as string, process.env.SECRET as jwt.Secret) as jwt.JwtPayload;
      const { id, role } = decoded.data;

      if (role !== "company") {
          return res.status(403).json({ message: "Unauthorized: Access is limited to company accounts only." });
      }
      const properties = await prisma.management_companies.findUnique({
          where: { user_id: id },
          include: {
              property: {
                  include: {
                      condo_unit: {
                          include: {
                              billing: true
                          }
                      }
                  }
              }
          }
      });

      if (!properties || properties.property.length === 0) {
          return res.status(404).json({ message: "No properties found." });
      }
      const billingData = properties.property.flatMap(property =>
          property.condo_unit.flatMap(unit =>
              unit.billing.map(bill => ({
                  id: bill.id,
                  propertyAddress: property.address,
                  unitNumber: unit.unit_number,
                  amount: bill.amount,
                  payBefore: bill.pay_before,
                  status: bill.status
              }))
          )
      );

      return res.status(200).json(billingData);
  } catch (error) {
      console.error("Error fetching billing data:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
});


router.patch(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            console.log("err from /billing PATCH ---- ", err);
            return res.status(401).json("Unauthorized");
          }

          const { id, role, email } = (<any>decoded).data;
          if (role !== "company") {
            console.log(
              `user with email ${email} and role ${role} accessed /billing GET`,
            );
            return res.status(401).json("Unauthorized");
          }

          const parse = StatusChange.safeParse(req.body);
          if (!parse.success) {
            console.log(parse.error.issues);
            return res.status(400);
          }

          const parsedBody = parse.data;
          const billingExists = await prisma.billing.findFirst({
            where: {
              id: parsedBody.billingId,
            },
          });
          if (!billingExists) {
            return res
              .status(400)
              .json({ message: "Billing with provided id does not exist" });
          }

          const condoExists = await prisma.condo_unit.findFirst({
            where: {
              id: billingExists.condo_id,
            },
          });
          if (!condoExists) {
            throw new Error("condo does not exist");
          }

          const propertyExists = await prisma.property.findFirst({
            where: {
              id: condoExists.property_id,
            },
          });
          if (!propertyExists) {
            throw new Error("property does not exist");
          }

          if (propertyExists.company_id !== id) {
            console.log("condo and property does not belong to user");
            return res.status(401).json("Unauthorized");
          }

          const updateBilling = await prisma.billing.update({
            where: {
              id: parsedBody.billingId,
            },
            data: {
              status: parsedBody.status,
            },
          });

          return res
            .status(200)
            .json({ message: "success", data: updateBilling });
        },
      );
    } catch (err) {
      console.log("err from /billing PATCH ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

export default router;
