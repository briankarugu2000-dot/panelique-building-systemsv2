import React, { useState } from "react";
import { Hammer, FileText, Smartphone, Menu, Phone, Calculator, Bot, ArrowRight, X } from "lucide-react";
import { IMAGES, KENYAN_CONTACTS } from "../data";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "solutions", label: "Solutions", icon: Hammer },
    { id: "compare", label: "Traditional vs C-MAX", icon: FileText },
    { id: "products", label: "Product Range", icon: Smartphone },
    { id: "estimator", label: "C-MAX Estimator", icon: Calculator, hash: "#estimator" },
    { id: "assistant", label: "AI Advisor", icon: Bot, hash: "#advisor" },
    { id: "quote", label: "Quote Center", icon: Phone },
  ];

  return (
    <div className="fixed top-0 w-full z-50 flex flex-col">
      
      <div className="bg-corporate-charcoal text-white text-[11px] font-mono py-2 px-4 text-center border-b border-vibrant-amber/30 select-none">
        <span className="inline-flex items-center gap-1.5 uppercase font-semibold">
          <span className="inline-block w-2 h-2 rounded-full bg-vibrant-amber animate-pulse"></span>
          Factory Alert: All structural panels supplied directly out of the Exit 10 Ruiru Factory Block
        </span>
      </div>

      <header className="bg-white/95 backdrop-blur-md border-b-2 border-surface-container-low transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
          
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setCurrentTab("solutions");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img 
              alt="Panelique Building Systems Logo" 
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-200" 
              src={IMAGES.logo}
            />
            <div className="flex items-center gap-2.5">
              <span className="font-sans font-black text-xl tracking-tight text-corporate-charcoal group-hover:text-vibrant-amber transition-colors duration-200 uppercase">
                PANELIQUE
              </span>
              <span className="h-5 w-[1px] bg-slate-300 block"></span>
              <span className="font-mono text-[9px] text-vibrant-amber tracking-wider font-bold uppercase leading-none bg-vibrant-amber/5 px-2 py-1 rounded border border-vibrant-amber/10">
                Authorized C-MAX® Contractor
              </span>
            </div>
          </div>

          
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => {
                    setCurrentTab(item.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded transition-all duration-200 ${
                    isActive
                      ? "bg-corporate-charcoal text-white font-bold border-b-2 border-vibrant-amber"
                      : "text-corporate-charcoal/80 hover:text-vibrant-amber hover:bg-industrial-slate"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-vibrant-amber" : ""} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          
          <div className="flex items-center gap-3">
            <a
              href={`tel:${KENYAN_CONTACTS.phoneFormatted}`}
              className="bg-vibrant-amber hover:bg-vibrant-amber-hover text-white text-xs font-mono uppercase tracking-wider font-bold px-4 py-2.5 rounded shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone size={13} />
              <span>{KENYAN_CONTACTS.phone}</span>
            </a>

            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-corporate-charcoal hover:text-vibrant-amber transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-surface-container bg-white absolute top-full left-0 w-full shadow-lg py-3 px-4 flex flex-col gap-1.5 animate-fadeIn">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`flex items-center gap-3 px-4 py-3 text-left text-xs font-bold rounded transition-colors ${
                    isActive
                      ? "bg-corporate-charcoal text-white font-bold border-l-4 border-vibrant-amber"
                      : "text-corporate-charcoal/80 hover:text-vibrant-amber hover:bg-industrial-slate"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-vibrant-amber" : "text-slate-400"} />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
}
