import { useContext, useRef } from "react";
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
    <div className="container mx-auto my-10 flex flex-col gap-10 px-4 2xl:px-20">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-10 shadow-[0_30px_90px_rgba(15,23,42,0.18)] sm:px-10 sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.18),transparent_35%)]" />
        <div className="relative flex w-full flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center text-white">
            <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-slate-200">
              HireFlow talent network
            </span>
            <h1 className="text-3xl font-semibold sm:text-5xl">
              Over 10,000 jobs to apply
            </h1>
            <p className="max-w-2xl text-sm font-light text-slate-300 sm:text-base">
              Your next career move starts here. Explore modern teams, clearer
              hiring processes, and roles that actually fit your goals.
            </p>
          </div>

          <div className="w-full max-w-4xl">
            <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg md:grid-cols-[1.35fr_1fr_auto] md:gap-px md:bg-slate-200">
              <div className="flex items-center gap-3 bg-white px-4 py-4 text-slate-800">
                <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
                <input
                  ref={titleRef}
                  type="text"
                  placeholder="Search for jobs"
                  className="w-full bg-transparent p-0 text-sm outline-none placeholder:text-slate-500"
                />
              </div>
              <div className="flex items-center gap-3 bg-white px-4 py-4 text-slate-800">
                <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
                <input
                  ref={locationRef}
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent p-0 text-sm outline-none placeholder:text-slate-500"
                />
              </div>
              <Button
                onClick={onSearch}
                size="lg"
                className="h-full min-h-14 rounded-none rounded-b-2xl px-7 text-base md:rounded-b-none md:rounded-r-2xl"
              >
                <SearchIcon className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <p className="sm:w-full lg:w-auto text-center text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            Trusted by
          </p>
          {BrandLogo.map((e) => (
            <div className="flex" key={e.id}>
              <img className="mx-3 h-7 sm:h-8" src={e.src} alt="brand" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
