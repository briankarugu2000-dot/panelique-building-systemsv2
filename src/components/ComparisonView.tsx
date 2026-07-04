import React, { useState } from "react";
import { History, Rocket, Check, AlertTriangle, HelpCircle, Weight, Flame, ShieldAlert, Sparkles, Phone, ArrowUpRight } from "lucide-react";
import { COMPARISON_POINTS, IMAGES, KENYAN_CONTACTS } from "../data";

interface ComparisonViewProps {
  onNavigateToQuote: () => void;
}

export default function ComparisonView({ onNavigateToQuote }: ComparisonViewProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("speed");
  const [comparisonMetricMode, setComparisonMetricMode] = useState<boolean>(true); // True shows key stats, False shows text
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const topicMetrics: Record<string, {
    label: string;
    traditionalVal: string;
    cmaxVal: string;
    unit: string;
    percentSaved?: number;
    badge: string;
  }> = {
    speed: {
      label: "Build Erection Speed",
      traditionalVal: "48 days",
      cmaxVal: "14 days",
      unit: "per single floor layout",
      percentSaved: 70,
      badge: "70% Faster Assembly"
    },
    energy: {
      label: "Thermal U-Value & Energy",
      traditionalVal: "2.1 W/m²K",
      cmaxVal: "0.28 W/m²K",
      unit: "lower U-value is better",
      percentSaved: 80,
      badge: "80% Utility Savings"
    },
    eco: {
      label: "Co2 Embodied Emissions",
      traditionalVal: "12.8 Tons CO2",
      cmaxVal: "5.1 Tons CO2",
      unit: "carbon footprint estimation",
      percentSaved: 60,
      badge: "60% Carbon Cut"
    },
    comfort: {
      label: "Acoustic Noise Transmission",
      traditionalVal: "Rw: 36 dB",
      cmaxVal: "Rw: 52 dB",
      unit: "higher dB block is better",
      percentSaved: 44,
      badge: "Excellent Acoustic Privacy"
    },
    quality: {
      label: "Structural Wall Density",
      traditionalVal: "380 kg/m²",
      cmaxVal: "65 kg/m²",
      unit: "foundation dead-load",
      percentSaved: 82,
      badge: "82% Weight Reduced"
    }
  };

  return (
    <div className="relative pt-24 min-h-screen blueprint-grid">
      {/* Title Header */}
      <header className="pt-8 pb-12 px-4 md:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-block bg-safety-orange text-white font-mono text-xs px-4 py-1.5 mb-6 tracking-widest uppercase font-bold rounded">
          The Evolution of Infrastructure
        </div>
        <h1 className="font-sans font-black text-3xl md:text-5xl text-industrial-charcoal mb-6 leading-tight tracking-tight">
          Stone & Block Built the Past. <br />
          <span className="text-safety-orange">C-MAX® EPS Panels</span> Are Building the Future.
        </h1>
        <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          Compare the raw structural integrity, thermal resistance, and environmental footprint of traditional heavy masonry against modern, pre-engineered Italian Emmedue technology.
        </p>
      </header>

      {/* Interactive Sliding Comparison Feature */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-20">
        <div className="text-center mb-6">
          <span className="font-mono text-xs text-safety-orange font-bold uppercase tracking-wider block mb-1">
            DRAMATIC VISUAL TRANSFORMATION
          </span>
          <h3 className="font-sans font-bold text-lg text-industrial-charcoal">
            Slide to Compare: Traditional Blockwork vs. Interlocking C-MAX®
          </h3>
        </div>
        
        {/* Slider Box */}
        <div className="relative w-full aspect-video border-2 border-industrial-charcoal rounded overflow-hidden select-none shadow-xl">
          {/* Before: Traditional */}
          <div className="absolute inset-0">
            <img 
              src={IMAGES.beforeAfterComparison} 
              alt="Comparison Traditional" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-red-600/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 uppercase rounded tracking-wider">
              Before: Dusty Stone Masonry
            </div>
          </div>

          {/* After: C-MAX (Dynamic Clip Path) */}
          <div 
            className="absolute inset-0 z-10 transition-all duration-75 pointer-events-none"
            style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
          >
            {/* We map a custom grid layout or a nice after visual */}
            <div className="absolute inset-0 bg-safety-orange/5 backdrop-blur-[1px]"></div>
            <img 
              src={IMAGES.beforeAfterComparison} 
              alt="Comparison C-MAX" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-safety-orange text-white font-mono text-[11px] font-bold px-3 py-1.5 uppercase rounded tracking-wider">
              After: Monolithic C-MAX Panel Assembly
            </div>
          </div>

          {/* Slider input handle */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute w-full h-full cursor-ew-resize opacity-0"
            />
            {/* Invisible Line handler */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-safety-orange border-2 border-white rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">
                ↔
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs font-mono text-on-surface-variant mt-3">
          Drag the center handle horizontally to inspect detail differences
        </p>
      </section>

      {/* Comparison Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        {/* Header Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-surface-container-highest border border-industrial-charcoal text-industrial-charcoal p-5 flex items-center justify-between rounded">
            <div className="flex items-center gap-3">
              <History className="text-slate-blue" size={24} />
              <h2 className="font-sans font-black text-xl uppercase tracking-tight">TRADITIONAL METHOD</h2>
            </div>
            <span className="font-mono text-[10px] text-slate-blue font-bold tracking-widest border border-slate-blue/30 px-2.5 py-0.5 rounded">
              STONE & CLAY BLOCKS
            </span>
          </div>
          <div className="bg-industrial-charcoal border-l-8 border-safety-orange text-white p-5 flex items-center justify-between rounded">
            <div className="flex items-center gap-3">
              <Rocket className="text-safety-orange" size={24} />
              <h2 className="font-sans font-black text-xl uppercase tracking-tight">C-MAX® SYSTEM</h2>
            </div>
            <span className="font-mono text-[10px] text-safety-orange font-bold tracking-widest border border-safety-orange px-2.5 py-0.5 rounded">
              REINFORCED EPS PANELS
            </span>
          </div>
        </div>

        {/* List of Comparison rows */}
        <div className="space-y-4">
          {COMPARISON_POINTS.map((point) => {
            const isSelected = selectedTopic === point.id;
            const metrics = topicMetrics[point.id];

            return (
              <div 
                key={point.id} 
                onClick={() => setSelectedTopic(point.id)}
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-5 md:p-6 border rounded cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? "bg-white border-safety-orange shadow-md ring-1 ring-safety-orange/30" 
                    : "bg-white/80 border-surface-container-highest hover:bg-white hover:border-industrial-charcoal hover:shadow-sm"
                }`}
              >
                {/* Topic Header Span across both panels */}
                <div className="col-span-1 md:col-span-2 flex items-center justify-between border-b border-surface-container pb-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-safety-orange">{point.number}</span>
                    <h3 className="font-sans font-black text-sm md:text-base text-industrial-charcoal tracking-wide">
                      {point.title}
                    </h3>
                  </div>
                  {metrics && (
                    <span className="font-mono text-[10px] md:text-xs bg-safety-orange/10 text-safety-orange font-bold px-3 py-1 rounded-full uppercase">
                      {metrics.badge}
                    </span>
                  )}
                </div>

                {/* Left Side: Traditional details */}
                <div className="flex flex-col justify-between pr-0 md:pr-4">
                  <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                    {point.traditionalDesc}
                  </p>
                  
                  {isSelected && metrics && (
                    <div className="mt-4 bg-surface-container-low border border-surface-container-high rounded p-3">
                      <span className="text-[10px] font-mono text-slate-blue block font-bold uppercase mb-1">
                        ● TRADITIONAL MEASURE
                      </span>
                      <span className="text-base font-extrabold font-mono text-red-600 block">
                        {metrics.traditionalVal}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-mono block">
                        {metrics.unit}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Side: C-MAX details */}
                <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-surface-container pt-4 md:pt-0 pl-0 md:pl-6">
                  <p className="text-sm md:text-base text-industrial-charcoal font-medium leading-relaxed">
                    {point.cmaxDesc}
                  </p>

                  {isSelected && metrics && (
                    <div className="mt-4 bg-safety-orange/5 border border-safety-orange/20 rounded p-3">
                      <span className="text-[10px] font-mono text-safety-orange block font-bold uppercase mb-1">
                        ✔ C-MAX® SYSTEM ADVANTAGE
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black font-mono text-safety-orange">
                          {metrics.cmaxVal}
                        </span>
                        {metrics.percentSaved && (
                          <span className="text-xs font-mono font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                            -{metrics.percentSaved}%
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-on-surface-variant font-mono block">
                        {metrics.unit}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Quote CTA Section */}
      <section className="bg-industrial-charcoal text-white py-20 px-4 text-center relative overflow-hidden border-t-4 border-safety-orange">
        <div className="absolute inset-0 blueprint-pattern opacity-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-sans font-black text-3xl md:text-5xl text-white mb-6 tracking-tight leading-tight">
            Stop Building the Slow, Heavy Way.
          </h2>
          <p className="font-sans text-base md:text-xl mb-10 text-surface-container-highest max-w-2xl mx-auto leading-relaxed">
            Take control of your construction project, reduce on-site dust, and insulate your home beautifully. Calculate exactly how many wall blocks can be replaced by premium C-MAX® panels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onNavigateToQuote}
              className="w-full sm:w-auto bg-safety-orange hover:bg-safety-orange-hover text-white px-10 py-4 font-mono text-xs md:text-sm font-bold uppercase tracking-widest rounded transition-all active:scale-95 cursor-pointer border border-safety-orange"
            >
              Request Free Quote Sheet
            </button>
            <a
              href={`tel:${KENYAN_CONTACTS.phoneFormatted}`}
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-industrial-charcoal px-10 py-3.5 font-mono text-xs md:text-sm font-bold uppercase tracking-widest rounded transition-all active:scale-95 text-center"
            >
              Call Tech Specialist
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
