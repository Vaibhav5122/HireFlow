import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex mt-3 mb-6 gap-2">
          {isEdit ? (
            <>
              <label htmlFor="resumeUpload" className="flex items-center">
                <Button
                  variant={"secondary"}
                  className="text-sm bg-blue-100 text-blue-600 px-6 py-5 rounded-lg mr-2"
                >
                  Select Resume
                </Button>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  type="file"
                  hidden
                  accept="application/pdf"
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <Button
                onClick={(e) => setIsEdit(false)}
                className={"text-sm border rounded-lg px-6 py-5 "}
              >
                Save
              </Button>
            </>
          ) : (
            <div className="flx gap-2">
              <Link>
                <Button className={"px-5 py-4 rounded-lg border-gray-300"}>
                  Resume
                </Button>
              </Link>
              <Button
                onClick={() => setIsEdit(true)}
                variant={"secondary"}
                size={"lg"}
                className={"rounded-lg px-6 py-4 text-gray-500 border-gray-300"}
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
            {jobsApplied.map((job, index) =>
              true ? (
                <tr>
                  <td className="py-3 px-4 flex items-center gap-2 border-b">
                    <img className="w-8 h-8" src={job.logo} alt="" />
                    {job.company}
                  </td>
                  <td className="py-2 px-4 bg-bottom">{job.title}</td>
                  <td className="py-2 px-4 bg-bottom max-sm:hidden">
                    {" "}
                    {job.location}{" "}
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
