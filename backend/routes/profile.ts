import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

router.get(
  "/",
  verifyToken,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            // we could handle specific kinds of errors differently here
            console.log("error inside jwt.verify ---- ", err);
            return res.status(401).json("Unauthorized");
          } else {
            console.log("decoded ---- ", decoded);
            const { id, role, email } = (<any>decoded).data;
            if (role === "company") {
              const company = await prisma.management_companies.findFirst({
                where: {
                  user_id: id,
                },
              });
              const companyAddress = await prisma.company_address.findFirst({
                where: {
                  company_id: id,
                },
              });
              return res.status(200).json({
                email,
                companyName: company?.company_name,
                phoneNumber: company?.phone_number,
                unitCount: company?.unit_count,
                country: companyAddress?.country,
                province: companyAddress?.province,
                city: companyAddress?.city,
                streetName: companyAddress?.street_name,
                postalCode: companyAddress?.postal_code,
                apartmentNumber: companyAddress?.postal_code,
              });
            } else if (role === "publicUser") {
              const publicUser = await prisma.public_users.findFirst({
                where: {
                  user_id: id,
                },
              });
              return res.status(200).json({
                email,
                firstName: publicUser?.first_name,
                lastName: publicUser?.last_name,
                phoneNumber: publicUser?.phone_number,
                role,
                subRole: publicUser?.role,
                profileImageKey: publicUser?.profile_image_key,
              });
            }
            console.log("fdfkj");
            return res.status(500).json({ message: "Unexpected error" });
          }
        },
      );
    } catch (err) {
      console.log("error from /profile ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

export default router;
