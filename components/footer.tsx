"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { MapPin, Phone, Mail, Warehouse, ShieldCheck, FileText, Truck, Stethoscope, Info, ShoppingCart, MessageCircle } from "lucide-react";
import Subscribe from "./subscribe";

const importent = [
  { label: "Privacy Policy", link: "/pages/privacy-policy", icon: <ShieldCheck className="w-4 h-4 mr-2" /> },
  {
    label: "Terms and Conditions",
    link: "/pages/terms-and-conditions",
    icon: <FileText className="w-4 h-4 mr-2" />,
  },
  { label: "Shipping Policy", link: "/pages/shipping-policy", icon: <Truck className="w-4 h-4 mr-2" /> },
  { label: "COVID-19 Safety", link: "/pages/covid-19-safety", icon: <Stethoscope className="w-4 h-4 mr-2" /> },
];

const additionalLinks = [
  { 
    label: "About Us", 
    link: "/about-us", 
    icon: <Info className="w-4 h-4 mr-2" /> 
  },
  { 
    label: "Shop", 
    link: "/shop", 
    icon: <ShoppingCart className="w-4 h-4 mr-2" /> 
  },
  { 
    label: "Contact", 
    link: "/contact", 
    icon: <MessageCircle className="w-4 h-4 mr-2" /> 
  }
];

const Footer = () => {
  return (
    <footer className="w-full text-white mt-auto relative rounded-t-3xl bg-[#3D1D1D] pt-12 pb-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Logo and Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Image
                src="https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67a9d16d0027ce92d6a9/view?project=67a96cd2001e32766970&mode=admin"
                alt="DRYAURA Logo"
                className="h-16 w-16 object-contain rounded-full shadow-lg"
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

      <div className="bg-black/10 text-white border-t border-white/10 mt-0">
        <div className="max-w-screen-xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Quick Links - Responsive Dropdown on Mobile */}
            <div className="w-full md:w-auto">
              <div className="grid grid-cols-2 md:flex md:space-x-6 gap-4 md:gap-0 justify-center md:justify-start">
                {importent.map((item) => (
                  <a
                    key={item.label}
                    href={item.link}
                    className="text-xs sm:text-sm text-white/70 hover:text-white hover:underline transition-all flex items-center justify-center md:justify-start"
                  >
                   
                    {item.icon}
                    <span className="ml-2  md:inline">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="w-full md:w-auto">
              <div className="grid grid-cols-3 md:flex md:space-x-6 gap-4 md:gap-0 justify-center md:justify-end">
                {additionalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.link}
                    className="text-xs sm:text-sm text-white/70 hover:text-white hover:underline transition-all flex items-center justify-center md:justify-end"
                  >
                    {link.icon}
                    <span className="ml-2 md:inline">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media Icons - Responsive Sizing */}
            <div className="flex space-x-4 sm:space-x-6 items-center justify-center">
              {[
                { Icon: FaFacebook, href: "https://www.facebook.com", label: "Facebook" },
                { Icon: FaYoutube, href: "https://www.youtube.com", label: "YouTube" },
                { Icon: FaWhatsapp, href: "https://www.whatsapp.com", label: "WhatsApp" },
                { Icon: FaInstagram, href: "https://www.instagram.com", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-lg sm:text-xl text-white/70 hover:text-white hover:scale-110 transition-all ease-in-out"
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Copyright - Responsive Sizing */}
            <div className="w-full md:w-auto text-center md:text-right">
              <h3 className="font-sans text-xs sm:text-sm text-white/70">
                {new Date().getFullYear()} DRYAURA. All rights reserved.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
