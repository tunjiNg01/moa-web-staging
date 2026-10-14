import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://main.d1ic7480t1o1t4.amplifyapp.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MO&A | Structural Engineering & Development Consultancy",
    template: "%s | MO&A",
  },
  description:
    "Morgan Omonitan & Abe Ltd (MO&A) is a premier civil and structural engineering consultancy in Nigeria and Ghana, providing integrated engineering, project management, and independent expert advisory since 1972.",
  keywords: [
    "structural engineering consultancy",
    "civil engineering Nigeria",
    "structural engineer Lagos",
    "engineering consulting Ghana",
    "infrastructure development West Africa",
    "building inspection services",
    "project management consultancy",
    "feasibility studies engineering",
    "tender detailed design",
    "construction quality governance",
    "MO&A",
    "Morgan Omonitan & Abe",
  ],
  authors: [{ name: "Morgan Omonitan & Abe Ltd (MO&A)", url: siteUrl }],
  creator: "MO&A",
  publisher: "MO&A",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/moa-logo.jpeg",
    shortcut: "/images/moa-logo.jpeg",
    apple: "/images/moa-logo.jpeg",
  },
  openGraph: {
    title: "MO&A | Structural Engineering & Development Consultancy",
    description:
      "Thoughtful engineering. Stronger structures. Lasting impact. Serving Nigeria and Ghana since 1972.",
    url: siteUrl,
    siteName: "MO&A - Morgan Omonitan & Abe Ltd",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/moa-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "MO&A - Structural Engineering Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MO&A | Structural Engineering & Development Consultancy",
    description:
      "Thoughtful engineering. Stronger structures. Lasting impact across West Africa.",
    images: ["/images/moa-logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Morgan Omonitan & Abe Ltd (MO&A)",
  "alternateName": "MO&A",
  "url": siteUrl,
  "logo": `${siteUrl}/images/moa-logo.jpeg`,
  "image": `${siteUrl}/images/moa-logo.jpeg`,
  "description":
    "Premier structural and civil engineering consultancy delivering integrated engineering, project management, and independent expert services across Nigeria and West Africa.",
  "foundingDate": "1972",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lagos",
    "addressCountry": "NG",
  },
  "areaServed": ["Nigeria", "Ghana", "West Africa"],
  "knowsAbout": [
    "Structural Engineering",
    "Civil Engineering",
    "Feasibility Studies",
    "Tender & Detailed Design",
    "Project Management",
    "Construction Quality Governance",
    "Structural Health Monitoring",
    "Expert Advisory & Dispute Resolution",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
