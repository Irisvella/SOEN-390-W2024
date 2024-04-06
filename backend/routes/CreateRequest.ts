import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

const UserRequest = z.object({
  propertyId: z.coerce.number(),
  requestType: z.string(),
  requestReason: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  date: z.coerce.date().optional(), // optional field
});

/** route to handle the submission of a new request. only those with 'publicUser'
 * role should be able to access this route. should also test for subRole
 * possibly ('none', 'owner', 'renter').
 */
router.post(
  "/",
  verifyToken,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      jwt.verify(
        // verify jwt token, and if successful, decrypt it to get payload (id, role, email)
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            // either a malformed jwt or an expired jwt
            return res.status(401).json("Unauthorized");
          } else {
            console.log("decoded ---- ", decoded);
            const { id, role, email } = (<any>decoded).data;

            if (role !== "publicUser") {
              console.log(
                `user with role ${role} and email ${email} tried to access /requests POST`,
              );
              return res.status(401).json("Unauthorized");
            }

            const parse = UserRequest.safeParse(req.body);
            // console.log("body ---- ", req.body);
            if (!parse.success) {
              // the incoming request's body does not conform to UserRequest schema
              console.log(parse.error.issues);
              return res.status(400);
            }

            const parsedBody = parse.data; // like req.body but with types
            // console.log("parsed body --- ", { parsedBody });

            const newRequest = await prisma.requests.create({
              data: {
                property_id: parsedBody.propertyId,
                title: parsedBody.requestType,
                description: parsedBody.requestReason,
                condo_owner_id: id,
                date_needed: parsedBody.date,
                request_priority: parsedBody.priority,
              },
            });

            return res.status(201).json({ message: "success" });
          }
        },
      );
    } catch (err) {
      console.log("err from /request POST ---- ", err);
      return res.status(500).json({
        message: "unexpected error",
      });
    }
  },
);

export default router;
