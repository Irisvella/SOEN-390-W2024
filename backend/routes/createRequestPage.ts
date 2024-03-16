import express from "express";
const router = express.Router();
import prisma from "../prisma/client"; // Assuming this exports your Prisma client instance
import verifyToken from "../middleware/verify-token";
import jwt from "jsonwebtoken";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

// Route to handle the submission of a new request
router.post(
  "/createRequest",
  verifyToken,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const decoded = jwt.verify(req.token as string, process.env.SECRET as jwt.Secret);
      if (!decoded) {
        return res.status(401).json("Unauthorized");
      } 
      const { id, role, email } = (<any>decoded).data; // Assuming your token has this structure

      // Only allow certain roles to create requests
      if (role === "publicUser" || role === "company") { // Adjust based on your roles
        const { requestType, date, time, requestReason, priority, createdBy } = req.body;
        
        const newRequest = await prisma.request.create({
          data: {
            requestType,
            date: new Date(date),
            time,
            requestReason,
            priority,
            createdBy,
          },
        });
        
        return res.status(200).json(newRequest);
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    } catch (err) {
      console.error("Error creating request:", err);
      return res.status(500).json({
        message: "Unexpected error occurred",
      });
    }
  },
);

export default router;
