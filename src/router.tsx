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
import ThankYou from "./pages/ThankYou";
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
      <Route path="/blog" element={<Blog />} />      <Route path="/contact" element={<Contact />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/ParentTutoringRequestForm" element={<ParentTutoringRequestForm />} />
      <Route path="/SchoolServiceRequestForm" element={<SchoolServiceRequestForm />} />
      <Route path="/PurposeActionPoint" element={<PurposeActionPoint />} />
      <Route path="/initiatives" element={<Initiatives />} />
        {/* Initiative Form Routes */}
      <Route path="/initiatives/literacy/sponsor" element={<LiteracySponsor />} />
      <Route path="/initiatives/literacy/volunteer" element={<LiteracyVolunteer />} />
      <Route path="/initiatives/backtoschool/sponsor" element={<BackToSchoolSponsor />} />
      <Route path="/initiatives/backtoschool/volunteer" element={<BackToSchoolVolunteer />} />
    </Route>  )
);
