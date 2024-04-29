import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

/** Send a condo owner their notifications */
router.get(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            console.log("err from /notifications GET ---- ", err);
            return res.status(401).json("Unauthorized");
          }

          const { id, role, email } = (<any>decoded).data;
          if (role !== "publicUser") {
            console.log(
              `user with email ${email} and role ${role} tried to access /notifications GET`,
            );
            return res.status(401).json("Unauthorized");
          }

          const requests = await prisma.requests.findMany({
            where: {
              condo_owner_id: id,
            },
            include: {
              notifications: {
                select: {
                  id: true,
                  status: true,
                  inserted_at: true,
                  seen: true,
                },
              },
            },
          });

          const notifications = requests.flatMap(
            (request) => request.notifications,
          );

          return res.status(200).json({
            message: "success",
            data: {
              notifications: notifications,
            },
          });
        },
      );
    } catch (err) {
      console.log("err from /notifications GET ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

export default router;
