import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ComparaPrepas AR - Compará Prepagas en Argentina",
  description:
    "Encontrá el plan de salud perfecto para vos y tu familia. Compará precios, coberturas y beneficios de las principales prepagas del país.",
  keywords: ["prepagas", "salud", "Argentina", "comparador", "planes", "medicina"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
