
import { Suspense } from "react";
import PropertyListing from "../../components/PropertyListing";

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={<main style={{ minHeight: "100vh" }} />}
    >
      <PropertyListing />
    </Suspense>
  );
}
