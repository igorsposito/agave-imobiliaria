
import {
  properties,
  type Property,
} from "./properties";

import { additionalProperties } from "./additionalProperties";

export const catalog: Property[] = [
  ...properties,
  ...additionalProperties,
];

export const featuredCatalog = catalog.filter(
  (property) => property.featured
);

export const launchCatalog = catalog.filter(
  (property) => property.isLaunch
);

export const saleCatalog = catalog.filter(
  (property) => property.purpose === "Comprar"
);

export const rentalCatalog = catalog.filter(
  (property) => property.purpose === "Alugar"
);

export function getCatalogPropertyBySlug(
  slug: string
): Property | undefined {
  return catalog.find(
    (property) => property.slug === slug
  );
}

export function getCatalogPropertyByCode(
  code: string
): Property | undefined {
  return catalog.find(
    (property) =>
      property.code.toLowerCase() === code.toLowerCase()
  );
}

export const catalogCount = catalog.length;
