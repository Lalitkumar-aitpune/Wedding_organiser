import dotenv from "dotenv";
import serverless from "serverless-http";
import app from "../app.js";
import { connectDB, isDBConnected } from "../config/db.js";

dotenv.config();

let dbReady;
const appHandler = serverless(app);

async function bootstrap() {
  if (!dbReady) {
    dbReady = connectDB();
  }
  await dbReady;
}

export default async function handler(req, res) {
  const url = req.url || "";
  if (url.startsWith("/api/health") || url === "/health") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  try {
    await Promise.race([
      bootstrap(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Database bootstrap timeout")), 7000)
      )
    ]);

    if (!isDBConnected()) {
      throw new Error("Database not connected");
    }

    await Promise.race([
      appHandler(req, res),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request handling timeout")), 12000)
      )
    ]);
  } catch (error) {
    console.error("API bootstrap failed:", error.message);
    if (res.headersSent) return;
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Service unavailable. Please check database connectivity.",
        detail: error.message
      })
    );
  }
}
