import { ArrowRight, BookOpen, Check, GraduationCap, Home as HomeIcon, MessageCircle, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "../assets/images/Hero_visuals1-optimized.jpg";
import homeTutoringImage from "../assets/images/hometutoring-optimized.jpg";
import virtualLearningImage from "../assets/images/virtuallearning-optimized.jpg";
import homeworkHelpImage from "../assets/images/homework-optimized.jpg";
import homeschoolingImage from "../assets/images/homeschooling-optimized.jpg";
import examPrepImage from "../assets/images/examprep-optimized.jpg";

const trustItems = [
  "Trained teachers",
  "Progress reports",
  "Home and virtual lessons",
];

const serviceItems = [
  {
    title: "Home tutoring",
    description: "One-to-one lessons in your home.",
    image: homeTutoringImage,
    to: "/ParentTutoringRequestForm",
  },
  {
    title: "Virtual and physical lessons",
    description: "Learn online or in person, your choice.",
    image: virtualLearningImage,
    to: "/services",
  },
  {
    title: "Homework help",
    description: "Clear support that builds confidence.",
    image: homeworkHelpImage,
    to: "/services",
  },
  {
    title: "Homeschooling",
    description: "Structured plans and expert guidance.",
    image: homeschoolingImage,
    to: "/services",
  },
  {
    title: "Examination prep",
    description: "Focused practice for the exams that matter.",
    image: examPrepImage,
    to: "/services",
  },
];

const steps = [
  { number: "1", title: "Request a tutor", icon: HomeIcon },
  { number: "2", title: "Get matched", icon: Users },
  { number: "3", title: "Start learning", icon: GraduationCap },
];

const parentReasons = [
  "Trained and fully supported teachers",
  "Personalised curriculum",
  "Progress tracking for parents",
  "Clear, affordable pricing",
];

const teacherReasons = [
  "Training and support",
  "Real opportunities, not just promises",
  "A thriving community and resource hub",
  "Purpose-driven impact and recognition",
];

const quickLinks = [
  { label: "Resources", to: "/resources" },
  { label: "School services", to: "/services" },
  { label: "Join PAP", to: "/PurposeActionPoint" },
  { label: "Sponsor initiatives", to: "/initiatives" },
];

const Home = () => {
  return (
    <main id="main-content" className="bg-white text-[#1F1F1F]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-[#111111] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <section className="bg-[#F7F7F5]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-6">
          <div className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-20">
            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#B98A00]">
                Education with you in mind
              </p>
              <h1 className="text-[2rem] font-semibold leading-[1.1] text-[#111111] sm:text-[2.6rem] lg:text-[3.1rem]">
                Empowering learning.
                <span className="relative mt-2 inline-block text-[#111111]">
                  <span className="absolute inset-x-0 bottom-1 h-3 rounded-full bg-[#F5B800]/70" aria-hidden="true" />
                  <span className="relative">Transforming futures.</span>
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#5F5F5F] sm:text-lg">
                Trained tutors for home, virtual, and exam prep lessons, with progress tracking for parents.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/ParentTutoringRequestForm" className="btn-primary">
                  Request a tutor
                </Link>
                <Link to="/apply-tutor" className="btn-secondary">
                  Become a tutor
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[22px] border border-black/5 bg-[#f0efe9] shadow-[0_24px_70px_rgba(17,17,17,0.10)]">
                <img
                  src={heroImage}
                  alt="A tutor helping a student with learning materials"
                  width={1600}
                  height={1200}
                  fetchpriority="high"
                  className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[560px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-6">
          <div className="grid gap-4 text-center sm:grid-cols-3 sm:text-left">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center justify-center gap-3 rounded-xl border border-[#111111]/10 bg-white px-4 py-3 sm:justify-start">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B98A00] bg-[#F5B800]/10 text-[#B98A00]">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span className="text-sm font-medium text-[#111111]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="home-resources-heading" className="border-b border-[#B98A00]/25 bg-[#FFF8E5]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5B800]/25 text-[#8A6500]">
              <BookOpen size={23} />
            </span>
            <div>
              <h2 id="home-resources-heading" className="text-xl font-semibold text-[#111111]">Free resources for curious learners</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#5F5F5F]">
                Explore open textbooks, African storybooks, practice, and interactive lessons.
              </p>
            </div>
          </div>
          <Link to="/resources" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#333333]">
            Explore resources <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-6 lg:py-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B98A00]">How we can help</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#111111] sm:text-4xl">Explore our support</h2>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {serviceItems.map((service) => (
            <Link
              key={service.title}
              to={service.to}
              className="group block overflow-hidden rounded-[18px] border border-black/10 bg-white p-3 text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#B98A00]/60 hover:shadow-[0_18px_35px_rgba(17,17,17,0.08)]"
            >
              <div className="overflow-hidden rounded-[12px] bg-[#F7F7F5]">
                <img
                  src={service.image}
                  alt={service.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#111111]">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5F5F5F]">{service.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="inline-flex items-center justify-center rounded-full border border-[#111111] bg-white px-4 py-2.5 text-sm font-medium text-[#111111] transition-colors hover:bg-[#F7F7F5]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#F7F7F5]">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-6 lg:py-24">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B98A00]">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#111111] sm:text-4xl">Simple support from day one</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(({ number, title, icon: Icon }) => (
              <div key={number} className="rounded-[18px] border border-black/10 bg-white p-6 text-center shadow-[0_12px_35px_rgba(17,17,17,0.03)]">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5B800] text-lg font-semibold text-[#111111]">
                  <span>{number}</span>
                </div>
                <div className="mt-5 flex justify-center text-[#B98A00]">
                  <Icon size={24} strokeWidth={2.2} />
                </div>
                <p className="mt-4 text-lg font-semibold text-[#111111]">{title}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/ParentTutoringRequestForm" className="btn-primary">
              Request a tutor
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-6 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[22px] border border-black/10 bg-[#F7F7F5] p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B98A00]">Parents</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#111111]">Why families choose us</h2>
            <ul className="mt-6 space-y-4">
              {parentReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-base text-[#1F1F1F]">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5B800]/20 text-[#B98A00]">
                    <Check size={15} strokeWidth={2.5} />
                  </span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/ParentTutoringRequestForm" className="inline-flex items-center gap-2 text-base font-semibold text-[#111111] hover:text-[#B98A00]">
                Request a tutor <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="rounded-[22px] border border-black/10 bg-[#111111] p-7 text-white sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5B800]">Teachers</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Why educators join us</h2>
            <ul className="mt-6 space-y-4">
              {teacherReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-base text-white/90">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5B800]/20 text-[#F5B800]">
                    <Check size={15} strokeWidth={2.5} />
                  </span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/apply-tutor" className="inline-flex items-center gap-2 text-base font-semibold text-[#F5B800] hover:text-[#FFD54A]">
                Become a tutor <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5B800]">Start today</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Ready to get started?</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/ParentTutoringRequestForm" className="btn-primary bg-[#F5B800] text-[#111111]">
                Request a tutor
              </Link>
              <Link to="/apply-tutor" className="btn-secondary border-white text-white hover:bg-white/5">
                Become a tutor
              </Link>
            </div>
          </div>

          <div className="mt-8 flex justify-center md:justify-start">
            <a
              href="https://wa.me/2349164923056?text=Hello%2C%20I%27d%20like%20to%20request%20a%20tutor"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#F5B800] px-4 py-2.5 text-sm font-medium text-[#F5B800] transition-colors hover:bg-[#F5B800] hover:text-[#111111]"
            >
              <Sparkles size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/2349164923056?text=Hello%2C%20I%27d%20like%20to%20request%20a%20tutor"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.35)] transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <MessageCircle size={24} />
      </a>
    </main>
  );
};

export default Home;
