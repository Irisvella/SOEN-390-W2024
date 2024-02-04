var express = require("express");
var router = express.Router();
import prisma from "../prisma/client";

import { Request, Response, NextFunction } from "express";

/* GET home page. */
router.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    const users = await prisma.users.findMany();
    console.log("users are ---- ", users);

    return res.json({ message: "server works" });
  },
);

module.exports = router;
