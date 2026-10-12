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

export const metadata: Metadata = {
  title: {
    default: "MO&A | Structural Engineering Consultancy",
    template: "%s | MO&A",
  },
  description:
    "MO&A is a structural engineering consultancy bringing thoughtful design, technical clarity and collaborative thinking to the built environment.",
  openGraph: {
    title: "MO&A | Structural Engineering Consultancy",
    description:
      "Thoughtful engineering. Stronger structures. Lasting impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
