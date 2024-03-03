import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import signUpRouter from "./routes/signup";
import loginRouter from "./routes/login";
import profileRouter from "./routes/profile";
import dashboard from "./routes/dashboard";

declare global {
  namespace Express {
    export interface Request {
      token?: string;
    }
  }
}

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/dashboard", dashboard);

const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
