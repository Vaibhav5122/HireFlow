import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { CrossIcon } from "lucide-react";
import {
  assets,
  JobCategories,
  JobLocations,
  jobsData,
} from "../assets/assets";
import JobCard from "./JobCard";

const JobListings = () => {
  const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 ">
      <div className="w-full lg:w-1/4 bg-white px-4 ">
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600 flex gap-4">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                    />
                  </span>
                )}

                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                    />
                  </span>
                )}
              </div>
            </>
          )}
        {/* Category filter */}
        <div className="hidden lg:block">
          <h4 className="font-medium text-lg py-4 ">Search by categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((e, id) => (
              <li key={id} className="flex gap-3 items-center">
                <input className="scale-125" type="checkbox" />
                {e}
              </li>
            ))}
          </ul>
        </div>
        {/* Location Filter */}
        <div className="hidden lg:block">
          <h4 className="font-medium text-lg py-4 pt-14 ">
            Search by location
          </h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((e, id) => (
              <li key={id} className="flex gap-3 items-center">
                <input className="scale-125" type="checkbox" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Job Listings */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobsData.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobListings;
