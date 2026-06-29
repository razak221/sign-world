import { useState } from "react";
import { motion } from "motion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Sparkles,
  CheckCircle,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { messages as msgStore } from "../../lib/db";
import { useTracker } from "../../hooks/useTracker";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useTracker("contact");

  // Live open/closed indicator — IST = UTC+5:30
  const nowIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = nowIST.getDay(); // 0=Sun, 6=Sat
  const hour = nowIST.getHours();
  const min = nowIST.getMinutes();
  const timeVal = hour * 60 + min;
  const isOpenNow =
    (day >= 1 && day <= 5 && timeVal >= 8 * 60 && timeVal < 18 * 60) || // Mon-Fri 8-18
    (day === 6 && timeVal >= 9 * 60 && timeVal < 14 * 60);               // Sat 9-14

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to Supabase admin inbox
    await msgStore.add({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      read: false,
    });

    toast.success("Quote request submitted! We'll contact you within 24 hours.");
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    });
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+91-78996 34299, +91-98444 96579, +91 99868 88937",
      link: "tel:+917899634299"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@signworldprints.com",
      link: "mailto:info@signworldprints.com"
    },
    {
      icon: MapPin,
      title: "Address",
      details: "# 26 Ground Floor, Harmony Dale, New Bamboo Bazaar Road, Bangalore 560 051",
      link: "#"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
      link: "#",
      extra: isOpenNow
        ? { open: true,  label: "Open Now" }
        : { open: false, label: "Closed Now" }
    }
  ];

  const services = [
    "Business Signage",
    "Vehicle Wraps",
    "Banners & Flags",
    "Custom Stickers",
    "Print Materials",
    "Specialty Printing",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-transparent font-jakarta text-gray-400">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2.5 glass text-primary rounded-full mb-8 font-outfit shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium uppercase tracking-widest text-primary">Get In Touch</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-8 text-white font-bold tracking-tight font-outfit">
              Let's Bring Your <span className="text-primary italic font-light">Vision</span> to Life
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              Get a premier free quote today. We're here to answer your questions and help you engineer something extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass p-8 rounded-3xl border border-white/5 shadow-2xl hover:border-primary/50 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-16 h-16 bg-background rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 relative z-10">
                    <Icon className="w-8 h-8 text-primary shadow-primary/50" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white font-outfit relative z-10">{info.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">{info.details}</p>
                  {"extra" in info && info.extra && (
                    <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold relative z-10 ${
                      info.extra.open
                        ? "bg-green-500/15 text-green-400 border border-green-500/30"
                        : "bg-red-500/15 text-red-400 border border-red-500/30"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${info.extra.open ? "bg-green-400 animate-pulse" : "bg-red-400"}`}></span>
                      {info.extra.label}
                    </div>
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* WhatsApp CTA */}
          <motion.a
            href="https://wa.me/917899634299?text=Hi%20Sign%20World%20Prints%2C%20I%20am%20interested%20in%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 mx-auto flex items-center justify-center gap-4 w-full max-w-md px-8 py-5 rounded-2xl font-semibold text-white text-lg transition-all duration-300 group"
            style={{ background: "linear-gradient(135deg, #25d366 0%, #128c4c 100%)", boxShadow: "0 0 30px rgba(37,211,102,0.35)" }}
          >
            <MessageSquare className="w-6 h-6" />
            Chat on WhatsApp
            <span className="text-sm font-normal opacity-80">+91-78996 34299</span>
          </motion.a>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass p-10 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full mix-blend-screen filter blur-[80px]"></div>
              
              <h2 className="text-4xl mb-6 text-white font-bold font-outfit relative z-10">Request a Bespoke Quote</h2>
              <p className="text-lg text-gray-400 font-light mb-10 relative z-10">
                Provide your details below and our specialists will connect with you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-600 font-light"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-600 font-light"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-600 font-light"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-light appearance-none"
                  >
                    <option value="" className="bg-background text-gray-400">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service} className="bg-background text-white">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none placeholder-gray-600 font-light"
                    placeholder="Tell us about your project, including volume, scale, and any bespoke requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-5 bg-primary text-black rounded-xl font-bold hover:bg-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:pl-12"
            >
              <div className="sticky top-40">
                <h3 className="text-4xl mb-8 text-white font-bold font-outfit">Why Request an Estimate?</h3>
                
                <div className="space-y-6 mb-12">
                  {[
                    "Receive precise pricing models for your exact requirements",
                    "Complimentary design and material consultation",
                    "A 100% commitment-free inquiry process",
                    "Rapid deployment roadmap within 24 hours",
                    "Expert structural and visual advice",
                    "Flexible commercial payment structures"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <CheckCircle className="w-7 h-7 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400 font-light text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="glass p-10 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h4 className="text-2xl font-bold mb-4 text-white font-outfit relative z-10">Still Undecided?</h4>
                  <p className="text-gray-400 font-light mb-8 leading-relaxed relative z-10">
                    Our master engineers are waiting to guide you towards the most impactful solution tailor-made for your brand.
                  </p>
                  <a
                    href="tel:+917899634299"
                    className="inline-flex items-center gap-3 px-8 py-4 glass border-white/20 text-white rounded-xl font-medium hover:bg-white/10 transition-all relative z-10 w-full justify-center"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    Connect Directly
                  </a>
                </div>

                <div className="mt-8 p-8 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-md">
                  <h4 className="font-semibold mb-3 text-white">Direct Correspondence</h4>
                  <p className="text-gray-400 text-sm mb-4 font-light leading-relaxed">
                    Prefer detailing your structural requirements via email instead?
                  </p>
                  <a
                    href="mailto:info@signworldprints.com"
                    className="text-primary font-medium hover:underline tracking-wide"
                  >
                    info@signworldprints.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-card border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(212,175,55,0.05),transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-white font-bold font-outfit tracking-tight">Visit Our Headquarters</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              Stop by our luxury showroom to inspect our premium structural samples directly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 glass p-2 max-w-5xl mx-auto"
          >
            <div className="glass h-[500px] flex items-center justify-center rounded-[2rem] border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>
              {/* Here you could embed a real map via iframe, utilizing visual overlay filters on top */}
              <div className="text-center relative z-20">
                <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto mb-6 border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <MapPin className="w-10 h-10 text-primary" />
                </div>
                <p className="text-gray-300 font-outfit text-xl mb-3 group-hover:text-white transition-colors">Sign World Headquarters</p>
                <p className="text-lg text-primary font-light tracking-wide">
                  # 26 Ground Floor, Harmony Dale<br />
                  New Bamboo Bazaar Road<br />
                  Bangalore 560 051
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}