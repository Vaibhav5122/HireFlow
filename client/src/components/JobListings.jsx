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
    <div className="container mx-auto flex flex-col py-8 max-lg:space-y-8 2xl:px-20 lg:flex-row">
      <div className="w-full bg-white px-4 lg:w-1/4">
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="mb-4 text-lg font-medium text-slate-900">
                Current Search
              </h3>
              <div className="mb-4 flex gap-4 text-slate-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-sm text-slate-700">
                    {searchFilter.title}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt="Clear title filter"
                    />
                  </span>
                )}

                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-sm text-slate-700">
                    {searchFilter.location}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt="Clear location filter"
                    />
                  </span>
                )}
              </div>
            </>
          )}
        <Button
          variant={"secondary"}
          onClick={(e) => setShowFilter((prev) => !prev)}
          className={
            "rounded-full border border-slate-200 px-6 py-1.5 text-slate-700 lg:hidden"
          }
        >
          {showFilter ? "Close" : "Filters"}
        </Button>

        {/* Category filter */}
        <div className={showFilter ? "" : "hidden lg:block"}>
          <h4 className="py-4 text-lg font-medium text-slate-900">
            Search by categories
          </h4>
          <ul className="space-y-4 text-slate-600">
            {JobCategories.map((e, id) => (
              <li key={id} className="flex gap-3 items-center">
                <input
                  className="scale-110 accent-slate-900"
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
          <h4 className="pt-14 text-lg font-medium text-slate-900 py-4">
            Search by location
          </h4>
          <ul className="space-y-4 text-slate-600">
            {JobLocations.map((e, id) => (
              <li key={id} className="flex gap-3 items-center">
                <input
                  className="scale-110 accent-slate-900"
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
      <section className="w-full text-slate-800 max-lg:px-4 lg:w-3/4">
        <h3 className="py-2 text-3xl font-medium" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8 text-slate-600">
          Get your desired job from top companies
        </p>
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
                className={
                  currentPage !== 1 ? "text-slate-900" : "text-slate-300"
                }
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              />
            </Link>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, id) => (
                <Link to={"#job-list"} key={id}>
                  <Button
                    onClick={() => setCurrentPage(id + 1)}
                    variant={"link"}
                    className={`w-10 h-10 items-center justify-center rounded-full border ${currentPage === id + 1 ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-500"}`}
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
                    ? "text-slate-900"
                    : "text-slate-300"
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
