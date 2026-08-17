import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/react";
import { toast } from "react-toastify";
import axios from "axios";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { user } = useUser();
  const { getToken } = useAuth();

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsEdit(false);
    setResume("");
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications;
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex mt-3 mb-6 gap-2">
          {isEdit || (userData && userData.resume === "") ? (
            <>
              <label htmlFor="resumeUpload" className="flex items-center">
                <p
                  variant={"secondary"}
                  className=" cursor-pointer text-sm bg-blue-100 text-blue-600 px-6 py-3 rounded-lg mr-2"
                >
                  {resume ? resume.name : "Select Resme"}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  type="file"
                  hidden
                  accept="application/pdf"
                />
              </label>
              <img src={assets.profile_upload_icon} alt="" />
              <Button
                onClick={updateResume}
                className={"text-sm border rounded-lg px-6 py-5 "}
              >
                Save
              </Button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link target="_blank" to={userData.resume}>
                <Button
                  className={
                    "text-md font-bold px-6 py-5 rounded-lg border-gray-300"
                  }
                >
                  Resume
                </Button>
              </Link>
              <Button
                onClick={() => setIsEdit(true)}
                variant={"secondary"}
                size={"lg"}
                className={
                  " text-md font-bold rounded-lg px-6 py-5 text-gray-500 border-gray-300"
                }
              >
                Edit
              </Button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Comapany</th>
              <th className="py-3 px-4 border-b text-left">Job Title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications &&
              userApplications.map((job, index) =>
                true ? (
                  <tr key={index}>
                    <td className="py-3 px-4 flex items-center gap-2 border-b">
                      <img
                        className="w-8 h-8"
                        src={job.companyId.image}
                        alt=""
                      />
                      {job.companyId.name}
                    </td>
                    <td className="py-2 px-4 bg-bottom">{job.jobId.title}</td>
                    <td className="py-2 px-4 bg-bottom max-sm:hidden">
                      {" "}
                      {job.jobId.location}{" "}
                    </td>
                    <td className="py-2 px-4 bg-bottom max-sm:hidden">
                      {" "}
                      {moment(job.date).format("ll")}{" "}
                    </td>
                    <td className="py-2 px-4 bg-bottom">
                      <span
                        className={`${job.status === "Accepted" ? "bg-green-100" : job.status === "Rejected" ? "bg-red-100" : "bg-blue-100"} px-4 py-1.5 rounded `}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ) : null,
              )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
