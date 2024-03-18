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

              async function createProperty(addr: string) {
                const property = await prisma.property.create({
                  data: {
                    //address on the table to the left
                    //address on the body is to the right
                    address: addr,
                    size: 0,
                    condo_fee: 0,
                    unit_id: Math.floor(Math.random() * 100000),
                  },
                });
                return property.id;
              }

              async function linkProperty(
                owner_id: number,
                property_id: number,
              ) {
                const owner = await prisma.owned_by.create({
                  data: {
                    owner_id: owner_id,
                    property_id: property_id,
                  },
                });
              }

              const newPropertyId = await createProperty(body.address);

              // const newProperty = await prisma.property.findFirst({
              //   select: {
              //     id: true,
              //   },
              //   where: {
              //     address: body.address,
              //   },
              // });
              // id is id of token, newProperty!.id is id of newly created property
              await linkProperty(id, newPropertyId);

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
              const property = await prisma.property.findFirst({
                where: {
                  id: id,
                },
              });
              console.log("a");
              return res.status(200).json({
                id: id,
                role: "company",
                address: property?.address,
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
