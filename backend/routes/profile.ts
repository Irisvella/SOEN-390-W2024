import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

interface userData {
  id: number;
  role: string;
  email: string;
}

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
            return res.status(401).json("Unauthorized");
          } else {
            console.log("decoded ---- ", decoded);
            const { id, role, email } = (<any>decoded).data;
            if (role === "company") {
              const company = await prisma.management_companies.findFirst({
                where: {
                  id: id,
                },
              });
              console.log("a");
              return res.status(200).json({
                id: id,
                role: "company",
                email: email,
                companyName: company?.company_name,
                address: company?.address,
                unitCount: company?.unit_count,
                parking_count: company?.parking_count,
                locker_count: company?.locker_count,
                phone: company?.phone_number,
              });
            } else if (role === "publicUser") {
              const publicUser = await prisma.public_users.findFirst({
                where: {
                  id: id,
                },
              });
              console.log("b");
              return res.status(200).json({
                id: id,
                role: "publicUser",
                email: email,
                username: publicUser?.username,
                phone: publicUser?.phone_number,
                avatar: publicUser?.profile_image_key,
              });
            }
            console.log("c");
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
