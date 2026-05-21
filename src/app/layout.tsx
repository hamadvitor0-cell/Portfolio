import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

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
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: `rgb(${light.background})` },
    { media: "(prefers-color-scheme: dark)", color: `rgb(${dark.background})` }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeStyle }} />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
