export interface Company {
  id: string;
  name: string;
  description: string;
  logo: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  rating: number;
  plansCount: number;
  priceFrom: number;
  features: {
    hospitalization: boolean;
    emergency: boolean;
    medications: boolean;
    dental: boolean;
    vision: boolean;
    gym: boolean;
  };
}

export const companies: Company[] = [
  {
    id: "premedic",
    name: "PreMedic",
    description: "Plan de salud con cobertura nacional y precios accesibles.",
    logo: "PM",
    phone: "0800-555-8736",
    email: "info@premedic.com.ar",
    website: "www.premedic.com.ar",
    address: "Av. Corrientes 1234, CABA",
    rating: 4.2,
    plansCount: 2,
    priceFrom: 45000,
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: false,
      vision: false,
      gym: false,
    },
  },
  {
    id: "avalian",
    name: "Avalian",
    description: "Cobertura médica integral con amplia red deprestadores.",
    logo: "AV",
    phone: "0800-555-2825",
    email: "contacto@avalian.com.ar",
    website: "www.avalian.com.ar",
    address: "Av. del Libertador 5000, CABA",
    rating: 4.0,
    plansCount: 2,
    priceFrom: 52000,
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: false,
      vision: false,
      gym: false,
    },
  },
  {
    id: "medife",
    name: "Medifé",
    description: "Tradición y cobertura médica para toda la familia.",
    logo: "MF",
    phone: "0800-555-6334",
    email: "ventas@medife.com.ar",
    website: "www.medife.com.ar",
    address: "Av. Santa Fe 2500, CABA",
    rating: 4.1,
    plansCount: 2,
    priceFrom: 48000,
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: true,
      vision: false,
      gym: false,
    },
  },
  {
    id: "osde",
    name: "OSDE",
    description: "La prepaga más grande de Argentina con cobertura premium.",
    logo: "OS",
    phone: "0800-555-6733",
    email: "info@osde.com.ar",
    website: "www.osde.com.ar",
    address: "Av. Dr. Miguel Ángel 655, CABA",
    rating: 4.4,
    plansCount: 2,
    priceFrom: 68000,
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: true,
      vision: true,
      gym: true,
    },
  },
  {
    id: "hominis",
    name: "Hominis",
    description: "Plan de salud con enfoque en medicina familiar.",
    logo: "HM",
    phone: "0800-555-4664",
    email: "consultas@hominis.com.ar",
    website: "www.hominis.com.ar",
    address: "Av. Rivadavia 8000, CABA",
    rating: 3.9,
    plansCount: 2,
    priceFrom: 42000,
    features: {
      hospitalization: false,
      emergency: true,
      medications: true,
      dental: false,
      vision: false,
      gym: false,
    },
  },
  {
    id: "swiss-medical",
    name: "Swiss Medical",
    description: "Excelencia en cobertura médica con servicio premium.",
    logo: "SM",
    phone: "0800-555-7948",
    email: "atencion@swissmedical.com.ar",
    website: "www.swissmedical.com.ar",
    address: "Av. Leandro N. Alem 1000, CABA",
    rating: 4.3,
    plansCount: 2,
    priceFrom: 58000,
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: true,
      vision: true,
      gym: true,
    },
  },
];

export const getCompanyById = (id: string): Company | undefined => {
  return companies.find((c) => c.id === id);
};