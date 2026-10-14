import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Foresight | Engineering Research & Industry Perspectives",
  description:
    "Thought leadership from MO&A engineers and consultants examining structural challenges, low-carbon materials, and evolving infrastructure developments across Africa.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "News & Foresight | MO&A Engineering Research & Industry Perspectives",
    description:
      "Thought leadership from MO&A engineers and consultants examining structural challenges, low-carbon materials, and evolving infrastructure developments across Africa.",
    url: "/news",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Foresight | MO&A",
    description:
      "Engineering research, structural insights, and sustainable development perspectives from MO&A.",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
