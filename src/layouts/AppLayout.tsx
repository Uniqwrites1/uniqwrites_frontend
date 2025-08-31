import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorHandler } from "../utils/errorHandler";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Create Error Boundary for Global Error Handling
const GlobalErrorFallback: React.FC<{error: Error | null}> = ({ error }) => {
  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something Went Wrong</h1>
        <p className="text-gray-700 mb-4">{error?.message || "Unknown error"}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-black text-yellow-400 px-4 py-2 rounded hover:bg-gray-800"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

// Create the error boundary component using the utility
const GlobalErrorBoundary = ErrorHandler.createErrorBoundary(GlobalErrorFallback);

/**
 * Main application layout component that includes:
 * - Navbar at the top
 * - Content area in the middle
 * - Footer at the bottom
 * - Toast notifications
 * - Error boundary
 */
const AppLayout: React.FC = () => {
  return (
    <GlobalErrorBoundary>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </GlobalErrorBoundary>
  );
};

export default AppLayout;
