import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { LoadingBig } from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { Button } from "../components/ui/button";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/react";

const ApplyJob = () => {
  const { id } = useParams();

  const { getToken } = useAuth();

  const navigate = useNavigate();

  const [JobData, setJobData] = useState(null);

  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error("Login to apply for jobs");
      }
      if (!userData.resume) {
        navigate("/applications");
        return toast.error("Upload resume to apply");
      }

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        {
          jobId: JobData._id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const backendMessage =
        error.response.data.message || "Something went wrong";
      toast.error(backendMessage);
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(
      (item) => item.jobId._id === JobData._id,
    );
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJobs();
  }, [id]);

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied();
    }
  }, [id, JobData, userApplications]);

  return JobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded w-full">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={JobData.companyId.image}
                alt=""
              />
              <div className="text-center md:text-left  text-neutral-700">
                <h1 className="font-medium text-2xl sm:text-4xl">
                  {JobData.title}
                </h1>
                <div className="gap-y-2 flex flex-row flex-wrap max-md:justify-center gap-6 items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {JobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <Button
                onClick={applyHandler}
                disabled={isAlreadyApplied}
                className={" p-2.5 py-4 px-10 text-white rounded"}
              >
                {isAlreadyApplied ? "Already Applied" : "Apply Now"}
              </Button>
              <p className="mt-1 text-gray-600">
                Posted {moment(JobData.date).fromNow()}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job Description</h2>
              <div
                className="rich-text mb-10 flex flex-col gap-4"
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              ></div>
              <Button
                onClick={applyHandler}
                disabled={isAlreadyApplied}
                className={" p-2.5 py-4 px-10 text-white rounded"}
              >
                {isAlreadyApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5 ">
              <h2>More jobs from {JobData.companyId.name} </h2>
              {jobs
                .filter(
                  (job) =>
                    job._id !== JobData._id &&
                    job.companyId._id === JobData.companyId._id,
                )
                .filter((job) => {
                  const appliedJobIds = new Set(
                    userApplications.map((app) => app.jobId && app.jobId._id),
                  );
                  return !appliedJobIds.has(job._id);
                })
                .slice(0, 4)
                .map((job, id) => (
                  <JobCard key={id} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <LoadingBig />
  );
};

export default ApplyJob;
