import { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import { Button } from "../components/ui/button";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        `${backendUrl}/api/company/post-job`,
        {
          title,
          description,
          location,
          salary,
          category,
          level,
        },
        { headers: { token: companyToken } },
      );
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    //Initiate quill
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form className="container p-4 flex flex-col w-full items-start gap-3">
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Type here"
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
        />
      </div>
      <div className="w-full max-w-lg">
        <p className="my-2">Job Description</p>
        <div ref={editorRef}></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8 md:items-center md:justify-center">
        <div>
          <p className="mb-2">Job Category</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            name=""
            onChange={(e) => setCategory(e.target.value)}
            id=""
          >
            {JobCategories.map((category, id) => (
              <option key={id} value={category}>
                {" "}
                {category}{" "}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Set Location </p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            name=""
            onChange={(e) => setLocation(e.target.value)}
            id=""
          >
            {JobLocations.map((location, id) => (
              <option key={id} value={location}>
                {" "}
                {location}{" "}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Level </p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            name=""
            onChange={(e) => setLevel(e.target.value)}
            id=""
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Job Salary</p>
          <input
            className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-30"
            onChange={(e) => setSalary(e.target.value)}
            type="number"
            placeholder="2500"
            min={0}
          />
        </div>
        <Button onClick={onSubmitHandler} className={"w-28 py-4 mt-4"}>
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddJob;
