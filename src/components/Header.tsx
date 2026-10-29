
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./Header.module.css";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Imóveis", href: "/imoveis" },
  { label: "Comprar", href: "/imoveis?finalidade=Comprar" },
  { label: "Alugar", href: "/imoveis?finalidade=Alugar" },
  { label: "Lançamentos", href: "/imoveis?lancamento=Sim" },
];

export default function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const lastY = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const syncSearch = () => {
      setSearch(window.location.search);
    };

    syncSearch();

    window.addEventListener("popstate", syncSearch);

    return () => {
      window.removeEventListener("popstate", syncSearch);
    };
  }, [pathname]);

  useEffect(() => {
    const show = (value: boolean) => {
      if (visibleRef.current !== value) {
        visibleRef.current = value;
        setVisible(value);
      }
    };

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);

      setScrolled(y > 24);

      const delta = y - lastY.current;

      if (y < 85 || menuOpen) {
        show(true);
      } else if (delta > 5) {
        show(false);
      } else if (delta < -5) {
        show(true);
      }

      lastY.current = y;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (event.clientY <= 22) {
        show(true);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    lastY.current = window.scrollY;
    setScrolled(window.scrollY > 24);

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("mousemove", onMouseMove, {
      passive: true,
    });

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setVisible(true);
    visibleRef.current = true;
  }, [pathname]);

  const handleNavigate = (href: string) => {
    setMenuOpen(false);
    setVisible(true);
    visibleRef.current = true;

    const current =
      window.location.pathname + window.location.search;

    if (
      current === href ||
      (href === "/" && pathname === "/")
    ) {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "instant" : "smooth",
      });
    }

    const destination = new URL(href, window.location.origin);

    if (destination.pathname === pathname) {
      setSearch(destination.search);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (pathname !== "/imoveis") {
      return false;
    }

    const params = new URLSearchParams(search);

    if (href === "/imoveis") {
      return (
        !params.has("finalidade") &&
        !params.has("lancamento")
      );
    }

    if (href.includes("finalidade=Comprar")) {
      return params.get("finalidade") === "Comprar";
    }

    if (href.includes("finalidade=Alugar")) {
      return params.get("finalidade") === "Alugar";
    }

    if (href.includes("lancamento=Sim")) {
      return params.get("lancamento") === "Sim";
    }

    return false;
  };

  return (
    <motion.header
      className={`${styles.header} ${
        scrolled ? styles.scrolled : ""
      } ${
        !visible && !menuOpen ? styles.hidden : ""
      }`}
      initial={
        reduceMotion
          ? false
          : { y: -80, opacity: 0 }
      }
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.glass}>
        <div className={styles.inner}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Ágave Imobiliária — Início"
            onClick={() => handleNavigate("/")}
          >
            <Image
              src="/logo-agave.png"
              alt="Ágave Imobiliária"
              width={160}
              height={65}
              priority
              className={styles.logo}
            />
          </Link>

          <nav
            className={styles.navigation}
            aria-label="Navegação principal"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                scroll
                className={
                  isActive(item.href)
                    ? styles.active
                    : ""
                }
                onClick={() =>
                  handleNavigate(item.href)
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            className={styles.contactButton}
            href="https://www.instagram.com/agavelab.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Fale conosco</span>
            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
            />
          </a>

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() =>
              setMenuOpen((current) => !current)
            }
            aria-label={
              menuOpen
                ? "Fechar menu"
                : "Abrir menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className={styles.mobileNavigation}
            aria-label="Navegação mobile"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: -12 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                scroll
                onClick={() =>
                  handleNavigate(item.href)
                }
                className={
                  isActive(item.href)
                    ? styles.mobileActive
                    : ""
                }
              >
                {item.label}
                <ArrowUpRight size={16} />
              </Link>
            ))}

            <a
              href="https://www.instagram.com/agavelab.dev/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Fale conosco
              <ArrowUpRight size={16} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
