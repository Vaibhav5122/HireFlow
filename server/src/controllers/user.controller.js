import { getAuth } from "@clerk/express";
import { Job } from "../models/job.model.js";
import { JobApplication } from "../models/jobApplication.model.js";
import User from "../models/user.models.js";
import { v2 as cloudinary } from "cloudinary";

export async function getUserData(req, res) {
  const { userId } = getAuth(req); //req.auth; //req.auth.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function applyForJob(req, res) {
  const { jobId } = req.body;

  const { userId } = getAuth(req);

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Already Applied" });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.status(400).json({ success: false, message: "job not found" });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res
      .status(200)
      .json({ success: true, message: "Applied Succesfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getUserJobApplications(req, res) {
  try {
    const { userId } = getAuth(req);

    const application = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!application) {
      return res
        .status(401)
        .json({ success: false, message: "No job application found" });
    }

    return res.status(200).json({ success: true, application });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateUserResume(req, res) {
  try {
    const { userId } = getAuth(req);

    const resumeFile = req.file;

    const userData = await User.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
        folder: "HireFlow/resumes",
        resource_type: "raw",
      });
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.status(200).json({ success: true, message: "Resume Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
