
export const propertyTypes = [
  {
    value: "Casa",
    label: "Casa",
    category: "residencial",
    featured: true,
  },
  {
    value: "Apartamento",
    label: "Apartamento",
    category: "residencial",
    featured: true,
  },
  {
    value: "Casa em condomínio",
    label: "Casa em condomínio",
    category: "residencial",
    featured: false,
  },
  {
    value: "Cobertura",
    label: "Cobertura",
    category: "residencial",
    featured: false,
  },
  {
    value: "Studio",
    label: "Studio / Kitnet",
    category: "residencial",
    featured: false,
  },
  {
    value: "Sítio / Chácara",
    label: "Sítio / Chácara",
    category: "rural",
    featured: false,
  },
  {
    value: "Fazenda",
    label: "Fazenda",
    category: "rural",
    featured: false,
  },
  {
    value: "Terreno / Lote",
    label: "Terreno / Lote",
    category: "terreno",
    featured: false,
  },
  {
    value: "Ponto comercial / Loja",
    label: "Ponto comercial / Loja",
    category: "comercial",
    featured: false,
  },
  {
    value: "Sala comercial",
    label: "Sala comercial",
    category: "comercial",
    featured: false,
  },
  {
    value: "Galpão / Depósito",
    label: "Galpão / Depósito",
    category: "comercial",
    featured: false,
  },
] as const;

export type PropertyType =
  (typeof propertyTypes)[number]["value"];

export const featuredPropertyTypes = propertyTypes.filter(
  (type) => type.featured
);

export const otherPropertyTypes = propertyTypes.filter(
  (type) => !type.featured
);

export const propertyTypeGroups = [
  {
    id: "residencial",
    label: "Residenciais",
  },
  {
    id: "rural",
    label: "Rurais",
  },
  {
    id: "terreno",
    label: "Terrenos",
  },
  {
    id: "comercial",
    label: "Comerciais",
  },
] as const;
