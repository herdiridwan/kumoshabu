import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel } from "next/font/google";
import { BackgroundCanvas } from "@/components/ui/BackgroundCanvas";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const cinzel = Cinzel({
  variable: "--font-trajan",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "KUMO — Japanese Shabu & Sukiyaki",
  description: "Premium Japanese shabu shabu and sukiyaki restaurant. Wagyu selection and fine-dining menu catalogue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${cinzel.variable} antialiased font-body relative`}
        style={{ color: "#f5f0e8" }}
      >
        <BackgroundCanvas />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-background">
          Skip to main content
        </a>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
