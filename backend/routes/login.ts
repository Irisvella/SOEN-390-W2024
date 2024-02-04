var express = require("express");
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
const bcrypt = require("bcryptjs");
import { Prisma } from "@prisma/client";

import { Request, Response, NextFunction } from "express";

router.post(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    const body = req.body;
  },
);

module.exports = router;
