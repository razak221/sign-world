import { motion } from "motion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  Lightbulb,
  Monitor,
  Zap,
  Palette,
  Box,
  Building2,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Flag,
  Car,
  Printer,
  FileText,
  CreditCard,
  Store
} from "lucide-react";
import { Link } from "react-router";
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

export function Services() {
  useTracker("services");
  const services = [
    {
      icon: Lightbulb,
      title: "LED Signages",
      description: "High-impact illuminated LED signs that make your brand stand out day and night with vibrant, energy-efficient lighting.",
      features: [
        "Energy-efficient LED technology",
        "Bright & vibrant illumination",
        "Weather-resistant design",
        "Long-lasting durability",
        "Custom colors & designs"
      ],
      image: ledSignage
    },
    {
      icon: Building2,
      title: "Hoardings",
      description: "Large-scale outdoor advertising billboards that capture attention and maximize brand visibility in high-traffic areas.",
      features: [
        "High-traffic locations",
        "Large format printing",
        "Weather-resistant materials",
        "Professional installation",
        "Creative design support"
      ],
      image: hoardings
    },
    {
      icon: Zap,
      title: "Back Light Signage",
      description: "Illuminated signs with backlighting that create stunning visual effects and ensure 24/7 brand visibility.",
      features: [
        "Uniform backlighting",
        "High visibility at night",
        "Energy-efficient LEDs",
        "Custom shapes & sizes",
        "Easy maintenance"
      ],
      image: backLight
    },
    {
      icon: Lightbulb,
      title: "Front Light Signage",
      description: "Professionally lit signage with front illumination that highlights your business with clarity and style.",
      features: [
        "Directed front lighting",
        "Enhanced readability",
        "Weather-resistant setup",
        "Multiple lighting options",
        "Cost-effective solution"
      ],
      image: frontLight
    },
    {
      icon: Palette,
      title: "Vinyl Branding",
      description: "High-quality vinyl graphics and branding solutions for walls, windows, vehicles, and more to elevate your brand presence.",
      features: [
        "Full-color printing",
        "Durable vinyl material",
        "Wall & window graphics",
        "Vehicle wraps",
        "Easy application & removal"
      ],
      image: vinylBranding
    },
    {
      icon: Box,
      title: "ACP Signage",
      description: "Premium Aluminum Composite Panel signs offering a sleek, modern look with exceptional durability for storefronts.",
      features: [
        "Lightweight yet strong",
        "Weather & rust resistant",
        "Smooth premium finish",
        "3D letter mounting",
        "Long-lasting quality"
      ],
      image: acp
    },
    {
      icon: Zap,
      title: "Neon Boards",
      description: "Eye-catching neon signage that brings a vibrant, retro aesthetic to your business with customizable colors and designs.",
      features: [
        "Bright neon glow",
        "Custom color options",
        "Energy-efficient LED neon",
        "Indoor & outdoor use",
        "Unique retro style"
      ],
      image: neonBoards
    },
    {
      icon: Box,
      title: "Acrylic Signage",
      description: "Modern acrylic signs with a professional finish, perfect for indoor displays, reception areas, and office branding.",
      features: [
        "Crystal-clear finish",
        "Lightweight & durable",
        "3D & flat options",
        "Various thickness choices",
        "Easy to clean & maintain"
      ],
      image: acrylic
    },
    {
      icon: Building2,
      title: "Steel / Brass / Titanium Letters",
      description: "Premium 3D metal letters crafted from steel, brass, or titanium for a sophisticated, high-end brand presence.",
      features: [
        "Premium metal materials",
        "3D dimensional letters",
        "Brushed or polished finish",
        "Corrosion-resistant",
        "Luxurious appearance"
      ],
      image: metalLetters
    },
    {
      icon: Monitor,
      title: "Digital Signages",
      description: "Dynamic digital display solutions that deliver engaging content with the flexibility to update messaging in real-time.",
      features: [
        "HD digital displays",
        "Remote content updates",
        "Interactive options",
        "Video & animation support",
        "Energy-efficient screens"
      ],
      image: digitalSignages
    },
    {
      icon: Flag,
      title: "Election Banners",
      description: "High-quality election banners that effectively communicate your campaign message to voters.",
      features: [
        "Full-color printing",
        "Durable materials",
        "Custom sizes & designs",
        "Weather-resistant",
        "Quick turnaround"
      ],
      image: electionBanners
    },
    {
      icon: Car,
      title: "Vehicle Signages",
      description: "Custom vehicle wraps and graphics that enhance your brand presence on the road.",
      features: [
        "Full-color printing",
        "Durable vinyl material",
        "Custom designs",
        "Weather-resistant",
        "Easy application"
      ],
      image: vehicleSignages
    },
    {
      icon: Printer,
      title: "Flex Printing",
      description: "High-quality flex printing for a wide range of applications, including banners, flags, and more.",
      features: [
        "Full-color printing",
        "Durable materials",
        "Custom sizes & designs",
        "Weather-resistant",
        "Quick turnaround"
      ],
      image: flexPrinting
    },
    {
      icon: Printer,
      title: "Eco Solvent Printing",
      description: "Eco-friendly printing technology that produces high-quality graphics with minimal environmental impact.",
      features: [
        "Eco-friendly ink",
        "High resolution prints",
        "Wide format capability",
        "UV resistant",
        "Indoor & outdoor use"
      ],
      image: ecoSolvent
    },
    {
      icon: Store,
      title: "Exhibition Stalls",
      description: "Custom exhibition stalls that showcase your brand in style and attract potential customers.",
      features: [
        "Custom booth design",
        "Professional setup",
        "Eye-catching graphics",
        "Portable & reusable",
        "Complete branding solution"
      ],
      image: exhibitionStalls
    },
    {
      icon: CreditCard,
      title: "Business Cards",
      description: "Professional business cards that make a lasting impression and provide essential contact information.",
      features: [
        "Premium quality paper",
        "Full-color printing",
        "Multiple finish options",
        "Custom designs",
        "Fast turnaround"
      ],
      image: businessCards
    },
    {
      icon: FileText,
      title: "Pamphlets & Flyers",
      description: "Informative pamphlets and flyers that effectively communicate your products or services to your audience.",
      features: [
        "Full-color printing",
        "Various paper stocks",
        "Multiple folding options",
        "Custom sizes available",
        "Bulk printing discounts"
      ],
      image: pamphlets
    },
    {
      icon: Box,
      title: "Menu Boards",
      description: "Custom menu boards that enhance your restaurant's ambiance and provide clear, attractive food and drink options.",
      features: [
        "LED illuminated options",
        "Easy to update",
        "Weather-resistant",
        "Custom designs",
        "Multiple sizes available"
      ],
      image: menuBoards
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your needs, vision, and budget to create the perfect solution."
    },
    {
      step: "02",
      title: "Design",
      description: "Our team creates mockups and design proofs for your approval."
    },
    {
      step: "03",
      title: "Production",
      description: "We use state-of-the-art equipment to bring your design to life."
    },
    {
      step: "04",
      title: "Installation",
      description: "Professional installation services ensure perfect results."
    }
  ];

  return (
    <div className="min-h-screen bg-transparent font-jakarta">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2.5 glass rounded-full mb-8 font-outfit">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium uppercase tracking-widest text-primary">Masterclass Capabilities</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-8 text-white font-bold tracking-tight font-outfit">
              Comprehensive Printing <span className="text-primary italic font-light">&</span> Signage Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              From visionary concept to flawless installation, we provide end-to-end printing services tailored to elevate your business presence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`grid lg:grid-cols-2 gap-16 items-center group ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="relative rounded-3xl overflow-hidden glass border-white/5 group-hover:border-primary/30 transition-all duration-700">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full"
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-[500px] object-cover filter brightness-[0.85] group-hover:brightness-100 transition-all duration-700"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-60"></div>
                      <div className="absolute top-6 left-6 w-16 h-16 bg-background/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-500">
                        <Icon className="w-8 h-8 text-primary shadow-primary/50" />
                      </div>
                    </div>
                  </div>

                  <div className={isEven ? '' : 'lg:order-1'}>
                    <h2 className="text-4xl md:text-5xl mb-6 font-bold text-white font-outfit tracking-tight group-hover:text-primary transition-colors duration-500">{service.title}</h2>
                    <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">{service.description}</p>

                    <div className="space-y-4 mb-10">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 font-light text-lg">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 px-8 py-4 glass text-white rounded-full font-medium hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                    >
                      Request Consultation
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-outfit font-bold tracking-tight">Our Precision Process</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              A streamlined, biological approach to deliver high-end bespoke results every time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                <div className="glass p-10 rounded-3xl border-white/5 hover:border-primary/50 transition-all duration-500 h-full relative z-10">
                  <div className="text-7xl font-bold text-white/5 group-hover:text-primary/20 transition-colors duration-500 mb-6 font-outfit">{item.step}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-[50%] -right-6 w-12 h-[2px] bg-gradient-to-r from-primary/50 to-transparent z-0"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -transform-x-1/2 -transform-y-1/2 w-[800px] h-[800px] bg-primary rounded-full mix-blend-screen filter blur-[200px] opacity-10 animate-pulse"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass border border-white/10 rounded-[3rem] p-16 md:p-20 text-center relative overflow-hidden group hover:border-primary/30 transition-all duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h2 className="text-5xl md:text-6xl text-white mb-8 font-bold font-outfit tracking-tight relative z-10">
              Ready to <span className="text-primary italic">Elevate</span> Your Brand?
            </h2>
            <p className="text-2xl text-gray-400 font-light mb-12 max-w-3xl mx-auto leading-relaxed relative z-10">
              Contact our experts today for a premium consultation. Let's engineer your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link
                to="/contact"
                className="px-10 py-5 bg-primary text-black rounded-full font-bold hover:bg-amber-400 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg"
              >
                Request Consultation
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                to="/portfolio"
                className="px-10 py-5 glass border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center text-lg"
              >
                Explore Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}