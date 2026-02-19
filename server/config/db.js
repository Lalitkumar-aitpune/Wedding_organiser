import mongoose from "mongoose";

let isConnected = false;
let connectionPromise;

mongoose.set("bufferCommands", false);

export async function connectDB() {
  if (isConnected) return;
  if (connectionPromise) return connectionPromise;

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  connectionPromise = mongoose
    .connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      maxPoolSize: 5
    })
    .then(() => {
      isConnected = true;
    })
    .catch((error) => {
      connectionPromise = undefined;
      throw error;
    });

  return connectionPromise;
}

export function isDBConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}
