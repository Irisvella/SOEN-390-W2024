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
                            employee_ids.push(employees[i]);
                        }
                        //query all employees from there ids, in employees table
                        const employee_data = await prisma.employees.findMany({
                            where: {
                                employee_id: { in: employee_ids }
                            }
                        })
                        return res.status(200).json({
                            id: employee_data.employee_id,
                            first_name: employee_data.first_name,
                            last_name: employee_data.last_name,
                            role: employee_data.role
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

export default router;