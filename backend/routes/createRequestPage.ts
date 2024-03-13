import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";