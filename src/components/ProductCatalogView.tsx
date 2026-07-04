import React, { useState } from "react";
import { Ruler, Layers, Package, Check, ShieldCheck, Award, HeartHandshake, FileBadge, ArrowRight, HelpCircle, ChevronRight, Calculator } from "lucide-react";
import { PRODUCTS, KENYAN_CONTACTS } from "../data";

interface ProductCatalogViewProps {
  onNavigateToQuote: (preSelectedProduct?: string) => void;
}

export default function ProductCatalogView({ onNavigateToQuote }: ProductCatalogViewProps) {
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>("wall-panels");

  const categoryIcons: Record<string, React.ComponentType<any>> = {
    Ruler: Ruler,
    Layers: Layers,
    Package: Package,
  };

  return (
    <div className="relative pt-24 min-h-screen blueprint-pattern">
      {/* Page Header */}
      <header className="pt-8 pb-12 px-4 md:px-8 text-center max-w-4xl mx-auto">
        <span className="font-mono text-xs text-safety-orange tracking-[0.25em] font-bold block mb-2">
          ENGINEERED COMPOSITE SPECIFICATIONS
        </span>
        <h1 className="font-sans font-black text-3xl md:text-5xl text-industrial-charcoal mb-4 tracking-tight leading-none uppercase">
          Product Catalog Range
        </h1>
        <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Explore our certified range of lightweight pre-engineered EPS panels, custom-tailored to structural configurations from foundations to floor slabs.
        </p>
      </header>

      {/* Certifications Banner Tape */}
      <section className="bg-industrial-charcoal text-white py-6 border-y-4 border-safety-orange mb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap gap-4 md:gap-8 justify-around items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-sm text-safety-orange">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="font-sans font-extrabold text-sm block tracking-wide uppercase leading-none">KEBS-Certified</span>
              <span className="font-mono text-[10px] text-surface-container-highest uppercase">Verified Quality & Safety</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-sm text-safety-orange">
              <Award size={20} />
            </div>
            <div>
              <span className="font-sans font-extrabold text-sm block tracking-wide uppercase leading-none">10+ Years in Kenya</span>
              <span className="font-mono text-[10px] text-surface-container-highest uppercase">Tested Across 500+ Projects</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-sm text-safety-orange">
              <HeartHandshake size={20} />
            </div>
            <div>
              <span className="font-sans font-extrabold text-sm block tracking-wide uppercase leading-none">Trusted Tech</span>
              <span className="font-mono text-[10px] text-surface-container-highest uppercase">Italian Emmedue Double Mesh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Product Selector Tabs */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white border-2 border-industrial-charcoal p-5 rounded">
            <h3 className="font-sans font-black text-xs text-on-surface-variant tracking-wider uppercase mb-4 border-b border-surface-container pb-2">
              Select Product Category
            </h3>
            
            <div className="flex flex-col gap-2.5">
              {PRODUCTS.map((prod) => {
                const isActive = selectedProductCategory === prod.id;
                const Icon = categoryIcons[prod.iconName] || Ruler;

                return (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProductCategory(prod.id)}
                    className={`flex items-start gap-4 p-4 text-left rounded transition-all duration-200 border-2 ${
                      isActive
                        ? "bg-industrial-charcoal text-white border-industrial-charcoal shadow-md"
                        : "bg-surface-container-low text-industrial-charcoal border-transparent hover:bg-surface-container-high"
                    }`}
                  >
                    <div className={`p-2 rounded ${isActive ? "bg-safety-orange text-white" : "bg-white text-slate-blue border border-surface-container-highest"}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <span className={`font-mono text-[10px] font-bold block ${isActive ? "text-safety-orange" : "text-on-surface-variant"}`}>
                        CATEGORY {prod.categoryNumber}
                      </span>
                      <span className="font-sans font-extrabold text-sm md:text-base block tracking-tight leading-tight">
                        {prod.title}
                      </span>
                    </div>
                    <ChevronRight size={18} className={`self-center ${isActive ? "text-safety-orange" : "text-on-surface-variant/40"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Quote Promo Card */}
          <div className="bg-white border-2 border-dashed border-industrial-charcoal p-6 rounded text-center">
            <span className="p-2 bg-safety-orange/10 text-safety-orange rounded-full inline-block mb-3">
              <Calculator size={24} />
            </span>
            <h4 className="font-sans font-extrabold text-base text-industrial-charcoal mb-2">
              Ready to calculate quantities?
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Our interactive calculator instantly turns floor dimensions into estimated panel pieces, dead-weights, and costs.
            </p>
            <button
              onClick={() => onNavigateToQuote(selectedProductCategory)}
              className="bg-safety-orange hover:bg-safety-orange-hover text-white font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 w-full rounded transition-all active:scale-95"
            >
              Start Quantities Estimate
            </button>
          </div>
        </div>

        {/* Right Side: Detailed Tech Specs & Benefits */}
        <div className="lg:col-span-8">
          {PRODUCTS.filter(p => p.id === selectedProductCategory).map((prod) => (
            <div key={prod.id} className="bg-white border-2 border-industrial-charcoal rounded p-6 md:p-8 shadow-md animate-fadeIn">
              {/* Product Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-surface-container pb-6 mb-6">
                <div>
                  <span className="font-mono text-xs text-safety-orange font-bold uppercase block tracking-widest mb-1">
                    C-MAX® SYSTEM RANGE CATEGORY {prod.categoryNumber}
                  </span>
                  <h2 className="font-sans font-black text-2xl md:text-3xl text-industrial-charcoal">
                    C-MAX® {prod.title}
                  </h2>
                </div>
                <button
                  onClick={() => onNavigateToQuote(prod.id)}
                  className="bg-industrial-charcoal hover:bg-black text-white px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-wider rounded transition-all flex items-center gap-2"
                >
                  Quote For This
                  <ArrowRight size={14} />
                </button>
              </div>

              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-8">
                {prod.description}
              </p>

              {/* Technical Specifications Table */}
              <div className="mb-8">
                <h3 className="font-sans font-extrabold text-sm text-industrial-charcoal uppercase tracking-wider mb-3 border-l-4 border-safety-orange pl-3">
                  Technical Specifications
                </h3>
                <div className="border border-surface-container-highest rounded overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="bg-surface-container font-mono uppercase text-on-surface-variant border-b border-surface-container-highest">
                        <th className="p-3 md:p-4 font-bold">Structural Parameter</th>
                        <th className="p-3 md:p-4 font-bold text-right">Engineering Metric</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-highest font-sans">
                      {prod.specifications.map((spec, sIdx) => (
                        <tr key={sIdx} className="hover:bg-surface-container-low transition-colors">
                          <td className="p-3 md:p-4 text-slate-blue font-medium">{spec.label}</td>
                          <td className="p-3 md:p-4 text-right text-industrial-charcoal font-semibold font-mono">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Benefits Checklist */}
              <div>
                <h3 className="font-sans font-extrabold text-sm text-industrial-charcoal uppercase tracking-wider mb-3 border-l-4 border-safety-orange pl-3">
                  Key Structural Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {prod.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3 bg-surface-container-low p-4 rounded border border-surface-container-high/40">
                      <div className="bg-green-100 text-green-700 p-1 rounded-full mt-0.5">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                      <span className="text-xs md:text-sm text-industrial-charcoal font-medium leading-normal">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Quote CTA */}
      <section className="mx-4 md:mx-8 mb-24 max-w-7xl lg:mx-auto">
        <div className="bg-industrial-charcoal p-8 md:p-12 text-white border-b-8 border-safety-orange rounded-lg shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="absolute inset-0 industrial-grid opacity-10 pointer-events-none"></div>
          <div>
            <h3 className="font-sans font-extrabold text-xl md:text-3xl text-white mb-2 tracking-tight">
              Unsure about the quantity requirements?
            </h3>
            <p className="font-sans text-xs md:text-sm text-surface-container-highest max-w-xl leading-relaxed">
              Drop us a line directly on email or call our Nairobi office. Our structural drawing design specialists will review your layout drawings free of charge and send a detailed C-MAX® conversion quote within 24 hours.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 w-full md:w-auto">
            <a
              href={`mailto:${KENYAN_CONTACTS.email}`}
              className="bg-safety-orange hover:bg-safety-orange-hover text-white text-xs font-mono uppercase tracking-widest font-bold px-8 py-3.5 text-center rounded transition-all active:scale-95 border border-safety-orange"
            >
              Email Drawings Now
            </a>
            <a
              href={`tel:${KENYAN_CONTACTS.phoneFormatted}`}
              className="bg-transparent border border-white text-white hover:bg-white hover:text-industrial-charcoal text-xs font-mono uppercase tracking-widest font-bold px-8 py-3.5 text-center rounded transition-all active:scale-95"
            >
              Call Specialist
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
