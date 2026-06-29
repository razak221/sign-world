import { Link } from "react-router";
import { ArrowRight, CheckCircle, Star, Sparkles, Zap, Users, Award, TrendingUp, Eye, Palette, Package, Clock, Shield, Target, MessageCircle, Play, Building2, ChevronLeft, ChevronRight, Plus, Minus, Quote, Phone, Mail, MapPin, Lightbulb, Monitor, Box, Flag, Car, Printer, FileText, CreditCard, Store } from "lucide-react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTracker } from "../../hooks/useTracker";
import { Footer } from "../components/Footer";
import ledSignage from "figma:asset/6e7025d0f5bf2d57099bad163673cfc1e536634e.png";
import hoardings from "figma:asset/402158889a65a83e2a1eaef099ffdeb536a72e6d.png";
import backLight from "figma:asset/403c1199464256ac90b1ecca1d59649dc2d0dbef.png";
import frontLight from "figma:asset/d0ce665437f8f0456bf97f05fc20f321ed58c8dd.png";
import vinylBranding from "figma:asset/d1f28106930ee5834bea7b4bfb0fb7becbc0f871.png";
import acp from "figma:asset/7b6e8b0e25bd6d277b1806d2e998c3b01a4b9daf.png";
import neonBoards from "figma:asset/9778a5ff95603d59b2413727216530d9c2b122a6.png";
import acrylic from "figma:asset/3b6dac900a41cdaaadef2d7c212924720255b1d1.png";
import metalLetters from "figma:asset/d7bc7a37ce186421a801bc4f8bb301881fd1ec2f.png";
import digitalSignages from "figma:asset/627d7cb3e4da4adf756cb7768dcabc7f2243f089.png";
import electionBanners from "figma:asset/e10cc8a1864ed3add4f13ba6a25a97aada3c7e8a.png";
import menuBoards from "figma:asset/ce0426f4281f13a8bb706cf024c32a83c7d5c080.png";
import vehicleSignages from "figma:asset/6e356a3cfb8aa2dc47775dc971b7458e9632af21.png";
import flexPrinting from "figma:asset/2eaac58e7610a969b8193473d957111135848359.png";
import ecoSolvent from "figma:asset/92d28b1ce92d3ab83d434c6baee10e34bd6f23e0.png";
import exhibitionStalls from "figma:asset/f2155cfcb1c22ca46bbed303d6e89909427e835a.png";
import businessCards from "figma:asset/8dd1b5d46869f97b5304f26dc47172a556479233.png";
import pamphlets from "figma:asset/efb1e0ab435aabe3ceb6354313b0dde45ea3fb1d.png";

// New Corporate Client Assets
import { ClientLogos } from "../components/ClientLogos";
import cleartaxLogo from "../../assets/assets2/cleartax-1.png";
import meghraj1 from "../../assets/assets2/meghraj-1.png";
import meghraj2 from "../../assets/assets2/meghraj-2.png";
import meghraj3 from "../../assets/assets2/meghraj-3.png";
import paragon1 from "../../assets/assets2/paragon-1.png";
import paragon2 from "../../assets/assets2/paragon-2.png";
import paragon3 from "../../assets/assets2/paragon-3.png";
import reltio1 from "../../assets/assets2/reltio-1.png";
import safehouse1 from "../../assets/assets2/safehouse-1.png";
import safehouse2 from "../../assets/assets2/safehouse-2.png";
import socialpanga1 from "../../assets/assets2/socialpanga-1.png";

const corporateCaseStudies = [
  {
    name: "Meghraj Food & Feast",
    category: "Restaurant & Hospitality",
    description: "A comprehensive brand design and manufacturing of custom acrylic & neon signage boards for high-end dining experiences, highlighting vibrant night-time visibility and architectural alignment.",
    signage: ["3D LED Acrylic Letters", "Dynamic Custom Neon Signs", "Premium Backlit Menu Boards"],
    images: [meghraj1, meghraj2, meghraj3],
  },
  {
    name: "Paragon Stores",
    category: "Corporate Retail Outlets",
    description: "Premium storefront redesign using weather-resistant Aluminum Composite Panels (ACP) and custom brass-finished 3D dimensional lettering, giving the outlets a modern and premium corporate identity.",
    signage: ["Storefront ACP Cladding", "Premium 3D Titanium/Brass Letters", "Illuminated Frontlight Signage"],
    images: [paragon1, paragon2, paragon3],
  },
  {
    name: "Safehouse Security",
    category: "Enterprise Corporate Offices",
    description: "Sophisticated indoor corporate lobby branding, high-visibility perimeter LED boards, and modern security-themed illuminated signs to reinforce corporate security identity.",
    signage: ["Exterior LED Illuminated Signs", "Indoor Acrylic Corporate Boards", "Edge-Lit Glass Panels"],
    images: [safehouse1, safehouse2],
  },
  {
    name: "ClearTax Headquarters",
    category: "Fintech Headquarters",
    description: "Large-scale frosted vinyl wall branding, corporate lobby dimensional signs, and custom glass decals to create an inspiring and productive office environment for India's leading fintech.",
    signage: ["Corporate Glass Decals", "Frost Vinyl Wrap", "3D Reception Logo Sign"],
    images: [cleartaxLogo],
  },
  {
    name: "Reltio Offices",
    category: "SaaS Office Interiors",
    description: "Exquisite interior reception board design featuring mirror-finish steel letters mounted on a matte wood panel, projecting innovation and technological sophistication.",
    signage: ["Mirror-Finish Stainless Steel Letters", "Matte Composite Panel Board"],
    images: [reltio1],
  },
  {
    name: "Social Panga Agency",
    category: "Creative Agency Office",
    description: "Vibrant, quirky custom neon signage and custom-cut acrylic wall signs that reflect the creative and energetic identity of the agency's workspace.",
    signage: ["Quirky Custom Neon Art", "Large Format Canvas & Vinyl", "Custom Acrylic Signs"],
    images: [socialpanga1],
  },
];

const stats = [
  { number: 10000, suffix: "+", label: "Projects Completed", color: "from-red-500 to-orange-500" },
  { number: 98, suffix: "%", label: "Client Satisfaction", color: "from-blue-500 to-cyan-500" },
  { number: 35, suffix: "+", label: "Years Experience", color: "from-purple-500 to-pink-500" },
  { number: 500, suffix: "+", label: "Happy Clients", color: "from-green-500 to-emerald-500" },
];

const services = [
  {
    title: "LED Signages",
    description: "Energy-efficient LED signs that make your brand shine 24/7",
    image: ledSignage,
    icon: Lightbulb,
    gradient: "from-yellow-500 via-orange-500 to-red-500"
  },
  {
    title: "Digital Signages",
    description: "Dynamic digital displays with real-time content updates",
    image: digitalSignages,
    icon: Monitor,
    gradient: "from-blue-500 via-purple-500 to-pink-500"
  },
  {
    title: "Backlight Signage",
    description: "Stunning backlit signs for maximum night visibility",
    image: backLight,
    icon: Zap,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500"
  },
  {
    title: "Frontlight Signage",
    description: "Professional front-lit signs for retail excellence",
    image: frontLight,
    icon: Lightbulb,
    gradient: "from-green-500 via-teal-500 to-cyan-500"
  },
  {
    title: "Vinyl Branding",
    description: "High-quality vinyl graphics for walls, windows & vehicles",
    image: vinylBranding,
    icon: Palette,
    gradient: "from-pink-500 via-rose-500 to-red-500"
  },
  {
    title: "ACP Signage",
    description: "Premium aluminum composite panel solutions",
    image: acp,
    icon: Box,
    gradient: "from-indigo-500 via-purple-500 to-pink-500"
  },
  {
    title: "Neon Boards",
    description: "Vibrant neon signage with retro aesthetic appeal",
    image: neonBoards,
    icon: Zap,
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500"
  },
  {
    title: "Acrylic Signage",
    description: "Modern acrylic signs with crystal-clear finish",
    image: acrylic,
    icon: Box,
    gradient: "from-teal-500 via-cyan-500 to-blue-500"
  },
  {
    title: "Metal Letters",
    description: "Premium 3D letters in steel, brass, or titanium",
    image: metalLetters,
    icon: Building2,
    gradient: "from-amber-500 via-yellow-500 to-orange-500"
  },
  {
    title: "Hoardings",
    description: "Large-scale outdoor advertising billboards",
    image: hoardings,
    icon: Building2,
    gradient: "from-red-500 via-orange-500 to-yellow-500"
  },
  {
    title: "Vehicle Signages",
    description: "Eye-catching mobile branding solutions",
    image: vehicleSignages,
    icon: Car,
    gradient: "from-lime-500 via-green-500 to-emerald-500"
  },
  {
    title: "Menu Boards",
    description: "Attractive menu displays for restaurants",
    image: menuBoards,
    icon: Box,
    gradient: "from-orange-500 via-amber-500 to-yellow-500"
  },
  {
    title: "Election Banners",
    description: "High-impact campaign advertising materials",
    image: electionBanners,
    icon: Flag,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500"
  },
  {
    title: "Exhibition Stalls",
    description: "Custom trade show booths that impress",
    image: exhibitionStalls,
    icon: Store,
    gradient: "from-sky-500 via-blue-500 to-indigo-500"
  },
  {
    title: "Flex Printing",
    description: "High-quality flex banners for any occasion",
    image: flexPrinting,
    icon: Printer,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500"
  },
  {
    title: "Eco Solvent Printing",
    description: "Eco-friendly large format printing",
    image: ecoSolvent,
    icon: Printer,
    gradient: "from-green-500 via-lime-500 to-yellow-500"
  },
  {
    title: "Business Cards",
    description: "Professional cards that leave an impression",
    image: businessCards,
    icon: CreditCard,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500"
  },
  {
    title: "Pamphlets & Flyers",
    description: "Informative print materials for promotions",
    image: pamphlets,
    icon: FileText,
    gradient: "from-blue-500 via-indigo-500 to-violet-500"
  },
];

const features = [
  {
    title: "Premium Quality",
    description: "State-of-the-art equipment and finest materials for exceptional results",
    icon: Award,
    gradient: "from-amber-500 to-orange-500"
  },
  {
    title: "Lightning Fast",
    description: "Quick turnaround times without compromising on quality",
    icon: Zap,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Expert Team",
    description: "15+ years of experience in printing and signage solutions",
    icon: Users,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Best Value",
    description: "Competitive pricing with unmatched quality and service",
    icon: Package,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support for your peace of mind",
    icon: Shield,
    gradient: "from-rose-500 to-red-500"
  },
  {
    title: "100% Guarantee",
    description: "Complete satisfaction guaranteed or your money back",
    icon: CheckCircle,
    gradient: "from-indigo-500 to-violet-500"
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    company: "Kumar Electronics",
    content: "Sign World Prints transformed our storefront with stunning LED signage. The quality is outstanding and has significantly increased our foot traffic!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
  },
  {
    name: "Priya Sharma",
    role: "Marketing Manager",
    company: "TechVision Solutions",
    content: "We've been working with Sign World Prints for 3 years. Their vehicle wraps are exceptional and their customer service is always prompt and professional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
  },
  {
    name: "Arun Patel",
    role: "Restaurant Owner",
    company: "Spice Garden Restaurant",
    content: "The backlit menu boards they created for us are absolutely beautiful. Our customers love them and it has enhanced our brand image tremendously!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
  },
  {
    name: "Sneha Reddy",
    role: "Event Coordinator",
    company: "Elegant Events",
    content: "From exhibition stalls to banners, Sign World Prints delivers excellence every single time. They're our go-to partner for all printing needs!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400"
  },
];

const faqs = [
  {
    question: "What's your typical turnaround time?",
    answer: "Standard projects are completed within 5-7 days. Rush orders can be accommodated for an additional fee. Complex projects like large hoardings or vehicle wraps may take 1-2 weeks including design approval and installation."
  },
  {
    question: "Do you offer design services?",
    answer: "Yes! Our talented in-house design team can create custom designs from scratch or work with your existing branding. We provide design mockups and unlimited revisions until you're 100% satisfied with the final result."
  },
  {
    question: "Do you provide installation services?",
    answer: "Absolutely! We offer professional installation services for all our products across Bangalore and surrounding areas. Our experienced installation team ensures perfect placement, alignment, and finish for every project."
  },
  {
    question: "What materials do you use?",
    answer: "We use only premium materials including weather-resistant vinyl, high-grade aluminum, crystal-clear acrylic, stainless steel, brass, and eco-friendly inks. We'll recommend the best material for your specific application, location, and budget."
  },
  {
    question: "Do you offer warranties?",
    answer: "Yes! All our work comes with comprehensive warranties. Standard projects include a 1-year warranty on materials and workmanship. Premium packages include extended warranties up to 3 years. We stand behind the quality of our work."
  },
  {
    question: "What areas do you serve?",
    answer: "We're based in Bangalore at New Bamboo Bazaar Road and serve clients across Bangalore and Karnataka. For large projects, we can also accommodate clients in other major cities. Contact us to discuss your specific location requirements."
  },
  {
    question: "Can I see samples before placing an order?",
    answer: "Yes! We can provide digital mockups for all projects and physical samples for materials and finishes. We encourage clients to visit our showroom at Harmony Dale to see our work firsthand and discuss their requirements in person."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including cash, bank transfers, UPI, credit/debit cards, and cheques. For larger projects, we offer flexible payment terms with a deposit upfront and balance upon completion."
  },
];

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      const increment = end / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.span
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
    >
      {count}{suffix}
    </motion.span>
  );
}

export function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Case Study State
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeCaseStudy]);

  useTracker("home");

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      {/* ── ULTIMATE Luxury Hero Section ──────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
        {/* Deep Animated Gradient Background */}
        <div className="absolute inset-0 bg-transparent overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.08),transparent_40%)]"></div>
        </div>

        {/* Optimized Aurora Orbs (Hardware Accelerated Radial Gradients instead of heavy CSS blur/mix-blend) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_60%)] rounded-full opacity-60"
          />
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] left-[0%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(217,119,6,0.12)_0%,transparent_60%)] rounded-full opacity-50"
          />
        </div>

        {/* Luxury Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-100"></div>

        {/* Floating Glassmorphic Metric Cards (Parallax) */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
          className="hidden lg:flex absolute top-40 right-20 z-20 items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl shadow-xl"
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.8, type: "spring" }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <Star className="w-6 h-6 text-black fill-black" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white font-outfit">4.9/5</p>
            <p className="text-xs text-primary uppercase tracking-widest font-medium">Top Rated Agency</p>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
          className="hidden lg:flex absolute bottom-40 left-20 z-20 items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl shadow-xl"
          initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1, type: "spring" }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center p-3">
            <Shield className="w-full h-full text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white font-outfit">10k+</p>
            <p className="text-xs text-blue-400 uppercase tracking-widest font-medium">Projects Delivered</p>
          </div>
        </motion.div>

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 backdrop-blur-md border border-primary/30 rounded-full mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200 uppercase tracking-widest">
              India's Premier Signage Experts
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] text-white tracking-tight font-outfit"
          >
            Elevate Your
            <br />
            <motion.span
              className="bg-gradient-to-r from-primary via-amber-200 to-primary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              Brand Presence
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Exquisite printing and avant-garde signage solutions crafted for brands that demand nothing but absolute excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/contact"
              className="group relative px-10 py-5 bg-gradient-to-r from-primary to-amber-500 text-black rounded-full font-bold text-lg transition-all duration-300 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        >
          <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">Explore</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2 backdrop-blur-sm"
          >
            <div className="w-1.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
          </motion.div>
        </motion.div>
      </section>      {/* ── Marquee Strip ──────────────────────────────────────── */}
      <div className="py-5 bg-card border-y border-white/5 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[
            "LED Signages", "Outdoor Hoardings", "ACP Signage", "Neon Boards",
            "Vehicle Wraps", "Acrylic Signs", "Metal Letters", "Flex Printing",
            "Digital Displays", "Exhibition Stalls", "Business Cards", "Vinyl Branding",
            "LED Signages", "Outdoor Hoardings", "ACP Signage", "Neon Boards",
            "Vehicle Wraps", "Acrylic Signs", "Metal Letters", "Flex Printing",
            "Digital Displays", "Exhibition Stalls", "Business Cards", "Vinyl Branding",
          ].map((name, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-6 text-sm font-medium uppercase tracking-widest">
              <span className="text-gray-500">{name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Clientele Logo Strip ───────────────────────────────── */}
      <section className="py-12 bg-[#050508] border-b border-white/5 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-6">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2">
            Our Elite Partners
          </span>
          <h3 className="text-2xl font-outfit text-white font-bold">Trusted by Industry Giants</h3>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex justify-center">
          <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full flex justify-center items-center">
            <ClientLogos />
          </div>
        </div>
      </section>
      {/* Stats Section - Enhanced with CountUp */}
      <section className="py-24 bg-card relative overflow-hidden border-b border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.1),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative group"
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-3xl -m-6 blur-2xl"></div>
                <div className="relative text-5xl md:text-7xl font-bold bg-gradient-to-br from-white via-amber-100 to-primary bg-clip-text text-transparent mb-3 font-outfit">
                  <CountUp end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-lg uppercase tracking-widest font-medium text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 glass border-primary/20 text-primary rounded-full mb-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Zap className="w-4 h-4 shadow-primary/50" />
              <span className="text-sm font-medium uppercase tracking-widest">Our Expertise</span>
            </div>
            <h2 className="text-4xl md:text-6xl mb-6 text-white tracking-tight">Masterpieces of Design</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Curated precision printing and artisanal signage, tailored for luxury brands and corporate excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 12).map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                  className="group cursor-pointer relative"
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative overflow-hidden rounded-3xl h-[28rem] bg-[#050505] border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-700">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover filter brightness-[0.5] group-hover:brightness-[0.8] transition-all duration-700"
                      />
                    </motion.div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 mb-6 group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500 translate-y-8 group-hover:translate-y-0">
                        <Icon className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-500" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors duration-500 font-outfit translate-y-8 group-hover:translate-y-0">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 font-light leading-relaxed opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-75">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-10 py-4 glass text-white rounded-full font-medium hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
            >
              Explore Full Collection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Corporate Case Studies ─────────────────────── */}
      <section className="py-24 bg-card/30 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.05),transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 glass border-primary/20 text-primary rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-widest">Case Studies</span>
            </div>
            <h2 className="text-4xl md:text-6xl mb-6 text-white tracking-tight">Corporate Signage Showcases</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Explore how we've helped some of India's biggest brands and enterprises establish premium physical presence.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Sidebar client buttons (Col: 4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-4 pl-2">Select Client</div>
              {corporateCaseStudies.map((cs, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCaseStudy(index)}
                  className={`w-full text-left p-6 rounded-3xl border transition-all duration-500 group flex flex-col gap-1 ${
                    activeCaseStudy === index
                      ? "bg-primary/10 border-primary text-white shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                      : "bg-[#050505]/40 border-white/5 hover:border-white/20 text-gray-400 hover:text-white"
                  }`}
                >
                  <span className={`text-xs uppercase tracking-wider font-semibold font-outfit ${
                    activeCaseStudy === index ? "text-primary" : "text-gray-500"
                  }`}>
                    {cs.category}
                  </span>
                  <span className="text-xl font-bold font-outfit group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2">
                    {cs.name}
                    <ArrowRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                      activeCaseStudy === index ? "text-primary opacity-100" : "text-white"
                    }`} />
                  </span>
                </button>
              ))}
            </div>

            {/* Showcase detail container (Col: 8) */}
            <div className="lg:col-span-8 glass p-2 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.05)] overflow-hidden">
              <div className="bg-[#050508]/80 rounded-[2rem] p-8 md:p-10 space-y-8">
                {/* Visual Showcase (Images) */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/40 border border-white/5 group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeCaseStudy}-${activeImageIndex}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={corporateCaseStudies[activeCaseStudy].images[activeImageIndex]}
                        alt={corporateCaseStudies[activeCaseStudy].name}
                        className="w-full h-full object-cover filter brightness-[0.9] hover:scale-105 transition-transform duration-700"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Image Navigation Controls (Chevrons) - Show only if client has > 1 image */}
                  {corporateCaseStudies[activeCaseStudy].images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImageIndex((prev) => (prev - 1 + corporateCaseStudies[activeCaseStudy].images.length) % corporateCaseStudies[activeCaseStudy].images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-black transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setActiveImageIndex((prev) => (prev + 1) % corporateCaseStudies[activeCaseStudy].images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-black transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Small circular dots indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {corporateCaseStudies[activeCaseStudy].images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImageIndex(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              activeImageIndex === i ? "bg-primary w-6" : "bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                        {corporateCaseStudies[activeCaseStudy].category}
                      </span>
                      <h3 className="text-3xl font-bold text-white font-outfit mt-2">
                        {corporateCaseStudies[activeCaseStudy].name}
                      </h3>
                    </div>
                    <Link
                      to="/portfolio"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-amber-400 font-semibold group"
                    >
                      View All Installations
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Project Overview</h4>
                    <p className="text-gray-400 font-light leading-relaxed text-lg">
                      {corporateCaseStudies[activeCaseStudy].description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Signage Deployed</h4>
                    <div className="flex flex-wrap gap-3">
                      {corporateCaseStudies[activeCaseStudy].signage.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-[#0a0a0f] border border-white/10 px-4 py-2.5 rounded-2xl text-gray-300 text-sm font-light hover:border-primary/40 hover:text-primary transition-all duration-300"
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(212,175,55,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-white tracking-tight">Why Choose Sign World Prints</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              We combine quality, speed, and expertise to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative group p-8 rounded-3xl bg-[#050505] border border-white/10 hover:border-primary/40 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500">
                    <Icon className="w-8 h-8 text-white group-hover:text-primary transition-colors duration-500" />
                  </div>
                  <h3 className="relative z-10 text-xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors duration-500 font-outfit tracking-wide">{feature.title}</h3>
                  <p className="relative z-10 text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-500">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced Carousel */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 glass border-primary/20 text-primary rounded-full mb-6">
              <Star className="w-4 h-4 fill-primary" />
              <span className="text-sm font-medium uppercase tracking-widest">Client Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-white tracking-tight">What Our Clients Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Don't just take our word for it - hear from businesses we've helped succeed
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="bg-[#050505] border border-white/10 rounded-3xl p-12 md:p-16 relative overflow-hidden group hover:border-primary/40 transition-colors duration-700 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
              <Quote className="absolute top-10 left-10 w-24 h-24 text-white/[0.02] group-hover:text-primary/10 transition-colors duration-1000 -rotate-12" />

              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-primary text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                  ))}
                </div>

                <p className="text-2xl text-white mb-10 text-center italic font-light leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>

                <div className="flex items-center justify-center gap-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50 p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      />
                    </div>
                  </div>
                  <div className="text-left flex flex-col justify-center">
                    <div className="font-semibold text-white text-lg tracking-wide">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-gray-400">{testimonials[currentTestimonial].role}</div>
                    <div className="text-xs text-primary uppercase tracking-widest mt-0.5">{testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-6 mt-10">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/50 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentTestimonial
                      ? 'bg-primary w-8 shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                      : 'bg-white/20 hover:bg-white/40'
                      }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/50 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── How We Work ── Process Section ─────────────────────── */}
      <section className="py-24 bg-card border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04),transparent_65%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 glass border-primary/20 text-primary rounded-full mb-6">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-widest">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-white tracking-tight">How We Bring Your Vision to Life</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Four seamless steps from concept to installation
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { step: "01", icon: MessageCircle, title: "Consult",  desc: "We listen to your brand goals, budget, and location to craft the ideal brief." },
                { step: "02", icon: Eye,           title: "Design",   desc: "Our designers create detailed 3D mockups for your approval before production." },
                { step: "03", icon: Package,       title: "Produce",  desc: "Manufactured with premium materials using state-of-the-art equipment." },
                { step: "04", icon: TrendingUp,    title: "Install",  desc: "Expert on-site installation within Bangalore with a quality guarantee." },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="group text-center relative"
                  >
                    {/* Step number */}
                    <div className="relative inline-block mb-8">
                      <div className="w-20 h-20 rounded-full bg-[#050505] border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center mx-auto transition-all duration-500">
                        <Icon className="w-8 h-8 text-white group-hover:text-primary transition-colors duration-500" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-black text-xs font-bold shadow-[0_0_15px_rgba(212,175,55,0.5)] border-2 border-[#050505]">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-400 font-light text-sm leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-full font-semibold hover:bg-amber-400 transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.55)]"
            >
              Start Your Project Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400 font-light">
              Everything you need to know about our services
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 group"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-white group-hover:text-primary transition-colors pr-4 text-lg tracking-wide">{faq.question}</span>
                  {activeFaq === index ? (
                    <Minus className="w-6 h-6 text-primary flex-shrink-0" />
                  ) : (
                    <Plus className="w-6 h-6 text-white/30 group-hover:text-primary flex-shrink-0 transition-colors" />
                  )}
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-gray-400 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── The Ultimate Finish ──────────────────────── */}
      <section className="py-32 bg-[#030305] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_60%)] rounded-full opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(217,119,6,0.1)_0%,transparent_60%)] rounded-full opacity-40"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 bg-[#050508]/80 rounded-3xl p-16 md:p-24 border border-white/10 shadow-2xl backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-outfit leading-[1.1]">
              Ready to Transform Your
              <br/>
              <span className="bg-gradient-to-r from-primary via-amber-200 to-primary bg-clip-text text-transparent italic drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Brand</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Get a free quote today and discover how our world-class signage can elevate your business to extraordinary heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="group relative px-10 py-5 bg-gradient-to-r from-primary to-amber-500 text-black rounded-full font-bold text-lg hover:bg-amber-400 transition-all duration-300 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Request a Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a
                href="tel:+917899634299"
                className="px-10 py-5 bg-black/40 backdrop-blur-xl border border-white/20 hover:bg-white/10 text-white rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105"
              >
                <Phone className="w-5 h-5 text-primary" />
                +91-78996 34299
              </a>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-gray-400 text-sm font-medium tracking-wide">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>24h Response</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}