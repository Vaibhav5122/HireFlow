import React from "react";
import { assets } from "../assets/assets";
import { Button } from "./ui/button";
import { SignInButton, Show, SignUpButton, UserButton } from "@clerk/react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/react";
import { Loader } from "lucide-react";

const Navbar = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <div className="flex shadow p-4 rounded-2xl sticky mx-10 backdrop-blur-2xl my-4 bg-slate-200 ">
      <div className="flex justify-between w-full mx-auto container items-center">
        <img src={assets.logo} alt="logo" />
        <div className="flex gap-4">
          <header className="flex items-center ">
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
                  <span className="text-sm font-medium text-foreground">
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
  );
};

export default Navbar;
