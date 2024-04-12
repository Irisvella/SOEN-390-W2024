// Filename: CreateRequest.ts
// Author: Samuel Collette, Barthan
// Description: Backend query to createRequests and to view all available requests
// Dependencies: jwt, prisma, express

import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import  {priority}  from "@prisma/client";

interface requests {
  id: number;
  title: string;
  description: string;
  request_priority: string;
  issued_at: Date;
  condo_owner_id: number;
  employee_id: number;
  date_needed: Date;
  property_id: number;
  
}

/** route to handle the submission of a new request. only those with 'publicUser'
 * role should be able to access this route. should also test for subRole
 * possibly ('none', 'owner', 'renter').
 */
router.post(
  "/",
  verifyToken,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      jwt.verify(
        // verify jwt token, and if successful, decrypt it to get payload (id, role, email)
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            // either a malformed jwt or an expired jwt
            return res.status(401).json("Unauthorized");
          } else {
            console.log("decoded ---- ", decoded);
            const { id, role, email } = (<any>decoded).data;

            if (role !== "publicUser") {
              console.log(
                `user with role ${role} and email ${email} tried to access /requests POST`,
              );
              return res.status(401).json("Unauthorized");
            }

            const parse = UserRequest.safeParse(req.body);
            // console.log("body ---- ", req.body);
            if (!parse.success) {
              // the incoming request's body does not conform to UserRequest schema
              console.log(parse.error.issues);
              return res.status(400);
            }

            const parsedBody = parse.data; // like req.body but with types
            // console.log("parsed body --- ", { parsedBody });

            const newRequest = await prisma.requests.create({
              data: {
                property_id: parsedBody.propertyId,
                title: parsedBody.requestType,
                description: parsedBody.requestReason,
                condo_owner_id: id,
                date_needed: parsedBody.date,
                request_priority: parsedBody.priority,
              },
            });

            return res.status(201).json({ message: "success" });
          }
        },
      );
    } catch (err) {
      console.log("err from /request POST ---- ", err);
      return res.status(500).json({
        message: "unexpected error",
      });
    }
  },
);


router.get("/viewRequests", verifyToken, async (req: Request, res: Response) => {
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

          if (role === "company"){
            const requestList = await prisma.$queryRaw<
            requests[]
            >`select * 
            from requests
            where property_id in (
              select id
              from property
              where company_id = ${id}
            )
            `;
            res.json(requestList);
            console.log(requestList);
          } else if (role === "publicUser"){
            const requestList = await prisma.$queryRaw<
            requests[]
            >`select * 
            from requests
            where condo_owner_id = ${id}
            `;
            res.json(requestList);
            console.log(requestList);
          }
          
  }});
  } catch (error) {
    console.error('Failed to get requests:', error);
    res.status(500).send('Error fetching requests');
  }
});


export default router;
