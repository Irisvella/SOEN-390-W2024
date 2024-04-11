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

          const registration = await prisma.registration.create({
            data: {
              type: parsedBody.type,
              issued_at: parsedBody.issuedAt,
              start_date: parsedBody.startDate,
              end_date: parsedBody.endDate,
              condo_id: parsedBody.condoId,
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

export default router;
