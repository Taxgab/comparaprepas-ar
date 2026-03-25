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
      </main>

      <Footer />
    </div>
  );
}