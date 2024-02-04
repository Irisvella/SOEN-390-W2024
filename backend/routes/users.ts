var express = require("express");
const router = express.Router();

import { Request, Response, NextFunction } from "express";

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  return res.json({ message: "Currently on /users route" });
});

module.exports = router;
