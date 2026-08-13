import { assets } from "../assets/assets";
import { Button } from "./ui/button";
import { SignInButton, Show, SignUpButton, UserButton } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/react";
import { Loader } from "lucide-react";

const Navbar = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  const navigate = useNavigate();

  return (
    <div className="sticky top-2 z-50">
      <div className="container mx-auto 2xl:px-20 px-4">
        <div className="flex items-center justify-between gap-4 shadow-2xl p-4 rounded-2xl backdrop-blur-2xl border border-slate-200 bg-white/70">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="logo"
            className="h-10 cursor-pointer"
          />
          <div className="flex gap-4 items-center">
            <header className="flex items-center">
              <Show when="signed-out">
                {/* <SignUpButton></SignUpButton> */}
                <div className="flex gap-4">
                  <Button className={""} size={"lg"} variant={"secondary"}>
                    Recruiter Login
                  </Button>

                  <SignInButton mode="modal">
                    <Button size={"lg"} className={"px-4"} variant={"default"}>
                      Login
                    </Button>
                  </SignInButton>
                </div>
              </Show>
              <Show when="signed-in">
                <div className=" gap-4 flex items-center justify-center">
                  <Link to={"/applications"}>
                    <Button className={""} size={"lg"} variant={"secondary"}>
                      Applied Jobs
                    </Button>
                  </Link>
                  {isLoaded ?? (
                    <div className="h-5 w-24 bg-muted animate-pulse rounded" />
                  )}
                  {isSignedIn && user ? (
                    <span className="max-sm:hidden  text-sm font-medium text-foreground">
                      {(
                        <p>
                          {user.firstName}, {user.lastName}{" "}
                        </p>
                      ) ||
                        user.fullName ||
                        user.firstName ||
                        "User"}
                    </span>
                  ) : (
                    <Loader />
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
              </Show>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
