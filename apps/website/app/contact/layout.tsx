import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Engineering Consultations & Tenders",
  description:
    "Get in touch with MO&A engineering teams in Lagos, Nigeria and Accra, Ghana. Discuss your next structural engineering, civil infrastructure, or project advisory engagement.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact MO&A | Engineering Consultations & Tenders",
    description:
      "Connect with MO&A's engineering and project advisory specialists in Lagos and Accra for new tenders and consultations.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MO&A",
    description:
      "Get in touch with MO&A engineering teams in Lagos and Accra for project consultations.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
