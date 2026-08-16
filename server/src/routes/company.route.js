import { Router } from "express";
import {
  changeJobApplicationsStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/company.controller.js";
import upload from "../configs/multer.config.js";

const router = new Router();

router.post("/register", upload.single("image"), registerCompany);
router.post("/login", loginCompany);
router.get("/comapny", getCompanyData);
router.post("/post-job", postJob);
router.get("/applicants", getCompanyJobApplicants);
router.get("/applicants", getCompanyPostedJobs);
router.post("/change-status", changeJobApplicationsStatus);
router.post("/change-visibility", changeVisibility);

export default router;
