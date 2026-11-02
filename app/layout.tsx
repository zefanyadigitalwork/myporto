import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-serif" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = { title: "Paulus Sianipar — Portofolio Creative Designer", description: "Portofolio creative designer." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
