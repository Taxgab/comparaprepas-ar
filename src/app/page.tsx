import { companies } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">
              ComparaPrepas
            </h1>
            <span className="text-sm text-gray-500">
              Comparador de Prepagas Argentina
            </span>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Encontrá el mejor plan de salud
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Compará las principales prepagas de Argentina y encontrá la opción
            perfecta para vos y tu familia.
          </p>
          <div className="mt-8 flex justify-center gap-8 text-blue-100">
            <div>
              <div className="text-3xl font-bold text-white">6</div>
              <div className="text-sm">Empresas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">12</div>
              <div className="text-sm">Planes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm">Cobertura</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">
              Empresas de Prepagas
            </h3>
            <p className="text-gray-600 mt-2">
              Seleccioná una empresa para ver sus planes y características
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ComparaPrepas AR. Todos los derechos
            reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Información actualizada a {new Date().toLocaleDateString("es-AR")}
          </p>
        </div>
      </footer>
    </main>
  );
}