import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import logoImage from "../assets/images/Uniqwrites_logo.jpg"; // Importing the logo image

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src={logoImage} // Using the imported logo image
                alt="Uniqwrites Educational Concepts"
                className="h-16 w-auto drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
              />
              <span className="ml-3 text-2xl font-black text-primary tracking-wide drop-shadow-sm">
                Uniqwrites
              </span>
            </div>
            <p className="text-sm font-medium">
              Empowering education through innovative solutions and expert
              guidance.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-primary">
                  Tutoring
                </Link>
              </li>
              <li>
                <Link to="/PurposeActionPoint" className="hover:text-primary">
                  Purpose Action Point 
                </Link>
              </li>              <li>
                <Link to="/initiatives" className="hover:text-primary">
                  Initiatives
                </Link>
              </li>
              <li>
                <Link to="/teacher/job-board" className="hover:text-primary">
                  Teaching Jobs 
                  </Link>
              </li>
              
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://web.facebook.com/profile.php?id=61575843015840" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary"
              >
                <Facebook />
              </a>
              <a 
                href="https://www.instagram.com/uniqchild1/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary"
              >
                <Instagram />
              </a>
              <a 
                href="mailto:info@uniqwrites.africa" 
                className="hover:text-primary"
                aria-label="Send us an email"
              >
                <Mail />
              </a>
              <a 
                href="https://api.whatsapp.com/send?phone=2349164923056" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle />
              </a>
            </div>
            <p className="text-sm">
              Subscribe to our newsletter for updates and educational resources.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/whatsapp-bot-policies#privacy" className="hover:text-primary text-sm">
                  WhatsApp Bot Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/whatsapp-bot-policies#terms" className="hover:text-primary text-sm">
                  WhatsApp Bot Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/data-deletion" className="hover:text-primary text-sm">
                  User Data Deletion
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Uniqwrites Educational Concepts.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
