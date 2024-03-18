import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

interface companyData {
  id: number;
  address: string;
  image_url: string;
  company_name: string;
}
interface userData {
  id: number;
  address: string;
  image_url: string;
  username: string;
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
              const company = await prisma.$queryRaw<
                companyData[]
              >`SELECT  p.id, p.address, p.image_url AS "imageUrl", m.company_name AS "companyName", 'company' AS "propertyType"
              FROM property AS p, management_companies as m, owned_by as o
                WHERE m.id = o.owner_id and m.id = ${id} and p.id = property_id;
                `;

              console.log("a");
              return res.status(200).json(company);
            } else if (role === "publicUser") {
              const publicUser = await prisma.$queryRaw<
                userData[]
              >`SELECT pu.id, p.address, p.image_url AS "imageUrl", pu.username, 'user' AS "propertyType"
              FROM property AS p, public_users as pu, owned_by as o
                WHERE pu.id = o.owner_id and pu.id = ${id} and p.id = property_id;
                `;
              console.log("b");
              return res.status(200).json(publicUser);
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
