import { companies } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xl font-bold text-slate-800">ComparaPrepas</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Inicio</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Empresas</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Contacto</a>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Contacto
              </button>
            </div>
            <button className="md:hidden text-slate-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Compará seguros de salud privados
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-xl">
                Encontrá la mejor cobertura médica en Argentina. Comparamos las prepagas líderes para que elijas con seguridad y ahorro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:bg-blue-50 transition-colors">
                  Ver Planes Ahora
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/10 transition-colors">
                  Saber Más
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
                <div>
                  <p className="text-3xl font-bold">{companies.length}+</p>
                  <p className="text-sm text-blue-200">Empresas</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm text-blue-200">Planes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm text-blue-200">Cobertura</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white/10 aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center">
                  <svg className="w-32 h-32 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 -left-4 bg-orange-100 text-orange-800 px-5 py-2 rounded-full shadow-lg font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Odontología Premium Incluida
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-20">
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

      <footer className="bg-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-bold text-slate-800">ComparaPrepas</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacidad</a>
              <a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Términos</a>
              <a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Preguntas Frecuentes</a>
              <a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Contacto</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} ComparaPrepas AR. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}