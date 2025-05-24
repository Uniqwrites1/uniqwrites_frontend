import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImage from "../assets/images/Uniqwrites_logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img
                className="h-12 w-auto"
                src={logoImage}
                alt="Uniqwrites"
              />
            </Link>
          </div>

          {/* Navigation Links Center */}
          <div className="hidden md:flex md:space-x-8 md:flex-1 md:justify-center">
            <Link
              to="/"
              className="text-secondary hover:text-primary font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-secondary hover:text-primary font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-secondary hover:text-primary font-medium"
            >
              Services
            </Link>
            <Link
              to="/initiatives"
              className="text-secondary hover:text-primary font-medium"
            >
              Initiatives
            </Link>
            <Link
              to="/PurposeActionPoint"
              className="text-secondary hover:text-primary font-medium"
            >
              Purpose Action Point
            </Link>
            <Link
              to="/blog"
              className="text-secondary hover:text-primary font-medium"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-secondary hover:text-primary font-medium"
            >
              Contact
            </Link>
          </div>

          {/* CTAs Right - Empty for simplified public version */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Authentication removed for public lite version */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-secondary hover:text-primary font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-secondary hover:text-primary font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 text-secondary hover:text-primary font-medium"
            >
              Services
            </Link>
            <Link
              to="/initiatives"
              className="block px-3 py-2 text-secondary hover:text-primary font-medium"
            >
              Initiatives
            </Link>
            <Link
              to="/PurposeActionPoint"
              className="block px-3 py-2 text-secondary hover:text-primary font-medium"
            >
              Purpose Action Point
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 text-secondary hover:text-primary font-medium"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-secondary hover:text-primary font-medium"
            >
              Contact
            </Link>
            {/* Authentication removed for public lite version */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
