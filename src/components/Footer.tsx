import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import logoImage from "../assets/images/Uniqwrites_logo.jpg"; // Importing the logo image

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img
              src={logoImage} // Using the imported logo image
              alt="Uniqwrites"
              className="h-12 mb-4"
            />
            <p className="text-sm">
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
                <Link to="/services#tutoring" className="hover:text-primary">
                  Home Tutoring
                </Link>
              </li>
              <li>
                <Link to="/services#literacy" className="hover:text-primary">
                  Online Tutoring 
                </Link>
              </li>
              <li>
                <Link to="/services#literacy" className="hover:text-primary">
                  Homecshooling 
                </Link>
              </li>
              <li>
                <Link to="/services#schools" className="hover:text-primary">
                  Exam prep and homework help
                </Link>
              </li>
              <li>
                <Link to="/services#career" className="hover:text-primary">
                  School Solutions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-primary">
                <Facebook />
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram />
              </a>
              <a href="#" className="hover:text-primary">
                <Mail />
              </a>
            </div>
            <p className="text-sm">
              Subscribe to our newsletter for updates and educational resources.
            </p>
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
