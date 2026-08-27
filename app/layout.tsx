import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "VintedLens Dashboard";
const description = "Inventario y ventas de LoopVTG en Vinted: métricas y sugerencias de IA por artículo";

export const metadata: Metadata = {
  metadataBase: new URL("https://vintedlens-dashboard.vercel.app"),
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

// Color de la barra del navegador en móvil: sin esto, algunos
// navegadores la pintan blanca por defecto pese a que la app fuerza
// tema oscuro, dando la misma sensación de "algo no cuadra" que el
// bug de fondo que arregló globals.css.
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)] font-sans text-neutral-200">
        {children}
      </body>
    </html>
  );
}
