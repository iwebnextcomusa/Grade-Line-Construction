/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shovel, 
  Compass, 
  Layers, 
  Trees, 
  GitCommit, 
  TrendingUp, 
  Home as HomeIcon, 
  Briefcase, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckSquare, 
  ArrowUp, 
  Star, 
  HardHat, 
  ShieldCheck, 
  Users, 
  FileText, 
  CheckCircle,
  Menu,
  X,
  Play,
  VolumeX,
  Volume2
} from "lucide-react";

import { SERVICES_DATA, PROJECTS_DATA, TESTIMONIALS_DATA, FAQS_DATA } from "./data";
import { ServiceDetail, ProjectItem } from "./types";

// Import custom sub-modules
import ThreeDSection from "./components/ThreeDSection";
import AIChatbot from "./components/AIChatbot";
import BeforeAfterImage from "./components/BeforeAfterImage";
import LeadEstimationForm from "./components/LeadEstimationForm";

// Helper map to translate icon strings to actual Lucide component elements
const ICON_MAP: Record<string, any> = {
  Shovel: Shovel,
  Compass: Compass,
  Layers: Layers,
  Trees: Trees,
  GitCommit: GitCommit,
  TrendingUp: TrendingUp,
  Home: HomeIcon,
  Briefcase: Briefcase,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("all-projects");
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoIsMuted, setVideoIsMuted] = useState(true);

  // Monitor scroll height to trigger scroll to top button visibility
  useEffect(() => {
    const checkScrollHeight = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", checkScrollHeight);
    return () => window.removeEventListener("scroll", checkScrollHeight);
  }, []);

  // Filter project gallery base
  const filteredProjects = activeTab === "all-projects" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeTab);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#222222] text-[#FFFFFF] font-sans antialiased selection:bg-[#E67E22] selection:text-white">
      
      {/* 1. STICKY HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 w-full bg-[#1C1C1C]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Brandings */}
          <div 
            onClick={() => scrollToSection("hero")} 
            className="flex items-center cursor-pointer group"
          >
            <div className="w-10 h-10 bg-[#E67E22] flex items-center justify-center mr-3 font-extrabold text-2xl text-white select-none">
              G
            </div>
            <div>
              <div className="text-[20px] font-extrabold tracking-tighter leading-none text-white">
                GRADE LINE <span className="text-[#E67E22]">CONSTRUCTION</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-neutral-300">
            <button id="nav-home" onClick={() => scrollToSection("hero")} className="hover:text-[#E67E22] transition-colors cursor-pointer">Home</button>
            <button id="nav-about" onClick={() => scrollToSection("about")} className="hover:text-[#E67E22] transition-colors cursor-pointer">About Us</button>
            <button id="nav-services" onClick={() => scrollToSection("services")} className="hover:text-[#E67E22] transition-colors cursor-pointer">Services</button>
            <button id="nav-projects" onClick={() => scrollToSection("projects")} className="hover:text-[#E67E22] transition-colors cursor-pointer">Projects</button>
            <button id="nav-testimonials" onClick={() => scrollToSection("testimonials")} className="hover:text-[#E67E22] transition-colors cursor-pointer">Testimonials</button>
            <button id="nav-contact" onClick={() => scrollToSection("contact")} className="px-4 py-2 bg-[#E67E22] hover:bg-[#D35400] font-sans font-bold text-xs text-white uppercase tracking-wider rounded-[2px] cursor-pointer transition-all">Get an Estimate</button>
          </nav>

          {/* Phone Integration Quick Link bar */}
          <div className="hidden lg:flex items-center gap-2.5 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-neutral-300">
            <Phone className="w-4 h-4 text-[#E67E22] animate-pulse" />
            <div className="text-right">
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#E67E22] block font-bold leading-none mb-0.5">CALL THE OWNER</span>
              <a href="tel:801-903-8689" className="text-sm font-bold font-mono text-white hover:underline">801-903-8689</a>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <button 
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#1C1C1C] border-b border-neutral-800 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col text-sm font-semibold tracking-wider text-neutral-300">
                <button id="mob-nav-home" onClick={() => scrollToSection("hero")} className="text-left py-2 hover:text-[#E67E22] border-b border-neutral-800/50">Home</button>
                <button id="mob-nav-about" onClick={() => scrollToSection("about")} className="text-left py-2 hover:text-[#E67E22] border-b border-neutral-800/50">About Us</button>
                <button id="mob-nav-services" onClick={() => scrollToSection("services")} className="text-left py-2 hover:text-[#E67E22] border-b border-neutral-800/50">Services</button>
                <button id="mob-nav-projects" onClick={() => scrollToSection("projects")} className="text-left py-2 hover:text-[#E67E22] border-b border-neutral-800/50">Projects</button>
                <button id="mob-nav-reviews" onClick={() => scrollToSection("testimonials")} className="text-left py-2 hover:text-[#E67E22] border-b border-neutral-800/50">Testimonials</button>
                <button id="mob-nav-contact" onClick={() => scrollToSection("contact")} className="text-center bg-[#E67E22] text-white py-3 rounded-xl mt-4 font-mono font-bold tracking-widest shadow-md">REQUEST ESTIMATE</button>
                
                <div className="flex items-center justify-center gap-3 text-xs text-neutral-400 pt-4">
                  <Phone className="w-4 h-4 text-[#E67E22]" />
                  <a href="tel:801-903-8689" className="font-mono font-bold hover:underline">801-903-8689</a>
                  <span className="h-3 w-px bg-neutral-800"></span>
                  <a href="mailto:claudewayman02@gmail.com" className="font-mono hover:underline">Email us</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION – HIGH CONVERSION */}
      <section id="hero" className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-b border-neutral-800">
        
        {/* Underneath Video Integration (Autoplay, muted, loop) */}
        <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
          {/* Fallback pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(230,126,34,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(230,126,34,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-10" />
          
          {/* Autumn grader visual asset, mock background layer */}
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop" 
            alt="Excavation Grader Site work background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 filter grayscale contrast-125 select-none"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Badge */}
            <div className="text-xs uppercase tracking-[4px] font-bold text-[#E67E22] mb-4">
              Grantsville, Utah • Since 2002
            </div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Precision Grading.<br />Professional Results.
            </motion.h1>

            {/* Subheadline detailing local SEO keywords */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[#ccc] text-lg sm:text-[18px] leading-[1.6] mb-10 max-w-[500px]"
            >
              Exceeding expectations in excavation, site preparation, and utility trenching for residential and commercial developers across Tooele County.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button 
                id="hero-primary-cta"
                onClick={() => scrollToSection("contact")}
                className="px-7 py-3.5 bg-[#E67E22] hover:bg-[#D35400] text-white font-bold uppercase tracking-[1px] rounded-[2px] transition-all duration-300 text-center text-sm cursor-pointer"
              >
                Request a Free Estimate
              </button>
              
              <a 
                id="hero-secondary-cta"
                href="tel:801-903-8689"
                className="px-7 py-3.5 bg-transparent border-2 border-[#E67E22] hover:bg-[#E67E22] text-[#E67E22] hover:text-white font-bold uppercase tracking-[1px] rounded-[2px] transition-all duration-300 text-center text-sm flex items-center justify-center gap-2"
              >
                Call (801) 903-8689
              </a>
            </motion.div>

            {/* Trust Signatures Row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-[11px] text-zinc-400 border-t border-neutral-800/80 pt-6 w-full"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>Licensed, Bonded & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>5-Star Local Reviews</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>Grantsville, UT Owned</span>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Card Bento-ish Info Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="lg:col-span-5 bg-[#1C1C1C]/90 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl" />
            
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E67E22]"></span>
              Why Site Work Matters First
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-3.5 p-3 rounded-xl bg-neutral-900 border border-neutral-800/50">
                <div className="w-9 h-9 bg-orange-500/10 rounded-lg flex items-center justify-center text-[#E67E22] flex-shrink-0">
                  <CheckSquare className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-widest font-mono">Positive Slope Drainage</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">We design soil layouts to flow spring runoff snow melt away from structures, preventing costly leakage repairs.</p>
                </div>
              </div>

              <div className="flex gap-3.5 p-3 rounded-xl bg-neutral-900 border border-neutral-800/50">
                <div className="w-9 h-9 bg-orange-500/10 rounded-lg flex items-center justify-center text-[#E67E22] flex-shrink-0">
                  <CheckSquare className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-widest font-mono">Compacted Bedding Pads</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Heavy-duty rollers compact foundation pads to strict engineering psi tolerances to stop uneven concrete settling.</p>
                </div>
              </div>

              <div className="flex gap-3.5 p-3 rounded-xl bg-neutral-900 border border-neutral-800/50">
                <div className="w-9 h-9 bg-orange-500/10 rounded-lg flex items-center justify-center text-[#E67E22] flex-shrink-0">
                  <CheckSquare className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-widest font-mono">GPS Leveling Accuracy</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Laser-guided elevation staking means zero variance from architectural property blueprint directives.</p>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 bg-neutral-950 rounded-xl flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">Need immediate help?</span>
              <a href="tel:801-903-8689" className="text-[#E67E22] uppercase tracking-wider font-bold hover:underline">Connect with Claude</a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Trust Bar */}
      <div 
        id="trust-declaration-bar"
        className="h-auto py-4 bg-[#1a1a1a] flex items-center justify-center text-center font-mono text-[11px] md:text-xs uppercase tracking-[2px] text-[#888888] border-y border-[#333333]"
      >
        Licensed • Bonded • Insured • MSHA Safety Certified • Locally Owned in Grantsville, UT
      </div>

      {/* 3. COMPANY INTRODUCTION (ABOUT CO) */}
      <section id="about" className="py-24 px-4 bg-[#222222] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E67E22]/10 rounded-full blur-3xl z-0" />
            {/* Real local image representation style */}
            <div className="relative border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 bg-neutral-900 p-2">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop" 
                alt="Claude Wayman owner on site plan" 
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="bg-[#1C1C1C] p-4 rounded-xl mt-2 flex items-center justify-between border border-neutral-850">
                <div>
                  <h4 className="text-sm font-bold text-white">Claude Wayman</h4>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Founder & Lead Operator</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono text-[#E67E22]">LOCAL OFFICE</p>
                  <p className="text-[11px] font-bold text-white">Grantsville, UT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            <span className="text-xs font-bold text-[#E67E22] tracking-widest font-mono uppercase mb-2">UTAH PRIDE • OUR STORY</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 font-sans">
              Locally Owned Earth-Moving Built on Integrity
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans mb-5">
              Grade Line Construction was founded in Grantsville, Utah, on a simple premise: provide residential property owners and builders with a responsive, transparent, and highly technical excavation partner. Operating across Tooele County, we know how local rocky soils pack, we understand valley slope water behavior, and we are equipped with heavy machinery to handle tough projects on schedule.
            </p>

            <blockquote className="border-l-2 border-[#E67E22] pl-4 italic text-sm text-neutral-400 font-sans py-1.5 mb-6">
              "We don't just shift dirt. We lay the structural foundation that supports your custom home, barn, driveway, or commercial storefront for generations. In Utah, positive grading slopes save properties. We do it right the first time."
              <cite className="block text-[10px] uppercase font-mono tracking-widest mt-2 not-italic text-[#E67E22]">— Claude Wayman, Owner</cite>
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="p-4 bg-neutral-900 border border-neutral-800/80 rounded-xl">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-3 bg-[#E67E22] rounded-full"></span>
                  Mission & Values
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">Absolute blueprint accuracy, honest safety practices, transparent upfront pricing sheets with zero hidden subcontractors.</p>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800/80 rounded-xl">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-3 bg-[#E67E22] rounded-full"></span>
                  Service Boundaries
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">Operating in Tooele County (Grantsville, Erda, Tooele, Rush Valley), Salt Lake County, and southern areas.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CHRONICLED DETAILED SERVICES (FILTERABLE & ACCORDION EXPANSIONS) */}
      <section id="services" className="py-24 px-4 bg-[#1C1C1C] border-y border-neutral-800 relative z-10">
        <div className="max-w-[1200px] mx-auto text-center mb-16">
          <span className="text-xs font-bold text-[#E67E22] tracking-widest font-mono uppercase mb-2 block">ELITE INDUSTRIAL WORK</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-sans">
            Excavation, Site Prep & Grading Services
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto font-sans text-sm sm:text-base leading-relaxed">
            Grade Line Construction provides comprehensive structural earthworks packages. Dive into our dedicated divisions below to understand our processes and equipment tolerances.
          </p>
        </div>

        {/* 8-Service Deck Bento Grid */}
        <div className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Shovel;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                onClick={() => setSelectedService(service)}
                className="group bg-[#222222] border border-neutral-850 hover:border-[#E67E22]/60 rounded-[2px] p-5 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden relative flex flex-col justify-between"
              >
                {/* Background decorative gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/2 rounded-full blur-3xl text-xs" />
                
                <div>
                  {/* Icon Header */}
                  <div className="w-12 h-12 bg-neutral-900 text-[#E67E22] rounded-[2px] flex items-center justify-center border border-neutral-800 mb-5 group-hover:bg-[#E67E22] group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#E67E22] transition-colors mb-2.5 font-sans">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed font-sans mb-5">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="flex items-center text-xs font-mono font-bold text-[#E67E22] gap-1 group-hover:underline mt-auto">
                  <span>View Details & Specs</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Modal / Expandable details drawer for Selected Service */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden p-6 relative shadow-2xl custom-scrollbar"
              >
                {/* Close Button */}
                <button
                  id="close-srv-modal-btn"
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 bg-neutral-950 border border-neutral-800 rounded-full text-neutral-400 hover:text-white transition-all hover:scale-105"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 border-b border-neutral-800 pb-4 mb-5">
                  <div className="w-10 h-10 bg-[#E67E22]/10 rounded-lg flex items-center justify-center text-[#E67E22] border border-orange-500/10">
                    {selectedService.iconName && (() => {
                      const Icon = ICON_MAP[selectedService.iconName] || Shovel;
                      return <Icon className="w-5 h-5" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans">{selectedService.title} Division</h3>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Engineering Specification Standards</p>
                  </div>
                </div>

                <img 
                  src={selectedService.imageUrl} 
                  alt={selectedService.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover rounded-xl mb-5 border border-neutral-800"
                />

                <h4 className="text-xs font-semibold text-[#E67E22] uppercase tracking-widest font-mono mb-2">Operations Overview</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-5">
                  {selectedService.longDesc}
                </p>

                <h4 className="text-xs font-semibold text-white uppercase tracking-widest font-mono mb-3">Service Deliverables include:</h4>
                <ul className="text-xs text-neutral-400 space-y-2 mb-6">
                  {selectedService.bulletPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-sans">
                      <span className="w-1.5 h-1.5 bg-[#E67E22] rounded-full mt-1.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-neutral-950 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3 border border-neutral-850">
                  <div>
                    <p className="text-[10px] font-mono text-zinc-500">Need this service for your lot?</p>
                    <p className="text-xs font-semibold text-[#E67E22]">Get a fast, fixed price quote within 24 hours</p>
                  </div>
                  <button
                    id="srv-modal-cta"
                    onClick={() => {
                      setSelectedService(null);
                      scrollToSection("contact");
                    }}
                    className="px-4.5 py-2.5 bg-[#E67E22] hover:bg-[#D35400] text-xs font-bold text-white rounded-lg cursor-pointer transition-colors w-full sm:w-auto text-center"
                  >
                    Free Estimate Request
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 5. 3D LAND SCAPING ANIMATED SECTIONS (THREE.JS INTEGRATION) */}
      <section className="py-24 px-4 bg-[#222222] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center mb-12">
          <span className="text-xs font-bold text-[#E67E22] tracking-widest font-mono uppercase mb-2 block animate-pulse">LIDAR TECHNOLOGY COMPASS</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-sans">
            Real-Time 3D Slope Elevation Modeling
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto font-sans text-sm sm:text-base leading-relaxed">
            Grade Line Construction respects engineering blueprints. We use interactive computational meshes to chart positive storm-runoff flows, compaction specs, and finished lot profiles.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto z-10 relative">
          <ThreeDSection />
        </div>
      </section>

      {/* 6. FILTERABLE PROJECTS & CASES WITH INTERACTIVE slider IMAGES */}
      <section id="projects" className="py-24 px-4 bg-[#1C1C1C] border-t border-neutral-800">
        <div className="max-w-[1200px] mx-auto text-center mb-12">
          <span className="text-xs font-bold text-[#E67E22] tracking-widest font-mono uppercase mb-2 block">PROVEN RESULTS</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-sans">
            Residential & Commercial Showcase
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto font-sans text-sm sm:text-base leading-relaxed">
            Drag the sliding handles below to observe our earthworks in progress, from raw, sage-overgrown Utah soil into clean building-grade pads.
          </p>
        </div>

        {/* Directory Categorization Tabs filters */}
        <div className="max-w-[1200px] mx-auto flex justify-center flex-wrap gap-2 mb-10">
          {[
            { tag: "all-projects", label: "All Site Work" },
            { tag: "SitePrep", label: "Building Pads" },
            { tag: "Grading", label: "Grading Slope" },
            { tag: "Utilities", label: "Trench Utilities" },
            { tag: "Clearing", label: "Land Clearings" }
          ].map((tab) => (
            <button
              id={`tab-${tab.tag}`}
              key={tab.tag}
              onClick={() => setActiveTab(tab.tag)}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                activeTab === tab.tag
                  ? "bg-[#E67E22] border-orange-500 text-white shadow-lg font-bold"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project grid listing Before-After alignment slider */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-[#222222] border border-neutral-800 rounded-2xl p-5 shadow-xl flex flex-col group overflow-hidden"
              >
                {/* Slide Comparison Image */}
                <BeforeAfterImage 
                  beforeUrl={project.beforeImageUrl} 
                  afterUrl={project.afterImageUrl} 
                />

                <div className="mt-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
                      <span className="flex items-center gap-1.5 uppercase font-bold text-[#E67E22]">
                        <HardHat className="w-3.5 h-3.5" />
                        {project.category} Core
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location} • Completed {project.completedYear}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2.5 font-sans group-hover:text-[#E67E22] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights Bullet Box */}
                  <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-850 mt-auto">
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono mb-2">Quantifiable Delivery</h4>
                    <ul className="text-[10px] text-zinc-400 space-y-1">
                      {project.highlights.map((hlt, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5 leading-relaxed">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{hlt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 7. WHY CHOOSE US (TRUST & BRAND VALUE) */}
      <section className="py-24 px-4 bg-[#212121] text-zinc-300 relative">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <span className="text-xs font-bold text-[#E67E22] tracking-widest font-mono uppercase mb-2 block">OUR CREDENTIALS</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 font-sans">
              Grantsville's Fully Licensed & Safety-First Contractor
            </h2>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed mb-6">
              Commercial site pads and residential utilities trench work have zero room for margin error. Grade Line Construction integrates extensive state training, high precision machinery systems, and premium slope testing configurations to execute client needs.
            </p>

            <div className="space-y-4 font-sans">
              <div className="flex gap-4 p-4 bg-neutral-900 border border-neutral-800/60 rounded-2xl">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">100% General Liability Insurance</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">We carry complete protection policies covering commercial site works, keeping developers and homeowners fully guarded.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-neutral-900 border border-neutral-800/60 rounded-2xl">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-[#E67E22] flex-shrink-0">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">OSHA Utilities Trench Compliance</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Deep trench utility runs utilize certified hydraulic shoring cages and positive grade locator bedding setups for max security.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-neutral-900 border border-neutral-800/60 rounded-2xl">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Tooele County Climate Knowledge</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Knowing local soil moisture peaks from winter snowpack melt allows us to grading soils at optimum compaction dry ratios.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-[#1C1C1C] border border-neutral-800 p-6 rounded-2xl text-center">
              <h3 className="text-4xl font-extrabold text-[#E67E22] font-mono mb-2">98%</h3>
              <p className="text-xs uppercase font-bold tracking-widest text-white font-mono">Client Satisfaction</p>
              <p className="text-[10px] text-zinc-500 mt-1 font-sans">Consistent 5-star builder feedback</p>
            </div>

            <div className="bg-[#1C1C1C] border border-neutral-800 p-6 rounded-2xl text-center">
              <h3 className="text-4xl font-extrabold text-[#E67E22] font-mono mb-2">100%</h3>
              <p className="text-xs uppercase font-bold tracking-widest text-white font-mono">Safety Rating</p>
              <p className="text-[10px] text-zinc-500 mt-1 font-sans">Zero injury violations or shutdowns</p>
            </div>

            <div className="bg-[#1C1C1C] border border-neutral-800 p-6 rounded-2xl text-center">
              <h3 className="text-4xl font-extrabold text-[#E67E22] font-mono mb-2">&lt;24h</h3>
              <p className="text-xs uppercase font-bold tracking-widest text-white font-mono">Quote turnaround</p>
              <p className="text-[10px] text-zinc-500 mt-1 font-sans">Fast fixed-cost estimates</p>
            </div>

            <div className="bg-[#1C1C1C] border border-neutral-800 p-6 rounded-2xl text-center">
              <h3 className="text-4xl font-extrabold text-[#E67E22] font-mono mb-2">80+</h3>
              <p className="text-xs uppercase font-bold tracking-widest text-white font-mono">Completed Pads</p>
              <p className="text-[10px] text-zinc-500 mt-1 font-sans">Poured houses, barns, & shops</p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS & TRUST ELEMENT BOARDS */}
      <section id="testimonials" className="py-24 px-4 bg-[#1C1C1C] border-t border-neutral-850">
        <div className="max-w-[1200px] mx-auto text-center mb-16">
          <span className="text-xs font-bold text-[#E67E22] tracking-widest font-mono uppercase mb-2 block">CUSTOMER REVIEWS</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-sans">
            Hear From Our Partners & Neighbors
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto font-sans text-sm sm:text-base leading-relaxed">
            Grade Line Construction builds long-term connections. See why home builders and developers choose us as their go-to subcontractor.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-[#222222] border border-neutral-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Rating line */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-neutral-500 text-[10px] uppercase tracking-widest font-mono ml-2">Verified Review</span>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed font-sans mb-5">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-800/80 pt-4 mt-2">
                <div>
                  <h4 className="text-neutral-200 text-sm font-bold font-sans">{rev.author}</h4>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">{rev.role}</p>
                </div>
                <div className="text-right text-[10px] font-mono text-zinc-500">
                  <p className="text-[#E67E22] font-semibold">{rev.location}</p>
                  <p>{rev.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. INTERACTIVE CONTACT FORM & LOCAL WORKSPACE Service AREA MAP MAP */}
      <section id="contact" className="py-24 px-4 bg-[#222222] relative border-t border-neutral-800">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Side Info Panel detailing phone number, email, area boundaries and hours */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#E67E22] tracking-widest font-mono uppercase mb-2 block">CONTACT SPECIFICATIONS</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 font-sans">
                Let's Discuss Your Site Work Details
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans mb-8">
                Based out of Grantsville, Utah, we regularly mobilize our heavy excavator and grading crews across the area. Call or supply custom coordinate details below.
              </p>

              {/* Direct Card Listings */}
              <div className="space-y-4 font-mono text-xs text-neutral-300">
                <a 
                  href="tel:801-903-8689" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#E67E22]/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-[#E67E22] flex-shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#E67E22] font-bold">Call Owner Directly</p>
                    <p className="text-sm font-bold text-white mt-0.5">801-903-8689</p>
                  </div>
                </a>

                <a 
                  href="mailto:claudewayman02@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#E67E22]/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-[#E67E22] flex-shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#E67E22] font-bold">Email Communication</p>
                    <p className="text-sm font-bold text-white mt-0.5 break-all">claudewayman02@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-[#E67E22] flex-shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#E67E22] font-bold">Operating Hours</p>
                    <p className="text-sm font-bold text-white mt-0.5">Mon - Sat: 7:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Area Service Map placeholder (Visual customized Representation pointing to GrantsvilleUT) */}
            <div className="mt-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-lg overflow-hidden relative">
              <div className="absolute top-3.5 right-3.5 bg-neutral-950/80 backdrop-blur text-[10px] font-mono py-1 px-2.5 rounded-full text-[#E67E22] border border-neutral-800 z-10 flex items-center gap-1.5 uppercase font-bold">
                <span className="w-1.5 h-1.5 bg-green-550 rounded-full animate-ping"></span> Grantsville Head Office
              </div>
              
              <div className="w-full h-44 bg-neutral-950 border border-neutral-850 rounded-xl relative overflow-hidden flex flex-col justify-between p-4 bg-[linear-gradient(rgba(230,126,34,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(230,126,34,0.02)_1px,transparent_1px)] bg-[size:15px_15px]">
                {/* Visual SVG map representation */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#E67E22" strokeWidth="2" strokeDasharray="3,3" />
                    <circle cx="50" cy="50" r="2" fill="#E67E22" />
                    <path d="M10 20 L40 50 L90 80" stroke="#E67E22" strokeWidth="0.5" fill="none" />
                    <path d="M90 20 L50 50 L10 80" stroke="#E67E22" strokeWidth="0.5" fill="none" />
                  </svg>
                </div>

                <div className="mt-auto relative z-10">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Primary Mobilization Coordinates</p>
                  <p className="text-xs font-bold text-zinc-200 mt-1">Grantsville, Tooele County, Utah & Surrounding Valley Lands</p>
                  
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    <span className="text-[9px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-400 font-mono uppercase">Erda</span>
                    <span className="text-[9px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-400 font-mono uppercase">Stansbury</span>
                    <span className="text-[9px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-400 font-mono uppercase">Tooele</span>
                    <span className="text-[9px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-400 font-mono uppercase">Salt Lake</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form container loading the lead capture specs layout */}
          <div className="lg:col-span-7">
            <LeadEstimationForm />
          </div>

        </div>
      </section>

      {/* 10. FAQS - REASSURING CREDIBILITY QUESTIONS */}
      <section className="py-24 px-4 bg-[#1C1C1C] border-t border-neutral-800">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#E67E22] tracking-widest font-mono uppercase mb-2 block">KNOWLEDGE CENTER</span>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4 font-sans">
              Frequently Asked Earthwork Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, index) => (
              <div 
                key={index} 
                className="bg-[#222222] border border-neutral-800 p-5 rounded-2xl"
              >
                <h4 className="text-sm font-bold text-white mb-2 font-sans flex items-start gap-2.5">
                  <span className="text-[#E67E22] font-mono">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans pl-6 border-l border-neutral-800/80">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CHATBOT WIDGET OVERLAY */}
      <AIChatbot />

      {/* 12. FLOATING SCROLL-TO-TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 bg-[#E67E22] hover:bg-[#D35400] text-white p-3.5 rounded-full shadow-2xl border border-orange-400/30 cursor-pointer hover:scale-115 active:scale-90 transition-all z-40"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 13. FOOTER */}
      <footer className="bg-neutral-950 border-t border-neutral-850 py-12 px-4 text-center">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-[#E67E22] rounded-lg flex items-center justify-center text-white font-mono font-bold text-md select-none">
              GL
            </div>
            <span className="font-sans font-extrabold text-sm tracking-widest text-[#E67E22]">GRADE LINE CONSTRUCTION</span>
          </div>

          {/* Area Keywords Footer SEO block */}
          <p className="text-[10px] text-zinc-600 max-w-2xl mx-auto font-mono leading-relaxed uppercase">
            Construction Company Grantsville UT • Excavation Contractor Grantsville • Grading Services Utah • Site Preparation Contractor • Land Clearing Services • Residential Excavation • Commercial Excavation
          </p>

          <p className="text-xs text-neutral-500 font-sans">
            © {new Date().getFullYear()} Grade Line Construction. All Rights Reserved. Licensed state of Utah. Phone: 801-903-8689
          </p>

          {/* Centered Credits Link - Strictly as required by additional user instructions */}
          <div className="text-xs text-zinc-500 font-mono pt-4 border-t border-neutral-900/80">
            Developed by <a href="https://iwebnext.com" target="_blank" referrerPolicy="no-referrer" className="text-[#E67E22] font-semibold hover:underline">iWebNext</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
