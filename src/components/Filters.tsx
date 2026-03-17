"use client";

import { Filter, X } from "lucide-react";
import { useState } from "react";
import { Plan, companies, coverages, modalities } from "@/data/plans";

interface FiltersProps {
  plans: Plan[];
  onFilterChange: (filteredPlans: Plan[]) => void;
}

export default function Filters({ plans, onFilterChange }: FiltersProps) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (
    item: string,
    selected: string[],
    setSelected: (items: string[]) => void
  ) => {
    const newSelected = selected.includes(item)
      ? selected.filter((i) => i !== item)
      : [...selected, item];
    setSelected(newSelected);
    applyFilters(newSelected, selectedCoverages, selectedModalities, priceRange, "company");
  };

  const applyFilters = (
    companies: string[],
    coverages: string[],
    modalities: string[],
    price: [number, number],
    source: string
  ) => {
    let filtered = plans;

    if (source === "company" || companies.length > 0) {
      if (companies.length > 0) {
        filtered = filtered.filter((plan) => companies.includes(plan.company));
      }
    }

    if (source === "coverage" || coverages.length > 0) {
      if (coverages.length > 0) {
        filtered = filtered.filter((plan) => coverages.includes(plan.coverage));
      }
    }

    if (source === "modality" || modalities.length > 0) {
      if (modalities.length > 0) {
        filtered = filtered.filter((plan) => modalities.includes(plan.modality));
      }
    }

    if (source === "price" || (source !== "price" && price[0] > 0 && price[1] < 200000)) {
      filtered = filtered.filter(
        (plan) => plan.price >= price[0] && plan.price <= price[1]
      );
    }

    onFilterChange(filtered);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    const newRange: [number, number] = [0, newMax];
    setPriceRange(newRange);
    applyFilters(selectedCompanies, selectedCoverages, selectedModalities, newRange, "price");
  };

  const clearAllFilters = () => {
    setSelectedCompanies([]);
    setSelectedCoverages([]);
    setSelectedModalities([]);
    setPriceRange([0, 200000]);
    onFilterChange(plans);
  };

  const hasActiveFilters =
    selectedCompanies.length > 0 ||
    selectedCoverages.length > 0 ||
    selectedModalities.length > 0 ||
    priceRange[1] < 200000;

  return (
    <div className="sticky top-16 z-40 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile filter toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-primary-600 font-medium"
          >
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Limpiar todo
            </button>
          )}
        </div>

        {/* Filters content */}
        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Empresas */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Empresas</h3>
              <div className="space-y-2">
                {companies.map((company) => (
                  <label key={company} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company)}
                      onChange={() =>
                        toggleFilter(company, selectedCompanies, setSelectedCompanies)
                      }
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700">{company}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cobertura */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Cobertura</h3>
              <div className="space-y-2">
                {coverages.map((coverage) => (
                  <label key={coverage} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCoverages.includes(coverage)}
                      onChange={() =>
                        toggleFilter(coverage, selectedCoverages, setSelectedCoverages)
                      }
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700">{coverage}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Modalidad */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Modalidad</h3>
              <div className="space-y-2">
                {modalities.map((modality) => (
                  <label key={modality} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedModalities.includes(modality)}
                      onChange={() =>
                        toggleFilter(modality, selectedModalities, setSelectedModalities)
                      }
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700">{modality}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Precio */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Precio máximo: ${priceRange[1].toLocaleString("es-AR")}
              </h3>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>$200,000</span>
              </div>
            </div>
          </div>

          {/* Active filters summary */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {[...selectedCompanies, ...selectedCoverages, ...selectedModalities].map(
                (filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
                  >
                    {filter}
                    <X 
                      className="ml-1 h-3 w-3 cursor-pointer hover:text-primary-900" 
                      onClick={() => {
                        if (selectedCompanies.includes(filter)) {
                          toggleFilter(filter, selectedCompanies, setSelectedCompanies);
                        } else if (selectedCoverages.includes(filter)) {
                          toggleFilter(filter, selectedCoverages, setSelectedCoverages);
                        } else if (selectedModalities.includes(filter)) {
                          toggleFilter(filter, selectedModalities, setSelectedModalities);
                        }
                      }}
                    />
                  </span>
                )
              )}
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Limpiar todo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
