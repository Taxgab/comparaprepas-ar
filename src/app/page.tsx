"use client";

import { useState } from "react";
import { companies } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LegalSection from "@/components/LegalSection";
import { Search } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = companies.filter((company) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      company.name.toLowerCase().includes(searchLower) ||
      company.description.toLowerCase().includes(searchLower) ||
      company.features.hospitalization.toString().includes(searchLower) ||
      company.features.dental.toString().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main id="content">
        <Hero />

        <section id="planes" className="bg-slate-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Las Mejores Medicinas Prepagas
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto mb-8">
                Elegí entre las instituciones de salud más prestigiosas del país con beneficios exclusivos por contratar online.
              </p>
              
              {/* Buscador */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, cobertura o características..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-lg shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                
                {/* Contador de resultados */}
                <p className="text-sm text-slate-500 mt-2 text-left">
                  {searchQuery ? (
                    <>
                      Mostrando <strong>{filteredCompanies.length}</strong> de <strong>{companies.length}</strong> prepagas
                      {filteredCompanies.length === 0 && (
                        <span className="text-orange-600 ml-2">- No se encontraron resultados</span>
                      )}
                    </>
                  ) : (
                    <>{companies.length} prepagas disponibles</>
                  )}
                </p>
              </div>
            </div>

            {/* Grid de resultados */}
            {filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  No se encontraron prepagas
                </h3>
                <p className="text-slate-500">
                  Intentá con otro término de búsqueda
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver todas las prepagas
                </button>
              </div>
            )}
          </div>
        </section>

        <HowItWorks />

        <LegalSection />
      </main>

      <Footer />
    </div>
  );
}