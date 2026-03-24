export interface Plan {
  id: string;
  companyId: string;
  name: string;
  price: number;
  coverage: "Básica" | "Intermedia" | "Completa" | "Premium";
  modality: "Ambulatorio" | "Con internación" | "HMO" | "Prepaga";
  features: {
    hospitalization: boolean;
    emergency: boolean;
    medications: boolean;
    dental: boolean;
    vision: boolean;
    gym: boolean;
  };
  waitingPeriod: number;
  ageLimit: number;
}

export const plans: Plan[] = [
  // PreMedic
  {
    id: "pm-basico",
    companyId: "premedic",
    name: "PreMedic Básico",
    price: 45000,
    coverage: "Básica",
    modality: "Ambulatorio",
    features: {
      hospitalization: false,
      emergency: true,
      medications: true,
      dental: false,
      vision: false,
      gym: false,
    },
    waitingPeriod: 2,
    ageLimit: 75,
  },
  {
    id: "pm-completo",
    companyId: "premedic",
    name: "PreMedic Completo",
    price: 89000,
    coverage: "Completa",
    modality: "Con internación",
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: true,
      vision: true,
      gym: true,
    },
    waitingPeriod: 3,
    ageLimit: 75,
  },
  // Avalian
  {
    id: "av-esencial",
    companyId: "avalian",
    name: "Avalian Esencial",
    price: 52000,
    coverage: "Básica",
    modality: "HMO",
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: false,
      vision: false,
      gym: false,
    },
    waitingPeriod: 2,
    ageLimit: 70,
  },
  {
    id: "av-premium",
    companyId: "avalian",
    name: "Avalian Premium",
    price: 125000,
    coverage: "Premium",
    modality: "Prepaga",
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: true,
      vision: true,
      gym: true,
    },
    waitingPeriod: 4,
    ageLimit: 80,
  },
  // Medifé
  {
    id: "mf-clasico",
    companyId: "medife",
    name: "Medifé Clásico",
    price: 48000,
    coverage: "Básica",
    modality: "Ambulatorio",
    features: {
      hospitalization: false,
      emergency: true,
      medications: true,
      dental: true,
      vision: false,
      gym: false,
    },
    waitingPeriod: 2,
    ageLimit: 75,
  },
  {
    id: "mf-superior",
    companyId: "medife",
    name: "Medifé Superior",
    price: 95000,
    coverage: "Completa",
    modality: "Con internación",
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: true,
      vision: true,
      gym: true,
    },
    waitingPeriod: 3,
    ageLimit: 75,
  },
  // OSDE
  {
    id: "os-210",
    companyId: "osde",
    name: "OSDE 210",
    price: 68000,
    coverage: "Intermedia",
    modality: "HMO",
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: false,
      vision: false,
      gym: true,
    },
    waitingPeriod: 3,
    ageLimit: 75,
  },
  {
    id: "os-410",
    companyId: "osde",
    name: "OSDE 410",
    price: 145000,
    coverage: "Premium",
    modality: "Prepaga",
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: true,
      vision: true,
      gym: true,
    },
    waitingPeriod: 6,
    ageLimit: 80,
  },
  // Hominis
  {
    id: "hm-simple",
    companyId: "hominis",
    name: "Hominis Simple",
    price: 42000,
    coverage: "Básica",
    modality: "Ambulatorio",
    features: {
      hospitalization: false,
      emergency: true,
      medications: true,
      dental: false,
      vision: false,
      gym: false,
    },
    waitingPeriod: 1,
    ageLimit: 70,
  },
  {
    id: "hm-total",
    companyId: "hominis",
    name: "Hominis Total",
    price: 78000,
    coverage: "Completa",
    modality: "Con internación",
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: true,
      vision: true,
      gym: false,
    },
    waitingPeriod: 2,
    ageLimit: 75,
  },
  // Swiss Medical
  {
    id: "sm-basic",
    companyId: "swiss-medical",
    name: "Swiss Medical Basic",
    price: 58000,
    coverage: "Intermedia",
    modality: "HMO",
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: false,
      vision: false,
      gym: true,
    },
    waitingPeriod: 3,
    ageLimit: 75,
  },
  {
    id: "sm-elite",
    companyId: "swiss-medical",
    name: "Swiss Medical Elite",
    price: 165000,
    coverage: "Premium",
    modality: "Prepaga",
    features: {
      hospitalization: true,
      emergency: true,
      medications: true,
      dental: true,
      vision: true,
      gym: true,
    },
    waitingPeriod: 6,
    ageLimit: 85,
  },
];

export const getPlansByCompany = (companyId: string): Plan[] => {
  return plans.filter((p) => p.companyId === companyId);
};