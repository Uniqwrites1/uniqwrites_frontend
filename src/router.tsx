import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route 
} from "react-router-dom";

// Import pages
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
import AdminDashboard from "./pages/admin/AdminDashboard";
import AppLayout from "./layouts/AppLayout";

/**
 * Create router with future flags enabled to prevent deprecation warnings
 * 
 * v7_startTransition - Wraps state updates in React.startTransition
 * v7_relativeSplatPath - Changes relative route resolution within Splat routes
 */
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
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
      <Route path="/auth" element={<Authentication />} />
      <Route path="/login/:role" element={<RoleLogin />} />
      <Route path="/signup/:role" element={<RoleSignup />} />
      
      {/* Dashboard Routes */}
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher/job-board" element={<JobBoard />} />
      <Route path="/parent/dashboard" element={<ParentDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Route>
  ),
  {
  // Enable future flags to address deprecation warnings
    future: {
      // These flags must be listed in the FutureConfig interface from react-router
      // Not setting any explicit flags here since we're using the global window.__reactRouterFutureFlags
    }
  }
);
