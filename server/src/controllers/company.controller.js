import { Company } from "../models/company.model.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/generateToken.util.js";
import { Job } from "../models/job.model.js";
import { JobApplication } from "../models/jobApplication.model.js";

export async function registerCompany(req, res) {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.json({
        success: false,
        message: "Company already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "HireFlow/images",
      resource_type: "image",
    });

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    const token = await generateToken(company._id);

    return res.status(200).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function loginCompany(req, res) {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPassMatch = await bcrypt.compare(password, company.password);

    if (!isPassMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = await generateToken(company._id);
    return res.status(200).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getCompanyData(req, res) {
  try {
    const company = req.company;

    return res.status(200).json({ success: true, company });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function postJob(req, res) {
  const { title, description, location, salary, level, category } = req.body;

  const companyId = req.company._id;

  try {
    const newJob = await Job.create({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    return res.status(201).json({ success: true, newJob });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getCompanyJobApplicants(req, res) {
  try {
    const companyId = req.company._id;

    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.status(200).json({ success: true, applications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getCompanyPostedJobs(req, res) {
  try {
    const companyId = req.company._id;

    const jobs = await Job.find({ companyId });

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });

        return { ...job.toObject(), applicants: applicants.length };
      }),
    );

    return res.status(200).json({ success: true, jobsData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
export async function changeJobApplicationsStatus(req, res) {
  try {
    const { id, status } = req.body;

    await JobApplication.findOneAndUpdate({ _id: id }, { status });

    return res.status(200).json({ success: true, message: "Status Changed" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
export async function changeVisibility(req, res) {
  try {
    const { id } = req.body;

    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }
    await job.save();

    return res.status(200).json({ success: true, job });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
