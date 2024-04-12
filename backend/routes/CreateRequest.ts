// Filename: CreateRequest.ts
// Author: Samuel Collette, Barthan
// Description: Backend query to createRequests and to view all available requests
// Dependencies: jwt, prisma, express

import express from "express";
const router = express.Router();
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
              console.log("body is ---- ", body);

              async function createRequest(
                property_id: number,
                // employee_id:number , //has to be null
                company_id: number,
                requestType: string,
                //date: Date,
                requestReason: string,
                priority: priority,
              ) {
                const property = await prisma.requests.create({
                  data: {
                    property_id: property_id,
                    title: requestType, //title = reason of request change to what the front end sends us in body
                    //issued_at: new Date(),
                    //date_needed: "2002/05/24",
                    condo_owner_id: company_id,
                    // employee_id: 2,
                    description: requestReason, //change to what the front end sends us in body
                    request_priority: priority, //change to what the front end sends us in body
                  },
                });
              }
              let request_priority: priority = priority.low;
              if (body.request_priority === "low") {
                request_priority = priority.low;
              } else if (body.request_priority === "high") {
                request_priority = priority.high;
              } else if (body.request_priority === "medium") {
                request_priority = priority.medium;
              }

              await createRequest(
                parseInt(body.propertyId),
                id,
                body.requestType,
                body.requestReason,
                request_priority,
              ); //async funtion

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


// Assuming `decoded.data.id` and `decoded.data.role` are correctly set up in your JWT token data structure
router.get("/my-requests", verifyToken, async (req: Request, res: Response) => {
  try {
      const token = req.token;
      if (!token || !process.env.SECRET) {
          return res.status(401).json({ message: "Unauthorized: Missing token or secret." });
      }

      // Decoding the token
      const decoded = jwt.verify(token, process.env.SECRET) as jwt.JwtPayload;
      const publicUserId = decoded.data.id;

      // Fetching requests directly linked to the public user
      const userRequests = await prisma.requests.findMany({
          where: { condo_owner_id: publicUserId },
      });

      if (userRequests.length === 0) {
          return res.status(404).json({ message: "No requests found." });
      }

      // Fetch properties separately and create a map by their IDs
      const propertyIds = userRequests.map(req => req.property_id);
      const properties = await prisma.property.findMany({
          where: {
              id: { in: propertyIds }
          }
      });

      // Create a map to easily access property addresses by their ID
      const propertyMap: Record<number, string> = properties.reduce<Record<number, string>>((acc, property) => {
        acc[property.id] = property.address;
        return acc;
    }, {});

      // Transforming data to include property details
      const transformedRequests = userRequests.map(request => ({
          id: request.id,
          title: request.title,
          description: request.description,
          requestPriority: request.request_priority,
          issuedAt: request.issued_at.toISOString(),
          dateNeeded: request.date_needed ? request.date_needed.toISOString() : null,
          propertyAddress: propertyMap[request.property_id] || "Address not available"
      }));

      res.status(200).json(transformedRequests);
  } catch (error) {
      console.error("Error fetching requests data:", error);
      // More specific error handling can be implemented if needed
      res.status(500).json({ message: "Internal server error" });
  }
});



export default router;
