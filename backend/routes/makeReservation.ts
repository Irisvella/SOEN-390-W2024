import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();


import { Request, Response } from "express";

// Route to make a reservation if available
router.post("/:propertyId/newReservation", verifyToken, async (req: Request, res: Response) => {
  const { propertyId } = req.params;
  jwt.verify(
    req.token as string,
    process.env.SECRET as jwt.Secret,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const body  = req.body;
      const startDate:Date = new Date(body.start_date) 
      try {
        const { id, role, email } = (<any>decoded).data;
        const overlappingReservation = await prisma.reserved_by.findFirst({
          where: {
            amenities_id: parseInt(body.amenities_id),
            start_date: startDate,
              
          },
        });

        if (overlappingReservation) {
          res.status(409).json({ message: "Time slot is already reserved." });
        } else {
          // No overlapping reservation, proceed to create new reservation
          const newReservation = await prisma.reserved_by.create({
            data: {
              public_user_id: id,
              amenities_id: parseInt(body.amenities_id),
              start_date: new Date(body.start_date),
              end_date: new Date(body.end_date),
            },
          });
          res.status(201).json(newReservation);
        }
      } catch (error) {
        console.error("Error making reservation:", error);
        res.status(500).json({ message: "Unexpected error occurred." });
      }
    },
  );
});

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
        const amenities = await prisma.amenities.findMany({
          where:{
              OR: [
                { text_id: "skylounge",},
                { text_id: "Spa" },
                { text_id: "gym" },
              ],
              property_id: Number(propertyId)
        },
      });
      res.status(201).json(amenities);
       
      } catch (error) {
        console.error("Error making reservation:", error);
        res.status(500).json({ message: "Unexpected error occurred." });
      }
    },
  );
});


export default router;
