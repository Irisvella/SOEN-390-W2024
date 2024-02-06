"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const z = __importStar(require("zod"));
const client_1 = __importDefault(require("../prisma/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_2 = require("@prisma/client");
const User = z.object({
    role: z.enum(["publicUser", "company"]),
    email: z.string().email(),
    password: z.string().min(6),
});
router.post("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const result = User.safeParse(body);
            if (!result.success) {
                return res.status(400).json(result.error.issues);
            }
            const userExists = yield client_1.default.users.findFirst({
                where: {
                    email: body.email,
                },
            });
            if (!userExists) {
                console.log("a");
                return res.status(401).json({ message: "Unauthorized" });
            }
            const checkPassword = bcryptjs_1.default.compareSync(body.password, userExists.hashed_password);
            if (!checkPassword) {
                return res.status(401).json({ message: "Incorrect password" });
            }
            const token = jsonwebtoken_1.default.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: { id: userExists.id, role: body.role, email: body.email },
            }, process.env.SECRET);
            let subUserExists;
            if (body.role === "publicUser") {
                subUserExists = yield client_1.default.public_users.findFirst({
                    where: {
                        id: userExists.id,
                    },
                });
                if (!subUserExists) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                else {
                    return res.status(200).json({
                        token,
                        data: {
                            username: subUserExists.username,
                            imageKey: subUserExists.profile_image_key,
                        },
                    });
                }
            }
            else {
                subUserExists = yield client_1.default.management_companies.findFirst({
                    where: {
                        id: userExists.id,
                    },
                });
                if (!subUserExists) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                else {
                    return res.status(200).json({
                        token,
                        data: {
                            data: {
                                companyName: subUserExists.company_name,
                            },
                        },
                    });
                }
            }
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                console.log(err.issues);
                return res.status(401).json({ message: "Unauthorized" });
            }
            if (err instanceof client_2.Prisma.PrismaClientUnknownRequestError) {
                console.log(err);
                return res.status(401).json({ message: "User does not exist" });
            }
            console.log("error from /login ---- ", err);
            return res.status(500).json({ message: "Unexpected error" });
        }
    });
});
exports.default = router;
