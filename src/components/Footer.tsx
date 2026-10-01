import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MessageCircle, Send } from "lucide-react";
import logoImage from "../assets/images/Uniqwrites_logo.jpg";

const services = [
  { label: "Home tutoring", to: "/ParentTutoringRequestForm" },
  { label: "Virtual and physical lessons", to: "/services" },
  { label: "Homework help", to: "/services" },
  { label: "Homeschooling", to: "/services" },
  { label: "Examination prep", to: "/services" },
];

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logoImage} alt="Uniqwrites logo" className="h-12 w-auto" width={180} height={48} />
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
              Empowering education through innovative guidance, trusted tutors, and meaningful progress.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Quick links</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li><Link to="/" className="hover:text-[#F5B800]">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#F5B800]">About</Link></li>
              <li><Link to="/services" className="hover:text-[#F5B800]">Services</Link></li>
              <li><Link to="/contact" className="hover:text-[#F5B800]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {services.map((service) => (
                <li key={service.label}><Link to={service.to} className="hover:text-[#F5B800]">{service.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Connect</h3>
            <div className="mt-4 flex items-center gap-3 text-[#F5B800]">
              <a href="https://web.facebook.com/profile.php?id=61575843015840" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full border border-white/20 p-2 transition-colors hover:border-[#F5B800] hover:text-[#F5B800]">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com/uniqchild1/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-white/20 p-2 transition-colors hover:border-[#F5B800] hover:text-[#F5B800]">
                <Instagram size={16} />
              </a>
              <a href="mailto:info@uniqwritesafrica.com.ng" aria-label="Email" className="rounded-full border border-white/20 p-2 transition-colors hover:border-[#F5B800] hover:text-[#F5B800]">
                <Mail size={16} />
              </a>
              <a href="https://wa.me/2349164923056?text=Hello%2C%20I%27d%20like%20to%20request%20a%20tutor" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="rounded-full border border-white/20 p-2 transition-colors hover:border-[#F5B800] hover:text-[#F5B800]">
                <MessageCircle size={16} />
              </a>
            </div>

            <div className="mt-5 space-y-3 text-sm text-white/75">
              <a href="mailto:info@uniqwritesafrica.com.ng" className="block hover:text-[#F5B800]">info@uniqwritesafrica.com.ng</a>
              <a href="https://wa.me/2349164923056?text=Hello%2C%20I%27d%20like%20to%20request%20a%20tutor" target="_blank" rel="noreferrer" className="block hover:text-[#F5B800]">Chat on WhatsApp</a>
            </div>

            <form className="mt-5">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <div className="flex min-h-11 overflow-hidden rounded-full border border-white/20 bg-white/5">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none"
                  aria-label="Email address"
                />
                <button type="submit" className="inline-flex items-center justify-center bg-[#F5B800] px-4 text-[#111111] transition-colors hover:bg-[#F7C82E]" aria-label="Submit newsletter form">
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-2 text-[11px] text-white/60">We respect your privacy. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/65">
          &copy; {new Date('2025-01-01').getFullYear()} Uniqwrites Educational Concepts. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
