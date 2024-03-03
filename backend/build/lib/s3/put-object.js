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
exports.putObject = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new client_s3_1.S3Client({
    apiVersion: "2006-03-01",
    region: "us-east-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN,
    },
});
const putObject = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    // const fileStream = fs.createReadStream(file);
    // fileStream.on("error", function (err) {
    //   console.log("file error ---- ", err);
    // });
    console.log("secrets are ", process.env.AWS_ACCESS_KEY_ID, " and ", process.env.AWS_SECRET_ACCESS_KEY);
    const key = (0, uuid_1.v4)();
    const command = new client_s3_1.PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
    });
    try {
        const res = yield client.send(command);
        console.log("res from client send put", res);
        return key;
    }
    catch (err) {
        console.log("err after client send put ", err);
        throw err;
    }
});
exports.putObject = putObject;
