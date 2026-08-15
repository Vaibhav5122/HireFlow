import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const ViewAplications = () => {
  return (
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
            {viewApplicationsPageData.map((applicant, id) => (
              <tr key={id} className="text-gray-700">
                <td className="py-2 px-4 border-b text-center">{id + 1}</td>
                <td className="py-2 px-4 border-b text-center flex">
                  <img
                    className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                    src={applicant.imgSrc}
                    alt=""
                  />
                  <span>{applicant.name}</span>
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicant.jobTitle}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicant.location}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={""}
                    target="_blank"
                    className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume <img src={assets.resume_download_icon} />
                  </Link>
                </td>
                <td className="py-2 px-4 border-b relative">
                  <div className="relative inline-block text-left group">
                    <Button variant={"link"} className={"action-button"}>
                      ...
                    </Button>
                    <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block">
                      <Button
                        variant={"secondary"}
                        className={
                          "flex items-center justify-center w-full text-left py-3"
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        variant={"destructive"}
                        className={
                          "w-full text-left py-3 flex items-center justify-center"
                        }
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAplications;
