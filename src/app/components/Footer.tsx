import { Link } from "react-router";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp, MessageSquare } from "lucide-react";
import logo from "../../assets/signworld_real_logo.jpg";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background relative text-gray-400 overflow-hidden">
      {/* Gradient divider at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05),transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="bg-black/50 p-0.5 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group-hover:border-primary/30 transition-all duration-300">
                <img 
                  src={logo} 
                  alt="Sign World" 
                  className="h-10 w-10 object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="font-bold text-xl text-white tracking-tight group-hover:text-primary transition-colors">Sign World</div>
                <div className="text-[10px] text-primary uppercase tracking-[0.2em] mt-1 font-medium">Prints & Signage</div>
              </div>
            </Link>
            <p className="text-sm mb-8 text-gray-400 font-light leading-relaxed">
              Professional printing and signage solutions tailored for brands that demand excellence. Precision in every detail.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/917899634299"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white hover:text-white transition-all duration-300 border border-white/10"
                style={{ background: "linear-gradient(135deg,#25d366,#128c4c)", borderColor: "rgba(37,211,102,0.3)" }}
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white hover:text-black hover:bg-primary border border-white/10 hover:border-primary transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white hover:text-black hover:bg-primary border border-white/10 hover:border-primary transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white hover:text-black hover:bg-primary border border-white/10 hover:border-primary transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></span>Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></span>Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></span>Portfolio</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></span>About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></span>Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Our Services</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">LED & Digital Signages</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">ACP & Acrylic Signs</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Vehicle Wraps & Branding</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Flex & Eco-Solvent Printing</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Exhibition Stalls</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-5 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-gray-400"># 26 Ground Floor, Harmony Dale,<br />New Bamboo Bazaar Road<br />Bangalore 560 051</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <div className="flex flex-col gap-2 text-gray-400">
                  <a href="tel:+917899634299" className="hover:text-primary transition-colors">+91-78996 34299</a>
                  <a href="tel:+919844496579" className="hover:text-primary transition-colors">+91-98444 96579</a>
                  <a href="tel:+919986888937" className="hover:text-primary transition-colors">+91-99868 88937</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                <a href="mailto:info@signworldprints.com" className="text-gray-400 hover:text-primary transition-colors">info@signworldprints.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-white/5 text-sm font-light text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {currentYear} Sign World Prints. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="text-gray-600 text-xs uppercase tracking-widest">Bangalore, Karnataka, India</span>
              <div className="flex gap-6">
                <Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link>
              </div>
              {/* Back to top */}
              <button
                onClick={scrollToTop}
                className="w-9 h-9 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary border border-white/10 transition-all duration-300"
                title="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}