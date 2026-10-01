import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImage from "../assets/images/Uniqwrites_logo.jpg";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Initiatives", to: "/initiatives" },
  { label: "Purpose Action Point", to: "/PurposeActionPoint" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-200 ${isScrolled ? "border-black/10 bg-white/95 backdrop-blur-sm" : "border-transparent bg-white"}`}>
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6 lg:px-6">
        <Link to="/" className="flex items-center" aria-label="Uniqwrites home">
          <img src={logoImage} alt="Uniqwrites logo" className="h-11 w-auto" width={180} height={44} />
        </Link>

        <div className="hidden items-center justify-center gap-6 md:flex md:flex-1 md:justify-center">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="text-sm font-medium text-[#111111] transition-colors hover:text-[#B98A00]">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex">
          <Link to="/ParentTutoringRequestForm" className="btn-primary">
            Request a tutor
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[#111111] transition-colors hover:bg-[#F7F7F5] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white px-5 pt-20 pb-6 md:hidden">
          <div className="flex flex-1 flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-xl px-3 py-3 text-base font-medium text-[#111111] transition-colors hover:bg-[#F7F7F5]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link to="/ParentTutoringRequestForm" onClick={() => setIsOpen(false)} className="btn-primary w-full justify-center">
            Request a tutor
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
