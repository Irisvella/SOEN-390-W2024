// Filename: employeeList.tx
// Author: Sarah Abellard, Samuel Collette
// Description: Endpoints for adding new employees to the system & fetching the information.
// Dependencies: React, MUI (Material-UI), jsonwebtoken, dotev, mutler, express

import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
const upload = multer();

import { Request, Response, NextFunction } from "express";

router.get(
    "/",
    verifyToken,
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            jwt.verify(
                req.token as string,
                process.env.SECRET as jwt.Secret,
                async (err, decoded) => {
                    if (err instanceof jwt.TokenExpiredError) {
                    console.log("jwt expired in GET /profile ", err);
                    return res.status(401).json({ message: "Expired token" });
                    } else if (err) {
                    console.log("error from jwt.verify in GET /profile ", err);
                    return res.status(401).json({ message: "Unauthorized" });
                    } else {
                    console.log("decoded ---- ", decoded);
                    const { id, role, email } = (<any>decoded).data;
                    if (role === "company") {
                        const employees = await prisma.employed_by.findMany({
                            where: {
                                company_id: id,
                              },
                            }); 
                        //create array to query all employees later
                        const employee_ids = [];
                        for(let i=0; i< employees.length; i++){
                            employee_ids.push(employees[i].employee_user_id);
                        }
                        //query all employees from there ids, in employees table
                        const employee_data = await prisma.employee_users.findMany({
                            where: {
                                user_id: {in:  employee_ids }
                            }
                        })
                        return res.status(200).json({
                            employee_data
                        });
                    }
                    }
                }
                    );
        } catch (err) {
                console.log("error from /employee_list ---- ", err);
                return res.status(500).json({ message: "Unexpected error" });
              }
    }

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
        role: emp.employee_users.role,
        phone: emp.employee_users.phone_number
      }));
  
      res.json(transformedEmployees);
    } catch (error) {
      res.status(500).json({ message: "Server error"});
    } 
  });

export default router;