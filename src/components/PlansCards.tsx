"use client";

import { Check, Star } from "lucide-react";
import { Plan } from "@/data/plans";

interface PlansCardsProps {
  plans: Plan[];
}

export default function PlansCards({ plans }: PlansCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-bold text-lg">{plan.company}</h3>
                <p className="text-primary-100 text-sm">{plan.planName}</p>
              </div>
              <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded">
                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                <span className="text-white font-semibold text-sm">
                  {plan.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                ${plan.price.toLocaleString("es-AR")}
              </span>
              <span className="text-gray-500 ml-2">/mes</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                {plan.coverage}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {plan.modality}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="px-6 py-4">
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm">
                <Check
                  className={`h-4 w-4 ${
                    plan.hospitalization ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span className={plan.hospitalization ? "text-gray-700" : "text-gray-400"}>
                  Internación
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Check
                  className={`h-4 w-4 ${
                    plan.emergency ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span className={plan.emergency ? "text-gray-700" : "text-gray-400"}>
                  Emergencias
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Check
                  className={`h-4 w-4 ${
                    plan.medications ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span className={plan.medications ? "text-gray-700" : "text-gray-400"}>
                  Medicamentos
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Check
                  className={`h-4 w-4 ${
                    plan.dental ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span className={plan.dental ? "text-gray-700" : "text-gray-400"}>
                  Odontología
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Check
                  className={`h-4 w-4 ${
                    plan.vision ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span className={plan.vision ? "text-gray-700" : "text-gray-400"}>
                  Oftalmología
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Check
                  className={`h-4 w-4 ${
                    plan.gym ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span className={plan.gym ? "text-gray-700" : "text-gray-400"}>
                  Gimnasio
                </span>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex justify-between text-xs text-gray-500 mb-3">
              <span>Período de espera: {plan.waitingPeriod} meses</span>
              <span>Edad máx: {plan.ageLimit} años</span>
            </div>
            <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
              Ver detalles
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
