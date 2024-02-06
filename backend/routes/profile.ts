import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

interface userData {
  id: number;
  role: string;
  email: string;
}

router.get(
  "/",
  verifyToken,
  async function (req: Request, res: Response, next: NextFunction) {
    jwt.verify(
      req.token as string,
      process.env.SECRET as jwt.Secret,
      (err, decoded) => {
        if (err) {
          return res.status(400).json("Unauthorized");
        } else {
          console.log("decoded ---- ", decoded);
          return res.status(200).json("Success");
        }
      },
    );
  },
);

export default router;
