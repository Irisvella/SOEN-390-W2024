import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const client = new S3Client({
  apiVersion: "2006-03-01",
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    sessionToken: process.env.AWS_SESSION_TOKEN as string,
  },
});

export const putObject = async (buffer: Buffer) => {
  // const fileStream = fs.createReadStream(file);
  // fileStream.on("error", function (err) {
  //   console.log("file error ---- ", err);
  // });
  console.log(
    "secrets are ",
    process.env.AWS_ACCESS_KEY_ID,
    " and ",
    process.env.AWS_SECRET_ACCESS_KEY,
  );

  const key = uuidv4();
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: buffer,
  });

  try {
    const res = await client.send(command);
    console.log("res from client send put", res);
    return key;
  } catch (err) {
    console.log("err after client send put ", err);
    throw err;
  }
};
