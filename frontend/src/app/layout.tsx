import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Waste Segregation System | AI-Powered Recycling",
  description: "AI-powered waste classification system that helps you identify and properly categorize waste for effective recycling and sustainability.",
  authors: [{ name: "Smart Waste Segregation" }],
  openGraph: {
    title: "Smart Waste Segregation System",
    description: "AI-powered waste classification for a sustainable future",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
