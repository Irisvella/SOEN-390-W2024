// Filename: registration.ts
// Author: bt919, Andy
// Description: post and patch routes for registration keys
// Dependencies: express, prisam, and jwt

import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

/* type and condoId attributes are mandatory, rest optional */
const Registration = z.object({
  type: z.enum(["renter", "owner"]),
  issuedAt: z.coerce.date().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  condoId: z.number(),
});

const UserRegistration = z.object({
  registrationKey: z.string().length(36),
});

/* allow company users to create registration keys that can be sent to 
    public users to register them as a condo owner or renter. 
    Sending out emails YET TO BE IMPLEMENTED. */
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
            console.log("err from /registration POST ---- ", err);
            return res.status(401).json("Unauthorized");
          }

          const { id, role, email } = (<any>decoded).data;
          if (role !== "company") {
            console.log(
              `user with email ${email} and role ${role} tried to access /billing POST`,
            );
            return res.status(401).json("Unauthorized");
          }

          const parse = Registration.safeParse(req.body);
          if (!parse.success) {
            console.log(parse.error.issues);
            return res.status(400);
          }

          const parsedBody = parse.data;

          const isOwner: any = await prisma.$queryRaw`SELECT * FROM 
          management_companies mc, property p, condo_unit cu 
          WHERE mc.user_id = ${id} 
                AND p.company_id = mc.user_id
                AND p.id = cu.property_id
                AND cu.id = ${parsedBody.condoId}`;

          if (isOwner.length === 0 || isOwner[0]["user_id"] !== id) {
            console.log(
              `company doesn't own this condo or no condo exists ---- ${isOwner}`,
            );
            return res.status(400).json();
          }

          const registrationExists = await prisma.registration.findFirst({
            where: {
              condo_id: parsedBody.condoId,
              end_date: null,
            },
          });
          if (registrationExists) {
            console.log(
              `registration key already exists for condo with condo id ${parsedBody.condoId}`,
            );
            return res.status(400).json();
          }

          const registration = await prisma.registration.create({
            data: {
              type: parsedBody.type,
              issued_at: parsedBody.issuedAt,
              start_date: parsedBody.startDate,
              end_date: parsedBody.endDate,
              condo_id: parsedBody.condoId,
              public_user_id: 1
            },
          });

          return res.status(201).json({
            message: "success",
            data: {
              registrationKey: registration.registration_key,
            },
          });
        },
      );
    } catch (err) {
      console.log("err from /registration POST ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

/* allow public users to use a registration key which makes them an owner or 
    renter of a condo unit. */
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
            console.log("err from /registration PATCH ---- ", err);
            return res.status(401).json("Unauthorized");
          }

          const { id, role, email } = (<any>decoded).data;
          if (role !== "publicUser") {
            console.log(
              `user with email ${email} and role ${role} tried to access /billing POST`,
            );
            return res.status(401).json("Unauthorized");
          }

          const parse = UserRegistration.safeParse(req.body);
          if (!parse.success) {
            console.log(parse.error.issues);
            return res.status(400);
          }

          const parsedBody = parse.data;

          const registration = await prisma.registration.update({
            where: {
              registration_key: parsedBody.registrationKey,
            },
            data: {
              public_user_id: id,
            },
          });

          const updateRole = await prisma.public_users.update({
            where: {
              user_id: id,
            },
            data: {
              role: registration.type,
            },
          });

          return res.status(200).json({
            message: "success",
            data: {
              condoId: registration.condo_id,
            },
          });
        },
      );
    } catch (err) {
      console.log("err from /registration PATCH ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

router.get(
  "/:registrationKey",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { registrationKey } = req.params;
      const registration = await prisma.registration.findUnique({
        where: {
          registration_key: registrationKey,
        },
        select: {
          registration_key: true, 
          condo_id: true,
          public_user_id: true,
        },
      });
      if (!registration) {
        return res.status(404).json({ message: "Registration key not found" });
      }

      return res.status(200).json({
        message: "success",
        data: registration,
      });
    } catch (err) {
      console.log("Error from /registration GET ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);


export default router;
