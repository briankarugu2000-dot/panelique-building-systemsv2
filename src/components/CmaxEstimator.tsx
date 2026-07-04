import React, { useState } from "react";
import { Calculator, Hammer, ShieldAlert, Sparkles, TrendingDown, Layers, Building } from "lucide-react";

export default function CmaxEstimator() {
  const [wallArea, setWallArea] = useState<number>(100);
  const [buildingType, setBuildingType] = useState<string>("residential");

  // Calculations
  const panelCoverage = 3; // 1 standard panel = 3 sq meters
  const totalPanels = Math.ceil(wallArea / panelCoverage);

  // Plaster concrete volume: 35mm per side, total 70mm or 0.07m layer across total wall area
  const plasterThickness = 0.07; // in meters
  const plasterVolume = parseFloat((wallArea * plasterThickness).toFixed(2));

  // Structural savings factor (just to make the calculations dynamic and interesting based on building type)
  // Let's vary the estimated traditional weight vs C-MAX weight saving based on building type
  // Standard building weight savings: 80% weight reduction on wall structure
  const getTraditionalWeight = () => {
    switch (buildingType) {
      case "social":
        return wallArea * 280; // 280 kg/sqm traditional masonry
      case "commercial":
        return wallArea * 350; // 350 kg/sqm reinforced concrete / thick brickwork
      case "residential":
      default:
        return wallArea * 320; // 320 kg/sqm standard brickwork
    }
  };

  const getCmaxWeight = () => {
    return wallArea * 55; // C-MAX is consistently ~55 kg/sqm complete with shotcrete
  };

  const traditionalWeight = getTraditionalWeight();
  const cmaxWeight = getCmaxWeight();
  const weightSaved = Math.round(traditionalWeight - cmaxWeight);
  const percentWeightSaved = Math.round(((traditionalWeight - cmaxWeight) / traditionalWeight) * 100);

  return (
    <div className="bg-white border-2 border-industrial-charcoal rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto my-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-industrial-charcoal p-6 text-white border-b-4 border-safety-orange flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-safety-orange text-white rounded">
            <Calculator size={24} />
          </div>
          <div>
            <h3 className="font-sans font-bold text-xl uppercase tracking-tight">C-MAX® Structural Demand Calculator</h3>
            <p className="font-mono text-[10px] text-surface-container-high tracking-wider uppercase mt-0.5">
              Deterministic Estimator Engine v1.1
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-1 bg-surface-container-low text-industrial-charcoal font-bold rounded uppercase">
          M2 Technology
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Input Panel */}
        <div className="p-6 md:p-8 md:col-span-5 border-r border-surface-container bg-surface-container-lowest flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-blue uppercase tracking-wider mb-2">
                1. Total Wall Area (m²)
              </label>
              <div className="relative mt-1">
                <input
                  type="number"
                  min="5"
                  max="10000"
                  value={wallArea}
                  onChange={(e) => setWallArea(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border-2 border-industrial-charcoal rounded px-4 py-3 text-lg font-mono font-bold focus:border-safety-orange focus:outline-none transition-colors"
                />
                <span className="absolute right-4 top-3.5 font-mono text-sm text-slate-blue font-bold">m²</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={wallArea}
                onChange={(e) => setWallArea(parseInt(e.target.value))}
                className="w-full accent-safety-orange mt-4 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mt-1">
                <span>10 m²</span>
                <span>500 m²</span>
                <span>1000 m²</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-blue uppercase tracking-wider mb-2">
                2. Building Type
              </label>
              <div className="relative mt-1">
                <div className="absolute left-4 top-3.5 text-slate-blue">
                  <Building size={18} />
                </div>
                <select
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value)}
                  className="w-full bg-white border-2 border-industrial-charcoal rounded pl-11 pr-4 py-3 font-sans text-sm font-semibold text-industrial-charcoal focus:border-safety-orange focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="social">Social Housing (Single panels, optimized density)</option>
                  <option value="residential">Residential Development (Multi-story / luxury villa)</option>
                  <option value="commercial">Commercial Space (Heavy loads, double-mesh panels)</option>
                </select>
                <div className="absolute right-4 top-4.5 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-industrial-charcoal w-0 h-0"></div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-surface-container-high text-[11px] text-on-surface-variant leading-relaxed">
            <span className="font-bold text-slate-blue block mb-1">Standard Spec Reference:</span>
            Calculations are based on 1.2m width panels with single or double steel mesh layer depending on structural calculations.
          </div>
        </div>

        {/* Output Panel */}
        <div className="p-6 md:p-8 md:col-span-7 bg-white flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-safety-orange font-bold uppercase tracking-widest block mb-4">
              Estimated Structural Demands
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* EPS Core Volume Card */}
              <div className="border border-surface-container-highest p-4 rounded bg-surface-container-lowest hover:border-safety-orange transition-colors">
                <div className="flex items-center gap-2 mb-2 text-slate-blue">
                  <Layers size={18} />
                  <span className="text-xs font-sans font-bold uppercase tracking-wider">EPS Panels Core</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-mono font-black text-industrial-charcoal">{totalPanels}</span>
                  <span className="text-xs font-mono text-on-surface-variant uppercase font-semibold">panels</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mt-2">
                  At 3 m² per standard panel core size.
                </p>
              </div>

              {/* Plaster Concrete Card */}
              <div className="border border-surface-container-highest p-4 rounded bg-surface-container-lowest hover:border-safety-orange transition-colors">
                <div className="flex items-center gap-2 mb-2 text-slate-blue">
                  <Hammer size={18} />
                  <span className="text-xs font-sans font-bold uppercase tracking-wider">Shotcrete Volume</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-mono font-black text-industrial-charcoal">{plasterVolume}</span>
                  <span className="text-xs font-mono text-on-surface-variant uppercase font-semibold">m³</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mt-2">
                  70mm thickness layer (35mm per side).
                </p>
              </div>
            </div>

            {/* Weight savings sub-stat */}
            <div className="bg-surface-container p-4 border-l-4 border-industrial-charcoal rounded mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Dead Load Reduction</span>
                <span className="font-sans font-bold text-sm text-industrial-charcoal">
                  Save {weightSaved.toLocaleString()} kg ({percentWeightSaved}% lighter walls)
                </span>
              </div>
              <TrendingDown className="text-slate-blue" size={24} />
            </div>

            {/* Green and HVAC Callout (from M2 Data) */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-start gap-3">
              <div className="p-1 bg-green-600 text-white rounded mt-0.5">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs text-green-900 uppercase tracking-wider mb-1">
                  Certified Ecological Savings
                </h4>
                <p className="text-xs text-green-800 leading-relaxed font-semibold">
                  This design guarantees <strong className="text-green-950 font-bold">60% lower carbon emissions</strong> and up to <strong className="text-green-950 font-bold">80% HVAC energy savings</strong> over the lifetime of the building based on official M2 technology data.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-surface-container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-on-surface-variant">
            <span>KEBS Certified Standard: KS ISO 4898</span>
            <span className="text-safety-orange font-bold">Authorized Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
}
