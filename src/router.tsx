import { lazy } from "react";
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Navigate,
  Route 
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Initiatives = lazy(() => import("./pages/initiatives/Initiatives"));
const LiteracySponsor = lazy(() => import("./pages/initiatives/literacy/LiteracySponsor"));
const LiteracyVolunteer = lazy(() => import("./pages/initiatives/literacy/LiteracyVolunteer"));
const BackToSchoolSponsor = lazy(() => import("./pages/initiatives/backtoschool/BackToSchoolSponsor"));
const BackToSchoolVolunteer = lazy(() => import("./pages/initiatives/backtoschool/BackToSchoolVolunteer"));
const Resources = lazy(() => import("./pages/Resources"));
const ParentTutoringRequestForm = lazy(() => import("./pages/ParentTutoringRequest"));
const SchoolServiceRequestForm = lazy(() => import("./pages/SchoolServiceRequest"));
const PurposeActionPoint = lazy(() => import("./pages/PurposeActionPoint"));
const ApplyTutor = lazy(() => import("./pages/apply-tutor"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const StudentEnrollment = lazy(() => import("./pages/StudentEnrollment"));
const WhatsAppBotPolicies = lazy(() => import("./pages/WhatsAppBotPolicies"));
const DataDeletion = lazy(() => import("./pages/DataDeletion"));
const Test = lazy(() => import("./pages/Test"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
      <Route path="/resources" element={<Resources />} />
      <Route path="/blog" element={<Navigate to="/resources" replace />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/whatsapp-bot-policies" element={<WhatsAppBotPolicies />} />
      <Route path="/data-deletion" element={<DataDeletion />} />
      <Route path="/test" element={<Test />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/ParentTutoringRequestForm" element={<ParentTutoringRequestForm />} />
      <Route path="/StudentEnrollment" element={<StudentEnrollment />} />
      <Route path="/SchoolServiceRequestForm" element={<SchoolServiceRequestForm />} />
      <Route path="/PurposeActionPoint" element={<PurposeActionPoint />} />
      <Route path="/initiatives" element={<Initiatives />} />
        {/* Initiative Form Routes */}
      <Route path="/initiatives/literacy/sponsor" element={<LiteracySponsor />} />
      <Route path="/initiatives/literacy/volunteer" element={<LiteracyVolunteer />} />
      <Route path="/initiatives/backtoschool/sponsor" element={<BackToSchoolSponsor />} />
      <Route path="/initiatives/backtoschool/volunteer" element={<BackToSchoolVolunteer />} />
      {/* Catch-all route for 404 pages */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
