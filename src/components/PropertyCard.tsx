
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  CarFront,
  MapPin,
  Maximize2,
  Ruler,
} from "lucide-react";

import type { Property } from "@/data/properties";
import { formatPrice } from "@/data/properties";

import styles from "./PropertyCard.module.css";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const landTypes = ["Terreno / Lote"];

const commercialTypes = [
  "Ponto comercial / Loja",
  "Sala comercial",
  "Galpão / Depósito",
];

const ruralTypes = [
  "Sítio / Chácara",
  "Fazenda",
];

export default function PropertyCard({
  property,
  index = 0,
}: PropertyCardProps) {
  const reduceMotion = useReducedMotion();

  const isRental = property.purpose === "Alugar";
  const isLand = landTypes.includes(property.type);
  const isCommercial = commercialTypes.includes(
    property.type
  );
  const isRural = ruralTypes.includes(property.type);

  const useTotalArea = isLand || isRural;

  const areaValue = useTotalArea
    ? property.totalArea
    : property.area || property.totalArea;

  const features = [
    ...(!isLand && !isCommercial && property.bedrooms > 0
      ? [
          {
            label: `${property.bedrooms} ${
              property.bedrooms === 1
                ? "quarto"
                : "quartos"
            }`,
            icon: BedDouble,
          },
        ]
      : []),

    ...(!isLand && property.bathrooms > 0
      ? [
          {
            label: `${property.bathrooms} ${
              property.bathrooms === 1
                ? "banheiro"
                : "banheiros"
            }`,
            icon: Bath,
          },
        ]
      : []),

    ...(property.garages > 0
      ? [
          {
            label: `${property.garages} ${
              property.garages === 1
                ? "vaga"
                : "vagas"
            }`,
            icon: CarFront,
          },
        ]
      : []),

    {
      label: `${areaValue.toLocaleString("pt-BR")} m²`,
      icon: useTotalArea ? Ruler : Maximize2,
    },
  ];

  return (
    <motion.article
      className={styles.card}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 32 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/imoveis/${property.slug}`}
        className={styles.link}
        aria-label={`Ver detalhes do imóvel ${property.code} - ${property.title}`}
      >
        <div className={styles.imageWrapper}>
          <Image
            src={property.images[0]}
            alt={`Imagem ilustrativa de ${property.title}`}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className={styles.image}
          />

          <div className={styles.imageOverlay} />

          <div className={styles.tags}>
            <span className={styles.purposeTag}>
              {isRental ? "Para alugar" : "À venda"}
            </span>

            {property.isLaunch && (
              <span className={styles.launchTag}>
                Lançamento
              </span>
            )}
          </div>

          <div className={styles.imageAction}>
            <ArrowUpRight
              size={21}
              strokeWidth={1.7}
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.code}>
              CÓD. {property.code}
            </span>

            <span className={styles.type}>
              {property.type}
            </span>
          </div>

          <h3 className={styles.title}>
            {property.title}
          </h3>

          <div className={styles.location}>
            <MapPin size={15} strokeWidth={1.7} />

            <span>
              {property.neighborhood}, {property.city} -{" "}
              {property.state}
            </span>
          </div>

          <div className={styles.features}>
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.label}
                  className={styles.feature}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.6}
                  />
                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.footer}>
            <div className={styles.priceGroup}>
              <span className={styles.priceLabel}>
                {isRental
                  ? "Valor mensal"
                  : "Valor do imóvel"}
              </span>

              <strong className={styles.price}>
                {formatPrice(property.price)}

                {isRental && (
                  <small>/mês</small>
                )}
              </strong>
            </div>

            <span className={styles.detailsLink}>
              Ver imóvel
              <ArrowUpRight
                size={17}
                strokeWidth={1.8}
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
