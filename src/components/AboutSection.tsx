"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Building2, Compass, ShieldCheck } from "lucide-react";
import styles from "./AboutSection.module.css";

const highlights = [
  { icon: Compass, title: "Uma busca mais intuitiva", description: "Imóveis apresentados com clareza, filtros inteligentes e uma navegação feita para facilitar cada escolha." },
  { icon: ShieldCheck, title: "Confiança em cada detalhe", description: "Informações organizadas, apresentação cuidadosa e uma experiência que transmite credibilidade." },
  { icon: Building2, title: "Cada imóvel, uma história", description: "Do primeiro apartamento ao próximo grande investimento, valorizamos o que torna cada espaço especial." },
];

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className={styles.section} id="sobre" aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.top}>
          <motion.div className={styles.copy} initial={reduceMotion ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
            <h2 id="about-title">Mais do que imóveis. <span>Novas possibilidades.</span></h2>
            <p>Na Ágave Imobiliária, acreditamos que encontrar um lugar é também encontrar um novo começo. Por isso, reunimos uma seleção de imóveis em uma experiência simples, elegante e pensada para você.</p>
            <p>Da primeira busca à decisão final, cada detalhe importa. Nossa proposta é aproximar pessoas de espaços que combinam com seus planos.</p>
            <Link href="/imoveis" className={styles.explore}>Explore nossos imóveis <ArrowUpRight size={18} /></Link>
          </motion.div>
          <motion.div className={styles.visual} initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85 }}>
            <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=85" alt="Ambiente residencial contemporâneo com acabamento sofisticado" fill sizes="(max-width: 900px) 100vw, 48vw" className={styles.image} />
            <div className={styles.imageGradient} />
            <div className={styles.imageCaption}>Espaços para viver o que vem pela frente.</div>
          </motion.div>
        </div>
        <div className={styles.highlights}>
          {highlights.map(({ icon: Icon, title, description }) => (
            <div className={styles.highlight} key={title}>
              <div className={styles.icon}><Icon size={23} strokeWidth={1.55} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
