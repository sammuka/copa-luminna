import type { Metadata, Viewport } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  weight: ["400", "600", "800", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Luminna AI | Copa do Mundo 2026 — Em Breve",
  description:
    "Viva a Copa do Mundo 2026 com a tela interativa da Luminna AI. Acompanhe a tabela oficial e prepare-se para uma experiência imersiva.",
  openGraph: {
    title: "Luminna AI | Copa do Mundo 2026 — Em Breve",
    description:
      "Viva a Copa do Mundo 2026 com a tela interativa da Luminna AI. Acompanhe a tabela oficial e prepare-se para uma experiência imersiva.",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${orbitron.variable} ${inter.variable} antialiased h-full`}
    >
      <body className="min-h-full font-sans bg-navy-deep text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
