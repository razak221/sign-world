import { Link, useLocation } from "react-router";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/signworld_real_logo.jpg";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-end gap-6 py-2 text-xs font-medium tracking-wide border-b border-white/5">
          <a href="tel:+917899634299" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>+91-78996 34299</span>
          </a>
          <a href="mailto:info@signworldprints.com" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span>info@signworldprints.com</span>
          </a>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-black/50 p-0.5 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group-hover:border-primary/30 transition-all duration-300">
              <img 
                src={logo} 
                alt="Sign World" 
                className="h-10 w-10 object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="font-bold text-xl text-white tracking-tight leading-none group-hover:text-primary transition-colors">Sign World</div>
              <div className="text-[10px] text-primary uppercase tracking-[0.2em] mt-1 font-medium">Prints & Signage</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                  />
                )}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            className="hidden md:block px-6 py-2.5 bg-primary text-black rounded-full hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 font-semibold text-sm"
          >
            Get a Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-card/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col px-4 py-6 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl transition-all ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 px-4 py-4 bg-primary text-black rounded-xl text-center font-bold"
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}