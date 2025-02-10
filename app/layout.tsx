import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import ModelProvider from "@/provider/model-provider";
import ToastProvider from "@/provider/toast-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/header";
import { GlobalLoader } from "@/components/ui/global-loader"; // Import Loader

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });
const anton = Anton({ weight: "400", subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });

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
      <html lang="en">
        <head>
          <link rel="icon" href="https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8e983001b8a35cc71/view?project=677bf12a000e83aee344&mode=admin" sizes="16x16" />
          <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" href="/favicon-96x96.png" sizes="96x96" />
        </head>
        <body className={`${geistSans.className} antialiased`}>
          <ModelProvider />
          <ToastProvider />

          {/* Global Loader */}
          {/* <GlobalLoader /> */}

          <SiteHeader />
          {children}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
