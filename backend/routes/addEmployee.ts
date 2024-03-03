import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

const Employee = z.object({
  username: z.string().min(1),
  companyName: z.string().min(1),
  email: z.string().email(),
  yearlySalary: z.number().positive(),
  password: z.string().min(6),
  role: z.enum(["manager", "daily_operations", "finance", "other"]),
});

interface userData {
  id: number;
  role: string;
}


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
            const { id, role } = (<any>decoded).data;
            if (role === "company") {
              const body = req.body;
              const result = Employee.safeParse(body);
              if (!result.success) {
                  return res.status(400).json(result.error.issues);
              }
  
              const userExists = await prisma.users.findFirst({
                  where: {
                    email: body.email,
                  },
                });
                if (!userExists) {
                  return res.status(404).json({ message: "User not found" });
                }
  
                async function employExistingUser(email: string) {
                  await prisma.$transaction(async () => {
                    const user = await prisma.users.create({
                      data: {
                        email: email,
                      },
                    });
  
              const employeeUser = await prisma.employed_by.create({
                  data: {
  
                      public_user_id: user.id,
                      company_id: 
                      yearly_salary: 
                      role:role,
                  },
              });
          });
      }
              console.log("a");
              return res.status(200).json({ // employe info needs to be added
              
              });
            } 
            console.log("b");
            return res.status(500).json({ message: "Unexpected error" });
          }
        },
      );
        } 
    } 
);

export default router;

                  

  