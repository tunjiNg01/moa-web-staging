import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { AdminShell } from "@/components/admin-shell";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dutch801 = localFont({
  src: [
    {
      path: "../public/fonts/dutch.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/dutchi.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/dutchb.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/dutchbi.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/dutcheb.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-dutch",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MO&A Admin Console | Engineering & Advisory CMS",
    template: "%s | MO&A Admin",
  },
  description:
    "Management console for MO&A Ltd (formerly Morgan Omonitan & Abe Ltd) — manage Projects, News & Foresight, Careers, and Admin Users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dutch801.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
