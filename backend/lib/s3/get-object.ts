import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { response } from "express";
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

export const getObject = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    const res = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' method
    const str = await res.Body?.transformToString();
  } catch (err) {
    console.log("err after client send get ", err);
    throw err;
  }
};
