var express = require("express");
const router = express.Router();
import prisma from "../prisma/client";
const jwt = require("jsonwebtoken");
import { Prisma } from "@prisma/client";
import VerifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

interface userData {
  id: number;
  role: string;
  email: string;
}

router.get(
  "/",
  VerifyToken,
  async function (
    req: Request & { token: string },
    res: Response,
    next: NextFunction,
  ) {
    jwt.verify(
      req.token,
      process.env.SECRET,
      function (err: Error, decoded: userData) {
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

module.exports = router;
