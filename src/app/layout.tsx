import type { Metadata } from "next";
import "./globals.css";
import Tracker from "@/components/mbm/tracker";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://madebymohammed.com";
const SITE_NAME = "Made by Mohammed";
const TWITTER_HANDLE = "@mbmohammedn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "made by mohammed.",
    template: "%s | made by mohammed.",
  },
  description:
    "Full stack web engineer specialized in software rendering, Python, and Next.js.",

  keywords: [
    "Mohammed Nasr",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js Portfolio",
    "Software Rendering",
    "Python Developer",
    "Egypt",
    "Web Development",
  ],

  authors: [{ name: "Mohammed Nasr", url: SITE_URL }],
  creator: "Mohammed Nasr",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "made by mohammed.",
    description: "Full stack web engineer with a knack for software rendering.",
    siteName: SITE_NAME,
  },

  twitter: {
    card: "summary_large_image",
    title: "made by mohammed.",
    description: "Full stack web engineer with a knack for software rendering.",
    creator: TWITTER_HANDLE,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-primary font-mono text-white">
        {children}
        <Tracker />
      </body>
    </html>
  );
}
