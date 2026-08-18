import { assets } from "../assets/assets";
import { Button } from "./ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const recruiterMenuRef = useRef(null);
  const [showRecruiterMenu, setShowRecruiterMenu] = useState(false);

  const {
    setShowRecruiterLogin,
    userData,
    companyData,
    companyToken,
    setCompanyData,
    setCompanyToken,
  } = useContext(AppContext);

  const clientName =
    userData?.name ||
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "User";

  const clientAvatar = userData?.image || user?.imageUrl || assets.profile_img;
  const recruiterName = companyData?.name || "Recruiter";
  const recruiterAvatar = companyData?.image || assets.company_icon;

  const logoutRecruiter = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    setShowRecruiterMenu(false);
    navigate("/");
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        recruiterMenuRef.current &&
        !recruiterMenuRef.current.contains(event.target)
      ) {
        setShowRecruiterMenu(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="sticky top-2 z-50">
      <div className="container mx-auto px-4 2xl:px-20">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="logo"
            className="h-9 cursor-pointer"
          />

          <div className="flex items-center gap-3">
            {companyToken ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link to="/dashboard/manage-jobs">
                  <Button
                    size="sm"
                    className="h-9 rounded-full px-4 text-sm"
                    variant="default"
                  >
                    Dashboard
                  </Button>
                </Link>
                <div className="relative" ref={recruiterMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowRecruiterMenu((prev) => !prev)}
                    className="flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 shadow-sm transition hover:bg-slate-100"
                  >
                    <img
                      src={recruiterAvatar}
                      alt={recruiterName}
                      className="h-6 w-6 rounded-full border border-slate-200 object-cover"
                    />
                    <span className="hidden max-w-30 truncate font-medium sm:inline">
                      {recruiterName}
                    </span>
                    <span className="text-slate-400">▾</span>
                  </button>
                  {showRecruiterMenu ? (
                    <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                      <div className="px-3 py-2">
                        <p className="text-[11px] uppercase font-semibold text-slate-500">
                          Recruiter
                        </p>
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {recruiterName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={logoutRecruiter}
                        className="flex w-full items-center rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                      >
                        Logout
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : isSignedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/applications">
                  <Button
                    className="h-9 rounded-full px-4 text-sm"
                    size="sm"
                    variant="secondary"
                  >
                    Applied Jobs
                  </Button>
                </Link>
                {isLoaded ? (
                  <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
                    <img
                      src={clientAvatar}
                      alt={clientName}
                      className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                    />
                    <div className="leading-tight">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                        Client
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {clientName}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Loader className="h-5 w-5 animate-spin text-slate-500" />
                )}
                <UserButton
                  appearance={{
                    elements: {
                      userButtonTrigger:
                        "h-12 w-12 focus:shadow-none focus:outline-none",
                      avatarBox: "h-12 w-12 rounded-md border border-input",
                    },
                  }}
                />
              </div>
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowRecruiterLogin(true)}
                  className="h-9 rounded-full px-4 text-sm"
                  size="sm"
                  variant="secondary"
                >
                  Recruiter Login
                </Button>

                <SignInButton mode="modal">
                  <Button
                    size="sm"
                    className="h-9 rounded-full px-4 text-sm"
                    variant="default"
                  >
                    Login
                  </Button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
