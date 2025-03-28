// components/Footer.tsx

"use client";

import { Mails } from "lucide-react";
import Input from "@/components/ui/Input";

import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

import {  } from "react-icons/fa"; // Example icons from react-icon
import { MapPin,Phone,Mail } from "lucide-react";



const Footer = () => {
  const [email, setEmail] = useState<string>(""); // State for email input
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    if (!email) return; // Don't submit if the email is empty
    setIsSubmitting(true);
    setSubmitStatus(""); // Clear any previous status

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus(data.message);
        setEmail(""); // Clear the email input after successful submission
      } else {
        setSubmitStatus(data.message);
      }
    } catch (error) {
      setSubmitStatus("There was an error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <img
                src="https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67a9d16d0027ce92d6a9/view?project=67a96cd2001e32766970&mode=admin"
                alt="DRYAURA Logo"
                className="h-16 w-16 object-contain rounded-full shadow-lg"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-all">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  Pegasus Tower, Office No. 702, 7th Floor, Sector 68, Noida, Uttar Pradesh 201307
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
                <a href="mailto:customercare@dryaura.in" className="text-sm hover:underline">
                  customercare@dryaura.in
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Newsletter and Certification */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Subscribe to our newsletter for updates and special offers!
              </h3>
              <div className="flex items-center gap-2 flex-col sm:flex-row flex-wrap">
                <div className="relative w-full">
                  <Input
                    type="email"
                    label="Enter Your Email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="bg-transparent border-white/20 border-2 text-white px-4 py-3 placeholder:text-white/50 outline-none w-full rounded-xl focus:border-white/50 transition-all duration-300"
                    icon={<Mails className="text-white/70" />}
                  />
                </div>
                <button 
                  onClick={handleEmailSubmit}
                  disabled={isSubmitting}
                  className="bg-white text-[#3D1D1D] hover:bg-white/90 whitespace-nowrap px-6 py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-white/50 disabled:opacity-50"
                >
                  {isSubmitting ? "Subscribing..." : "SUBSCRIBE"}
                </button>
              </div>
              {submitStatus && (
                <p className={`text-sm mt-2 ${submitStatus.includes('error') ? 'text-red-400' : 'text-green-400'}`}>
                  {submitStatus}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-4 mt-6">
              <div className="text-right">
                <p className="text-sm text-white/70">FSSAI License No. - 10016051001876</p>
                <p className="text-sm text-white/70">FSSAI License No. - 10017061000315</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/10 text-white border-t border-white/10 mt-0">
        <div className="max-w-screen mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
            {/* Quick Links */}
            <div className="mb-6 md:mb-0">
              <ul className="flex space-x-6">
                {['About Us', 'Shop', 'Contact', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <a
                      href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-white/70 hover:text-white hover:underline transition-all"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-6 mb-6 md:mb-0">
              {[
                { Icon: FaFacebook, href: "https://www.facebook.com" },
                { Icon: FaTwitter, href: "https://twitter.com" },
                { Icon: FaInstagram, href: "https://www.instagram.com" },
                { Icon: FaLinkedin, href: "https://www.linkedin.com" }
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
