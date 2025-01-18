import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import ModelProvider from "@/provider/model-provider";
import ToastProvider from "@/provider/toast-provider";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });
const anton = Anton({  weight: "400",subsets: ["latin"] });
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
        <body className={`${geistSans.className} antialiased`}>
          <ModelProvider />
          <ToastProvider />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
