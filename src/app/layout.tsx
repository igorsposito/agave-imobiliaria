
import type { Metadata } from "next";
import { Suspense } from "react";
import { Outfit } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ágave Imobiliária | Espaços que inspiram",
  description:
    "Projeto conceitual imobiliário desenvolvido pela Ágave Lab.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={outfit.variable}>
        <Suspense fallback={null}>
          <Header />
        </Suspense>

        {children}

        <Footer />
      </body>
    </html>
  );
}
