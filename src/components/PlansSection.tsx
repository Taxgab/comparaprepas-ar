"use client";

import { useState } from "react";
import { plans as allPlans } from "@/data/plans";
import Filters from "./Filters";
import PlansTable from "./PlansTable";
import PlansCards from "./PlansCards";
import { Plan } from "@/data/plans";

export default function PlansSection() {
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(allPlans);

  const handleFilterChange = (filtered: Plan[]) => {
    setFilteredPlans(filtered);
  };

  return (
    <section id="planes" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Planes Disponibles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorá nuestra selección de planes de salud. Usá los filtros para encontrar el que mejor se adapta a tus necesidades.
          </p>
        </div>

        {/* Filters */}
        <Filters plans={allPlans} onFilterChange={handleFilterChange} />

        {/* Results count */}
        <div className="mt-8 mb-6">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold text-primary-600">{filteredPlans.length}</span> de{" "}
            <span className="font-semibold">{allPlans.length}</span> planes
          </p>
        </div>

        {/* Plans display - Table for desktop, Cards for mobile */}
        {filteredPlans.length > 0 ? (
          <>
            <PlansTable plans={filteredPlans} />
            <PlansCards plans={filteredPlans} />
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <p className="text-gray-500 text-lg mb-4">
              No se encontraron planes con los filtros seleccionados.
            </p>
            <button
              onClick={() => setFilteredPlans(allPlans)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
