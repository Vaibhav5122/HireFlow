import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./configs/db.config.js";
import { clerkWebhook } from "./controllers/webhook.controller.js";
import companyRouter from "./routes/company.route.js";
import { connectCloudinary } from "./configs/cloudinary.config.js";
import { jobRouter } from "./routes/job.route.js";
import { userRouter } from "./routes/user.route.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const PORT = process.env.PORT ?? 8001;

//MongoDB connection
await connectDB();
await connectCloudinary();

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_ORIGIN];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS policy"));
      }
    },
    credentials: true, // For Clerk auth tokens and cookies
  }),
);

app.use(clerkMiddleware());

app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebhook);

app.use(express.json());

//Routes

app.get("/", (req, res) => {
  return res.status(200).json({ server: "Healthy" });
});

//Company Router
app.use("/api/company", companyRouter);

// Job Router
app.use("/api/jobs", jobRouter);

//User Router
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
