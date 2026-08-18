import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListings from "../components/JobListings";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";

const Home = () => {
  // Silent "wake up" request to Render backend
  const prodBackendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!prodBackendURL) {
      console.warn("VITE_BACKEND_URL variable is missing!");
      return;
    }

    fetch(prodBackendURL)
      .then(() => console.log("Backend waking up..."))
      .catch((err) => console.error("Wake up failed", err));
  }, [prodBackendURL]);

  return (
    <div>
      <Navbar />
      <Hero />
      <JobListings />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
