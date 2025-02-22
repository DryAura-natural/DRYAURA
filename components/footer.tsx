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
    <>
           <footer className="w-full text-white mt-auto relative rounded-t-3xl bg-gradient-to-r from-[#3a1b1b] to-[#512828] pt-12 pb-8">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
           {/* Left Side - Logo and Contact Info */}
           <div className="space-y-6">
             <div className="flex items-center">
               <img
                 src="https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67a9d0130039f0ca3918/view?project=67a96cd2001e32766970&mode=admin"
                 alt="DRYAURA Logo"
                 className="h-16 object-contain"
               />
             </div>

             <div className="space-y-4">
               <div className="flex items-center gap-3 text-gray-300">
                 <MapPin className="h-5 w-5 flex-shrink-0" />
                 <p className="text-sm">
                   Pegasus Tower, Office No. 702, 7th Floor, Sector 68, Noida, Uttar Pradesh 201307
                 </p>
               </div>

               <div className="flex items-center gap-3 text-gray-300">
                 <Phone className="h-5 w-5 flex-shrink-0" />
                 <a href="tel:+919971095414" className="text-sm hover:text-white transition-colors">
                   +91-8384086292
                 </a>
               </div>

               <div className="flex items-center gap-3 text-gray-300">
                 <Mail className="h-5 w-5 flex-shrink-0" />
                 <a href="mailto:customercare@nutraj.com" className="text-sm hover:text-white transition-colors">
                   customercare@dryaura.in
                 </a>
               </div>
             </div>
           </div>

           {/* Right Side - Newsletter and Certification */}
           <div className="space-y-6">
             <div className="space-y-4">
               <h3 className="text-lg font-medium">
                 Subscribe to our newsletter for updates and special offers!
               </h3>
               <div className="flex items-center gap-2 flex-col sm:flex-row flex-wrap">
                 <input
                   type="email"
                   placeholder="Enter Your Email"
                   className="bg-transparent border-white border-2 text-white px-4 py-2 placeholder:text-gray-400 outline-none w-full sm:w-auto"
                 />
                 <button className="bg-white text-black hover:bg-gray-200 whitespace-nowrap px-6 py-2 rounded transition-colors duration-200">
                   SUBSCRIBE
                 </button>
               </div>
             </div>

             <div className="flex items-center justify-end gap-4 mt-6">
               <div className="text-right font-semibold">
                 <p className="text-sm text-gray-300">FSSAI License No. - 10016051001876</p>
                 <p className="text-sm text-gray-300">FSSAI License No. - 10017061000315</p>
               </div>
              
             </div>
           </div>
         </div>
       </div>
       <div className="bg-gradient-to-r from-[#3a1b1b] to-[#512828] text-white border-t-2 border-white/20 mt-8">
        <div className="max-w-screen mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
            {/* Quick Links */}
            <div className="mb-6 md:mb-0">
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="/about"
                    className="text-sm hover:text-gray-400 hover:underline"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-sm hover:text-gray-400 hover:underline"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-sm hover:text-gray-400 hover:underline"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-sm hover:text-gray-400 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a
                href="https://www.facebook.com"
                className="text-xl hover:text-gray-400 hover:scale-125 transition ease-in-out"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                className="text-xl hover:text-gray-400 hover:scale-125 transition ease-in-out"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-xl hover:text-gray-400 hover:scale-125 transition ease-in-out"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com"
                className="text-xl hover:text-gray-400 hover:scale-125 transition ease-in-out"
              >
                <FaLinkedin />
              </a>
            </div>
            <h3 className="font-sans text-sm">
              2025 DRYAURA. All rights reserved.
            </h3>
          </div>
        </div>
      </div>
     </footer>

      
    </>
  );
};

export default Footer;
