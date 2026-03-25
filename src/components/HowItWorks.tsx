"use client";

import { Search, Filter, CheckCircle, Phone } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Buscá",
      description: "Explorá todos los planes disponibles de las principales medicinas prepagas del país.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Filter,
      title: "Filtrá",
      description: "Usá nuestros filtros para encontrar el plan que mejor se adapta a tu presupuesto y necesidades.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: CheckCircle,
      title: "Compará",
      description: "Analizá coberturas, precios y beneficios lado a lado para tomar la mejor decisión.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Phone,
      title: "Contactá",
      description: "Una vez elegido tu plan, te conectamos directamente con la empresa para contratar.",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontrar tu plan de salud ideal nunca fue tan fácil. Seguí estos 4 simples pasos.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>

              {/* Card */}
              <div className="bg-gray-50 rounded-xl p-6 h-full border border-gray-200 hover:shadow-lg transition-shadow">
                {/* Icon */}
                <div className={`${step.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  <step.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>

              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            ¿Listo para encontrar tu plan ideal?
          </p>
          <a
            href="#planes"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg"
          >
            Ver Planes Disponibles
          </a>
        </div>
      </div>
    </section>
  );
}
