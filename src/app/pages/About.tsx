import { motion } from "motion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTracker } from "../../hooks/useTracker";
import { ClientLogos } from "../components/ClientLogos";
import { 
  Target, 
  Award, 
  Users, 
  Heart,
  Sparkles,
  CheckCircle,
  Globe,
  TrendingUp,
  Shield,
  Zap,
  Building2,
  MapPin
} from "lucide-react";

export function About() {
  useTracker("about");
  const values = [
    {
      icon: Award,
      title: "35+ Years Experience",
      description: "Over three decades of excellence in printing and signage solutions across India",
      gradient: "from-amber-400/20 to-yellow-600/20 text-primary border border-primary/20"
    },
    {
      icon: Users,
      title: "500+ Clientele",
      description: "Trusted by some of the world's biggest companies and brands",
      gradient: "from-amber-400/20 to-yellow-600/20 text-primary border border-primary/20"
    },
    {
      icon: Globe,
      title: "International Standards",
      description: "Associated with international sign forums for latest standards and technologies",
      gradient: "from-amber-400/20 to-yellow-600/20 text-primary border border-primary/20"
    },
    {
      icon: TrendingUp,
      title: "Ever Growing Range",
      description: "Product range continuously expanding with latest technology innovations",
      gradient: "from-amber-400/20 to-yellow-600/20 text-primary border border-primary/20"
    },
    {
      icon: Shield,
      title: "Quality Commitment",
      description: "Committed to serving customers with cutting-edge technology and quality",
      gradient: "from-amber-400/20 to-yellow-600/20 text-primary border border-primary/20"
    },
    {
      icon: Building2,
      title: "South India Coverage",
      description: "Operations across Bangalore, Chennai, Hyderabad and more",
      gradient: "from-amber-400/20 to-yellow-600/20 text-primary border border-primary/20"
    }
  ];

  const stats = [
    { number: "35+", label: "Years Experience", icon: Award },
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "10000+", label: "Projects Completed", icon: Target },
    { number: "4", label: "Major Cities", icon: MapPin }
  ];

  const milestones = [
    { 
      year: "1988", 
      event: "Company Founded", 
      description: "Sign World established with a vision to revolutionize signage industry in India" 
    },
    { 
      year: "1995", 
      event: "International Recognition", 
      description: "Associated with international sign forums for latest standards and technologies" 
    },
    { 
      year: "2005", 
      event: "Regional Expansion", 
      description: "Expanded operations across South India including Chennai and Hyderabad" 
    },
    { 
      year: "2010", 
      event: "Technology Upgrade", 
      description: "Invested in state-of-the-art printing and installation equipment" 
    },
    { 
      year: "2015", 
      event: "500th Major Client", 
      description: "Milestone achievement serving world's biggest companies and brands" 
    },
    { 
      year: "2020", 
      event: "Innovation Leader", 
      description: "Recognized as most sought after signage company in Bangalore" 
    },
    { 
      year: "2024", 
      event: "Industry Pioneer", 
      description: "Leading with latest sign technologies and expanding product range" 
    }
  ];

  const locations = [
    { city: "Bangalore", state: "Karnataka", role: "Headquarters" },
    { city: "Chennai", state: "Tamil Nadu", role: "Regional Office" },
    { city: "Hyderabad", state: "Telangana", role: "Regional Office" },
    { city: "South India", state: "Multiple Cities", role: "Service Coverage" }
  ];

  return (
    <div className="min-h-screen bg-transparent font-jakarta text-gray-400">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-transparent relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2.5 glass text-primary rounded-full mb-8 font-outfit shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium uppercase tracking-widest text-primary">About Sign World Prints</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-8 text-white font-bold tracking-tight font-outfit">
              <span className="text-primary italic font-light">
                35+ Years
              </span>
              {" "}of Excellence
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              India's most sought-after signage company, trusted by 500+ world-class brands with operations across South India
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 bg-card border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center border-white/5 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                      <Icon className="w-10 h-10 text-primary shadow-primary/50" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-3 font-outfit group-hover:text-primary transition-colors duration-300">{stat.number}</div>
                  <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Clientele Logo Strip ───────────────────────────────── */}
      <section className="py-16 bg-card border-b border-white/5 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-8">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2 font-outfit">
            Our Elite Partners
          </span>
          <h3 className="text-3xl font-outfit text-white font-bold">Trusted by Over 500+ Top Brands</h3>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex justify-center">
          <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full flex justify-center items-center">
            <ClientLogos />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2.5 glass text-primary rounded-full mb-8 font-outfit shadow-[0_0_15px_rgba(212,175,55,0.15)] border border-white/5">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium uppercase tracking-widest text-primary">Our Legacy</span>
              </div>
              <h2 className="text-4xl md:text-5xl mb-8 text-white font-outfit font-bold tracking-tight">The Sign World Story</h2>
              <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
                <p>
                  <strong className="text-white">Sign World</strong> brings a rich experience of <strong className="text-primary font-medium">35+ Years</strong> in printing & installation of a wide variety of signages for companies across various portfolios.
                </p>
                <p>
                  With our office in <strong className="text-white">Bangalore</strong>, our operations span all around <strong className="text-primary font-medium">South India</strong>, in cities such as Bangalore, Chennai, Hyderabad, & more.
                </p>
                <p>
                  Sign World now has over a <strong className="text-primary font-medium">500+ clientele</strong> of some of the world's biggest companies and brands.
                </p>
                <p>
                  We are associated with several <strong className="text-primary font-medium">International Sign Forums</strong> from where we get the latest sign standards and updates on new technologies being used in the industry.
                </p>
                <p>
                  Our product range, which is ever growing, continues to expand with time & we stand committed to serving our customers with the <strong className="text-white font-medium">latest technology</strong>.
                </p>
                <p className="text-2xl font-semibold text-white pt-6 font-outfit">
                  We are one of the most sought-after signage companies in Bangalore.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)] rounded-3xl blur-2xl"></div>
              <div className="relative glass p-2 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800"
                  alt="Sign World Prints Legacy"
                  className="w-full h-[600px] object-cover rounded-[1.5rem] filter brightness-[0.85]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-outfit font-bold tracking-tight">Our Core Values</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              The foundational principles that guide everything we engineer.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass p-10 rounded-3xl border border-white/5 hover:border-primary/50 group transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-8 relative z-10`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Icon className="w-8 h-8 text-primary shadow-primary/50" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300 font-outfit relative z-10">{value.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed relative z-10">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold font-outfit tracking-tight">Our Journey</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              Key milestones that forged our legacy in the industry.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/30 to-transparent"></div>

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={`relative grid md:grid-cols-2 gap-10 items-center ${
                    index % 2 === 0 ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}>
                    <div className="inline-block md:inline px-5 py-2 glass text-primary rounded-full text-sm tracking-widest font-bold mb-4 border border-white/5">
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white font-outfit">{milestone.event}</h3>
                    <p className="text-gray-400 font-light leading-relaxed">{milestone.description}</p>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 w-5 h-5 bg-primary rounded-full transform -translate-x-1/2 ring-8 ring-background shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-24 bg-card border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(212,175,55,0.05),transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2.5 glass text-primary rounded-full mb-6 uppercase tracking-widest text-sm font-medium border border-white/5">
              <MapPin className="w-4 h-4" />
              <span>Our Presence</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold font-outfit tracking-tight">Serving Across South India</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              With deep operations in major cities, we're dynamically poised to serve you locally.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-background border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors duration-500">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-outfit">{location.city}</h3>
                <p className="text-sm text-gray-400 mb-6 font-light">{location.state}</p>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase tracking-wider">
                  {location.role}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl mb-10 text-white font-bold font-outfit tracking-tight">Why Elite Businesses Choose Us</h2>
              <div className="space-y-6">
                {[
                  "35+ years of industry leadership and experience",
                  "Associated with international sign forums",
                  "Latest sign standards and cutting-edge technologies",
                  "Ever-growing product range with innovation",
                  "Operations across South India (Bangalore, Chennai, Hyderabad)",
                  "Trusted by 500+ world-class companies and brands",
                  "State-of-the-art printing and installation equipment",
                  "Comprehensive design to installation services",
                  "Most sought-after signage company in Bangalore"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle className="w-7 h-7 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-gray-400 font-light">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative glass p-2 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc3MjY2OTg4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Our Workspace"
                  className="w-full h-[600px] object-cover rounded-[1.5rem] filter brightness-[0.80]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}