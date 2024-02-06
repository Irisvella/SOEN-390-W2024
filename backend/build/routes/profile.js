"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify_token_1 = __importDefault(require("../middleware/verify-token"));
require("dotenv").config();
router.get("/", verify_token_1.default, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        jsonwebtoken_1.default.verify(req.token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json("Unauthorized");
            }
            else {
                console.log("decoded ---- ", decoded);
                return res.status(200).json("Success");
            }
        });
    });
});
exports.default = router;
