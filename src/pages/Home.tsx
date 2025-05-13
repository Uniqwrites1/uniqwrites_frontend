import React from "react";
import HeroBanner from "../components/HeroBanner";
import HighlightServices from "../components/HighlightServices";
import QuickServiceLinks from "../components/QuickServiceLinks";
import WhyUniqwrites from "../components/WhyUniqwrites";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroBanner />
        <HighlightServices />
        <QuickServiceLinks />
        <WhyUniqwrites />
      </main>
    </div>
  );
};

export default Home;
