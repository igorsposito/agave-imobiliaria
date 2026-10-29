
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import PropertyCard from "./PropertyCard";
import { catalog } from "@/data/catalog";

import styles from "./PropertyGrid.module.css";

type Category =
  | "todos"
  | "comprar"
  | "alugar"
  | "lancamentos";

const categories: {
  id: Category;
  label: string;
}[] = [
  { id: "todos", label: "Todos os imóveis" },
  { id: "comprar", label: "Comprar" },
  { id: "alugar", label: "Alugar" },
  { id: "lancamentos", label: "Lançamentos" },
];

export default function PropertyGrid() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("todos");

  const filteredProperties = useMemo(() => {
    const filtered = catalog.filter((property) => {
      if (activeCategory === "comprar") {
        return property.purpose === "Comprar";
      }

      if (activeCategory === "alugar") {
        return property.purpose === "Alugar";
      }

      if (activeCategory === "lancamentos") {
        return property.isLaunch;
      }

      return true;
    });

    return filtered
      .sort((a, b) => {
        if (a.featured === b.featured) {
          return a.id - b.id;
        }

        return a.featured ? -1 : 1;
      })
      .slice(0, 6);
  }, [activeCategory]);

  const catalogHref =
    activeCategory === "comprar"
      ? "/imoveis?finalidade=Comprar"
      : activeCategory === "alugar"
        ? "/imoveis?finalidade=Alugar"
        : activeCategory === "lancamentos"
          ? "/imoveis?lancamento=Sim"
          : "/imoveis";

  return (
    <section
      id="explorar"
      className={styles.section}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.heading}
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={styles.headingText}>
            <h2>
              Espaços que inspiram
              <br />
              <span>novas histórias.</span>
            </h2>

            <p>
              Uma seleção de imóveis para diferentes
              estilos de vida. Encontre o lugar que
              combina com você.
            </p>
          </div>

          <Link
            href="/imoveis"
            className={styles.topLink}
          >
            Explorar catálogo
            <ArrowUpRight size={18} />
          </Link>
        </motion.div>

        <div className={styles.toolbar}>
          <div
            className={styles.tabs}
            role="group"
            aria-label="Filtrar imóveis por categoria"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`${styles.tab} ${
                  activeCategory === category.id
                    ? styles.tabActive
                    : ""
                }`}
                onClick={() =>
                  setActiveCategory(category.id)
                }
                aria-pressed={
                  activeCategory === category.id
                }
              >
                {category.label}
              </button>
            ))}
          </div>

          <span className={styles.resultCount}>
            {filteredProperties.length} imóveis em destaque
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className={styles.grid}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {filteredProperties.map(
              (property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              )
            )}
          </motion.div>
        </AnimatePresence>

        <div className={styles.bottomAction}>
          <Link
            href={catalogHref}
            className={styles.catalogButton}
          >
            Ver todos os imóveis
            <ArrowRight size={19} />
          </Link>

          <p>
            Imóveis e informações ilustrativos.
            Projeto demonstrativo da Ágave Lab.
          </p>
        </div>
      </div>
    </section>
  );
}
