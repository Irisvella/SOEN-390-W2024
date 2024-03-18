import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import { priority } from "@prisma/client";

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

            if (role === "publicUser") {
              const body = req.body; //constant

              async function createRequest(employee_id:number) {
                const property = await prisma.requests.create({
                  data: {
                    title: title, //change to what the front end sends us in body
                    employee_id: employee_id,
                    condo_owner_id: company_id,// change with the company ID
                    issued_at: new Date(),
                    description: body.description, //change to what the front end sends us in body
                    request_priority: body.priority //change to what the front end sends us in body
                    
                  },
                });
              }

              createRequest(id); //company id missing

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
