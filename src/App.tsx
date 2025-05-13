import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ErrorHandler } from "./utils/errorHandler";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Initiatives from "./pages/Initiatives";
import Blog from "./pages/Blog";
import ParentTutoringRequestForm from "./pages/ParentTutoringRequest";
import SchoolServiceRequestForm from "./pages/SchoolServiceRequest";
import PurposeActionPoint from "./pages/PurposeActionPoint";
import ApplyTutor from "./pages/apply-tutor";
import Authentication from "./pages/Authentication";
import RoleLogin from "./pages/RoleLogin";
import RoleSignup from "./pages/RoleSignup";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

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

function App() {
  return (
    <React.StrictMode>
    <GlobalErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <Suspense fallback={
              <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-black"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/apply-tutor" element={<ApplyTutor />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ParentTutoringRequestForm" element={<ParentTutoringRequestForm />} />
                <Route path="/SchoolServiceRequestForm" element={<SchoolServiceRequestForm />} />
                <Route path="/PurposeActionPoint" element={<PurposeActionPoint />} />
                <Route path="/initiatives" element={<Initiatives />} />
                
                {/* Authentication Routes */}
                <Route path="/auth" element={<Authentication />} />
                <Route path="/login/:role" element={<RoleLogin />} />
                <Route path="/signup/:role" element={<RoleSignup />} />
                
                {/* Dashboard Routes */}
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/parent/dashboard" element={<ParentDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </GlobalErrorBoundary>
    </React.StrictMode>
  );
}

export default App;