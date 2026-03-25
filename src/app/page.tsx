import { companies } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LegalSection from "@/components/LegalSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main id="content">
        <Hero />

        <section id="planes" className="bg-slate-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Las Mejores Prepagas
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Elegí entre las instituciones de salud más prestigiosas del país con beneficios exclusivos por contratar online.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />

        <LegalSection />

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ¿Dudas sobre cuál elegir?
                </h2>
                <p className="text-blue-100 text-lg mb-6">
                  Nuestros asesores expertos te ayudan a comparar cartillas, coberturas y precios sin compromiso. Totalmente gratis.
                </p>
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform">
                  Hablar con un experto
                </button>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-14 h-14 rounded-full border-4 border-blue-600 bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
                    {i}
                  </div>
                ))}
                <div className="w-14 h-14 rounded-full border-4 border-blue-600 bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  +12
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}