const siteUrl = "https://uniqwritesafrica.com.ng";
const defaultTitle = "Uniqwrites | Home and Online Tutors in Nigeria";

type PageMetadata = {
  title: string;
  description: string;
  indexable?: boolean;
};

const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    title: defaultTitle,
    description: "Find trusted home and online tutors in Nigeria with Uniqwrites Educational Concepts. Explore personalized tutoring, homework help, homeschooling, and exam preparation.",
  },
  "/about": {
    title: "About Uniqwrites | Educational Support in Nigeria",
    description: "Learn about Uniqwrites Educational Concepts and our mission to make learning personalized, inclusive, and accessible for learners and educators.",
  },
  "/services": {
    title: "Tutoring and Education Services in Nigeria | Uniqwrites",
    description: "Explore Uniqwrites tutoring and education services for families, schools, and teachers, including home lessons, virtual learning, and exam support.",
  },
  "/apply-tutor": {
    title: "Become a Tutor | Uniqwrites Educational Concepts",
    description: "Apply to join Uniqwrites as a tutor and support learners through personalized home, online, and subject-focused lessons.",
  },
  "/resources": {
    title: "Free Learning Resources | Uniqwrites",
    description: "Explore free learning resources from African Storybook, Siyavula, OpenStax, Khan Academy, CK-12, and interactive PhET lessons.",
  },
  "/initiatives": {
    title: "Education and Literacy Initiatives | Uniqwrites",
    description: "Learn about Uniqwrites education initiatives supporting literacy, access to learning, and school participation.",
  },
  "/PurposeActionPoint": {
    title: "Purpose Action Point (PAP) | Uniqwrites",
    description: "Discover Uniqwrites Purpose Action Point, a coaching and mentoring program focused on helping young people prepare for life beyond exams.",
  },
  "/contact": {
    title: "Contact Uniqwrites | Tutors and Learning Support",
    description: "Contact Uniqwrites Educational Concepts about tutoring, school services, teacher opportunities, or learning support in Nigeria.",
  },
  "/whatsapp-bot-policies": {
    title: "WhatsApp Bot Privacy and Terms | Uniqwrites",
    description: "Read the privacy policy and terms of service for the Uniqwrites WhatsApp bot.",
  },
  "/data-deletion": {
    title: "Data Deletion Requests | Uniqwrites",
    description: "Find out how to request deletion of personal information held by Uniqwrites Educational Concepts.",
  },
  "/ParentTutoringRequestForm": {
    title: "Request a Tutor | Uniqwrites",
    description: "Submit a tutoring request to help Uniqwrites match a learner with suitable educational support.",
    indexable: false,
  },
  "/StudentEnrollment": {
    title: "Student Enrollment | Uniqwrites",
    description: "Start student enrollment with Uniqwrites Educational Concepts.",
    indexable: false,
  },
  "/SchoolServiceRequestForm": {
    title: "Request School Services | Uniqwrites",
    description: "Send Uniqwrites a request for educational services for your school.",
    indexable: false,
  },
  "/thank-you": {
    title: "Thank You | Uniqwrites",
    description: "Your submission has been received by Uniqwrites Educational Concepts.",
    indexable: false,
  },
  "/test": {
    title: "Test Page | Uniqwrites",
    description: "Uniqwrites website test page.",
    indexable: false,
  },
  "/initiatives/literacy/sponsor": {
    title: "Support the Literacy Initiative | Uniqwrites",
    description: "Send a sponsorship inquiry for the Uniqwrites literacy initiative.",
    indexable: false,
  },
  "/initiatives/literacy/volunteer": {
    title: "Volunteer for the Literacy Initiative | Uniqwrites",
    description: "Register your interest in volunteering with the Uniqwrites literacy initiative.",
    indexable: false,
  },
  "/initiatives/backtoschool/sponsor": {
    title: "Support the Back-to-School Initiative | Uniqwrites",
    description: "Send a sponsorship inquiry for the Uniqwrites Back-to-School Initiative.",
    indexable: false,
  },
  "/initiatives/backtoschool/volunteer": {
    title: "Volunteer for the Back-to-School Initiative | Uniqwrites",
    description: "Register your interest in volunteering with the Uniqwrites Back-to-School Initiative.",
    indexable: false,
  },
};

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

export const updateSeoMetadata = (pathname: string) => {
  const path = pathname.replace(/\/+$/, "") || "/";
  const metadata = pageMetadata[path];
  const title = metadata?.title ?? "Page not found | Uniqwrites";
  const description = metadata?.description ?? "The requested page could not be found on the Uniqwrites website.";
  const canonicalUrl = `${siteUrl}${path === "/" ? "/" : path}`;
  const robots = metadata && metadata.indexable !== false
    ? "index, follow, max-image-preview:large"
    : "noindex, follow";

  document.title = title;
  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", robots);
  upsertMeta("property", "og:site_name", "Uniqwrites Educational Concepts");
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:url", canonicalUrl);
  upsertMeta("property", "og:image", `${siteUrl}/uniqwrites-logo.jpg`);
  upsertMeta("property", "og:image:alt", "Uniqwrites Educational Concepts logo");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", `${siteUrl}/uniqwrites-logo.jpg`);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
};