// Filename: dashboard.ts
// Author: Samuel Collette
// Description: Backend file to retrieve all porperties under the logged in user, for the dashboard
// Dependencies: jwt, prisma, express

import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

router.get("/:propertyId", verifyToken, async (req: Request, res: Response) => {
    const { propertyId } = req.params;
    jwt.verify(
      req.token as string,
      process.env.SECRET as jwt.Secret,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
       
        try {
          const parking = await prisma.amenities.findFirst({
            where:{
                text_id: "Parking",
                property_id: Number(propertyId),
            }
          });
          const locker = await prisma.amenities.findFirst({
            where:{
                text_id: "Locker",
                property_id: Number(propertyId),
            }
          });
        res.status(201).json({locker, parking});
         
        } catch (error) {
          console.error("Error making reservation:", error);
          res.status(500).json({ message: "Unexpected error occurred." });
        }
      },
    );
  });
  export default router;