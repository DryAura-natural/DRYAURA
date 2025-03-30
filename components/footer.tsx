"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { MapPin, Phone, Mail, Warehouse } from "lucide-react";
import Subscribe from "./subscribe";

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
        <div className="max-w-screen mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
            {/* Quick Links */}
            <div className="mb-6 md:mb-0">
              <ul className="flex space-x-6">
                {["About Us", "Shop", "Contact", "Privacy Policy"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm text-white/70 hover:text-white hover:underline transition-all"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-6 mb-6 md:mb-0">
              {[
                { Icon: FaFacebook, href: "https://www.facebook.com" },
                { Icon: FaYoutube, href: "https://www.youtube.com" },
                { Icon: FaWhatsapp, href: "https://www.whatsapp.com" },
                { Icon: FaInstagram, href: "https://www.instagram.com" },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-white/70 hover:text-white hover:scale-125 transition-all ease-in-out"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <h3 className="font-sans text-sm text-white/70">
              2025 DRYAURA. All rights reserved.
            </h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
