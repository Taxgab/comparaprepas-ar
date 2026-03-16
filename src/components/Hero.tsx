"use client";

import { Search, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="bg-gradient-to-br from-primary-50 to-blue-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Compará Prepagas en{" "}
            <span className="text-primary-600">Argentina</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Encontrá el plan de salud perfecto para vos y tu familia. 
            Compará precios, coberturas y beneficios de las principales prepagas del país.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                className="w-full px-6 py-4 pl-12 rounded-full border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg">
              Buscar Planes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className="font-medium">+12 Planes disponibles</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className="font-medium">6 Empresas líderes</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-700">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className="font-medium">Comparación gratuita</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
