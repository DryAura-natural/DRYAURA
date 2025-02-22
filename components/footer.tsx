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
      {/* <div className="w-auto h-auto text-gray-100">
        <div
          style={{
            backgroundImage: `url("https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67a9cc150025f5a63c5c/view?project=67a96cd2001e32766970&mode=admin")`,
          }}
          className="relative bg-cover bg-center bg-no-repeat md:aspect-[2.4/1]"
        >
          <div className="h-full w-full flex flex-col justify-center items-center text-center bg-black bg-opacity-80 py-10 sm:py-5">
            <div className="mb-2">
              <Image
                src="https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67a9d16d0027ce92d6a9/view?project=67a96cd2001e32766970&mode=admin"
                width={150}
                height={100}
                alt="DryAura Logo"
              />
            </div>
            <div className="max-w-2xl font-thin text-center tracking-wider text-xl mt-5">
              <p>
                "At DRYAURA, we source only the best dry fruits, handpicked for
                their freshness and superior quality. Experience the perfect
                blend of taste, health, and sustainability in every bite!"
              </p>
            </div>
            <div className="max-w-xs font-extralight text-center my-8">
              <h1 className="font-semibold text-lg">STORE</h1>
              <p>
                Dunsmuir Ave, Los Angeles, CA 90036, USA Atkins Ave, Brooklyn,
                NY 11208, USA
              </p>
            </div>
            <div className="max-w-xs font-extralight text-center">
              <h1 className="font-semibold text-lg uppercase">
                News As Fresh As Our
              </h1>
              <div className="border border-white flex my-2 rounded-md overflow-hidden">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="p-2 bg-transparent text-white placeholder-gray-400"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  onClick={handleEmailSubmit}
                  disabled={isSubmitting}
                  className={`px-5 py-3 border justify-center transition-colors duration-300 ${isSubmitting ? 'bg-gray-400' : 'bg-white hover:bg-gray-200'}`}
                >
                  {isSubmitting ? (
                    <span className="loader"></span> // You can replace this with a spinner component
                  ) : (
                    <Mails color="black" />
                  )}
                </button>
              </div>
              {submitStatus && (
                <div className={`mt-2 ${submitStatus.includes("successful") ? "text-green-500" : "text-red-500"}`}>
                  {submitStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}
           <footer className="w-full text-white mt-auto relative rounded-t-3xl bg-gradient-to-r from-[#3a1b1b] to-[#512828]">
       <div className="max-w-7xl mx-auto px-4 py-8 ">
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
               <div className="flex gap-2 ">
                 <input
                   type="email"
                   placeholder="Enter Your Email"
                   className="bg-transparent border-white border-2 text-black px-2 placeholder:text-gray-400 outline-none text-white"
                 />
                 <button className="bg-white text-black hover:bg-gray-200 whitespace-nowrap px-6 py-2 rounded">
                   SUBSCRIBE
                 </button>
               </div>
             </div>

             <div className="flex items-center justify-end gap-4">
               <div className="text-right font-semibold">
                 <p className="text-sm text-gray-300">FSSAI License No. - 10016051001876</p>
                 <p className="text-sm text-gray-300">FSSAI License No. - 10017061000315</p>
               </div>
              
             </div>
           </div>
         </div>
       </div>
       <div className="bg-gradient-to-r from-[#3a1b1b] to-[#512828] text-white border-t-2 border-white/20">
        <div className="max-w-screen mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-2">
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
              © 2025 DRYAURA. All rights reserved.
            </h3>
          </div>
        </div>
      </div>
     </footer>

      
    </>
  );
};

export default Footer;


