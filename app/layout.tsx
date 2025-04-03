import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Urbanist, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/header";
import Footer from "@/components/footer";
import ModelProvider from "@/provider/model-provider";
import ToastProvider from "@/provider/toast-provider";
import GifLoader from "@/components/ui/one-loder"; // First-time Loader
import VideoLoader from "@/components/ui/global-loader"; // Page Transition Loader

const geistSans = Geist({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Dry Aura - Premium Dry Fruits & Immunity Boosters",
  description:
    "Discover Dry Aura, your go-to store for premium dry fruits and natural immunity boosters. Experience purity, health, and sustainability with eco-friendly packaging.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.className} ${poppins.variable}`}>
        <head>
          {/* ✅ Basic Meta Tags */}
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>DryAura: Premium Organic Dry Fruits & Natural Immunity Boosters</title>
          <meta
            name="description"
            content="Discover Dry Aura, your go-to store for premium dry fruits and natural immunity boosters. Experience purity, health, and sustainability with eco-friendly packaging."
          />

          {/* ✅ SEO Meta Tags */}
          <meta name="robots" content="index, follow" />
          <meta
            name="keywords"
            content="Dry Fruits, Immunity Boosters, Healthy Snacks, Organic Dry Fruits, Nuts, Sustainable Packaging"
          />
          <link rel="canonical" href="https://dryaura.com/" />

          {/* ✅ Open Graph (OG) Meta Tags - For Facebook, LinkedIn */}
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Dry Aura - Premium Dry Fruits & Immunity Boosters"
          />
          <meta
            property="og:description"
            content="Experience premium dry fruits with sustainable packaging. Elevate your health with Dry Aura."
          />
          <meta
            property="og:image"
            content="https://dryaura.com/og-image.jpg"
          />
          <meta property="og:url" content="https://dryaura.com/" />

          {/* ✅ Twitter/X Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Dry Aura - Premium Dry Fruits & Immunity Boosters"
          />
          <meta
            name="twitter:description"
            content="Shop premium dry fruits & immunity boosters. Pure, organic & sustainable."
          />
          <meta
            name="twitter:image"
            content="https://dryaura.com/twitter-image.jpg"
          />
          <meta name="twitter:site" content="@dryaura" />

          {/* ✅ Performance & Caching Meta Tags */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            httpEquiv="cache-control"
            content="public, max-age=31536000, immutable"
          />

          {/* ✅ Favicon & PWA Support */}
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          {/* <link rel="manifest" href="/site.webmanifest" /> */}
        </head>

        <body className={`antialiased`}>
          <ModelProvider />
          <ToastProvider />
          <SiteHeader />
          {/* First-time Loader */}
          <GifLoader />

          {/* Page Transition Loader */}
          <VideoLoader />

          {children}

          {/* Analytics and Performance Monitoring */}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
