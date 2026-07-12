import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { CustomCursor } from "@/components/layout/CustomCursor";

const clashDisplay = localFont({
  src: "../public/fonts/clash-display/ClashDisplay-Variable.woff2",
  variable: "--font-display-raw",
  weight: "200 700",
  display: "swap",
});

const satoshi = localFont({
  src: "../public/fonts/satoshi/Satoshi-Variable.woff2",
  variable: "--font-body-raw",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rocha — Founder & Desenvolvedor",
  description:
    "Eu construo produtos para quem cria. Founder e desenvolvedor por trás do MultiClipHub, construindo ferramentas e sites para criadores de conteúdo e marcas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${clashDisplay.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-fg-primary font-sans">
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
