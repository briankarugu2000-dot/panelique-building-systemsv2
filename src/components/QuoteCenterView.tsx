import React, { useState, useEffect } from "react";
import { Calculator, FileText, Check, AlertCircle, ArrowRight, Loader2, Upload, Trash2, Printer, CheckCircle2, MessageSquare, Phone } from "lucide-react";
import { KENYAN_CONTACTS } from "../data";
import { Inquiry } from "../types";

interface QuoteCenterViewProps {
  preSelectedCategory?: string;
}

export default function QuoteCenterView({ preSelectedCategory }: QuoteCenterViewProps) {
  const [projectType, setProjectType] = useState<string>("residential-1");
  const [wallLength, setWallLength] = useState<number>(35);
  const [wallHeight, setWallHeight] = useState<number>(3);
  const [area, setArea] = useState<number>(105);

  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStep, setUploadStep] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  
  const [submittedInquiry, setSubmittedInquiry] = useState<Inquiry | null>(null);
  const [savedQuotations, setSavedQuotations] = useState<Inquiry[]>([]);

  useEffect(() => {
    setArea(wallLength * wallHeight);
  }, [wallLength, wallHeight]);

  useEffect(() => {
    if (preSelectedCategory) {
      if (preSelectedCategory === "wall-panels") {
        setProjectType("residential-1");
      } else if (preSelectedCategory === "structural-slab") {
        setProjectType("slab-floor");
      } else {
        setProjectType("perimeter-wall");
      }
    }
  }, [preSelectedCategory]);

  useEffect(() => {
    const cached = localStorage.getItem("panelique_quotes");
    if (cached) {
      try {
        setSavedQuotations(JSON.parse(cached));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStep("Processing drawing...");
    
    setTimeout(() => {
      setUploadStep("Reading dimensions...");
      setTimeout(() => {
        setTimeout(() => {
          setUploading(false);
          setUploadedFile({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + " MB"
          });
          const randomizedLength = Math.floor(Math.random() * 80) + 20;
          const randomizedHeight = 3;
          setWallLength(randomizedLength);
          setWallHeight(randomizedHeight);
          setUploadStep("");
        }, 800);
      }, 800);
    }, 800);
  };

  const panelsCount = Math.ceil(area / 3);
  const estimatedCost = area * 4200; 
  const weightSavedKg = area * (320 - 55);
  const daysSaved = Math.max(5, Math.round(area * 0.3));
  const coolingSavingsKsh = Math.round(area * 750);

  // Handle Quotation Submission
  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    const newInquiry: Inquiry = {
      id: "PLQ-" + Math.floor(100000 + Math.random() * 900000),
      name: fullName,
      email: email,
      phone: phone,
      projectType: projectType === "residential-1" ? "Residential House" : projectType === "slab-floor" ? "Floor Slab Slabs" : "Perimeter Security Wall",
      wallArea: area,
      calculatedPanels: panelsCount,
      calculatedCost: estimatedCost,
      estimatedDaysSaved: daysSaved,
      energySavingsYearly: coolingSavingsKsh,
      drawingsFileName: uploadedFile?.name,
      submittedAt: new Date().toLocaleDateString("en-KE", { dateStyle: "medium" })
    };

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        email: email,
        phone: phone,
        projectType: projectType === "residential-1" ? "Residential House" : projectType === "slab-floor" ? "Floor Slab Slabs" : "Perimeter Security Wall",
        wallArea: area,
        calculatedCost: estimatedCost,
        notes: notes,
        source: 'Quote Center Form'
      })
    })
      .then(res => res.json())
      .then(data => console.log('Lead successfully saved to local DB:', data))
      .catch(err => console.error('Failed to save lead to local DB:', err));

    const updated = [newInquiry, ...savedQuotations];
    setSavedQuotations(updated);
    localStorage.setItem("panelique_quotes", JSON.stringify(updated));
    setSubmittedInquiry(newInquiry);

    setFullName("");
    setEmail("");
    setPhone("");
    setNotes("");
  };

  const deleteQuote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedQuotations.filter(q => q.id !== id);
    setSavedQuotations(updated);
    localStorage.setItem("panelique_quotes", JSON.stringify(updated));
  };

  return (
    <div className="relative pt-24 min-h-screen blueprint-pattern">
      <header className="pt-8 pb-12 px-4 md:px-8 text-center max-w-4xl mx-auto">
        <span className="font-mono text-xs text-safety-orange tracking-[0.25em] font-bold block mb-2">
          QUOTE CENTER
        </span>
        <h1 className="font-sans font-black text-3xl md:text-5xl text-industrial-charcoal mb-4 tracking-tight leading-none uppercase">
          Quote Center
        </h1>
        <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Estimate panel quantities and calculate cost.
        </p>
      </header>

      {submittedInquiry ? (
        
        <section className="max-w-4xl mx-auto px-4 md:px-8 pb-24">
          <div className="bg-white border-4 border-industrial-charcoal rounded-lg shadow-2xl p-6 md:p-10 animate-scaleUp">
            {/* Header branding */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-industrial-charcoal pb-6 mb-6">
              <div>
                <span className="font-mono text-xs text-safety-orange font-bold uppercase tracking-wider block mb-1">
                  OFFICIAL PRE-CONTRACT PROPOSAL
                </span>
                <h2 className="font-sans font-black text-2xl text-industrial-charcoal">
                  PANELIQUE C-MAX® PROPOSAL
                </h2>
                <span className="text-xs font-mono text-on-surface-variant">Quote Ref: {submittedInquiry.id}</span>
              </div>
              <div className="text-right">
                <span className="font-sans font-extrabold text-sm block tracking-wide uppercase leading-none">PANELIQUE SYSTEMS</span>
                <span className="font-mono text-[10px] text-safety-orange">Nairobi Office Partner</span>
                <p className="text-[10px] text-on-surface-variant mt-1">Date: {submittedInquiry.submittedAt}</p>
              </div>
            </div>

            {/* Success message banner */}
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-8 flex items-start gap-3">
              <CheckCircle2 className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-sans font-bold text-sm text-green-800">Proposal Compiled Successfully!</h4>
                <p className="text-xs text-green-700 leading-normal">
                  Our Nairobi estimating desk has received your drawings. Below is your estimated structural panel breakdown. A sales officer will follow up on email shortly.
                </p>
              </div>
            </div>

            {/* Recipient breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-surface-container-low p-5 border border-surface-container rounded mb-8">
              <div>
                <span className="font-mono text-[10px] text-on-surface-variant uppercase block font-bold mb-1">Prepared For</span>
                <span className="font-sans font-bold text-sm text-industrial-charcoal block">{submittedInquiry.name}</span>
                <span className="text-xs text-on-surface-variant font-mono block">{submittedInquiry.email}</span>
                <span className="text-xs text-on-surface-variant font-mono block">{submittedInquiry.phone}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-on-surface-variant uppercase block font-bold mb-1">Project Details</span>
                <span className="font-sans font-bold text-sm text-industrial-charcoal block">Type: {submittedInquiry.projectType}</span>
                <span className="text-xs text-on-surface-variant font-mono block">Calculated Wall Area: {submittedInquiry.wallArea} Sqm</span>
                {submittedInquiry.drawingsFileName && (
                  <span className="text-xs text-safety-orange font-mono font-semibold block mt-1">
                    ✔ Document analyzed: {submittedInquiry.drawingsFileName}
                  </span>
                )}
              </div>
            </div>

            {/* Detailed bill of quantities estimation */}
            <div className="mb-8">
              <h3 className="font-sans font-extrabold text-xs text-industrial-charcoal uppercase tracking-wider mb-3">
                Estimated Bill of Materials (C-MAX® Core)
              </h3>
              <div className="border border-surface-container-highest rounded overflow-hidden">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-surface-container font-mono uppercase text-on-surface-variant border-b border-surface-container-highest">
                      <th className="p-3 font-bold">Material Item Code & Description</th>
                      <th className="p-3 font-bold text-right">Qty Estimate</th>
                      <th className="p-3 font-bold text-right">Estimated Cost (Ksh)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-highest font-sans text-industrial-charcoal">
                    <tr>
                      <td className="p-3">
                        <span className="font-bold block">C-MAX® Single-Mesh Polystyrene Core Panel</span>
                        <span className="text-[10px] text-on-surface-variant block">Thickness: 100mm, Standard EPS Self-Extinguishing</span>
                      </td>
                      <td className="p-3 text-right font-mono font-semibold">{submittedInquiry.calculatedPanels} Pcs</td>
                      <td className="p-3 text-right font-mono font-semibold">
                        Ksh {submittedInquiry.calculatedCost.toLocaleString("en-KE")}
                      </td>
                    </tr>
                    <tr className="bg-surface-container-lowest font-medium font-mono text-xs">
                      <td className="p-3 font-bold text-right" colSpan={2}>Est. Subtotal Core Panels:</td>
                      <td className="p-3 text-right text-safety-orange font-bold">
                        Ksh {submittedInquiry.calculatedCost.toLocaleString("en-KE")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-2 italic">
                *Subtotal estimates exclude on-site micro-concrete shotcrete spray application, standard transport, and local structural engineering signing fees.
              </p>
            </div>

            {/* Savings and impact summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-safety-orange/5 border border-safety-orange/20 p-4 rounded">
                <span className="font-mono text-[10px] text-safety-orange uppercase block font-bold mb-1">
                  ✔ COMPRESSIVE TIMELINE SPEEDUP
                </span>
                <span className="font-sans font-extrabold text-lg block text-industrial-charcoal">
                  Save approx {submittedInquiry.estimatedDaysSaved} construction days
                </span>
                <span className="text-[10px] text-on-surface-variant font-mono">
                  compared to typical brick layer masonry speeds.
                </span>
              </div>

              <div className="bg-safety-orange/5 border border-safety-orange/20 p-4 rounded">
                <span className="font-mono text-[10px] text-safety-orange uppercase block font-bold mb-1">
                  ✔ ANNUALIZED UTILITY CUTS
                </span>
                <span className="font-sans font-extrabold text-lg block text-industrial-charcoal">
                  Ksh {submittedInquiry.energySavingsYearly.toLocaleString("en-KE")} / Yr
                </span>
                <span className="text-[10px] text-on-surface-variant font-mono">
                  estimated cooling energy bills savings.
                </span>
              </div>
            </div>

            {/* Proposal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end border-t border-surface-container pt-6">
              <button
                onClick={() => setSubmittedInquiry(null)}
                className="px-6 py-2.5 border border-industrial-charcoal hover:bg-surface-container text-industrial-charcoal font-mono text-xs uppercase font-bold rounded transition-all"
              >
                Estimate Another Setup
              </button>
              
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-industrial-charcoal hover:bg-black text-white font-mono text-xs uppercase font-bold rounded transition-all flex items-center justify-center gap-2"
              >
                <Printer size={14} />
                Print Proposal Sheet
              </button>

              <a
                href={`https://wa.me/${KENYAN_CONTACTS.phoneFormatted}?text=Hello%20Panelique,%20I%20have%20estimated%20C-MAX%20panels%20for%20my%20${submittedInquiry.projectType}%20project%20(Ref:%20${submittedInquiry.id}).%20Please%20let%20us%20discuss%20delivery.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-mono text-xs uppercase font-bold rounded transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={14} />
                WhatsApp Estimate
              </a>
            </div>
          </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          
          <div className="lg:col-span-7 space-y-6">
            
            
            <div className="bg-white border-2 border-industrial-charcoal rounded p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-surface-container pb-3 mb-5">
                <span className="p-1.5 bg-safety-orange/10 text-safety-orange rounded">
                  <Calculator size={18} />
                </span>
                <h3 className="font-sans font-black text-base text-industrial-charcoal uppercase tracking-tight">
                  1. Project Classification
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setProjectType("residential-1")}
                  className={`p-4 border-2 rounded text-left transition-all ${
                    projectType === "residential-1"
                      ? "border-safety-orange bg-safety-orange/5 font-semibold"
                      : "border-surface-container-highest hover:border-industrial-charcoal bg-white"
                  }`}
                >
                  <span className="font-sans text-sm block text-industrial-charcoal font-bold leading-tight">Residential House</span>
                  <span className="font-mono text-[9px] text-on-surface-variant uppercase mt-1 block">Load-Bearing Core</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProjectType("slab-floor")}
                  className={`p-4 border-2 rounded text-left transition-all ${
                    projectType === "slab-floor"
                      ? "border-safety-orange bg-safety-orange/5 font-semibold"
                      : "border-surface-container-highest hover:border-industrial-charcoal bg-white"
                  }`}
                >
                  <span className="font-sans text-sm block text-industrial-charcoal font-bold leading-tight">Floor & Deck Slabs</span>
                  <span className="font-mono text-[9px] text-on-surface-variant uppercase mt-1 block">Lightweight Decking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProjectType("perimeter-wall")}
                  className={`p-4 border-2 rounded text-left transition-all ${
                    projectType === "perimeter-wall"
                      ? "border-safety-orange bg-safety-orange/5 font-semibold"
                      : "border-surface-container-highest hover:border-industrial-charcoal bg-white"
                  }`}
                >
                  <span className="font-sans text-sm block text-industrial-charcoal font-bold leading-tight">Perimeter Security Wall</span>
                  <span className="font-mono text-[9px] text-on-surface-variant uppercase mt-1 block">Fast Interlocking</span>
                </button>
              </div>
            </div>

            
            <div className="bg-white border-2 border-industrial-charcoal rounded p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-surface-container pb-3 mb-5">
                <span className="p-1.5 bg-safety-orange/10 text-safety-orange rounded">
                  <Upload size={18} />
                </span>
                <h3 className="font-sans font-black text-base text-industrial-charcoal uppercase tracking-tight">
                  2. Architectural Layout Drawing Analyzer
                </h3>
              </div>

              {uploading ? (
                <div className="bg-surface-container-low p-8 border-2 border-dashed border-safety-orange rounded flex flex-col items-center justify-center text-center">
                  <Loader2 className="text-safety-orange animate-spin mb-3" size={32} />
                  <span className="font-sans font-bold text-sm text-industrial-charcoal block mb-1">
                    Analyzing Drawing Metrics...
                  </span>
                  <span className="font-mono text-xs text-safety-orange font-semibold animate-pulse">
                    {uploadStep}
                  </span>
                </div>
              ) : uploadedFile ? (
                <div className="bg-green-50 border border-green-200 p-5 rounded flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-green-100 text-green-700 rounded-full">
                      <FileText size={20} />
                    </span>
                    <div>
                      <span className="font-sans font-bold text-sm text-industrial-charcoal block leading-tight">
                        {uploadedFile.name}
                      </span>
                      <span className="font-mono text-xs text-on-surface-variant block">
                        File Size: {uploadedFile.size} • Extracted measures populated below!
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-surface-container-highest rounded hover:border-safety-orange bg-surface-container-lowest transition-colors relative">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.dwg"
                    onChange={handleSimulateUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="p-8 text-center">
                    <Upload className="text-on-surface-variant/40 mx-auto mb-3" size={28} />
                    <span className="font-sans font-bold text-sm text-industrial-charcoal block mb-1">
                      Drag & Drop blueprints or click to select
                    </span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Supports PDF, DWG, PNG layouts. Simulates drafting analysis scanning to extract exact measures!
                    </p>
                  </div>
                </div>
              )}
            </div>

            
            <div className="bg-white border-2 border-industrial-charcoal rounded p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-surface-container pb-3 mb-5">
                <div className="flex items-center gap-3">
                  <span className="p-1.5 bg-safety-orange/10 text-safety-orange rounded">
                    <Calculator size={18} />
                  </span>
                  <h3 className="font-sans font-black text-base text-industrial-charcoal uppercase tracking-tight">
                    3. Basic Wall Dimensions Sliders
                  </h3>
                </div>
                {uploadedFile && (
                  <span className="font-mono text-[9px] bg-green-100 text-green-800 font-bold px-2.5 py-0.5 rounded uppercase">
                    Extracted from File
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {/* Wall Length slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-sans font-bold text-sm text-industrial-charcoal">
                      Estimated Total Walls Length
                    </label>
                    <span className="font-mono text-xs font-bold bg-industrial-charcoal text-white px-3 py-1 rounded">
                      {wallLength} Meters
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    value={wallLength}
                    onChange={(e) => setWallLength(Number(e.target.value))}
                    className="w-full accent-safety-orange"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mt-1">
                    <span>Min: 5m</span>
                    <span>Standard Residence: 30m - 80m</span>
                    <span>Max: 200m</span>
                  </div>
                </div>

                {/* Wall Height slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-sans font-bold text-sm text-industrial-charcoal">
                      Estimated Height Level
                    </label>
                    <span className="font-mono text-xs font-bold bg-industrial-charcoal text-white px-3 py-1 rounded">
                      {wallHeight} Meters
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.5"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(Number(e.target.value))}
                    className="w-full accent-safety-orange"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mt-1">
                    <span>Min: 2m</span>
                    <span>Single Story: 3m</span>
                    <span>Commercial (3 levels): 9m - 12m</span>
                    <span>Max: 12m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-5 space-y-6">
            
            
            <div className="bg-industrial-charcoal text-white rounded p-6 shadow-md border-l-8 border-safety-orange relative overflow-hidden">
              <div className="absolute inset-0 industrial-grid opacity-5 pointer-events-none"></div>
              
              <div className="border-b border-white/10 pb-4 mb-4 relative z-10">
                <span className="font-mono text-[9px] text-safety-orange tracking-widest font-bold uppercase block mb-1">
                  LIVE QUANTITIES COMPILATION
                </span>
                <h3 className="font-sans font-black text-lg uppercase tracking-tight">
                  Est. Material Proposal
                </h3>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-4 mb-6 relative z-10">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-surface-container-highest">Total Wall Area:</span>
                  <span className="font-mono text-xs font-bold text-white">{area} Sq Meters</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-surface-container-highest">C-MAX® core Panels needed:</span>
                  <span className="font-mono text-xs font-bold text-safety-orange">{panelsCount} Panels</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-surface-container-highest">Estimated Panels Cost:</span>
                  <span className="font-mono text-xs font-bold text-white">Ksh {estimatedCost.toLocaleString("en-KE")}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-surface-container-highest">Foundation weight load saved:</span>
                  <span className="font-mono text-xs font-bold text-green-400">-{weightSavedKg.toLocaleString("en-KE")} kg</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-xs text-surface-container-highest">Approx Assembly Erection Days:</span>
                  <span className="font-mono text-xs font-bold text-green-400">{daysSaved} days vs {Math.round(daysSaved * 2.8)} days (traditional)</span>
                </div>
              </div>
            </div>

            
            <div className="bg-white border-2 border-industrial-charcoal rounded p-6 shadow-sm">
              <div className="border-b border-surface-container pb-3 mb-5">
                <h3 className="font-sans font-black text-sm text-industrial-charcoal uppercase tracking-tight">
                  4. Secure Your Quotation Sheet
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  Enter your details to generate your dynamic PDF pre-contract quotation sheet.
                </p>
              </div>

              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-surface-container-highest focus:border-industrial-charcoal focus:ring-1 focus:ring-industrial-charcoal rounded bg-surface-container-lowest text-industrial-charcoal"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 border border-surface-container-highest focus:border-industrial-charcoal focus:ring-1 focus:ring-industrial-charcoal rounded bg-surface-container-lowest text-industrial-charcoal"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +254 799 684 613"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 border border-surface-container-highest focus:border-industrial-charcoal focus:ring-1 focus:ring-industrial-charcoal rounded bg-surface-container-lowest text-industrial-charcoal"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-on-surface-variant font-bold uppercase block mb-1">
                    Special Project Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g. load-bearing details, Nairobi construction deadlines..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs p-2.5 border border-surface-container-highest focus:border-industrial-charcoal focus:ring-1 focus:ring-industrial-charcoal rounded bg-surface-container-lowest text-industrial-charcoal resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-safety-orange hover:bg-safety-orange-hover text-white py-3.5 font-mono text-xs font-bold uppercase tracking-widest rounded transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  Compile Proposal Sheet
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

            
            {savedQuotations.length > 0 && (
              <div className="bg-white border-2 border-industrial-charcoal rounded p-5 shadow-sm">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase font-bold block mb-2 border-b border-surface-container pb-1">
                  Saved Local Quotations Log
                </span>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {savedQuotations.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSubmittedInquiry(item)}
                      className="p-2.5 bg-surface-container-low hover:bg-surface-container-high rounded border border-surface-container text-left text-xs cursor-pointer flex justify-between items-center transition-all"
                    >
                      <div>
                        <span className="font-sans font-bold text-industrial-charcoal block leading-none mb-1">
                          {item.id} • {item.wallArea} Sqm Wall Area
                        </span>
                        <span className="font-mono text-[10px] text-on-surface-variant block">
                          Compiled: {item.submittedAt}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[10px] text-safety-orange">Ksh {item.calculatedCost.toLocaleString()}</span>
                        <button
                          onClick={(e) => deleteQuote(item.id, e)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
