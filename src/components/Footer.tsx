import React from "react";
import { ShieldCheck, Mail, Phone, MapPin, Hammer, ArrowUp, Send } from "lucide-react";
import { IMAGES, KENYAN_CONTACTS } from "../data";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-industrial-charcoal text-white border-t-4 border-safety-orange pt-16 pb-8 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 industrial-grid opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/10 relative z-10">
        
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
            <img 
              alt="Panelique Building Systems Logo" 
              className="h-10 w-auto object-contain bg-white p-1 rounded" 
              src={IMAGES.logo}
            />
            <div className="flex flex-col">
              <span className="font-sans font-black text-lg tracking-tight text-white uppercase">
                PANELIQUE
              </span>
              <span className="font-mono text-[8px] text-safety-orange tracking-widest font-bold uppercase leading-none">
                BUILDING SYSTEMS
              </span>
            </div>
          </div>
          <p className="font-sans text-xs md:text-sm text-surface-container-highest leading-relaxed">
            Leading the transformation of structural housing and industrial efficiency across East Africa with state-of-the-art C-MAX® EPS interlocking building technologies.
          </p>
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/15 p-2.5 rounded max-w-xs">
            <ShieldCheck className="text-safety-orange" size={20} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wide text-surface-container-highest">
              Official KEBS Standard Partner
            </span>
          </div>
        </div>

        
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-sans font-extrabold text-xs uppercase tracking-wider text-safety-orange border-l-2 border-safety-orange pl-2">
            SOLUTIONS
          </h4>
          <ul className="space-y-2 text-xs md:text-sm text-surface-container-highest">
            <li>
              <button 
                onClick={() => { setCurrentTab("solutions"); scrollToTop(); }}
                className="hover:text-safety-orange transition-colors"
              >
                Systemic Efficiency
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentTab("compare"); scrollToTop(); }}
                className="hover:text-safety-orange transition-colors"
              >
                Traditional Comparison
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentTab("products"); scrollToTop(); }}
                className="hover:text-safety-orange transition-colors"
              >
                Product Specifications
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setCurrentTab("quote"); scrollToTop(); }}
                className="hover:text-safety-orange transition-colors"
              >
                Interactive Quotes
              </button>
            </li>
          </ul>
        </div>

        
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-sans font-extrabold text-xs uppercase tracking-wider text-safety-orange border-l-2 border-safety-orange pl-2">
            OFFICE CONTACTS
          </h4>
          <ul className="space-y-3.5 text-xs text-surface-container-highest">
            <li className="flex items-center gap-2.5">
              <MapPin size={14} className="text-safety-orange flex-shrink-0" />
              <span>Nairobi Industrial Area, Nairobi, Kenya</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-safety-orange flex-shrink-0" />
              <a href={`tel:${KENYAN_CONTACTS.phoneFormatted}`} className="hover:text-safety-orange transition-colors">
                {KENYAN_CONTACTS.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-safety-orange flex-shrink-0" />
              <a href={`mailto:${KENYAN_CONTACTS.email}`} className="hover:text-safety-orange transition-colors">
                {KENYAN_CONTACTS.email}
              </a>
            </li>
          </ul>
        </div>

        
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-sans font-extrabold text-xs uppercase tracking-wider text-safety-orange border-l-2 border-safety-orange pl-2">
            DRAWINGS ENQUIRY
          </h4>
          <p className="text-xs text-surface-container-highest leading-relaxed">
            Send raw design layouts to our desk for immediate architectural parsing estimates.
          </p>
          <a
            href={`mailto:${KENYAN_CONTACTS.email}?subject=Drawing Layout Quote Request`}
            className="flex items-center justify-center gap-2 bg-safety-orange hover:bg-safety-orange-hover text-white py-2 px-4 rounded font-mono text-[11px] uppercase font-bold tracking-wider transition-all text-center"
          >
            <Send size={12} />
            Submit PDF drawings
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-surface-container-highest/60 relative z-10 font-mono">
        <span>© {new Date().getFullYear()} Panelique Building Systems.</span>
        
        <div className="flex items-center gap-4">
          <span className="hover:text-safety-orange cursor-pointer">Terms</span>
          <span>•</span>
          <span className="hover:text-safety-orange cursor-pointer">Privacy Charter</span>
          <span>•</span>
          <button 
            onClick={scrollToTop}
            className="p-1.5 bg-white/5 border border-white/10 text-white hover:text-safety-orange hover:bg-white/10 rounded transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
