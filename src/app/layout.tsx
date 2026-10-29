
import type { Metadata } from "next";
import { Suspense } from "react";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ágave Imobiliária",
  description:
    "Projeto demonstrativo de plataforma imobiliária desenvolvido pela Ágave Lab.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={outfit.className}>
        <Suspense fallback={null}>
          <Header />
        </Suspense>

        {children}

        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
