// src/components/Loading.js
import React, { useEffect, useState } from "react";
import "./Loading.css"; // We will define the animation styles in this CSS file
import logo from "../assets/logo.png"; // Adjust the path as per your logo location

const Loading = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true); // After 3 seconds, we hide the loading screen
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-container ${loaded ? "fade-out" : ""}`}>
      <img src="/assets/logo.png" alt="Logo" className="loading-logo" />
    </div>
  );
};

export default Loading;
