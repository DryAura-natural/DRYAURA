"use client";

import { Input } from "@headlessui/react";
import { Mails } from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);


  // const handleEmailSubmit = async () => {
  //   if (!email) return; // Don't submit if the email is empty
  //   setIsSubmitting(true);
  //   setSubmitStatus(""); // Clear any previous status

  //   try {
      // Replace with your actual email submission API or service
      // const response = await fetch("/api/subscribe", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email }),
      // });

    //   if (response.ok) {
    //     setSubmitStatus("Subscription successful! Thank you for subscribing.");
    //   } else {
    //     setSubmitStatus("There was an error. Please try again.");
    //   }
    // } catch (error) {
    //   setSubmitStatus("There was an error. Please try again.");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <>
      <div className="w-full text-gray-100 max-h-full">
        <div
          style={{
            backgroundImage: `url("https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67a9cc150025f5a63c5c/view?project=67a96cd2001e32766970&mode=admin)`,
          }}
          className="relative bg-cover bg-center bg-no-repeat md:aspect-[2.4/1]"
        >
          <div className="h-full w-full flex flex-col justify-center items-center text-center  bg-black bg-opacity-80 py-10 sm:py-5">
            <div className=" mb-2 ">
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
              <div className="border border-white flex my-2 ">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="p-2 bg-transparent"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  onClick={()=>{}}
                  disabled={isSubmitting}
                  className="px-5 py-3 border justify-center bg-white"
                >
                  <Mails color="black" />
                </button>
              </div>
              {submitStatus && (
                <div className="text-white mt-2">
                  {submitStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#170b0b] text-white ">
        <div className="max-w-screen mx-auto px-6 py-5 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-2">
          
            {/* Quick Links */}
            <div className="mb-6 md:mb-0">
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="/about"
                    className="text-sm hover:text-gray-400 hover:underline "
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
    </>
  );
};

export default Footer;
