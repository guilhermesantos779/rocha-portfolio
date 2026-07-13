import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Nav } from "@/components/layout/Nav";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-raw",
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-raw",
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
      className={`${fraunces.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-fg-primary font-sans">
        <Providers>
          <GrainOverlay />
          <CustomCursor />
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
