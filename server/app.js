import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import calculateRoutes from "./routes/calculateRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedFromEnv = process.env.CLIENT_URL;
      const isLocalhost = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
      if (!allowedFromEnv || origin === allowedFromEnv || isLocalhost) {
        return callback(null, true);
      }
      return callback(new Error("CORS blocked for this origin"));
    }
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api", calculateRoutes);
app.use("/api", shopRoutes);
app.use("/api", orderRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
