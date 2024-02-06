import express from "express";
const router = express.Router();

import { Request, Response, NextFunction } from "express";

/* GET home page. */
router.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    return res.json({ message: "server works" });
  },
);

export default router;
