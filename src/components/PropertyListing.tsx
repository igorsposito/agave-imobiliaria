"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import PropertyCard from "./PropertyCard";
import { catalog } from "@/data/catalog";
import {
  propertyTypes,
  propertyTypeGroups,
  type PropertyType,
} from "@/data/propertyTypes";
import styles from "./PropertyListing.module.css";
type SortOption =
  | "recentes"
  | "menor-preco"
  | "maior-preco"
  | "maior-area";
type Filters = {
  purpose: string;
  location: string;
  code: string;
  types: PropertyType[];
  bedrooms: string;
  bathrooms: string;
  garages: string;
  onlyLaunches: boolean;
  minPrice: string;
  maxPrice: string;
};
const roomOptions = ["Todos", "1", "2", "3", "4", "5"];
const sortOptions: {
  value: SortOption;
  label: string;
}[] = [
  { value: "recentes", label: "Mais recentes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "maior-area", label: "Maior área" },
];
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
function getInitialFilters(
  params: URLSearchParams
): Filters {
  const validTypes = params
    .get("tipos")
    ?.split(",")
    .filter((type): type is PropertyType =>
      propertyTypes.some((item) => item.value === type)
    );
  return {
    purpose: params.get("finalidade") || "Todos",
    location: params.get("localizacao") || "",
    code: params.get("codigo") || "",
    types: validTypes || [],
    bedrooms: params.get("quartos") || "Todos",
    bathrooms: params.get("banheiros") || "Todos",
    garages: params.get("garagens") || "Todos",
    onlyLaunches: params.get("lancamento") === "Sim",
    minPrice: params.get("valorMin") || "",
    maxPrice: params.get("valorMax") || "",
  };
}
function createQuery(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.purpose !== "Todos") {
    params.set("finalidade", filters.purpose);
  }
  if (filters.location.trim()) {
    params.set("localizacao", filters.location.trim());
  }
  if (filters.code.trim()) {
    params.set("codigo", filters.code.trim());
  }
  if (filters.types.length > 0) {
    params.set("tipos", filters.types.join(","));
  }
  if (filters.bedrooms !== "Todos") {
    params.set("quartos", filters.bedrooms);
  }
  if (filters.bathrooms !== "Todos") {
    params.set("banheiros", filters.bathrooms);
  }
  if (filters.garages !== "Todos") {
    params.set("garagens", filters.garages);
  }
  if (filters.onlyLaunches) {
    params.set("lancamento", "Sim");
  }
  if (filters.minPrice !== "") {
    params.set("valorMin", filters.minPrice);
  }
  if (filters.maxPrice !== "") {
    params.set("valorMax", filters.maxPrice);
  }
  return params.toString();
}
function matchesFilters(
  property: (typeof catalog)[number],
  filters: Filters
) {
  if (
    filters.purpose !== "Todos" &&
    property.purpose !== filters.purpose
  ) {
    return false;
  }
  if (filters.location.trim()) {
    const locationText = normalize(
      [
        property.city,
        property.neighborhood,
        property.state,
        property.address,
      ].join(" ")
    );
    if (!locationText.includes(normalize(filters.location))) {
      return false;
    }
  }
  if (
    filters.code.trim() &&
    !normalize(property.code).includes(normalize(filters.code))
  ) {
    return false;
  }
  if (
    filters.types.length > 0 &&
    !filters.types.includes(property.type)
  ) {
    return false;
  }
  if (
    filters.bedrooms !== "Todos" &&
    property.bedrooms < Number(filters.bedrooms)
  ) {
    return false;
  }
  if (
    filters.bathrooms !== "Todos" &&
    property.bathrooms < Number(filters.bathrooms)
  ) {
    return false;
  }
  if (
    filters.garages !== "Todos" &&
    property.garages < Number(filters.garages)
  ) {
    return false;
  }
  if (filters.onlyLaunches && !property.isLaunch) {
    return false;
  }
  if (
    filters.minPrice !== "" &&
    property.price < Number(filters.minPrice)
  ) {
    return false;
  }
  if (
    filters.maxPrice !== "" &&
    property.price > Number(filters.maxPrice)
  ) {
    return false;
  }
  return true;
}
export default function PropertyListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const initialFilters = useMemo(
    () => getInitialFilters(new URLSearchParams(queryString)),
    [queryString]
  );
  const [draftFilters, setDraftFilters] =
    useState<Filters>(initialFilters);
  const [sort, setSort] =
    useState<SortOption>("recentes");
  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(() => {
    const selected = propertyTypeGroups
      .filter((group) => propertyTypes.some((type) => type.category === group.id && initialFilters.types.includes(type.value)))
      .map((group) => group.id);
    return selected.length ? selected : [];
  });
  // Os resultados respondem imediatamente ao estado dos campos.
  const activeFilters = draftFilters;
  // Sincroniza a URL sem navegar nem perder o foco durante a digitação.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const query = createQuery(draftFilters);
      const next = query ? `/imoveis?${query}` : "/imoveis";
      const current = window.location.pathname + window.location.search;
      if (current !== next) window.history.replaceState(null, "", next);
    }, 320);
    return () => window.clearTimeout(timer);
  }, [draftFilters]);
  // Atualiza os campos ao usar Voltar/Avançar no navegador.
  useEffect(() => {
    const onPopState = () => {
      setDraftFilters(getInitialFilters(new URLSearchParams(window.location.search)));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  const toggleGroup = (id: string) => {
    setOpenGroups((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  };
  const results = useMemo(() => {
    const filtered = catalog.filter((property) =>
      matchesFilters(property, activeFilters)
    );
    return [...filtered].sort((a, b) => {
      if (sort === "menor-preco") {
        return a.price - b.price;
      }
      if (sort === "maior-preco") {
        return b.price - a.price;
      }
      if (sort === "maior-area") {
        return (
          (b.totalArea || b.area) -
          (a.totalArea || a.area)
        );
      }
      return b.id - a.id;
    });
  }, [activeFilters, sort]);
  const updateFilter = <K extends keyof Filters>(
    key: K,
    value: Filters[K]
  ) => {
    setDraftFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };
  const toggleType = (type: PropertyType) => {
    setDraftFilters((current) => ({
      ...current,
      types: current.types.includes(type)
        ? current.types.filter((item) => item !== type)
        : [...current.types, type],
    }));
  };
  const applyFilters = () => {
    const query = createQuery(draftFilters);
    window.history.replaceState(null, "", query ? `/imoveis?${query}` : "/imoveis");
    setMobileFiltersOpen(false);
  };
  const resetFilters = () => {
    const empty = getInitialFilters(new URLSearchParams());
    setDraftFilters(empty);
    window.history.replaceState(null, "", "/imoveis");
    setMobileFiltersOpen(false);
  };
  const filtersPanel = (
    <div className={styles.filtersContent}>
      <div className={styles.filterHeader}>
        <div>
          <h2>Filtros</h2>
          <p>Encontre o imóvel ideal.</p>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className={styles.resetButton}
        >
          <RotateCcw size={15} />
          Limpar
        </button>
      </div>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          Finalidade
        </label>
        <div className={styles.segmented}>
          {["Todos", "Comprar", "Alugar"].map((purpose) => (
            <button
              key={purpose}
              type="button"
              className={`${styles.segment} ${
                draftFilters.purpose === purpose
                  ? styles.segmentActive
                  : ""
              }`}
              onClick={() =>
                updateFilter("purpose", purpose)
              }
            >
              {purpose}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.filterGroup}>
        <label
          htmlFor="listing-location"
          className={styles.filterLabel}
        >
          Localização
        </label>
        <div className={styles.inputWithIcon}>
          <MapPin size={17} />
          <input
            id="listing-location"
              onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); applyFilters(); } }}
            value={draftFilters.location}
            onChange={(event) =>
              updateFilter("location", event.target.value)
            }
            placeholder="Cidade ou bairro"
          />
        </div>
      </div>
      <div className={styles.filterGroup}>
        <label
          htmlFor="listing-code"
          className={styles.filterLabel}
        >
          Código do imóvel
        </label>
        <div className={styles.inputWithIcon}>
          <Search size={17} />
          <input
            id="listing-code"
              onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); applyFilters(); } }}
            value={draftFilters.code}
            onChange={(event) =>
              updateFilter("code", event.target.value)
            }
            placeholder="Ex.: VD-5001"
          />
        </div>
      </div>
      <div className={styles.filterGroup}>
        <div className={styles.filterGroupHeading}>
          <span className={styles.filterLabel}>
            Tipo de imóvel
          </span>
          {draftFilters.types.length > 0 && (
            <button
              type="button"
              onClick={() =>
                updateFilter("types", [])
              }
              className={styles.clearTypes}
            >
              Limpar
            </button>
          )}
        </div>
        <div className={styles.typeOptions}>
          {propertyTypeGroups.map((group) => {
            const types = propertyTypes.filter(
              (type) => type.category === group.id
            );
            return (
              <div
                key={group.id}
                className={styles.typeGroup}
              >
                <button
                  type="button"
                  className={styles.typeGroupToggle}
                  aria-expanded={openGroups.includes(group.id)}
                  onClick={() => toggleGroup(group.id)}
                >
                  <span className={styles.typeGroupTitle}>{group.label}</span>
                  <ChevronDown size={15} className={openGroups.includes(group.id) ? styles.chevronOpen : ""} />
                </button>
                {openGroups.includes(group.id) && types.map((type) => {
                  const selected =
                    draftFilters.types.includes(type.value);
                  return (
                    <button
                      key={type.value}
                      type="button"
                      aria-pressed={selected}
                      className={`${styles.typeOption} ${
                        selected
                          ? styles.typeOptionActive
                          : ""
                      }`}
                      onClick={() =>
                        toggleType(type.value)
                      }
                    >
                      <span
                        className={styles.typeCheck}
                      >
                        {selected && <Check size={12} />}
                      </span>
                      {type.label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>
          Características
        </span>
        <div className={styles.roomGrid}>
          {(
            [
              ["bedrooms", "Quartos"],
              ["bathrooms", "Banheiros"],
              ["garages", "Vagas"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className={styles.smallLabel}>
                {label}
              </label>
              <div className={styles.selectWrapper}>
                <select
                  value={draftFilters[key]}
                  onChange={(event) =>
                    updateFilter(key, event.target.value)
                  }
                >
                  {roomOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === "Todos"
                        ? "Todos"
                        : `${option}+`}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>
          Faixa de preço
        </span>
        <div className={styles.priceGrid}>
          <div className={styles.priceField}>
            <span>R$</span>
            <input
              type="number"
              min="0"
              placeholder="Mínimo"
              value={draftFilters.minPrice}
              onChange={(event) =>
                updateFilter("minPrice", event.target.value)
              }
            />
          </div>
          <div className={styles.priceField}>
            <span>R$</span>
            <input
              type="number"
              min="0"
              placeholder="Máximo"
              value={draftFilters.maxPrice}
              onChange={(event) =>
                updateFilter("maxPrice", event.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.filterGroup}>
        <button
          type="button"
          role="checkbox"
          aria-checked={draftFilters.onlyLaunches}
          className={styles.launchOption}
          onClick={() =>
            updateFilter(
              "onlyLaunches",
              !draftFilters.onlyLaunches
            )
          }
        >
          <span
            className={`${styles.launchCheck} ${
              draftFilters.onlyLaunches
                ? styles.launchCheckActive
                : ""
            }`}
          >
            {draftFilters.onlyLaunches && (
              <Check size={13} />
            )}
          </span>
          Somente lançamentos
        </button>
      </div>
    </div>
  );
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.container}>
          <button
            type="button"
            onClick={() => router.push("/")}
            className={styles.backLink}
          >
            <ArrowLeft size={17} />
            Voltar ao início
          </button>
          <h1>
            Encontre o seu
            <br />
            <span>próximo endereço.</span>
          </h1>
          <p>
            Explore nossa seleção de imóveis e encontre
            espaços que combinam com seu estilo de vida.
          </p>
        </div>
      </section>
      <section className={styles.listingSection}>
        <div className={styles.container}>
          <div className={styles.listingLayout}>
            <aside className={styles.sidebar}>
              {filtersPanel}
            </aside>
            <div className={styles.results}>
              <div className={styles.resultsToolbar}>
                <div>
                  <h2>Imóveis disponíveis</h2>
                  <p>
                    {results.length}{" "}
                    {results.length === 1
                      ? "imóvel encontrado"
                      : "imóveis encontrados"}
                  </p>
                </div>
                <div className={styles.toolbarActions}>
                  <button
                    type="button"
                    className={styles.mobileFilterButton}
                    onClick={() =>
                      setMobileFiltersOpen(true)
                    }
                  >
                    <SlidersHorizontal size={17} />
                    Filtros
                  </button>
                  <div className={styles.sortWrapper}>
                    <select
                      aria-label="Ordenar imóveis"
                      value={sort}
                      onChange={(event) =>
                        setSort(
                          event.target.value as SortOption
                        )
                      }
                    >
                      {sortOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              {results.length > 0 ? (
                <div className={styles.propertyGrid}>
                  {results.map((property, index) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <Search size={30} />
                  </div>
                  <h3>Nenhum imóvel encontrado</h3>
                  <p>
                    Não encontramos imóveis com esses
                    critérios. Experimente ajustar os
                    filtros da sua busca.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                  >
                    <RotateCcw size={17} />
                    Limpar filtros
                  </button>
                </div>
              )}
              <div className={styles.disclaimer}>
                Imóveis e informações ilustrativos.
                Projeto demonstrativo desenvolvido pela
                Ágave Lab.
              </div>
            </div>
          </div>
        </div>
      </section>
      {mobileFiltersOpen && (
        <div className={styles.mobileOverlay}>
          <button
            type="button"
            className={styles.overlayBackdrop}
            onClick={() =>
              setMobileFiltersOpen(false)
            }
            aria-label="Fechar filtros"
          />
          <div className={styles.mobileDrawer}>
            <button
              type="button"
              className={styles.closeDrawer}
              onClick={() =>
                setMobileFiltersOpen(false)
              }
              aria-label="Fechar filtros"
            >
              <X size={21} />
            </button>
            {filtersPanel}
          </div>
        </div>
      )}
    </main>
  );
}
