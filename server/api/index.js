import dotenv from "dotenv";
import serverless from "serverless-http";
import app from "../app.js";
import { connectDB } from "../config/db.js";

dotenv.config();

let dbReady;

async function bootstrap() {
  if (!dbReady) {
    dbReady = connectDB();
  }
  await dbReady;
}

export default async function handler(req, res) {
  if (req.url?.startsWith("/api/health")) {
    return serverless(app)(req, res);
  }
  await bootstrap();
  return serverless(app)(req, res);
}
