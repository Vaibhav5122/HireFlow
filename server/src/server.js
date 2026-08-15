import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./configs/db.config";
import { clerkWebhook } from "./controllers/webhook.controller";

const app = express();
const PORT = process.env.PORT ?? 8001;

//MongoDB connection
connectDB();

app.use(cors());
app.use(express.json());

//Routes

app.get("/", () => (req, res) => {
  return res.status(200).json({ server: "Healthy" });
});

app.post("/webhooks", clerkWebhook);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
