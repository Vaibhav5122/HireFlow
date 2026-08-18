import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#133b3a_58%,#0f766e_100%)] p-12 shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:p-24 lg:p-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.22),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.14),transparent_30%)]" />
        <div>
          <h1 className="relative z-10 mb-8 max-w-md text-2xl font-bold text-white sm:text-4xl">
            Download Mobile App For Better Experience{" "}
          </h1>
          <div className="relative z-10 flex gap-4">
            <Link to={"#"} className="inline-block">
              <img className="h-12" src={assets.play_store} alt="" />
            </Link>
            <Link to={"#"} className="inline-block">
              <img className="h-12" src={assets.app_store} alt="" />
            </Link>
          </div>
        </div>
        <img
          className="absolute bottom-0 right-0 z-10 mr-32 w-80 max-lg:hidden"
          src={assets.app_main_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default AppDownload;
