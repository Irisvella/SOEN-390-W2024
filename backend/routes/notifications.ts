import express from "express";
const router = express.Router();
import * as z from "zod";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";

/** Send a condo owner their notifications */
router.get(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            console.log("err from /notifications GET ---- ", err);
            return res.status(401).json("Unauthorized");
          }

          const { id, role, email } = (<any>decoded).data;
          if (role !== "publicUser") {
            console.log(
              `user with email ${email} and role ${role} tried to access /notifications GET`,
            );
            return res.status(401).json("Unauthorized");
          }

          const requests = await prisma.requests.findMany({
            where: {
              condo_owner_id: id,
            },
            include: {
              notifications: {
                select: {
                  id: true,
                  status: true,
                  inserted_at: true,
                  seen: true,
                },
              },
            },
          });

          let notifications: any[] = [];
          for (let i = 0; i < requests.length; i += 1) {
            const title = requests[i].title;
            const current = requests[i].notifications;
            for (let j = 0; j < current.length; j += 1) {
              notifications.push({ title, ...current[j] });
            }
          }

          return res.status(200).json({
            message: "success",
            data: {
              notifications: notifications,
            },
          });
        },
      );
    } catch (err) {
      console.log("err from /notifications GET ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);

/** Return the full details for a specific notification, and also mark that
 * notification as seen.
 */
router.get(
  "/:notificationId",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            console.log(
              "err from /notifications/:notificationId GET ---- ",
              err,
            );
            return res.status(401).json("Unauthorized");
          }

          const { id, role, email } = (<any>decoded).data;
          const notificationId = parseInt(req.params.notificationId);
          if (isNaN(notificationId)) {
          console.log("Invalid notification ID:", req.params.notificationId);
          return res.status(400).json({ message: "Invalid notification ID" });
          }


          if (role !== "publicUser") {
            console.log(
              `user with email ${email} and role ${role} tried to access /billing POST`,
            );
            return res.status(401).json("Unauthorized");
          }

          
          const updateSeen = await prisma.notifications.update({
            where: {
              id: notificationId,
            },
            data: {
              seen: true,
            },
          });

          const notification = await prisma.requests.findFirst({
            include: {
              notifications: {
                where: {
                  id: notificationId,
                },
                select: {
                  inserted_at: true,
                },
              },
            },
          });

          return res.status(200).json({
            message: "success",
            data: {
              notification,
            },
          });
        },
      );
    } catch (err) {
      console.log("err from /notifications/:notificationId GET ---- ", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  },
);


// Add an endpoint to count unread notifications
router.get("/unread", verifyToken, async (req: Request, res: Response) => {
  try {
    const decoded = jwt.verify(req.token as string, process.env.SECRET as jwt.Secret);
    const { id, role } = (<any>decoded).data;

    if (role !== "publicUser") {
      return res.status(401).json({ message: "Unauthorized: Access is limited to public users." });
    }

    const count = await prisma.notifications.count({
      where: {
        requests: {
          condo_owner_id: id
        },
        seen: false
      }
    });

    return res.status(200).json({ unreadCount: count });
  } catch (error) {
    console.error('Error fetching unread notification count:', error);
    return res.status(500).json({ message: "Failed to fetch unread notification count due to server error." });
  }
});

export default router;
