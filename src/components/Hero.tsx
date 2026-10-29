
"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Bath,
  BedDouble,
  Building2,
  CarFront,
  Check,
  ChevronDown,
  ChevronUp,
  House,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  propertyTypes,
  featuredPropertyTypes,
  propertyTypeGroups,
  type PropertyType,
} from "@/data/propertyTypes";

import styles from "./Hero.module.css";

type Purpose = "Comprar" | "Alugar";

type SelectOption = {
  value: string;
  label: string;
};

const roomOptions: SelectOption[] = [
  { value: "Todos", label: "Qualquer quantidade" },
  { value: "1", label: "1 ou mais" },
  { value: "2", label: "2 ou mais" },
  { value: "3", label: "3 ou mais" },
  { value: "4", label: "4 ou mais" },
  { value: "5", label: "5 ou mais" },
];

function CustomSelect({
  label,
  value,
  options,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  icon?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (event: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const selected =
    options.find((option) => option.value === value) ??
    options[0];

  return (
    <div className={styles.customSelect} ref={wrapperRef}>
      <span className={styles.fieldLabel}>{label}</span>

      <button
        type="button"
        className={`${styles.selectTrigger} ${
          open ? styles.selectTriggerActive : ""
        }`}
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={styles.selectValue}>
          {icon}
          <span>{selected.label}</span>
        </span>

        <ChevronDown
          size={16}
          className={`${styles.chevron} ${
            open ? styles.chevronOpen : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.dropdown}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -7, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={`${styles.dropdownOption} ${
                  option.value === value
                    ? styles.dropdownOptionSelected
                    : ""
                }`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>

                <span className={styles.optionCheck}>
                  {option.value === value && (
                    <Check size={14} strokeWidth={2.5} />
                  )}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const [purpose, setPurpose] =
    useState<Purpose>("Comprar");

  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("Todos");
  const [bathrooms, setBathrooms] = useState("Todos");
  const [garages, setGarages] = useState("Todos");

  const [onlyLaunches, setOnlyLaunches] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState<
    PropertyType[]
  >([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [moreFilters, setMoreFilters] = useState(false);
  const reduceMotion = useReducedMotion();

  const toggleType = (type: PropertyType) => {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    );
  };

  const handleSearch = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const params = new URLSearchParams();

    params.set("finalidade", purpose);

    if (location.trim()) {
      params.set("localizacao", location.trim());
    }

    if (bedrooms !== "Todos") {
      params.set("quartos", bedrooms);
    }

    if (bathrooms !== "Todos") {
      params.set("banheiros", bathrooms);
    }

    if (garages !== "Todos") {
      params.set("garagens", garages);
    }

    if (onlyLaunches) {
      params.set("lancamento", "Sim");
    }

    if (selectedTypes.length > 0) {
      params.set("tipos", selectedTypes.join(","));
    }

    if (minPrice !== "") {
      params.set("valorMin", minPrice);
    }

    if (maxPrice !== "") {
      params.set("valorMax", maxPrice);
    }

    window.location.href = `/imoveis?${params.toString()}`;
  };

  const clearFilters = () => {
    setPurpose("Comprar");
    setLocation("");
    setBedrooms("Todos");
    setBathrooms("Todos");
    setGarages("Todos");
    setOnlyLaunches(false);
    setSelectedTypes([]);
    setMinPrice("");
    setMaxPrice("");
  };

  const hasExtraFilters =
    bathrooms !== "Todos" ||
    garages !== "Todos" ||
    onlyLaunches ||
    selectedTypes.length > 0 ||
    minPrice !== "" ||
    maxPrice !== "";

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.background} />
      <div className={styles.overlay} />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 28 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h1>
            Seu próximo endereço.
            <br />
            <span>Uma nova história.</span>
          </h1>

          <p>
            Encontre espaços extraordinários para viver
            os melhores momentos da sua vida.
          </p>
        </motion.div>

        <motion.div
          className={styles.searchWrapper}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 35 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <form
            onSubmit={handleSearch}
            className={styles.searchForm}
          >
            <div className={styles.searchPanel}>
              <CustomSelect
                label="Finalidade"
                value={purpose}
                options={[
                  {
                    value: "Comprar",
                    label: "Comprar",
                  },
                  {
                    value: "Alugar",
                    label: "Alugar",
                  },
                ]}
                onChange={(value) =>
                  setPurpose(value as Purpose)
                }
              />

              <div className={styles.locationField}>
                <label
                  htmlFor="hero-location"
                  className={styles.fieldLabel}
                >
                  Localização
                </label>

                <div className={styles.locationInput}>
                  <MapPin size={18} />

                  <input
                    id="hero-location"
                    type="text"
                    placeholder="Cidade ou bairro"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                  />

                  {location && (
                    <button
                      type="button"
                      className={styles.clearLocation}
                      aria-label="Limpar localização"
                      onClick={() => setLocation("")}
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>

              <CustomSelect
                label="Quartos"
                value={bedrooms}
                options={roomOptions}
                onChange={setBedrooms}
                icon={<BedDouble size={18} />}
              />

              <button
                type="button"
                className={`${styles.moreButton} ${
                  moreFilters || hasExtraFilters
                    ? styles.moreButtonActive
                    : ""
                }`}
                onClick={() =>
                  setMoreFilters((current) => !current)
                }
                aria-expanded={moreFilters}
                aria-controls="hero-extra-filters"
              >
                <SlidersHorizontal size={18} />

                <span>Mais filtros</span>

                {hasExtraFilters && (
                  <span className={styles.activeDot} />
                )}

                <ChevronDown
                  size={17}
                  className={`${styles.moreChevron} ${
                    moreFilters
                      ? styles.moreChevronOpen
                      : ""
                  }`}
                />
              </button>

              <button
                type="submit"
                className={styles.searchButton}
              >
                <Search size={19} />
                <span>Buscar imóveis</span>
                <ArrowUpRight
                  size={16}
                  className={styles.buttonArrow}
                />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {moreFilters && (
                <motion.div
                  id="hero-extra-filters"
                  className={styles.extraPanel}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          height: 0,
                          y: -10,
                        }
                  }
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className={styles.extraInner}>
                    <div className={styles.extraHeader}>
                      <h2>Refine sua busca</h2>

                      <button
                        type="button"
                        onClick={clearFilters}
                        className={styles.resetButton}
                      >
                        <RotateCcw size={14} />
                        Limpar filtros
                      </button>
                    </div>

                    <div className={styles.typeSection}>
                      <div className={styles.typeHeading}>
                        <div>
                          <h3>Tipo de imóvel</h3>
                          <p>
                            Selecione uma ou mais categorias.
                          </p>
                        </div>

                        {selectedTypes.length > 0 && (
                          <button
                            type="button"
                            className={styles.clearTypes}
                            onClick={() =>
                              setSelectedTypes([])
                            }
                          >
                            Limpar seleção
                          </button>
                        )}
                      </div>

                      <div className={styles.featuredTypes}>
                        {featuredPropertyTypes.map(
                          (type) => {
                            const active =
                              selectedTypes.includes(
                                type.value
                              );

                            const Icon =
                              type.value === "Casa"
                                ? House
                                : Building2;

                            return (
                              <button
                                key={type.value}
                                type="button"
                                aria-pressed={active}
                                className={`${
                                  styles.featuredType
                                } ${
                                  active
                                    ? styles.featuredTypeActive
                                    : ""
                                }`}
                                onClick={() =>
                                  toggleType(type.value)
                                }
                              >
                                <span
                                  className={
                                    styles.featuredTypeIcon
                                  }
                                >
                                  <Icon size={22} />
                                </span>

                                <span>{type.label}</span>

                                <span
                                  className={
                                    styles.typeCheck
                                  }
                                >
                                  {active && (
                                    <Check size={13} />
                                  )}
                                </span>
                              </button>
                            );
                          }
                        )}
                      </div>

                      <div className={styles.otherTypes}>
                        {propertyTypeGroups.map((group) => {
                          const types = propertyTypes.filter(
                            (type) =>
                              type.category === group.id &&
                              !type.featured
                          );

                          if (types.length === 0) {
                            return null;
                          }

                          return (
                            <div
                              key={group.id}
                              className={styles.typeGroup}
                            >
                              <h4>{group.label}</h4>

                              <div
                                className={
                                  styles.typeOptions
                                }
                              >
                                {types.map((type) => {
                                  const active =
                                    selectedTypes.includes(
                                      type.value
                                    );

                                  return (
                                    <button
                                      key={type.value}
                                      type="button"
                                      aria-pressed={active}
                                      className={`${
                                        styles.typeOption
                                      } ${
                                        active
                                          ? styles.typeOptionActive
                                          : ""
                                      }`}
                                      onClick={() =>
                                        toggleType(
                                          type.value
                                        )
                                      }
                                    >
                                      <span
                                        className={
                                          styles.typeCheckbox
                                        }
                                      >
                                        {active && (
                                          <Check
                                            size={12}
                                          />
                                        )}
                                      </span>

                                      {type.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className={styles.extraGrid}>
                      <CustomSelect
                        label="Banheiros"
                        value={bathrooms}
                        options={roomOptions}
                        onChange={setBathrooms}
                        icon={<Bath size={18} />}
                      />

                      <CustomSelect
                        label="Vagas de garagem"
                        value={garages}
                        options={roomOptions}
                        onChange={setGarages}
                        icon={<CarFront size={18} />}
                      />

                      <div className={styles.launchField}>
                        <span className={styles.fieldLabel}>
                          Lançamentos
                        </span>

                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={onlyLaunches}
                          className={`${styles.launchToggle} ${
                            onlyLaunches
                              ? styles.launchToggleActive
                              : ""
                          }`}
                          onClick={() =>
                            setOnlyLaunches(
                              (current) => !current
                            )
                          }
                        >
                          <span
                            className={
                              styles.launchCheckbox
                            }
                          >
                            {onlyLaunches && (
                              <Check size={14} />
                            )}
                          </span>

                          <span>
                            Somente lançamentos
                          </span>
                        </button>
                      </div>

                      <div className={styles.priceGroup}>
                        <span className={styles.fieldLabel}>
                          Faixa de valor
                        </span>

                        <div className={styles.priceInputs}>
                          <div className={styles.priceInput}>
                            <span>R$</span>
                            <input
                              type="number"
                              min="0"
                              placeholder="Mínimo"
                              aria-label="Valor mínimo"
                              value={minPrice}
                              onChange={(event) =>
                                setMinPrice(
                                  event.target.value
                                )
                              }
                            />
                          </div>

                          <span
                            className={
                              styles.priceDivider
                            }
                          >
                            —
                          </span>

                          <div className={styles.priceInput}>
                            <span>R$</span>
                            <input
                              type="number"
                              min="0"
                              placeholder="Máximo"
                              aria-label="Valor máximo"
                              value={maxPrice}
                              onChange={(event) =>
                                setMaxPrice(
                                  event.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.extraFooter}>
                      <button
                        type="button"
                        className={styles.collapseButton}
                        onClick={() =>
                          setMoreFilters(false)
                        }
                      >
                        <ChevronUp size={17} />
                        Recolher filtros
                      </button>

                      <button
                        type="button"
                        className={styles.applyButton}
                        onClick={() =>
                          setMoreFilters(false)
                        }
                      >
                        Aplicar filtros
                        <Check size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        <a
          href="#explorar"
          className={styles.scrollIndicator}
        >
          Explore mais
          <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}
