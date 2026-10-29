"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Bath, BedDouble, CarFront, Check,
  ChevronLeft, ChevronRight, Expand, MapPin, Maximize2,
  MessageCircle, Ruler, X,
} from "lucide-react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import styles from "./PropertyDetail.module.css";

type Props = { property: Property; related: Property[] };
const whatsappPhone = "5577981315730";

export default function PropertyDetail({ property, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const images = property.images.filter(Boolean);
  const isRental = property.purpose === "Alugar";
  const isLand = property.type === "Terreno / Lote";
  const isRural = property.type === "Sítio / Chácara" || property.type === "Fazenda";
  const area = (isLand || isRural ? property.totalArea : property.area || property.totalArea) || 0;
  const message = `Olá! Vim pelo site da Ágave Imobiliária e gostaria de saber mais sobre o imóvel ${property.code} (${property.title}).`;
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;

  const specs = [
    { label: "Área", value: `${area.toLocaleString("pt-BR")} m²`, icon: isLand || isRural ? Ruler : Maximize2 },
    ...(property.bedrooms > 0 ? [{ label: "Quartos", value: String(property.bedrooms), icon: BedDouble }] : []),
    ...(property.suites > 0 ? [{ label: "Suítes", value: String(property.suites), icon: BedDouble }] : []),
    ...(property.bathrooms > 0 ? [{ label: "Banheiros", value: String(property.bathrooms), icon: Bath }] : []),
    ...(property.garages > 0 ? [{ label: "Vagas", value: String(property.garages), icon: CarFront }] : []),
  ];

  const previousImage = () => setActiveImage((current) => (current - 1 + images.length) % images.length);
  const nextImage = () => setActiveImage((current) => (current + 1) % images.length);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topline}>
          <Link href="/imoveis" className={styles.back}><ArrowLeft size={17} /> Voltar aos imóveis</Link>
          <span className={styles.code}>CÓD. {property.code}</span>
        </div>

        <div className={styles.heading}>
          <div>
            <div className={styles.tags}>
              <span>{isRental ? "Para alugar" : "À venda"}</span>
              {property.isLaunch && <span className={styles.launch}>Lançamento</span>}
            </div>
            <h1>{property.title}</h1>
            <p className={styles.address}><MapPin size={17} /> {property.neighborhood}, {property.city} - {property.state}</p>
          </div>
          <div className={styles.headingPrice}>
            <span>{isRental ? "Aluguel mensal" : "Valor do imóvel"}</span>
            <strong>{formatPrice(property.price)}{isRental && <small>/mês</small>}</strong>
          </div>
        </div>

        {images.length > 0 && (
          <section className={styles.gallery} aria-label="Galeria do imóvel">
            <button className={styles.heroPhoto} onClick={() => { setActiveImage(0); setGalleryOpen(true); }} aria-label="Ampliar foto principal">
              <Image src={images[0]} alt={`Foto principal ilustrativa de ${property.title}`} fill priority sizes="(max-width: 900px) 100vw, 70vw" />
            </button>
            <div className={styles.sidePhotos}>
              {[1, 2].map((index) => (
                <button key={index} className={styles.sidePhoto} onClick={() => { setActiveImage(Math.min(index, images.length - 1)); setGalleryOpen(true); }} aria-label={`Visualizar foto ${index + 1}`}>
                  <Image src={images[index] || images[0]} alt={`Foto ilustrativa ${index + 1} de ${property.title}`} fill sizes="(max-width: 900px) 50vw, 25vw" />
                  {index === 2 && <span className={styles.allPhotos}><Expand size={16} /> Ver fotos ({images.length})</span>}
                </button>
              ))}
            </div>
          </section>
        )}

        <div className={styles.contentLayout}>
          <div className={styles.mainContent}>
            <section className={styles.specs} aria-label="Características principais">
              {specs.map(({ label, value, icon: Icon }) => (
                <div className={styles.spec} key={label}><Icon size={22} strokeWidth={1.6} /><span>{label}</span><strong>{value}</strong></div>
              ))}
            </section>

            <section className={styles.section}>
              <h2>Sobre este imóvel</h2>
              <p className={styles.description}>{property.description}</p>
            </section>

            {property.features.length > 0 && (
              <section className={styles.section}>
                <h2>Diferenciais do imóvel</h2>
                <div className={styles.featureGrid}>
                  {property.features.map((feature) => <div key={feature} className={styles.feature}><Check size={17} /> {feature}</div>)}
                </div>
              </section>
            )}

            <section className={styles.section}>
              <h2>Localização</h2>
              <div className={styles.locationCard}>
                <MapPin size={23} />
                <div><strong>{property.neighborhood}, {property.city} - {property.state}</strong><span>{property.address}</span></div>
              </div>
            </section>
          </div>

          <aside className={styles.contactCard}>
            <span className={styles.contactTitle}>Interessou por este imóvel?</span>
            <strong className={styles.contactPrice}>{formatPrice(property.price)}{isRental && <small>/mês</small>}</strong>
            <div className={styles.costs}>
              {property.condominium > 0 && <p><span>Condomínio</span><strong>{formatPrice(property.condominium)}{isRental && "/mês"}</strong></p>}
              {property.iptu > 0 && <p><span>IPTU</span><strong>{formatPrice(property.iptu)}</strong></p>}
              <p><span>Código do imóvel</span><strong>{property.code}</strong></p>
            </div>
            <a className={styles.whatsapp} href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /> Conversar no WhatsApp <ArrowRight size={17} /></a>
            <p className={styles.contactNote}>Envie uma mensagem com o código do imóvel já preenchido.</p>
          </aside>
        </div>

        {related.length > 0 && (
          <section className={styles.related}>
            <div className={styles.relatedHeader}><h2>Outros imóveis para conhecer</h2><Link href="/imoveis">Ver todos <ArrowRight size={18} /></Link></div>
            <div className={styles.relatedGrid}>{related.map((item, index) => <PropertyCard key={item.id} property={item} index={index} />)}</div>
          </section>
        )}
        <p className={styles.disclaimer}>Imóveis, imagens e informações ilustrativos. Projeto demonstrativo desenvolvido pela Ágave Lab.</p>
      </div>

      {galleryOpen && images.length > 0 && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Visualização das fotos">
          <button className={styles.close} onClick={() => setGalleryOpen(false)} aria-label="Fechar galeria"><X size={24} /></button>
          <div className={styles.lightboxImage}><Image src={images[activeImage]} alt={`Foto ${activeImage + 1} de ${property.title}`} fill sizes="100vw" /></div>
          {images.length > 1 && <>
            <button className={`${styles.nav} ${styles.prev}`} onClick={previousImage} aria-label="Foto anterior"><ChevronLeft size={26} /></button>
            <button className={`${styles.nav} ${styles.next}`} onClick={nextImage} aria-label="Próxima foto"><ChevronRight size={26} /></button>
          </>}
          <span className={styles.counter}>{activeImage + 1} / {images.length}</span>
        </div>
      )}
    </main>
  );
}
