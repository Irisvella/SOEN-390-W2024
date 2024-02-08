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
const client_1 = __importDefault(require("../prisma/client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify_token_1 = __importDefault(require("../middleware/verify-token"));
require("dotenv").config();
router.get("/", verify_token_1.default, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            jsonwebtoken_1.default.verify(req.token, process.env.SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(401).json("Unauthorized");
                }
                else {
                    console.log("decoded ---- ", decoded);
                    const { id, role, email } = decoded.data;
                    if (role === "company") {
                        const company = yield client_1.default.management_companies.findFirst({
                            where: {
                                id: id,
                            },
                        });
                        console.log("a");
                        return res.status(200).json({
                            companyName: company === null || company === void 0 ? void 0 : company.company_name,
                            address: company === null || company === void 0 ? void 0 : company.address,
                            unitCount: company === null || company === void 0 ? void 0 : company.unit_count,
                            parking_count: company === null || company === void 0 ? void 0 : company.parking_count,
                            locker_count: company === null || company === void 0 ? void 0 : company.locker_count,
                            phone: company === null || company === void 0 ? void 0 : company.phone_number,
                        });
                    }
                    else if (role === "publicUser") {
                        const publicUser = yield client_1.default.public_users.findFirst({
                            where: {
                                id: id,
                            },
                        });
                        console.log("b");
                        return res.status(200).json({
                            username: publicUser === null || publicUser === void 0 ? void 0 : publicUser.username,
                            phone: publicUser === null || publicUser === void 0 ? void 0 : publicUser.phone_number,
                            avatar: publicUser === null || publicUser === void 0 ? void 0 : publicUser.profile_image_key,
                        });
                    }
                    console.log("c");
                    return res.status(500).json({ message: "Unexpected error" });
                }
            }));
        }
        catch (err) {
            console.log("error from /profile ---- ", err);
            return res.status(500).json({ message: "Unexpected error" });
        }
    });
});
exports.default = router;
