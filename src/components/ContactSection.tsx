"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import styles from "./ContactSection.module.css";

const whatsappMessage = "Olá! Vim pelo site demonstrativo da Ágave Imobiliária e gostaria de criar um projeto moderno e responsivo como esse para a minha imobiliária. Podemos conversar?";
const whatsappUrl = `https://wa.me/5577981315730?text=${encodeURIComponent(whatsappMessage)}`;

export default function ContactSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="contato" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />
      <div className={styles.container}>
        <motion.div className={styles.content} initial={reduceMotion ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: .75 }}>
          <h2 id="contact-title">Sua imobiliária merece uma presença digital <span>à altura dos imóveis que oferece.</span></h2>
          <p>Imagine seus imóveis apresentados em um site como este: visual sofisticado, navegação intuitiva, filtros inteligentes e uma experiência impecável em qualquer tela.</p>
          <p className={styles.secondary}>Este projeto é uma demonstração do que a <strong>Ágave Lab</strong> pode desenvolver para o seu negócio. Vamos criar uma experiência exclusiva para sua imobiliária e transformar visitas ao site em novas oportunidades de contato.</p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} strokeWidth={1.8} /> Quero um site assim <ArrowUpRight size={18} /></a>
            <a className={styles.secondaryButton} href="https://www.instagram.com/agavelab.dev/" target="_blank" rel="noopener noreferrer">Conheça a Ágave Lab <ArrowUpRight size={17} /></a>
          </div>
          <div className={styles.benefits}>
            <span><Check size={17} /> Design exclusivo</span>
            <span><Check size={17} /> Responsivo</span>
            <span><Check size={17} /> Focado em conversão</span>
          </div>
        </motion.div>
        <div className={styles.watermark} aria-hidden="true">A.</div>
      </div>
    </section>
  );
}
