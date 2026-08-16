import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./configs/db.config.js";
import { clerkWebhook } from "./controllers/webhook.controller.js";

const app = express();
const PORT = process.env.PORT ?? 8001;

//MongoDB connection
connectDB();

app.use(cors());

app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebhook);

app.use(express.json());

//Routes

app.get("/", (req, res) => {
  return res.status(200).json({ server: "Healthy" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
