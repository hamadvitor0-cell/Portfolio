import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { VercelAnalytics } from "@/components/vercel-analytics";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";
import "./studio.css";

const manrope = localFont({ src: "./fonts/manrope.ttf", variable: "--font-manrope", weight: "400 800", display: "swap" });

const light = siteConfig.theme.light;
const dark = siteConfig.theme.dark;

const themeStyle = `
:root {
  --color-background: ${light.background};
  --color-foreground: ${light.foreground};
  --color-muted: ${light.muted};
  --color-subtle: ${light.subtle};
  --color-surface: ${light.surface};
  --color-border: ${light.border};
  --color-accent: ${light.accent};
  --color-accent-soft: ${light.accentSoft};
}
.dark {
  --color-background: ${dark.background};
  --color-foreground: ${dark.foreground};
  --color-muted: ${dark.muted};
  --color-subtle: ${dark.subtle};
  --color-surface: ${dark.surface};
  --color-border: ${dark.border};
  --color-accent: ${dark.accent};
  --color-accent-soft: ${dark.accentSoft};
}
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage]
  },
  icons: {
    icon: "/favicon.png"
  },
  formatDetection: { email: false, address: false, telephone: false }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: `rgb(${light.background})` },
    { media: "(prefers-color-scheme: dark)", color: `rgb(${dark.background})` }
  ]
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vitor Hamad",
    url: siteConfig.seo.siteUrl,
    image: `${siteConfig.seo.siteUrl}${siteConfig.about.image}`,
    jobTitle: "Desenvolvedor Web",
    address: { "@type": "PostalAddress", addressLocality: "Curitiba", addressCountry: "BR" },
    sameAs: siteConfig.socialLinks.filter((link) => link.label === "GitHub" || link.label === "LinkedIn").map((link) => link.href),
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.seo.siteUrl,
    areaServed: ["Curitiba", "Brasil"],
    founder: { "@type": "Person", name: "Vitor Hamad" },
    description: siteConfig.seo.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Serviços de desenvolvimento web",
    itemListElement: [
      "Sites e landing pages",
      "Sistemas web e painéis administrativos",
      "MVPs e aplicações web",
    ].map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "Service", name, provider: { "@type": "ProfessionalService", name: siteConfig.name } },
    })),
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeStyle }} />
      </head>
      <body className={manrope.variable} suppressHydrationWarning>
        <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
        <JsonLd data={structuredData} />
        <AnalyticsTracker />
        <SiteHeader />
        {children}
        <SiteFooter />
        <VercelAnalytics />
      </body>
    </html>
  );
}
