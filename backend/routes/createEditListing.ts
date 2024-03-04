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

              async function createProperty(address: string) {
                const property = await prisma.property.create({
                  data: {
                    //address on the table to the left
                    //address on the body is to the right
                    address: address,
                    size: 0,
                    condo_fee: 0,
                    unit_id: 0,
                  },
                });
                await new Promise(f => setTimeout(f, 1000));  // wait so that the database has time to update the added property
              }
             
               await new Promise(f => setTimeout(f, 1000));
              async function linkProperty(owner_id: number, property_id:number) {
                const owner = await prisma.owned_by.create({
                  data: {
                    
                   owner_id:owner_id,
                   property_id:property_id,
                   
                  },
                });
              }
              
              createProperty(body.address);
              
              const newProperty = await prisma.property.findFirst({
                select: {
                id: true,
                },
                where: {
                address: body.address,
                },
                });
                // id is id of token, newProperty!.id is id of newly created property
              linkProperty(id, newProperty!.id);
              
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




export default router;
