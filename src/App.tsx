import React, { useState } from "react";
import Header from "./components/Header";
import LandingView from "./components/LandingView";
import ComparisonView from "./components/ComparisonView";
import ProductCatalogView from "./components/ProductCatalogView";
import CmaxEstimator from "./components/CmaxEstimator";
import BlueprintAssistant from "./components/BlueprintAssistant";
import QuoteCenterView from "./components/QuoteCenterView";
import Footer from "./components/Footer";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("solutions");
  const [preSelectedQuoteCategory, setPreSelectedQuoteCategory] = useState<string>("");

  const handleNavigateToQuote = (preSelectedProduct?: string) => {
    if (preSelectedProduct) {
      setPreSelectedQuoteCategory(preSelectedProduct);
    } else {
      setPreSelectedQuoteCategory("");
    }
    setCurrentTab("quote");
  };

  const handleNavigateToCompare = () => {
    setCurrentTab("compare");
  };

  return (
    <div className="min-h-screen flex flex-col bg-industrial-slate text-corporate-charcoal font-sans selection:bg-vibrant-amber selection:text-white">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      
      <main className="flex-grow">
        {currentTab === "solutions" && (
          <LandingView
            onNavigateToQuote={() => handleNavigateToQuote()}
            onNavigateToCompare={handleNavigateToCompare}
          />
        )}

        {currentTab === "compare" && (
          <ComparisonView
            onNavigateToQuote={() => handleNavigateToQuote()}
          />
        )}

        {currentTab === "products" && (
          <ProductCatalogView
            onNavigateToQuote={(category) => handleNavigateToQuote(category)}
          />
        )}

        {currentTab === "estimator" && (
          <div className="pt-24 px-4 md:px-8 bg-industrial-slate blueprint-pattern min-h-screen">
            <div className="max-w-4xl mx-auto pt-8 text-center">
              <span className="font-mono text-xs text-vibrant-amber tracking-[0.25em] font-bold block mb-2">
                MATERIAL ESTIMATOR
              </span>
              <h1 className="font-sans font-black text-3xl md:text-5xl text-corporate-charcoal mb-4 tracking-tight leading-none uppercase">
                C-MAX® Material Estimator
              </h1>
              <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto mb-6">
                Instantly compute EPS panel core requirements, concrete shotcrete spray volumes, and dead load weight savings based on wall dimensions.
              </p>
            </div>
            <CmaxEstimator />
          </div>
        )}

        {currentTab === "assistant" && (
          <div className="pt-24 px-4 md:px-8 bg-industrial-slate blueprint-pattern min-h-screen">
            <div className="max-w-4xl mx-auto pt-8 text-center">
              <span className="font-mono text-xs text-vibrant-amber tracking-[0.25em] font-bold block mb-2">
                BLUEPRINT ASSISTANT
              </span>
              <h1 className="font-sans font-black text-3xl md:text-5xl text-corporate-charcoal mb-4 tracking-tight leading-none uppercase">
                Blueprint Assistant
              </h1>
              <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto mb-6">
                Get answers on Kenyan building codes, steel wire mesh specs, and panel structural spans.
              </p>
            </div>
            <BlueprintAssistant />
          </div>
        )}

        {currentTab === "quote" && (
          <QuoteCenterView
            preSelectedCategory={preSelectedQuoteCategory}
          />
        )}
      </main>

      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}

