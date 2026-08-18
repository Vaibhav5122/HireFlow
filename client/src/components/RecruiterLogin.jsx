import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Button } from "./ui/button";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(false);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  const closeModal = () => setShowRecruiterLogin(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
    }
    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/company/login`, {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          toast.success("Login Successful!");
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("image", image);

        const { data } = await axios.post(
          `${backendUrl}/api/company/register`,
          formData,
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          toast.success("Login Successful!");
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm"
      onMouseDown={closeModal}
    >
      <form
        onSubmit={onSubmitHandler}
        onMouseDown={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-[0_30px_80px_rgba(15,23,42,0.2)] sm:p-8"
        action=""
      >
        <h1 className="text-center text-xl  text-slate-900 sm:text-2xl">
          Recruiter {state}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Welcome back! Please sign in to continue.
        </p>

        {state === "Sign Up" && isTextDataSubmitted ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img
                  className="w-16 rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
              <p>
                Upload Company <br /> logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="mt-5 flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-slate-900">
                <img src={assets.person_icon} alt="" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="mt-5 flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-slate-900">
              <img src={assets.email_icon} alt="" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Id"
                required
              />
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-slate-900">
              <img src={assets.lock_icon} alt="" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}
        {state === "Login" && (
          <p className="mt-4 cursor-pointer text-sm text-slate-700 hover:text-slate-900">
            {/* Forgot Password */}
          </p>
        )}

        <Button
          type="submit"
          className={"mt-5  w-full rounded-full py-4 text-white"}
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmitted
              ? "create account"
              : "Next"}
        </Button>
        {state === "Login" ? (
          <p className="mt-5 flex items-center justify-center gap-0 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Button
              type="button"
              className={"px-1  text-sm text-slate-900"}
              variant={"link"}
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </Button>
          </p>
        ) : (
          <p className="mt-5 flex items-center justify-center gap-0 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Button
              type="button"
              className={"px-1  text-sm text-slate-900"}
              variant={"link"}
              onClick={() => setState("Login")}
            >
              Login
            </Button>
          </p>
        )}
        <img
          onClick={closeModal}
          src={assets.cross_icon}
          className="absolute right-5 top-5 cursor-pointer"
          alt=""
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
