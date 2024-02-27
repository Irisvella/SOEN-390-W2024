import express from "express";
const router = express.Router();
import * as z from "zod";
import bcrypt from "bcryptjs";
import prisma from "../prisma/client";
import {Prisma} from "@prisma/client";

import { Request, Response, NextFunction } from "express";

const Employee = z.object({
  username: z.string().min(1),
  companyName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["manager", "daily_operations", "finance", "other"]),
});



router.post(
    "/",
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const result = Employee.safeParse(body);
            if (!result.success) {
                console.log("error ---", result.error);
                console.log("formatted ---- ", result.error.format());
                return res.status(400).json(result.error.issues);
            }

            const userExists = await prisma.users.findFirst({
                where: {
                  email: body.email,
                },
              });
              if (userExists) {
                return res.status(409).json({ message: "Email already exists" });
              }

              async function createEmployeeUser(hashed_password: string) {
                await prisma.$transaction(async () => {
                  const user = await prisma.users.create({
                    data: {
                      email: body.email,
                      hashed_password,
                    },
                  });

            const employeeUser = await prisma.employed_by.create({
                data: {

                    public_user_id: user.id,
                    company_id: user.id,
                    yearly_salary:60000.00,
                    role: body.role,
                },
            });
        });
    }
    

            bcrypt.hash(
                body.password,
                10,
                function (err: Error | null, hash: string) {
                  createEmployeeUser(hash);
                },
              );

            return res.status(201).json({ message: "Employee added successfully"});
        } catch (err) {
            if (err instanceof z.ZodError){
                console.log(err.issues);
                return res.status(400).json({ message: "One or more fields invalid" });
            }
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                return res.status(409).json({ message: "User exists already" });
              }
            return res.status(500).json({ message: "Failed to add employee" });
        }
    }

);

export default router;
