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
              return res.status(401).json("Unauthorized");
            } else {
              console.log("decoded ---- ", decoded);
              const { id, role, email } = (<any>decoded).data;
              if (role === "company") {
                const company = await prisma.$queryRaw`
                SELECT *
                FROM property as p, owned_by as o
                WHERE p.id = o.property_id AND ${id} = o.owner_id
                `;
                console.log("a");
                return res.status(200).json({
                  companyName: company?.company_name,
                  address: company?.address,
                  unitCount: company?.unit_count,
                  imageUrl: company?.image_url,
                  parking_count: company?.parking_count,
                  locker_count: company?.locker_count,
                  phone: company?.phone_number,
                });
              } else if (role === "publicUser") {
                const publicUser = await prisma.$queryRaw`
                SELECT *
                FROM property as p, owned_by as o
                WHERE p.id = o.property_id AND ${id} = o.owner_id
                `;
                  
                console.log("b");
                return res.status(200).json({
                    companyName: publicUser?.company_name,
                    address: publicUser?.address,
                    unitCount: publicUser?.unit_count,
                    imageUrl: publicUser?.image_url,
                    parking_count: publicUser?.parking_count,
                    locker_count: publicUser?.locker_count,
                    phone: publicUser?.phone_number,
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