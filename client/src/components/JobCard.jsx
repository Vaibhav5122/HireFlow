import { assets } from "../assets/assets";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-[0_18px_50px_rgba(15,23,42,0.1)]">
      <div className="flex items-center justify-between">
        <img
          className="h-12 w-12 object-contain"
          src={job.companyId.image}
          alt=""
        />
      </div>
      <h4 className="mt-2 text-xl font-medium text-slate-900">{job.title}</h4>
      <div className="flex items-center gap-3 mt-2 text-xs">
        <span className="rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-slate-700">
          {job.location}
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-slate-700">
          {job.level}
        </span>
      </div>
      <p
        className="text-gray-500 text-sm mt-4"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>
      <div className="mt-4 flex gap-4 text-sm">
        <Button
          onClick={() => {
            navigate(`/apply-jobs/${job._id}`);
            scrollTo(0, 0);
          }}
          variant={"default"}
          className={"px-6 py-4"}
        >
          Apply Now
        </Button>
        <Button
          onClick={() => {
            navigate(`/apply-jobs/${job._id}`);
            scrollTo(0, 0);
          }}
          variant={"secondary"}
          className={"px-6 py-4"}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
