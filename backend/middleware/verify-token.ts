const jwt = require("jsonwebtoken");
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

function verifyToken(
  req: Request & { token: string },
  res: Response,
  next: NextFunction,
) {
  const bearerHeader = req.headers["authorization"] as string;
  console.log("bearer Header --- ", bearerHeader);
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
  }
  next();
}

export default verifyToken;
