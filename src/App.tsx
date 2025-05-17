import React, { Suspense } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./context/AuthContext";
import { ErrorHandler } from "./utils/errorHandler";

// Import environment variables
import { GOOGLE_CLIENT_ID } from './config/env';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RedirectIfAuthenticated from "./components/auth/RedirectIfAuthenticated";
import AuthRedirect from "./components/auth/AuthRedirect";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Initiatives from "./pages/initiatives/Initiatives";
import LiteracySponsor from "./pages/initiatives/literacy/LiteracySponsor";
import LiteracyVolunteer from "./pages/initiatives/literacy/LiteracyVolunteer";
import BackToSchoolSponsor from "./pages/initiatives/backtoschool/BackToSchoolSponsor";
import BackToSchoolVolunteer from "./pages/initiatives/backtoschool/BackToSchoolVolunteer";
import Blog from "./pages/Blog";
import ParentTutoringRequestForm from "./pages/ParentTutoringRequest";
import SchoolServiceRequestForm from "./pages/SchoolServiceRequest";
import PurposeActionPoint from "./pages/PurposeActionPoint";
import ApplyTutor from "./pages/apply-tutor";
import Authentication from "./pages/Authentication";
import RoleLogin from "./pages/RoleLogin";
import RoleSignup from "./pages/RoleSignup";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import JobBoard from "./pages/teacher/job-board";
import ParentDashboard from "./pages/parent/ParentDashboard";
import SchoolDashboard from "./pages/school/SchoolDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LoginRedirect from "./pages/LoginRedirect";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import AuthStatusTester from "./pages/AuthStatusTester";

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
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
                
                {/* Initiative Form Routes */}
                <Route path="/initiatives/literacy/sponsor" element={<LiteracySponsor />} />
                <Route path="/initiatives/literacy/volunteer" element={<LiteracyVolunteer />} />
                <Route path="/initiatives/backtoschool/sponsor" element={<BackToSchoolSponsor />} />
                <Route path="/initiatives/backtoschool/volunteer" element={<BackToSchoolVolunteer />} />
                
                {/* Authentication Routes */}
                <Route path="/auth" element={
                  <RedirectIfAuthenticated>
                    <Authentication />
                  </RedirectIfAuthenticated>
                } />
                <Route path="/login" element={
                  <RedirectIfAuthenticated>
                    <LoginRedirect />
                  </RedirectIfAuthenticated>
                } />
                <Route path="/login/redirect" element={<AuthRedirect />} />
                <Route path="/login/:role" element={
                  <RedirectIfAuthenticated>
                    <RoleLogin />
                  </RedirectIfAuthenticated>
                } />
                <Route path="/signup/:role" element={
                  <RedirectIfAuthenticated>
                    <RoleSignup />
                  </RedirectIfAuthenticated>
                } />
                
                {/* Protected Dashboard Routes */}
                <Route path="/teacher/dashboard" element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/teacher/job-board" element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <JobBoard />
                  </ProtectedRoute>
                } />
                <Route path="/parent/dashboard" element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <ParentDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/school/dashboard" element={
                  <ProtectedRoute allowedRoles={['school']}>
                    <SchoolDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Test and Debug Routes */}
                <Route path="/auth-test" element={<AuthStatusTester />} />
                
                {/* Testing and Error Routes */}
                <Route path="/auth-test" element={<AuthStatusTester />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
              </div>
            </Router>
          </AuthProvider>
        </GoogleOAuthProvider>
      </GlobalErrorBoundary>
    </React.StrictMode>
  );
}

export default App;