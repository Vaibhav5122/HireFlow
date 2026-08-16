import { Router } from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/user.controller.js";
import upload from "../configs/multer.config.js";

export const userRouter = Router();

userRouter.get("/user", getUserData);

userRouter.post("/apply", applyForJob);

userRouter.get("/applications", getUserJobApplications);

userRouter.post("/update-resume", upload.single("resume"), updateUserResume);
