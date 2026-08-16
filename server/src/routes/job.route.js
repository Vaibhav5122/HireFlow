import { Router } from "express";
import { getJobById, getJobs } from "../controllers/job.controller.js";

export const jobRouter = Router();

jobRouter.get("/", getJobs);

jobRouter.get("/:id", getJobById);
