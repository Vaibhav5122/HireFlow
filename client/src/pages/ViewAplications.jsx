import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingBig } from "../components/Loading";

const ViewAplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        { headers: { token: companyToken } },
      );
      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No applications available</p>
      </div>
    ) : (
      <div className="container mx-auto p-4">
        <div>
          <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm ">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">User name</th>
                <th className="py-2 px-4 text-left max-sm:hidden">Job title</th>
                <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
                <th className="py-2 px-4 text-left">Resume</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, id) => (
                  <tr key={id} className="text-gray-700">
                    <td className="py-2 px-4 border-b text-center">{id + 1}</td>
                    <td className="py-2 px-4 border-b text-center items-center flex">
                      <img
                        className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                        src={applicant.userId.image}
                        alt=""
                      />
                      <span>{applicant.userId.name}</span>
                    </td>
                    <td className="py-2 px-4 border-b max-sm:hidden">
                      {applicant.jobId.title}
                    </td>
                    <td className="py-2 px-4 border-b max-sm:hidden">
                      {applicant.jobId.location}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        to={applicant.userId.resume}
                        target="_blank"
                        className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                      >
                        Resume <img src={assets.resume_download_icon} />
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b relative">
                      {applicant.status === "Pending" ? (
                        <div className="relative inline-block text-left group">
                          <Button variant={"link"} className={"action-button"}>
                            ...
                          </Button>
                          <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block">
                            <Button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Accepted",
                                )
                              }
                              variant={"secondary"}
                              className={
                                "flex items-center justify-center w-full text-left py-3"
                              }
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Rejected",
                                )
                              }
                              variant={"destructive"}
                              className={
                                "w-full text-left py-3 flex items-center justify-center"
                              }
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>{applicant.status}</div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <LoadingBig />
  );
};

export default ViewAplications;
