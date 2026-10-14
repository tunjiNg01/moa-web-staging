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
    default: "MO&A Ltd | Formerly Morgan Omonitan & Abe Ltd | Engineering & Consulting Firm",
    template: "%s | MO&A Ltd",
  },
  description:
    "MO&A Ltd (formerly Morgan Omonitan & Abe Ltd) is a premier engineering, consulting & development firm in Nigeria and Ghana, providing integrated engineering, project management, and independent expert advisory since 1972.",
  keywords: [
    "MO&A Ltd",
    "formerly Morgan Omonitan & Abe Ltd",
    "Morgan Omonitan & Abe Ltd",
    "Morgan Omonitan & Abe",
    "MO&A",
    "engineering consulting development firm",
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
  ],
  authors: [{ name: "MO&A Ltd (formerly Morgan Omonitan & Abe Ltd)", url: siteUrl }],
  creator: "MO&A Ltd",
  publisher: "MO&A Ltd",
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
    title: "MO&A Ltd | Formerly Morgan Omonitan & Abe Ltd",
    description:
      "Thoughtful engineering. Stronger structures. Lasting impact. Serving Nigeria and Ghana since 1972 as MO&A Ltd (formerly Morgan Omonitan & Abe Ltd).",
    url: siteUrl,
    siteName: "MO&A Ltd (Formerly Morgan Omonitan & Abe Ltd)",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/moa-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "MO&A Ltd - Formerly Morgan Omonitan & Abe Ltd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MO&A Ltd | Formerly Morgan Omonitan & Abe Ltd",
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
  "name": "MO&A Ltd",
  "legalName": "MO&A Ltd",
  "alternateName": [
    "Morgan Omonitan & Abe Ltd",
    "MO&A",
    "Morgan Omonitan & Abe",
  ],
  "url": siteUrl,
  "logo": `${siteUrl}/images/moa-logo.jpeg`,
  "image": `${siteUrl}/images/moa-logo.jpeg`,
  "description":
    "MO&A Ltd (formerly Morgan Omonitan & Abe Ltd) is a premier engineering, consulting & development firm delivering integrated engineering, project management, and independent expert services across Nigeria and West Africa.",
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
