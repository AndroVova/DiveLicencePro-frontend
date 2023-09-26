import "./home.css"; // Import the CSS file

import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

const Home = () => {
  const [showText, setShowText] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000); // Delay of 2 seconds (2000 milliseconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="Center">
        <h1 className={`fade-in`}>DiveLicencePro</h1>
        <div className="text-box">
          <p className={`${showText ? "fade-in show-text" : ""}`}>
            {t("home_message")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
