import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

import { Request, Response, NextFunction } from "express";

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const bearerHeader = req.headers["authorization"] as string;
  console.log("bearer Header --- ", bearerHeader);
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
