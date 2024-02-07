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
const client_2 = require("@prisma/client");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const User = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
});
const Company = z.object({
    companyName: z.string().min(1),
    email: z.string().email(),
    address: z.string().min(4),
    password: z.string().min(6),
    phone: z.string(),
});
/* Allow a public user to register */
router.post("/public-user", upload.none(), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const result = User.safeParse(body);
            if (!result.success) {
                console.log("error ---- ", result.error);
                console.log("formatted ---- ", result.error.format());
                return res.status(400).json(result.error.issues);
            }
            const userExists = yield client_1.default.users.findFirst({
                where: {
                    email: body.email,
                },
            });
            if (userExists) {
                return res.status(409).json({ message: "User already exists" });
            }
            function createPublicUser(hashed_password) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield client_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                        const user = yield client_1.default.users.create({
                            data: {
                                email: body.email,
                                hashed_password,
                            },
                        });
                        const publicUser = yield client_1.default.public_users.create({
                            data: {
                                id: user.id,
                                username: body.username,
                                phone_number: body.phone,
                            },
                        });
                    }));
                });
            }
            bcryptjs_1.default.hash(body.password, 10, function (err, hash) {
                createPublicUser(hash);
            });
            return res.status(201).json({ message: "User created successfully" });
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                console.log(err.issues);
                return res.status(400).json({ message: "One or more fields invalid" });
            }
            if (err instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                return res.status(409).json({ message: "User already exists" });
            }
            return res.status(500).json({ message: "Unexpected error" });
        }
    });
});
/* Allow a management company to register */
router.post("/management-company", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const result = Company.safeParse(body);
            if (!result.success) {
                console.log("error ---- ", result.error);
                console.log("formatted ---- ", result.error.format());
                return res.status(400).json(result.error.issues); // change this later
            }
            const userExists = yield client_1.default.users.findFirst({
                where: {
                    email: body.email,
                },
            });
            if (userExists) {
                return res.status(409).json({ message: "Email already exists" });
            }
            function createCompanyUser(hashed_password) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield client_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                        const user = yield client_1.default.users.create({
                            data: {
                                email: body.email,
                                hashed_password,
                            },
                        });
                        const company = yield client_1.default.management_companies.create({
                            data: {
                                id: user.id,
                                company_name: body.companyName,
                                address: body.address,
                                phone_number: body.phone,
                            },
                        });
                    }));
                });
            }
            bcryptjs_1.default.hash(body.password, 10, function (err, hash) {
                createCompanyUser(hash);
            });
            return res.status(201).json({ message: "User created successfully" });
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                console.log(err.issues);
                return res.status(400).json({ message: "One or more fields invalid" });
            }
            if (err instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                return res.status(409).json({ message: "User exists already" });
            }
            return res.status(500).json({ message: "Unexpected error" });
        }
    });
});
exports.default = router;
