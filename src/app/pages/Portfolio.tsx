import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, X, Download, ZoomIn, ZoomOut, CheckCircle, Image as ImageIcon, Presentation, Camera, Eye } from "lucide-react";
import { portfolio as portfolioStore } from "../../lib/db";
import { useTracker } from "../../hooks/useTracker";
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

// Corporate Case Study Imports
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

// Dynamic Glob Imports for WhatsApp Photos (119 files) and PPT slides (42 files)
const realPhotosModules = import.meta.glob("../../assets/assets2/imag/*.{jpeg,jpg,png,PNG,JPG,JPEG}", { eager: true });
const pptSlidesModules = import.meta.glob("../../assets/assets2/ppt_images/*.{jpeg,jpg,png,PNG,JPG,JPEG}", { eager: true });

const realInstallationPhotos = Object.values(realPhotosModules).map((mod: any) => mod.default);
const pptSlides = Object.values(pptSlidesModules).map((mod: any) => mod.default);

const corporateCaseStudies = [
  {
    id: "meghraj",
    name: "Meghraj Food & Feast",
    category: "Restaurant & Hospitality",
    description: "A comprehensive brand design and manufacturing of custom acrylic & neon signage boards for high-end dining experiences, highlighting vibrant night-time visibility and architectural alignment.",
    signage: ["3D LED Acrylic Letters", "Dynamic Custom Neon Signs", "Premium Backlit Menu Boards"],
    images: [meghraj1, meghraj2, meghraj3],
  },
  {
    id: "paragon",
    name: "Paragon Stores",
    category: "Corporate Retail Outlets",
    description: "Premium storefront redesign using weather-resistant Aluminum Composite Panels (ACP) and custom brass-finished 3D dimensional lettering, giving the outlets a modern and premium corporate identity.",
    signage: ["Storefront ACP Cladding", "Premium 3D Titanium/Brass Letters", "Illuminated Frontlight Signage"],
    images: [paragon1, paragon2, paragon3],
  },
  {
    id: "safehouse",
    name: "Safehouse Security",
    category: "Enterprise Corporate Offices",
    description: "Sophisticated indoor corporate lobby branding, high-visibility perimeter LED boards, and modern security-themed illuminated signs to reinforce corporate security identity.",
    signage: ["Exterior LED Illuminated Signs", "Indoor Acrylic Corporate Boards", "Edge-Lit Glass Panels"],
    images: [safehouse1, safehouse2],
  },
  {
    id: "cleartax",
    name: "ClearTax Headquarters",
    category: "Fintech Headquarters",
    description: "Large-scale frosted vinyl wall branding, corporate lobby dimensional signs, and custom glass decals to create an inspiring and productive office environment for India's leading fintech.",
    signage: ["Corporate Glass Decals", "Frost Vinyl Wrap", "3D Reception Logo Sign"],
    images: [cleartaxLogo],
  },
  {
    id: "reltio",
    name: "Reltio Offices",
    category: "SaaS Office Interiors",
    description: "Exquisite interior reception board design featuring mirror-finish steel letters mounted on a matte wood panel, projecting innovation and technological sophistication.",
    signage: ["Mirror-Finish Stainless Steel Letters", "Matte Composite Panel Board"],
    images: [reltio1],
  },
  {
    id: "socialpanga",
    name: "Social Panga Agency",
    category: "Creative Agency Office",
    description: "Vibrant, quirky custom neon signage and custom-cut acrylic wall signs that reflect the creative and energetic identity of the agency's workspace.",
    signage: ["Quirky Custom Neon Art", "Large Format Canvas & Vinyl", "Custom Acrylic Signs"],
    images: [socialpanga1],
  },
];

const ALL_PROJECTS = [
  { id: 1,  title: "LED Signages",         category: "led",          image: ledSignage,       description: "Vibrant multi-color LED signage with dynamic lighting" },
  { id: 2,  title: "Outdoor Hoardings",    category: "branding",     image: hoardings,        description: "Large-scale billboard advertising for maximum visibility" },
  { id: 3,  title: "Back Light Signage",   category: "illuminated",  image: backLight,        description: "Professional backlit signage for Auto Touch salon" },
  { id: 4,  title: "Front Light Signage",  category: "illuminated",  image: frontLight,       description: "Front-lit commercial signage for retail stores" },
  { id: 5,  title: "Vinyl Branding",       category: "branding",     image: vinylBranding,    description: "Large format vinyl graphics for walls and windows" },
  { id: 6,  title: "ACP Signage",          category: "specialty",    image: acp,              description: "Premium aluminum composite panel storefront entrance" },
  { id: 7,  title: "Neon Boards",          category: "led",          image: neonBoards,       description: "Colorful neon signage with vibrant glow effects" },
  { id: 8,  title: "Acrylic Signage",      category: "specialty",    image: acrylic,          description: "Modern acrylic signs for retail branding" },
  { id: 9,  title: "Metal Letters",        category: "specialty",    image: metalLetters,     description: "Premium 3D steel/brass/titanium dimensional letters" },
  { id: 10, title: "Digital Signages",     category: "led",          image: digitalSignages,  description: "Dynamic digital display screens with live content" },
  { id: 11, title: "Election Banners",     category: "branding",     image: electionBanners,  description: "Large-scale political campaign banners" },
  { id: 12, title: "Menu Boards",          category: "illuminated",  image: menuBoards,       description: "Illuminated menu boards for restaurants" },
  { id: 13, title: "Vehicle Signages",     category: "branding",     image: vehicleSignages,  description: "Eye-catching mobile branding for promotional vehicles" },
  { id: 14, title: "Flex Printing",        category: "print",        image: flexPrinting,     description: "High-quality flex banner printing machine" },
  { id: 15, title: "Eco Solvent Printing", category: "print",        image: ecoSolvent,       description: "Eco-friendly large format printing technology" },
  { id: 16, title: "Exhibition Stalls",    category: "specialty",    image: exhibitionStalls, description: "Custom exhibition booth for trade shows" },
  { id: 17, title: "Business Cards",       category: "print",        image: businessCards,    description: "Premium business card printing" },
  { id: 18, title: "Pamphlets & Flyers",   category: "print",        image: pamphlets,        description: "Professional pamphlet and brochure printing" },
];

const FILTERS = [
  { id: "all",         label: "All Projects" },
  { id: "led",         label: "LED & Digital" },
  { id: "illuminated", label: "Illuminated Signs" },
  { id: "branding",    label: "Branding & Graphics" },
  { id: "print",       label: "Print Materials" },
  { id: "specialty",   label: "Specialty" },
];

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [allProjects, setAllProjects] = useState(ALL_PROJECTS);

  // Advanced Portfolio Tabs
  const [activeMode, setActiveMode] = useState<"catalog" | "casestudies" | "real" | "ppt">("catalog");
  const [realFilter, setRealFilter] = useState("all");

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);

  // Active Case Study Index for the Case Studies Tab
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(0);
  const [caseStudyImgIndex, setCaseStudyImgIndex] = useState(0);

  useEffect(() => {
    setCaseStudyImgIndex(0);
  }, [selectedCaseStudy]);

  // Lightbox Zoom & Nav Functions
  const handleOpenLightbox = (images: string[], index = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setZoomScale(1);
    setLightboxOpen(true);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = lightboxImages[lightboxIndex];
    link.download = `signworld-portfolio-${lightboxIndex + 1}.png`;
    link.click();
  };

  useTracker("portfolio");

  // Merge admin edits/additions/hidden from Supabase on mount
  useEffect(() => {
    (async () => {
      const [hiddenIds, defaultEdits, customProjects] = await Promise.all([
        portfolioStore.getHiddenIds(),
        portfolioStore.getDefaultEdits(),
        portfolioStore.getCustom(),
      ]);

      const defaults = ALL_PROJECTS
        .filter(p => !hiddenIds.includes(p.id))
        .map(p => {
          const edit = defaultEdits[p.id];
          if (!edit) return p;
          return {
            ...p,
            title: edit.title || p.title,
            description: edit.description || p.description,
            category: edit.category || p.category,
          };
        });

      const custom = customProjects.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        image: p.image_url ?? "",
        description: p.description ?? "",
      }));

      setAllProjects([...defaults, ...custom]);
    })();
  }, []);

  const filtered = activeFilter === "all"
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  // Categorize 119 real-world photos
  const categorizedRealPhotos = realInstallationPhotos.map((url, index) => {
    // Balance them across categories
    let category = "led";
    if (index % 3 === 1) category = "storefront";
    else if (index % 3 === 2) category = "print";
    return { url, category };
  });

  const filteredRealPhotos = realFilter === "all"
    ? categorizedRealPhotos
    : categorizedRealPhotos.filter((p) => p.category === realFilter);

  return (
    <div className="min-h-screen bg-transparent font-jakarta text-gray-400">
      <Header />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-40 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_55%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2.5 glass rounded-full mb-8 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium uppercase tracking-widest text-primary">Our Masterpieces</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-8 text-white font-bold tracking-tight font-outfit">
              Our Work Speaks{" "}
              <span className="text-primary italic font-light">Volumes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              Browse through our portfolio of successful projects, real installation showcases, and custom design blueprints.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── High-Level Mode Switcher ────────────────────────── */}
      <section className="pb-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-2 rounded-[2rem] border border-white/5 max-w-4xl mx-auto shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: "catalog",      label: "Product Catalog",      icon: ImageIcon },
                { id: "casestudies",   label: "Corporate Showcases",  icon: CheckCircle },
                { id: "real",         label: "Real Installations",   icon: Camera },
                { id: "ppt",          label: "Design Proposals",     icon: Presentation }
              ].map((m) => {
                const Icon = m.icon;
                const active = activeMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveMode(m.id as any)}
                    className={`flex items-center justify-center gap-2.5 px-4 py-4 rounded-2xl font-semibold transition-all duration-300 text-xs tracking-wider uppercase font-outfit ${
                      active
                        ? "bg-primary text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Dynamic Content Area ───────────────────────── */}
      <div className="relative z-10">
        {/* MODE 1: PRODUCT CATALOG */}
        {activeMode === "catalog" && (
          <>
            {/* Filter Bar */}
            <div className="py-8 bg-[#030305]/80 backdrop-blur-xl border-y border-white/5 sticky top-[72px] md:top-[88px] z-40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center gap-3">
                  {FILTERS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={`px-7 py-2.5 rounded-full font-medium transition-all duration-300 text-sm tracking-wide ${
                        activeFilter === f.id
                          ? "bg-primary text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                          : "glass text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            <section className="py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filtered.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: i * 0.04, ease: "easeOut" }}
                      className="group cursor-pointer"
                      onClick={() => handleOpenLightbox([project.image], 0)}
                    >
                      <div className="relative overflow-hidden rounded-3xl border border-white/5 group-hover:border-primary/50 transition-all duration-700 h-[26rem] bg-card">
                        <div className="absolute inset-0 overflow-hidden">
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="w-10 h-[3px] bg-primary mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                          <h3 className="text-2xl font-bold text-white mb-2 font-outfit group-hover:text-primary transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {project.description}
                          </p>
                        </div>
                        <div className="absolute top-5 right-5 px-3 py-1 glass rounded-full text-primary text-xs font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.category}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="text-center py-20 glass rounded-3xl mt-10 border border-white/5">
                    <p className="text-xl text-gray-400 font-light">No projects found in this category yet.</p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* MODE 2: CORPORATE SHOWCASES */}
        {activeMode === "casestudies" && (
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Sidebar selectors */}
              <div className="lg:col-span-4 space-y-4">
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-4 pl-2">Select Corporate Case Study</div>
                {corporateCaseStudies.map((cs, index) => (
                  <button
                    key={cs.id}
                    onClick={() => setSelectedCaseStudy(index)}
                    className={`w-full text-left p-6 rounded-3xl border transition-all duration-500 group flex flex-col gap-1 ${
                      selectedCaseStudy === index
                        ? "bg-primary/10 border-primary text-white shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                        : "bg-[#050505]/40 border-white/5 hover:border-white/20 text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className={`text-xs uppercase tracking-wider font-semibold font-outfit ${
                      selectedCaseStudy === index ? "text-primary" : "text-gray-500"
                    }`}>
                      {cs.category}
                    </span>
                    <span className="text-xl font-bold font-outfit group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2">
                      {cs.name}
                      <ArrowRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                        selectedCaseStudy === index ? "text-primary opacity-100" : "text-white"
                      }`} />
                    </span>
                  </button>
                ))}
              </div>

              {/* Showcase visual and details */}
              <div className="lg:col-span-8 glass p-2 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.05)]">
                <div className="bg-[#050508]/90 rounded-[2.2rem] p-8 md:p-10 space-y-8">
                  {/* Gallery Slide Display */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/40 border border-white/5 group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${selectedCaseStudy}-${caseStudyImgIndex}`}
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full cursor-zoom-in"
                        onClick={() => handleOpenLightbox(corporateCaseStudies[selectedCaseStudy].images, caseStudyImgIndex)}
                      >
                        <ImageWithFallback
                          src={corporateCaseStudies[selectedCaseStudy].images[caseStudyImgIndex]}
                          alt={corporateCaseStudies[selectedCaseStudy].name}
                          className="w-full h-full object-cover filter brightness-[0.9]"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Gallery Navigation Controls */}
                    {corporateCaseStudies[selectedCaseStudy].images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCaseStudyImgIndex((prev) => (prev - 1 + corporateCaseStudies[selectedCaseStudy].images.length) % corporateCaseStudies[selectedCaseStudy].images.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setCaseStudyImgIndex((prev) => (prev + 1) % corporateCaseStudies[selectedCaseStudy].images.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {corporateCaseStudies[selectedCaseStudy].images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCaseStudyImgIndex(i)}
                              className={`w-2.5 h-2.5 rounded-full transition-all ${
                                caseStudyImgIndex === i ? "bg-primary w-6" : "bg-white/30"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Text details */}
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          {corporateCaseStudies[selectedCaseStudy].category}
                        </span>
                        <h2 className="text-3xl font-bold text-white font-outfit mt-2">
                          {corporateCaseStudies[selectedCaseStudy].name}
                        </h2>
                      </div>
                      <button
                        onClick={() => handleOpenLightbox(corporateCaseStudies[selectedCaseStudy].images, caseStudyImgIndex)}
                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full text-sm text-white transition-all font-semibold"
                      >
                        <Eye className="w-4 h-4 text-primary" /> Full Screen View
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-widest">Case Description</h4>
                      <p className="text-gray-400 font-light leading-relaxed text-lg">
                        {corporateCaseStudies[selectedCaseStudy].description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-widest">Signage Systems Deployed</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {corporateCaseStudies[selectedCaseStudy].signage.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-[#050508] border border-white/10 px-4 py-2 rounded-xl text-gray-300 text-sm font-light hover:border-primary hover:text-primary transition-colors duration-300"
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
          </section>
        )}

        {/* MODE 3: REAL-WORLD INSTALLATIONS */}
        {activeMode === "real" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {/* Filter controls */}
            <div className="flex flex-wrap justify-center gap-3 border-b border-white/5 pb-8">
              {[
                { id: "all",         label: "All Installations" },
                { id: "led",         label: "LED & Neon" },
                { id: "storefront",  label: "Storefronts & ACP" },
                { id: "print",       label: "Prints & Banners" }
              ].map((rf) => (
                <button
                  key={rf.id}
                  onClick={() => setRealFilter(rf.id)}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    realFilter === rf.id
                      ? "bg-primary text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                      : "glass text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {rf.label}
                </button>
              ))}
            </div>

            {/* Masonry-like dynamic grid layout */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {filteredRealPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 12) * 0.03 }}
                  className="break-inside-avoid relative rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in bg-card"
                  onClick={() => handleOpenLightbox(filteredRealPhotos.map(p => p.url), index)}
                >
                  <ImageWithFallback
                    src={photo.url}
                    alt={`Sign World Installation ${index + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-500 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-white text-sm font-semibold font-outfit uppercase tracking-wider">
                        Installation #{index + 1}
                      </span>
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredRealPhotos.length === 0 && (
              <div className="text-center py-20 glass rounded-3xl border border-white/5">
                <p className="text-xl text-gray-400 font-light">No installation photos found in this category.</p>
              </div>
            )}
          </section>
        )}

        {/* MODE 4: DESIGN PROPOSALS & BLUEPRINTS */}
        {activeMode === "ppt" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2 font-outfit">Project Blueprinting</span>
              <h3 className="text-2xl text-white font-bold font-outfit">Mockups & Client Presentation Slides</h3>
              <p className="text-sm text-gray-400 mt-2 font-light">Browse through original slides representing design drafts, specifications, and machinery planning used in execution.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pptSlides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                  className="relative rounded-3xl overflow-hidden aspect-[16/9] border border-white/10 group cursor-zoom-in bg-card"
                  onClick={() => handleOpenLightbox(pptSlides, index)}
                >
                  <ImageWithFallback
                    src={slide}
                    alt={`Design Blueprint Slide ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-5 py-2.5 glass border border-white/10 rounded-full text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-lg">
                      <Eye className="w-4 h-4 text-primary" /> Slide {index + 1}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {pptSlides.length === 0 && (
              <div className="text-center py-20 glass rounded-3xl border border-white/5">
                <p className="text-xl text-gray-400 font-light">No blueprint slides found.</p>
              </div>
            )}
          </section>
        )}
      </div>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <section className="py-24 bg-[#050508] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.08),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: "10,000+", label: "Projects Completed" },
              { value: "500+",    label: "Happy Clients" },
              { value: "35+",     label: "Years Experience" },
              { value: "99%",     label: "Satisfaction Rate" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-br from-white via-amber-100 to-primary bg-clip-text mb-4 font-outfit">
                  {s.value}
                </div>
                <div className="text-gray-400 text-sm font-medium uppercase tracking-widest group-hover:text-primary transition-colors duration-300">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.06),transparent_65%)]" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-outfit tracking-tight">
              Ready to Create Something{" "}
              <span className="text-primary italic font-light">Extraordinary?</span>
            </h2>
            <p className="text-xl text-gray-400 font-light mb-10 leading-relaxed">
              Let's collaborate on a project that will elevate your brand to world-class standards.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-black rounded-full font-bold text-lg hover:bg-amber-400 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)]"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* ── Fullscreen Lightbox ──────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-all z-50 border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
              <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center overflow-hidden">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ scale: zoomScale }}
                  className="transition-transform duration-200"
                >
                  <img
                    src={lightboxImages[lightboxIndex]}
                    alt="Enlarged Sign World Artwork"
                    className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/10"
                  />
                </motion.div>

                {lightboxImages.length > 1 && (
                  <button
                    onClick={() => {
                      setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
                      setZoomScale(1);
                    }}
                    className="absolute left-4 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-primary hover:text-black hover:scale-105 transition-all"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                )}

                {lightboxImages.length > 1 && (
                  <button
                    onClick={() => {
                      setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
                      setZoomScale(1);
                    }}
                    className="absolute right-4 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-primary hover:text-black hover:scale-105 transition-all"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                )}
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 relative z-10 w-full max-w-md">
                <div className="text-gray-400 text-sm font-semibold tracking-wider font-outfit uppercase">
                  Image {lightboxIndex + 1} of {lightboxImages.length}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 3))}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-primary transition-all border border-white/10"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.75))}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-primary transition-all border border-white/10"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setZoomScale(1)}
                    className="px-4 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-primary text-xs uppercase tracking-widest font-semibold transition-all border border-white/10"
                  >
                    Reset
                  </button>

                  <button
                    onClick={handleDownload}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-primary transition-all border border-white/10"
                    title="Download Image"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}