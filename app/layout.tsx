import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-serif" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = { title: "Paulus Sianipar — Portofolio Creative Designer", description: "Portofolio creative designer." };
const themeScript = `const savedTheme = localStorage.getItem("portfolio-theme"); if (["dark", "soft-dark", "light", "soft-light", "pastel"].includes(savedTheme)) document.documentElement.dataset.theme = savedTheme;`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
