import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Website | MO&A",
  description: "Public Website powered by Turborepo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
