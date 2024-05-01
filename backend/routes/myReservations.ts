import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();


import { Request, Response } from "express";
interface amenities {
    amenities_id: number;
    start_date: string;
    image_uend_daterl: string;
    text_id: string;
  }

router.get("/", verifyToken, async (req: Request, res: Response) => {
  
    jwt.verify(
      req.token as string,
      process.env.SECRET as jwt.Secret,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
       
        try {
          const { id, role, email } = (<any>decoded).data;
          const reservations = await prisma.$queryRaw<amenities[]>
          `select r.amenities_id, r.start_date, r.end_date, a.text_id
          from reserved_by as r, amenities as a
          where r.amenities_id = a.id and r. public_user_id = ${id}`;
        res.status(201).json(reservations);
         
        } catch (error) {
          console.error("Error making reservation:", error);
          res.status(500).json({ message: "Unexpected error occurred." });
        }
      },
    );
  });
  export default router;