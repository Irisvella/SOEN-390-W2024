import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();


import { Request, Response } from "express";


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
          const reservations = await prisma.reserved_by.findMany({
            where:{
                public_user_id: id
          },
        });
        res.status(201).json(reservations);
         
        } catch (error) {
          console.error("Error making reservation:", error);
          res.status(500).json({ message: "Unexpected error occurred." });
        }
      },
    );
  });
  export default router;