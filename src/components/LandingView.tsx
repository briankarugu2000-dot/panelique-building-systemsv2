import React, { useState } from "react";
import { ArrowRight, Clock, Thermometer, Globe, Shield, Coins, Sparkles, Flame, Activity, X, Play, FileCheck, Layers, Eye } from "lucide-react";
import { IMAGES, KENYAN_CONTACTS } from "../data";

interface LandingViewProps {
  onNavigateToQuote: () => void;
  onNavigateToCompare: () => void;
}

export default function LandingView({ onNavigateToQuote, onNavigateToCompare }: LandingViewProps) {
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const constructionSteps = [
    {
      title: "1. Core Prefabrication",
      desc: "High-density polystyrene core is engineered off-site and customized exactly to your architectural drawings with integrated structural wire mesh.",
      icon: Layers,
      highlight: "Millimeter-perfect accuracy, zero on-site material waste."
    },
    {
      title: "2. Fast Transport & Positioning",
      desc: "Featherlight modular panels are easily loaded and delivered to the site. Two workers can lift and position single panels without cranes.",
      icon: Clock,
      highlight: "Save up to 60% on crane rentals and heavy machinery transport."
    },
    {
      title: "3. Interlocking Assembly",
      desc: "Panels are locked together using high-tensile wire joining meshes and anchor channels. Windows and doors are easily cut directly in the foam.",
      icon: Shield,
      highlight: "Pre-positioned steel ensures high seismic and wind resistance."
    },
    {
      title: "4. Integrated Utilities",
      desc: "Plumbing pipes and electrical conduits are slid easily behind the wire mesh before plastering. No noisy and dusty wall chiseling required.",
      icon: Activity,
      highlight: "Saves days of labor for electrical and plumbing contractors."
    },
    {
      title: "5. Shotcrete Micro-Concrete Spray",
      desc: "Two high-durability concrete layers are sprayed onto both sides of the panel, creating a monolithic reinforced concrete structure.",
      icon: Flame,
      highlight: "Forms a rigid structural composite with outstanding load limits."
    }
  ];

  return (
    <div className="relative pt-12">
      {/* Hero Section */}
      <section className="relative bg-industrial-charcoal text-white pt-20 pb-24 md:py-32 px-4 md:px-8 min-h-[85vh] flex flex-col justify-center items-start overflow-hidden border-b-4 border-safety-orange">
        <div className="absolute inset-0 industrial-grid opacity-15 pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 w-full lg:w-1/2 h-[45%] lg:h-full opacity-35 lg:opacity-75 mix-blend-luminosity pointer-events-none">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${IMAGES.heroBackground})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-industrial-charcoal via-industrial-charcoal/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto lg:mx-0 w-full">
          <span className="font-mono text-xs md:text-sm text-safety-orange font-bold uppercase tracking-[0.25em] mb-4 block">
            THE EVOLUTION OF HEAVY INDUSTRY
          </span>
          <h1 className="font-sans font-extrabold text-4xl md:text-6xl text-white mb-6 leading-[1.1] tracking-tight">
            Tired of Slow, Costly, <br className="hidden sm:block" />
            Unpredictable Construction? <br />
            <span className="text-surface-container-highest">There's a Better Way to Build.</span>
          </h1>
          <p className="font-sans text-lg md:text-2xl text-surface-container-highest max-w-2xl mb-10 border-l-4 border-safety-orange pl-5 leading-relaxed">
            C-MAX® EPS Panels — The Modern, High-Velocity Replacement for Traditional Stone and Block Construction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={onNavigateToQuote}
              className="bg-safety-orange hover:bg-safety-orange-hover text-white px-8 py-4 font-sans font-bold text-base md:text-lg rounded shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              Discover the Future
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setShowProcessModal(true)}
              className="border-2 border-white text-white hover:bg-white hover:text-industrial-charcoal px-8 py-4 font-sans font-bold text-base md:text-lg rounded transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play size={18} fill="currentColor" />
              Watch Process
            </button>
          </div>
        </div>
      </section>

      {/* "Why Builders Are Switching" tape */}
      <section className="py-10 bg-surface-container border-y-2 border-industrial-charcoal overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 justify-between items-center text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 group">
              <div className="p-3 bg-white border border-surface-container-highest rounded-full shadow-sm text-safety-orange group-hover:scale-110 transition-transform duration-200">
                <Coins size={24} />
              </div>
              <div>
                <span className="font-sans font-bold text-sm text-industrial-charcoal block leading-tight">Lower Foundation</span>
                <span className="font-mono text-[11px] text-on-surface-variant font-medium tracking-wide uppercase">Costs reduced up to 35%</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 group">
              <div className="p-3 bg-white border border-surface-container-highest rounded-full shadow-sm text-safety-orange group-hover:scale-110 transition-transform duration-200">
                <Activity size={24} />
              </div>
              <div>
                <span className="font-sans font-bold text-sm text-industrial-charcoal block leading-tight">Earthquake Resistant</span>
                <span className="font-mono text-[11px] text-on-surface-variant font-medium tracking-wide uppercase">High ductility panels</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 group">
              <div className="p-3 bg-white border border-surface-container-highest rounded-full shadow-sm text-safety-orange group-hover:scale-110 transition-transform duration-200">
                <Flame size={24} />
              </div>
              <div>
                <span className="font-sans font-bold text-sm text-industrial-charcoal block leading-tight">Fire Retardant</span>
                <span className="font-mono text-[11px] text-on-surface-variant font-medium tracking-wide uppercase">REI 120 fire rating</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 group">
              <div className="p-3 bg-white border border-surface-container-highest rounded-full shadow-sm text-safety-orange group-hover:scale-110 transition-transform duration-200">
                <Shield size={24} />
              </div>
              <div>
                <span className="font-sans font-bold text-sm text-industrial-charcoal block leading-tight">High Tensile</span>
                <span className="font-mono text-[11px] text-on-surface-variant font-medium tracking-wide uppercase">Monolithic steel core</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Systemic Efficiency alternating grid */}
      <section className="py-20 px-4 md:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs text-safety-orange tracking-[0.25em] uppercase font-bold block mb-2">COMPARATIVE ENGINEERING</span>
            <h2 className="font-sans font-black text-3xl md:text-4xl text-industrial-charcoal uppercase tracking-tight">Systemic Efficiency</h2>
            <div className="h-1.5 w-24 bg-safety-orange mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-industrial-charcoal rounded overflow-hidden shadow-lg">
            {/* Row 1: Speed */}
            <div className="flex flex-col md:flex-row col-span-1 md:col-span-2 border-b-2 border-industrial-charcoal">
              <div className="p-8 md:p-12 bg-surface-container-highest flex-1 flex flex-col justify-between border-b md:border-b-0 md:border-r-2 border-industrial-charcoal">
                <div>
                  <span className="font-mono text-xs text-red-600 uppercase mb-4 block tracking-widest font-bold">● OLD METHOD PROBLEM</span>
                  <h3 className="font-sans font-extrabold text-xl md:text-2xl text-industrial-charcoal mb-4">
                    Stone and block construction takes months and depends on slow, labor-intensive masonry work.
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant mt-6">
                  <Clock className="text-slate-blue" size={32} />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">Estimated Wall erection: 40-50 Days</span>
                </div>
              </div>
              <div className="p-8 md:p-12 bg-industrial-charcoal text-white flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-safety-orange uppercase mb-4 block tracking-widest font-bold">▲ C-MAX® MODERN SOLUTION</span>
                  <p className="font-sans text-base md:text-lg text-surface-container-highest leading-relaxed">
                    C-MAX® panels are engineered off-site and assembled fast on-site — pre-engineered parts snap together effortlessly. No heavy cranes needed, get dry walls fast.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-safety-orange mt-6">
                  <Sparkles size={32} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">Erection timeline: Save up to 40%</span>
                </div>
              </div>
            </div>

            {/* Row 2: Comfort */}
            <div className="flex flex-col md:flex-row col-span-1 md:col-span-2 border-b-2 border-industrial-charcoal">
              <div className="p-8 md:p-12 bg-surface-container flex-1 flex flex-col justify-between border-b md:border-b-0 md:border-r-2 border-industrial-charcoal">
                <div>
                  <span className="font-mono text-xs text-red-600 uppercase mb-4 block tracking-widest font-bold">● OLD METHOD PROBLEM</span>
                  <h3 className="font-sans font-extrabold text-xl md:text-2xl text-industrial-charcoal mb-4">
                    Traditional brick and concrete walls trap heat and let loud sound through, inflating cooling utility bills.
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant mt-6">
                  <Thermometer className="text-slate-blue" size={32} />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">U-Value: 1.8 - 2.2 W/m²K (Poor)</span>
                </div>
              </div>
              <div className="p-8 md:p-12 bg-safety-orange text-white flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-white uppercase mb-4 block tracking-widest font-bold">▲ C-MAX® MODERN SOLUTION</span>
                  <p className="font-sans text-base md:text-lg text-white leading-relaxed">
                    C-MAX® panels cut cooling and heating energy costs by up to 80% and deliver high-grade soundproofing with a continuous thermal insulation barrier.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-white mt-6">
                  <Sparkles size={32} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">U-Value: 0.28 W/m²K (Excellent)</span>
                </div>
              </div>
            </div>

            {/* Row 3: Eco & Standards */}
            <div className="flex flex-col md:flex-row col-span-1 md:col-span-2">
              <div className="p-8 md:p-12 bg-industrial-charcoal text-white flex-1 flex flex-col justify-between border-b md:border-b-0 md:border-r-2 border-industrial-charcoal">
                <div>
                  <span className="font-mono text-xs text-safety-orange uppercase mb-4 block tracking-widest font-bold">▲ C-MAX® MODERN SOLUTION</span>
                  <p className="font-sans text-base md:text-lg text-surface-container-highest leading-relaxed">
                    C-MAX® cuts carbon emissions by ~60% versus traditional masonry. Lightweight systems reduce raw steel usage, and fully recyclable materials reduce footprint.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-safety-orange mt-6">
                  <Globe size={32} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">Eco Rating: Certified Green Technology</span>
                </div>
              </div>
              <div className="p-8 md:p-12 bg-surface-container-highest flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-red-600 uppercase mb-4 block tracking-widest font-bold">● OLD METHOD PROBLEM</span>
                  <h3 className="font-sans font-extrabold text-xl md:text-2xl text-industrial-charcoal mb-4">
                    Quarrying heavy stone, hauling quarry soil, and firing clay blocks is severely damaging to local environments.
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant mt-6">
                  <Shield className="text-slate-blue" size={32} />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">Significant waste & high jobsite transport</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onNavigateToCompare}
              className="inline-flex items-center gap-2 font-mono text-xs md:text-sm font-bold text-safety-orange hover:text-safety-orange-hover uppercase tracking-widest border-b-2 border-safety-orange hover:border-safety-orange-hover pb-1 transition-all"
            >
              View Full Technical Comparison Sheet
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="py-20 px-4 md:px-8 bg-surface-container-low border-t-2 border-surface-container-highest">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Construction Image Container */}
          <div className="relative aspect-video lg:aspect-square bg-industrial-charcoal border-2 border-industrial-charcoal rounded overflow-hidden group shadow-xl">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url(${IMAGES.constructionWide})` }}
            ></div>
            <div className="absolute inset-0 bg-industrial-charcoal/10 group-hover:bg-transparent transition-colors duration-300"></div>
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur border border-industrial-charcoal px-4 py-2 text-xs font-mono font-bold text-industrial-charcoal uppercase tracking-widest">
              Live Assembly - Nairobi
            </div>
          </div>

          {/* Descriptive Content */}
          <div className="lg:pl-6">
            <span className="font-mono text-xs text-safety-orange tracking-widest uppercase font-bold block mb-2">
              LOCAL EXPERIENCE, GLOBAL STANDARDS
            </span>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-industrial-charcoal mb-6 leading-tight">
              Built for the Kenyan Market.<br />
              Engineered for the World.
            </h2>
            <p className="font-sans text-base md:text-lg text-on-surface-variant mb-8 leading-relaxed">
              Panelique Building Systems brings a decade of hands-on expertise in delivering premium architectural and structural efficiency in East Africa. Our C-MAX® panels are manufactured to strict European technical specifications and fully certified by KEBS. They are designed to stand strong under demanding climates while cutting cooling/heating costs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white border border-surface-container-highest rounded">
                <div className="w-2.5 h-2.5 bg-safety-orange rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-industrial-charcoal">10+ Years Kenyan Presence</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">Proven delivery on residential & commercial sites.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white border border-surface-container-highest rounded">
                <div className="w-2.5 h-2.5 bg-safety-orange rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-industrial-charcoal">Global R&D Integration</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">Emmedue Italian technology standards.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white border border-surface-container-highest rounded col-span-1 sm:col-span-2">
                <div className="w-2.5 h-2.5 bg-safety-orange rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-industrial-charcoal">Zero-Waste Job Sites</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">Every panel block is precision-manufactured pre-site to exact floorplan heights.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Band */}
      <section className="mx-4 md:mx-8 mb-24 max-w-7xl lg:mx-auto">
        <div className="bg-gradient-to-r from-safety-orange to-safety-orange-hover p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 rounded-lg shadow-xl border-2 border-industrial-charcoal">
          <div className="absolute top-0 right-0 w-64 h-64 border-[32px] border-white/10 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
          <div className="relative z-10 text-center md:text-left max-w-xl">
            <span className="font-mono text-xs text-white/90 uppercase tracking-widest font-semibold block mb-2">
              SAVE VALUABLE BUDGET & TIMELINE
            </span>
            <h2 className="font-sans font-black text-2xl md:text-4xl text-white mb-3 tracking-tight">
              Ready to Calculate Your Free Quote?
            </h2>
            <p className="font-sans text-sm md:text-base text-white/95 leading-relaxed">
              Upload your architectural layout drawings or enter basic room walls to calculate exactly how many C-MAX® Panels you need and estimate real cost differences.
            </p>
          </div>
          <button 
            onClick={onNavigateToQuote}
            className="relative z-10 bg-industrial-charcoal text-white hover:bg-black px-8 py-4 font-mono text-xs md:text-sm uppercase tracking-wider font-bold rounded shadow-lg border border-industrial-charcoal hover:border-black active:scale-95 transition-all flex-shrink-0 cursor-pointer"
          >
            Get My Quote Sheet
          </button>
        </div>
      </section>

      {/* WATCH PROCESS STEP MODAL */}
      {showProcessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-industrial-charcoal rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-industrial-charcoal text-white p-5 flex justify-between items-center border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <FileCheck className="text-safety-orange" size={22} />
                <span className="font-sans font-extrabold tracking-tight uppercase">C-MAX® EPS Assembly Process</span>
              </div>
              <button 
                onClick={() => setShowProcessModal(false)}
                className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Explore how the state-of-the-art C-MAX® system drastically simplifies the structural construction pipeline, from initial design sheets to final micro-concrete sprays.
              </p>

              {/* Step Navigation */}
              <div className="flex flex-wrap gap-1.5 mb-8 border-b border-surface-container pb-4 justify-between">
                {constructionSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider font-bold rounded transition-all ${
                      activeStep === idx 
                        ? "bg-safety-orange text-white" 
                        : "bg-surface-container text-slate-blue hover:bg-surface-container-high"
                    }`}
                  >
                    Step {idx + 1}
                  </button>
                ))}
              </div>

              {/* Step Detail Card */}
              <div className="bg-surface-container p-6 border-l-4 border-safety-orange rounded">
                <div className="flex items-center gap-3 mb-4">
                  {React.createElement(constructionSteps[activeStep].icon, {
                    className: "text-safety-orange",
                    size: 28
                  })}
                  <h3 className="font-sans font-extrabold text-lg text-industrial-charcoal">
                    {constructionSteps[activeStep].title}
                  </h3>
                </div>
                <p className="text-sm text-slate-blue leading-relaxed mb-4">
                  {constructionSteps[activeStep].desc}
                </p>
                <div className="bg-white p-3 border border-surface-container-highest rounded-sm">
                  <span className="font-mono text-[11px] text-safety-orange font-bold uppercase block mb-1">
                    ✔ INDUSTRIAL EFFICIENCY GAIN
                  </span>
                  <span className="text-xs text-industrial-charcoal font-medium">
                    {constructionSteps[activeStep].highlight}
                  </span>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="flex justify-between items-center mt-8">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-4 py-2 border border-slate-blue/30 text-slate-blue hover:bg-surface-container disabled:opacity-40 font-mono text-xs uppercase font-bold rounded transition-all"
                >
                  Previous
                </button>
                <button
                  disabled={activeStep === constructionSteps.length - 1}
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="px-4 py-2 bg-industrial-charcoal hover:bg-black text-white font-mono text-xs uppercase font-bold rounded transition-all"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
