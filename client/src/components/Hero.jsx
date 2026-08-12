import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";

const BrandLogo = [
  { id: 1, src: assets.microsoft_logo },
  { id: 2, src: assets.walmart_logo },
  { id: 3, src: assets.accenture_logo },
  { id: 4, src: assets.samsung_logo },
  { id: 5, src: assets.amazon_logo },
  { id: 6, src: assets.adobe_logo },
];

const Hero = () => {
  const { setIsSearched, setSearchFilter } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10 flex flex-col gap-10">
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 px-6 sm:px-10 py-10 rounded-2xl w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-7 w-full">
          <div className="flex-col flex gap-4 items-center justify-center ">
            <h1 className="text-2xl">Over 10,000 jobs to apply</h1>
            <p className="font-light  max-w-xl text-md mx-auto text-wrap  text-center">
              Your next Big carrer move Starts Righ Here - Explore The Best Job
              Opportunities And Take The First Step Toward Your Future!{" "}
            </p>
          </div>
          <div className="flex bg-slate-100 gap-2 rounded-md">
            <div className="flex items-center px-4  border-r-2 border-b-muted border-gray-500">
              <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
              <input
                ref={titleRef}
                type="text"
                placeholder="Search for jobs"
                className="max-sm:text-xs p-2 rounded outline-none w-full "
              />
            </div>
            <div className="flex items-center ">
              <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
              <input
                ref={locationRef}
                type="text"
                placeholder="Location"
                className="max-sm:text-xs p-2 rounded outline-none w-full"
              />
            </div>
            <Button
              onClick={onSearch}
              size={"lg"}
              className={"h-10 w-30 text-md"}
            >
              {<SearchIcon />}Search
            </Button>
          </div>
        </div>
      </div>
      <div className="border border-gray-400 shadow-md rounded p-4">
        <div className="flex  flex-wrap items-center justify-center gap-6">
          <p className="sm:w-full lg:w-auto text-center">Trusted by</p>
          {BrandLogo.map((e) => (
            <div className="flex" key={e.id}>
              <img className="h-7 sm:h-8 mx-3" src={e.src} alt="brand" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
