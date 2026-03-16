import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlansSection from "@/components/PlansSection";
import HowItWorks from "@/components/HowItWorks";
import LegalSection from "@/components/LegalSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PlansSection />
      <HowItWorks />
      <LegalSection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4">ComparaPrepas AR</h3>
              <p className="text-gray-400">
                Tu comparador de confianza para encontrar el plan de salud ideal en Argentina.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#planes" className="hover:text-white transition-colors">Planes</a></li>
                <li><a href="#como-funciona" className="hover:text-white transition-colors">Cómo Funciona</a></li>
                <li><a href="#legal" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contacto@comparaprepas.ar</li>
                <li>Argentina</li>
                <li>Lun - Vie: 9:00 - 18:00 hs</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ComparaPrepas AR. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
