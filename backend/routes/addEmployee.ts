import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();
import { Prisma } from "@prisma/client";

import { Request, Response, NextFunction } from "express";

const Employee = z.object({
  email: z.string().email(),
  role: z.enum(["manager", "operations", "finance", "other"]),
});

interface userData {
  id: number;
  role: string;
}


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
              /*const employedBy = await prisma.employed_by.findFirst({
                select: {
                public_user_id: true,
                company_id: true
                },
                where: {
                public_user_id: userExists.id,
                company_id: id
                }
                });
              if (employedBy){
                return res.status(409).json({ message: "User is already employed under you" });
              }
              TODO: FIX so that when user is already employed it shouldnt create a new entry*/
  
              async function employExistingUser(userID:number) {
                await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                  const employeeUser = await prisma.employed_by.create({
                    data: {
                      employee_user_id: userID,
                      company_id: id,
                      end_date: new Date(), 
                    },
                  });
                });
              }
              employExistingUser(userExists.id);
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
   catch(err){
    return res.status(500).json({ message: "Unexpected error" });
    } } 
);

router.get("/employeeList", verifyToken, async (req: Request, res: Response) => {
  try {
    const token = req.token;
    if (!token || !process.env.SECRET) {
      return res.status(401).json({ message: "Unauthorized: Missing token or secret" });
    }

    const decoded = jwt.verify(token, process.env.SECRET) as jwt.JwtPayload;
    const companyId = decoded.data.id;

    const employees = await prisma.employed_by.findMany({
      where: { company_id: companyId },
      include: { employee_users: true }
    });

    const transformedEmployees = employees.map(emp => ({
      id: emp.employee_user_id,
      first_name: emp.employee_users.first_name,
      last_name: emp.employee_users.last_name,
      role: emp.employee_users.role
    }));

    res.json(transformedEmployees);
  } catch (error) {
    res.status(500).json({ message: "Server error"});
  } 
});


export default router;

                  

  