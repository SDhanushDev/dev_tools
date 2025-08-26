import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "All-in-One Dev Tools - Free Online Developer Tools",
    template: "%s | All-in-One Dev Tools"
  },
  description: "Free online developer tools including JSON formatter, hash generators, text converters, and more. No registration required.",
  keywords: ["developer tools", "online tools", "json formatter", "hash generator", "text converter", "free tools"],
  authors: [{ name: "All-in-One Dev Tools" }],
  creator: "All-in-One Dev Tools",
  publisher: "All-in-One Dev Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://all-in-one-dev-tools.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://all-in-one-dev-tools.vercel.app",
    siteName: "All-in-One Dev Tools",
    title: "All-in-One Dev Tools - Free Online Developer Tools",
    description: "Free online developer tools including JSON formatter, hash generators, text converters, and more. No registration required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "All-in-One Dev Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All-in-One Dev Tools - Free Online Developer Tools",
    description: "Free online developer tools including JSON formatter, hash generators, text converters, and more. No registration required.",
    images: ["/og-image.png"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <WebsiteJsonLd />
        <OrganizationJsonLd />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
