import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { catalog, getCatalogPropertyBySlug } from "@/data/catalog";
import PropertyDetail from "@/components/PropertyDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return catalog.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getCatalogPropertyBySlug(slug);
  if (!property) return { title: "Imóvel não encontrado | Ágave Imobiliária" };
  return {
    title: `${property.title} | Ágave Imobiliária`,
    description: `${property.type} em ${property.neighborhood}, ${property.city}. Código ${property.code}. Projeto demonstrativo.`,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getCatalogPropertyBySlug(slug);
  if (!property) notFound();

  const related = catalog
    .filter((item) => item.slug !== slug && (item.city === property.city || item.type === property.type))
    .sort((a, b) => Number(b.type === property.type) - Number(a.type === property.type))
    .slice(0, 3);

  return <PropertyDetail property={property} related={related} />;
}
