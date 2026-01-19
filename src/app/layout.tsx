import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { siteConfig } from "@/data/site";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – Machine Intelligence Native Design`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "MIND",
    "programming language",
    "AI",
    "machine learning",
    "tensor",
    "compiler",
    "MLIR",
    "LLVM",
    "Rust",
    "autodiff",
    "automatic differentiation",
    "BCI",
    "brain-computer interface",
    "neuroscience",
    "medical devices",
    "FDA",
    "deterministic AI",
    "certified ML",
    "real-time AI",
  ],
  authors: [{ name: siteConfig.company }],
  creator: siteConfig.company,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.fullName,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullName,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/img/mind-logo-grid-dark.svg",
    shortcut: "/img/mind-logo-grid-dark.svg",
    apple: "/img/mind-logo-grid-dark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
