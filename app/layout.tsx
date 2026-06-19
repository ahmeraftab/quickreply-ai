import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuickReply AI — Your Business, Always Online",
  description:
    "AI-powered WhatsApp assistant that answers customer questions 24/7 — trained on your business knowledge in minutes. Live demo, no signup required.",
  keywords: [
    "WhatsApp AI",
    "customer support automation",
    "RAG chatbot",
    "WhatsApp Business API",
    "AI assistant",
  ],
  authors: [{ name: "Ahmer Aftab" }],
  openGraph: {
    title: "QuickReply AI — Your Business, Always Online",
    description:
      "AI-powered WhatsApp assistant that answers customer questions 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
