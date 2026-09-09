import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dandy Firmansyah | Senior Software Engineer",
  description: "Architectural Case Studies & Senior Backend Portfolio",
  icons: {
    icon: "/icon.svg",
  },
  // Additional metadata for better SEO
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dandy Firmansyah | Senior Software Engineer",
    description: "Architectural Case Studies & Senior Backend Portfolio Specializing in Scalable Backend Infrastructure",
    url: "https://dandy-firmansyah.dev",
    siteName: "Dandy Firmansyah Portfolio",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Dandy Firmansyah Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dandy Firmansyah | Senior Software Engineer",
    description: "Architectural Case Studies & Senior Backend Portfolio",
    images: ["/icon.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ThemeProvider>
      <>
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="absolute left-0 top-0 z-50 p-2 bg-brand-primary text-white transform -translate-y-4 transition-transform duration-200 focus:-translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2">
          Skip to main content
        </a>

        <html
          lang="en"
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
          <body className="min-h-full flex flex-col">{children}</body>
        </html>
      </>
    </ThemeProvider>
  );
}
