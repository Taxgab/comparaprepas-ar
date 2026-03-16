"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Shield, FileText, Users, Mail } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
}

export default function LegalSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const accordionItems: AccordionItem[] = [
    {
      id: "terms",
      title: "Términos y Condiciones",
      icon: FileText,
      content: (
        <div className="space-y-3 text-gray-600">
          <p>
            Al utilizar ComparaPrepas AR, aceptás los siguientes términos:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>La información proporcionada es solo para fines informativos y comparativos.</li>
            <li>Los precios y coberturas pueden variar sin previo aviso.</li>
            <li>No somos una empresa de medicina prepaga, solo un comparador.</li>
            <li>La contratación final se realiza directamente con la empresa elegida.</li>
            <li>Nos reservamos el derecho de modificar estos términos en cualquier momento.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "privacy",
      title: "Política de Privacidad",
      icon: Shield,
      content: (
        <div className="space-y-3 text-gray-600">
          <p>
            Tu privacidad es importante para nosotros. Esta política describe cómo protegemos tus datos:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>No compartimos tu información personal con terceros sin tu consentimiento.</li>
            <li>Los datos recopilados se usan únicamente para mejorar tu experiencia.</li>
            <li>Utilizamos cookies para mejorar el funcionamiento del sitio.</li>
            <li>Podés solicitar la eliminación de tus datos en cualquier momento.</li>
            <li>Cumplimos con la Ley de Protección de Datos Personales de Argentina (Ley 25.326).</li>
          </ul>
        </div>
      ),
    },
    {
      id: "disclaimer",
      title: "Descargo de Responsabilidad",
      icon: Users,
      content: (
        <div className="space-y-3 text-gray-600">
          <p>
            Información importante sobre nuestro servicio:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>ComparaPrepas AR no ofrece asesoramiento médico ni legal.</li>
            <li>La información mostrada puede no estar actualizada. Verificá siempre con la empresa.</li>
            <li>No garantizamos la precisión absoluta de los datos mostrados.</li>
            <li>Las imágenes y logos son propiedad de sus respectivos dueños.</li>
            <li>No nos responsabilizamos por decisiones tomadas basadas en esta información.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "contact",
      title: "Contacto",
      icon: Mail,
      content: (
        <div className="space-y-3 text-gray-600">
          <p>
            ¿Tenés preguntas o consultas? Contactanos:
          </p>
          <div className="space-y-2 mt-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary-600" />
              <span>contacto@comparaprepas.ar</span>
            </div>
            <p className="text-sm">
              Horario de atención: Lunes a Viernes, 9:00 - 18:00 hs (Argentina)
            </p>
            <p className="text-sm">
              Tiempo de respuesta estimado: 24-48 horas hábiles
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="legal" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Información Legal
          </h2>
          <p className="text-xl text-gray-600">
            Conocé nuestros términos, políticas y cómo protegemos tu información.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {accordionItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                aria-expanded={openItem === item.id}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-6 w-6 text-primary-600" />
                  <span className="font-semibold text-gray-900 text-lg">
                    {item.title}
                  </span>
                </div>
                {openItem === item.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openItem === item.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
