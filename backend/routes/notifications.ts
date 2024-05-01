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

/** Returns the number of unseen notifications for a public user. */
router.get(
  "/count",
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

          const count: any = await prisma.$queryRaw`SELECT COUNT(DISTINCT n.id) 
                                        FROM notifications n, requests r
                                        WHERE r.condo_owner_id = ${parseInt(id)} 
                                          AND r.id = n.request_id 
                                          AND seen = FALSE`;
          if (count.length === 0) {
            console.log("err count length 0");
            return res.status(500);
          }

          return res.status(200).json({
            message: "success",
            data: {
              count: parseInt(count[0]["count"]),
            },
          });
        },
      );
    } catch (err) {
      console.log("err from /notifications/count GET ---- ", err);
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

          // const notification = await prisma.requests.findFirst({
          //   include: {
          //     notifications: {
          //       where: {
          //         id: parseInt(notificationId),
          //       },
          //       select: {
          //         inserted_at: true,
          //       },
          //     },
          //   },
          // });
          const notification: any = await prisma.$queryRaw`SELECT * 
            FROM requests r, notifications n 
            WHERE r.id = n.request_id AND n.id = ${notificationId} 
            LIMIT 1`;
          if (notification.length === 0) {
            console.log("Unexpected error notification length is 0");
            return res.status(500);
          }
          const firstNotificaiton = notification[0];

          return res.status(200).json({
            message: "success",
            data: {
              notification: firstNotificaiton,
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


// mark all notifications as seen for a specific user
router.post(
  '/mark-all-seen',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            console.log("Error during token verification in /mark-all-seen POST", err);
            return res.status(401).json("Unauthorized");
          }

          const { id } = (<any>decoded).data;

          
          const updateResults = await prisma.notifications.updateMany({
            where: {
              requests: {
                condo_owner_id: id,  
              },
              seen: false 
            },
            data: {
              seen: true
            }
          });

          return res.status(200).json({
            message: "All notifications marked as seen",
            updatedCount: updateResults.count
          });
        },
      );
    } catch (err) {
      console.log("Server error in /mark-all-seen POST", err);
      return res.status(500).json({ message: "Unexpected error" });
    }
  }
);



export default router;
