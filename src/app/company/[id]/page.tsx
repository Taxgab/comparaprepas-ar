import { notFound } from "next/navigation";
import Link from "next/link";
import { getCompanyById, companies } from "@/data/companies";
import { getPlansByCompany, plans } from "@/data/plans";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return companies.map((company) => ({
    id: company.id,
  }));
}

export default async function CompanyPage({ params }: PageProps) {
  const { id } = await params;
  const company = getCompanyById(id);

  if (!company) {
    notFound();
  }

  const companyPlans = getPlansByCompany(id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const featureLabels: Record<string, string> = {
    hospitalization: "Internación",
    emergency: "Emergencia",
    medications: "Medicamentos",
    dental: "Odontología",
    vision: "Optica",
    gym: "Gimnasio",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Volver
            </Link>
            <h1 className="text-2xl font-bold text-blue-600">ComparaPrepas</h1>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold backdrop-blur">
              {company.logo}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{company.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(company.rating)
                          ? "text-yellow-400"
                          : "text-white/30"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-blue-100 ml-1">
                  {company.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-blue-100 text-lg">{company.description}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Planes Disponibles ({companyPlans.length})
              </h3>
              <div className="space-y-4">
                {companyPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {plan.name}
                        </h4>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {plan.coverage}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {plan.modality}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatPrice(plan.price)}
                        </div>
                        <span className="text-gray-500 text-sm">/mes</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Período de carencia</span>
                          <p className="font-medium text-gray-900">
                            {plan.waitingPeriod} meses
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Límite de edad</span>
                          <p className="font-medium text-gray-900">
                            {plan.ageLimit} años
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Modalidad</span>
                          <p className="font-medium text-gray-900">{plan.modality}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-gray-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <a
                      href={`tel:${company.phone}`}
                      className="text-gray-900 font-medium hover:text-blue-600"
                    >
                      {company.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-gray-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-gray-900 font-medium hover:text-blue-600"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-gray-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Web</p>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 font-medium hover:text-blue-600"
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-gray-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Dirección</p>
                    <p className="text-gray-900 font-medium">{company.address}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Prestaciones
              </h3>
              <div className="space-y-3">
                {Object.entries(company.features).map(([key, value]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-3 ${
                      value ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {value ? (
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span
                      className={
                        value ? "font-medium" : "line-through text-gray-400"
                      }
                    >
                      {featureLabels[key]}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}