import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

import {
  assets,
  JobCategories,
  JobLocations,
  jobsData,
} from "../assets/assets";
import JobCard from "./JobCard";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const JobListings = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };
  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location],
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job),
      );
    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

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
        <Button
          variant={"destructive"}
          onClick={(e) => setShowFilter((prev) => !prev)}
          className={"px-6 py-1.5 rounded border border-gray-400 lg:hidden"}
        >
          {showFilter ? "Close" : "Filters"}
        </Button>

        {/* Category filter */}
        <div className={showFilter ? "" : "hidden lg:block"}>
          <h4 className="font-medium text-lg py-4 ">Search by categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((e, id) => (
              <li key={id} className="flex gap-3 items-center">
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleCategoryChange(e)}
                  checked={selectedCategories.includes(e)}
                />
                {e}
              </li>
            ))}
          </ul>
        </div>
        {/* Location Filter */}
        <div className={showFilter ? "" : "hidden lg:block"}>
          <h4 className="font-medium text-lg py-4 pt-14 ">
            Search by location
          </h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((e, id) => (
              <li key={id} className="flex gap-3 items-center">
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleLocationChange(e)}
                  checked={selectedLocations.includes(e)}
                />
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
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center gap-4 justify-center space-x-2 mt-10">
            <Link to={"#job-list"}>
              {/* <img
                className={currentPage === 1 ? "color-blue-500" : ""}
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                src={assets.left_arrow_icon}
                alt=""
              /> */}
              <ChevronLeftIcon
                className={currentPage !== 1 ? "text-blue-500" : ""}
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              />
            </Link>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, id) => (
                <Link to={"#job-list"} key={id}>
                  <Button
                    onClick={() => setCurrentPage(id + 1)}
                    variant={"link"}
                    className={`w-10 h-10 items-center justify-center border border-gray-300 rounded ${currentPage === id + 1 ? "bg-blue-100 text-blue-500" : "text-gray-500"}`}
                  >
                    {id + 1}
                  </Button>
                </Link>
              ),
            )}
            <Link to={"#job-list"}>
              {/* <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1, Math.ceil(jobs.length / 6)),
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
              /> */}
              <ChevronRightIcon
                className={
                  currentPage !==
                  Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6))
                    ? "text-blue-500"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6),
                    ),
                  )
                }
              />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListings;
