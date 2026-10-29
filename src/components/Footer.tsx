
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import styles from "./Footer.module.css";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Comprar", href: "/imoveis?finalidade=Comprar" },
  { label: "Alugar", href: "/imoveis?finalidade=Alugar" },
  { label: "Lançamentos", href: "/imoveis?lancamento=Sim" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/agavelab.dev/",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/agavelab",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/igorsposito/",
    icon: FaGithub,
  },
];

export default function Footer() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;

      window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "instant"
          : "smooth",
      });
    }
  }, [pathname]);

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const target = new URL(href, window.location.origin);

    const currentUrl =
      window.location.pathname + window.location.search;

    const targetUrl = target.pathname + target.search;

    if (targetUrl === currentUrl) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "instant"
          : "smooth",
      });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brandColumn}>
            <Link
              href="/"
              scroll={false}
              onClick={(event) =>
                handleNavigation(event, "/")
              }
              className={styles.brand}
              aria-label="Ágave Imobiliária — início"
            >
              <Image
                src="/logo-agave.png"
                alt="Ágave Imobiliária"
                width={190}
                height={64}
                className={styles.brandLogo}
              />
            </Link>

            <p className={styles.description}>
              Espaços que inspiram novas histórias. Uma
              experiência imobiliária feita para encontrar
              o lugar certo para você.
            </p>

            <div
              className={styles.socials}
              aria-label="Redes sociais da Ágave Lab"
            >
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social}
                  title={label}
                  aria-label={`Visitar ${label} da Ágave Lab`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <nav
            className={styles.column}
            aria-label="Navegação do rodapé"
          >
            <h2>Explore</h2>

            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                scroll={false}
                onClick={(event) =>
                  handleNavigation(event, item.href)
                }
                className={styles.navLink}
              >
                {item.label}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.6}
                />
              </Link>
            ))}
          </nav>

          <div className={styles.column}>
            <h2>Contato</h2>

            <span className={styles.contact}>
              <MapPin size={17} />
              Atendimento em todo o Brasil
            </span>

            <span className={styles.contact}>
              <Mail size={17} />
              contato@exemplo.com.br
            </span>

            <span className={styles.contact}>
              <Phone size={17} />
              Contato demonstrativo
            </span>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} Ágave Imobiliária.
            Projeto demonstrativo.
          </p>

          <p>
            Desenvolvido por{" "}
            <a
              href="https://www.instagram.com/agavelab.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ágave Lab
              <ArrowUpRight size={13} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
