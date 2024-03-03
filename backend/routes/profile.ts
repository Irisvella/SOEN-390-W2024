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

router.put("/", verifyToken, async (req: Request, res: Response) => {
  console.log('Received payload for update:', req.body);
  try {
    const decoded = jwt.verify(req.token as string, process.env.SECRET as jwt.Secret);
    const { id, role } = (<any>decoded).data; 

    const { phoneNumber, userName, companyName, address} = req.body; // Extract fields from request body

    if (role === "company") {
    
      const company = await prisma.management_companies.update({
        where: { id },
        data: {
          company_name: companyName,
          phone_number: phoneNumber,
          address: address,
         
        },
      }); 
      console.log('Updated user data:', company);
      return res.json({ message: "Company Profile updated successfully", company });
    } else if (role === "publicUser") {
      // Update public user profile
      const public_users = await prisma.public_users.update({
        where: { id },
        data: {
          username : userName,
          phone_number: phoneNumber,
         //profile_image_key: avatar,
   
        },
      }); console.log('Updated user data:', public_users);
      return res.json({ message: "Public User profile updated successfully", public_users });
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Unexpected error", error });
  }
});

export default router;
