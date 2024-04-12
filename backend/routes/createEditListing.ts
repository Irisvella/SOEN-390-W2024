import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

// Route to handle the submission of a new listing
router.post(
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
              const body = req.body; //constant

              async function createProperty(addr: string, company_id: number) {
                const property = await prisma.property.create({
                  data: {
                    //address on the table to the left
                    //address on the body is to the right
                    address: addr,
                    flat_fee: 0.0,
                    company_id: company_id,
                    parking_fee: body.parkingFee, // Added field
                    price_per_square_foot: body.pricePerSquareFoot, // Added field
                    locker_fee: body.lockerFee, // Added field
                  },
                });
                
                for (let i = body.totalUnit; i>0; i-- ){
                  const unit = await prisma.condo_unit.create({
                    data: {
                      property_id: property.id,
                      unit_number: i.toString(),
                      square_feet: 250.00,
                      

                    }
                  });
              }
              }


              createProperty(body.address, id);

              console.log("a");
              return res.status(200).json({});
            }
            return res.status(500).json({
              message: "unexpected error",
            });
          }
        },
      );
    } catch (err) {
      return res.status(500).json({
        message: "unexpected error",
      });
    }
  },
);

// Assuming your base URL is something like "/properties" and this handler is for "/properties/:propertyId"
router.get("/:propertyId", verifyToken, async (req: Request, res: Response) => {
  console.log("is it working");
  try {
    jwt.verify(req.token as string,
       process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
      if (err) {
        console.log("err from /properties/:propertyId GET ---- ", err);
        return res.status(401).json("Unauthorized");
      }

      const { role } = (<any>decoded).data;
      if (role !== "company") {
        return res.status(403).json({ message: "Forbidden" });
      }

      const { propertyId } = req.params;
      console.log(req.params, "checking property id is working");
      const property = await prisma.property.findFirst({
        where: {
          id: parseInt(propertyId),
        },
      });

      if (property) {
        return res.status(200).json(property);
      } else {
        return res.status(404).json({ message: "Property not found" });
      }
    });
  } catch (err) {
    console.log("error from /properties/:propertyId GET ---- ", err);
    return res.status(500).json({ message: "Unexpected error" });
  }
});


router.put("/:propertyId", verifyToken, async (req, res) => {
  const { propertyId } = req.params;
  const { address } = req.body; // Extracting address directly from req.body

  try {
    const updatedProperty = await prisma.property.update({
      where: { id: parseInt(propertyId) },
      data: { address }, // Only updating address field
    });
    res.json(updatedProperty);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating property");
  }
});

// Route to get units by propertyId
router.get("/:propertyId/units", verifyToken, async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const units = await prisma.condo_unit.findMany({
      where: { property_id: parseInt(propertyId) },
      
    });
    res.json(units);
    console.log(units);
  } catch (error) {
    console.error('Failed to get units:', error);
    res.status(500).send('Error fetching units');
  }
});












export default router;
