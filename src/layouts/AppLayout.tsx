import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Main application layout component that includes:
 * - Navbar at the top
 * - Content area in the middle
 * - Footer at the bottom
 */
const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-black"></div>
        </div>
      }>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default AppLayout;
