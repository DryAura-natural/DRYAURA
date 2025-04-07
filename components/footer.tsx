"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import {
  MapPin,
  Phone,
  Mail,
  Warehouse,
  ShieldCheck,
  FileText,
  Truck,
  Stethoscope,
  Info,
  ShoppingCart,
  MessageCircle,
  Nut,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Subscribe from "./subscribe";
import { categories } from "@/constants/categories";

const importent = [
  {
    label: "Privacy Policy",
    link: "/pages/privacy-policy",
    icon: <ShieldCheck className="w-4 h-4 mr-2" />,
  },
  {
    label: "Terms and Conditions",
    link: "/pages/terms-and-conditions",
    icon: <FileText className="w-4 h-4 mr-2" />,
  },
  {
    label: "Shipping Policy",
    link: "/pages/shipping-policy",
    icon: <Truck className="w-4 h-4 mr-2" />,
  },
  {
    label: "COVID-19 Safety",
    link: "/pages/covid-19-safety",
    icon: <Stethoscope className="w-4 h-4 mr-2" />,
  },
];

const additionalLinks = [
  {
    label: "About Us",
    link: "/about-us",
    icon: <Info className="w-4 h-4 mr-2" />,
  },
  {
    label: "Shop",
    link: "/collections/all",
    icon: <ShoppingCart className="w-4 h-4 mr-2" />,
  },
  {
    label: "New Launch",
    link: "/collections/new-launch",
    icon: <Sparkles  className="w-4 h-4 mr-2" />,
  },
  {
    label: "Contact Us",
    link: "/contact-us",
    icon: <MessageCircle className="w-4 h-4 mr-2" />,
  },
];

const categoryLinks = categories.map((category) => ({
  label: category.name,
  link: category.link,
}));

const Footer = () => {
  return (
    <footer className="w-full text-white mt-auto relative rounded-t-3xl bg-[#3D1D1D]  overflow-hidden">
      {/* Decorative Background Elements */}

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Logo and Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center ">
              <Image
                src="https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67a9d16d0027ce92d6a9/view?project=67a96cd2001e32766970&mode=admin"
                alt="DRYAURA Logo"
                className="h-16 w-16 object-contain rounded-full shadow-lg ring-2 ring-white/10"
                width={64}
                height={64}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-all">
                <Warehouse className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  Arun dry fruits Near Bharti general Store Main bazar (katra)
                  Pin code....182301
                </p>
              </div>
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-all">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  B-291, Sangam Vihar New Delhi - 110080
                </p>
              </div>

              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-all">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+919971095414" className="text-sm hover:underline">
                  +91-8384086292
                </a>
              </div>

              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-all">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a
                  href="mailto:customercare@dryaura.in"
                  className="text-sm hover:underline"
                >
                  customercare@dryaura.in
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Newsletter and Certification */}
          <Subscribe />
        </div>
      </div>

      <div className="bg-black/10 text-white border-t border-white/10 mt-0 px-4">
        <div className="max-w-screen h-full mx-auto px-4 py-8 sm:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* First Column - Important Policy Links */}
            <div className="flex flex-col items-start space-y-4 order-1 lg:order-1">
              <h4 className="text-sm font-semibold text-white/80 mb-4">
                Policies
              </h4>
              <div className="space-y-3 w-full">
                {importent.map((item) => (
                  <a
                    key={item.label}
                    href={item.link}
                    className="text-sm sm:text-sm text-white/70 hover:text-white hover:underline transition-all flex items-center space-x-2"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>


         {/* Second Column - Category Links */}
         <div className="flex flex-col items-start order-3 sm:order-2 lg:order-2">
              <h4 className="text-sm font-semibold text-white/80 mb-4">
                Quick Links
              </h4>
              <div className="space-y-3 w-full">
                {additionalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.link}
                    className="text-sm sm:text-sm text-white/70 hover:text-white hover:underline transition-all flex items-center space-x-2"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* Third Column - Quick Links */}
            <div className="flex flex-col items-start order-2 sm:order-3 lg:order-3">
              <h4 className="text-sm font-semibold text-white/80 mb-4  ml-5 text-center">
                Categories
              </h4>
              <div className="grid grid-cols-2  gap-5 sm:gap-4">
                {categoryLinks.map((category) => (
                  <a
                    key={category.label}
                    href={category.link}
                    className="text-sm sm:text-sm text-white/70 hover:text-white hover:underline transition-all flex items-center space-x-1"
                  >
                    <ChevronRight className="w-3 h-3 opacity-70" />
                    <span>{category.label}</span>
                  </a>
                ))}
              </div>
            </div>

   

            {/* Fourth Column - Social Media Icons */}
            <div className="flex flex-col items-start order-4 lg:order-4">
              <h4 className="text-sm font-semibold text-white/80 mb-4">
                Connect With Us
              </h4>
              <div className="flex flex-wrap gap-4 items-center">
                {[
                  {
                    Icon: FaFacebook,
                    href: "https://www.facebook.com",
                    label: "Facebook",
                  },
                  {
                    Icon: FaYoutube,
                    href: "https://www.youtube.com",
                    label: "YouTube",
                  },
                  {
                    Icon: FaWhatsapp,
                    href: "https://www.whatsapp.com",
                    label: "WhatsApp",
                  },
                  {
                    Icon: FaInstagram,
                    href: "https://www.instagram.com",
                    label: "Instagram",
                  },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-2xl sm:text-xl text-white/70 hover:text-white hover:scale-110 transition-all ease-in-out"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Fifth Column - Copyright */}
        <div className="flex flex-col justify-center items-center py-4">
          <hr className="w-full border-white/10 p-1" />
          <h3 className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
            Copyright © {new Date().getFullYear()} dryaura.in. All Rights Reserved.
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
