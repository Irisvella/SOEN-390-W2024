"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    console.log("bearer Header --- ", bearerHeader);
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
exports.default = verifyToken;
