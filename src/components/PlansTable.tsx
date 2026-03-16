"use client";

import { Check, Star } from "lucide-react";
import { Plan } from "@/data/plans";

interface PlansTableProps {
  plans: Plan[];
}

export default function PlansTable({ plans }: PlansTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <thead className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Plan</th>
            <th className="px-6 py-4 text-left font-semibold">Precio</th>
            <th className="px-6 py-4 text-left font-semibold">Cobertura</th>
            <th className="px-6 py-4 text-left font-semibold">Modalidad</th>
            <th className="px-6 py-4 text-center font-semibold">Internación</th>
            <th className="px-6 py-4 text-center font-semibold">Emergencias</th>
            <th className="px-6 py-4 text-center font-semibold">Medicamentos</th>
            <th className="px-6 py-4 text-center font-semibold">Odontología</th>
            <th className="px-6 py-4 text-center font-semibold">Oftalmología</th>
            <th className="px-6 py-4 text-center font-semibold">Gimnasio</th>
            <th className="px-6 py-4 text-center font-semibold">Rating</th>
            <th className="px-6 py-4 text-center font-semibold">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {plans.map((plan) => (
            <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold text-gray-900">{plan.company}</p>
                  <p className="text-sm text-gray-500">{plan.planName}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="font-bold text-gray-900">
                  ${plan.price.toLocaleString("es-AR")}
                </span>
                <span className="text-gray-500 text-sm">/mes</span>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                  {plan.coverage}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-700">{plan.modality}</span>
              </td>
              <td className="px-6 py-4 text-center">
                {plan.hospitalization ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {plan.emergency ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {plan.medications ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {plan.dental ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {plan.vision ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {plan.gym ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-900">{plan.rating}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm">
                  Ver más
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
