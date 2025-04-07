"use client";

import React, { useState, useEffect } from 'react';
import { Mails } from 'lucide-react';
import Input from "@/components/ui/Input";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'success' | 'already_subscribed'>('success');

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    
    if (!isValid) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    
    // Optional: Validate email on each change
    if (inputEmail) {
      validateEmail(inputEmail);
    } else {
      setEmailError("");
    }
  };

  const handleEmailSubmit = async () => {
    // Clear previous statuses
    setSubmitStatus("");
    setEmailError("");

    // Validate email before submission
    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const storeId = '52c181d1-539d-4df1-bb5b-4bd27ded858b'; // Your store ID
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus(data.message);
        setEmail(""); // Clear the email input after successful submission
        
        if (data.isNewSubscription) {
          setModalType('success');
          setIsThankYouModalOpen(true);
        } else if (data.alreadySubscribed) {
          setModalType('already_subscribed');
          setIsThankYouModalOpen(true);
        }
      } else {
        setSubmitStatus(data.message || "Subscription failed");
      }
    } catch (error) {
      setSubmitStatus("There was an error. Please try again.");
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeThankYouModal = () => {
    setIsThankYouModalOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xs text-center sm:text-xl font-semibold text-white">
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
                labelClassName="text-orange-300" 
                className="bg-transparent border-white/20 border-2 text-white px-4 py-3 placeholder:text-white/50 outline-none w-full rounded-xl focus:border-white/50 transition-all duration-300"
                icon={<Mails className="text-white/70" />}
                rightIcon={
                  <button
                    onClick={handleEmailSubmit}
                    disabled={isSubmitting}
                    className="bg-white text-[#3D1D1D] hover:bg-white/90 whitespace-nowrap px-4 py-2 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-white/50 disabled:opacity-50"
                  >
                    {isSubmitting ? "Subscribing..." : "SUBSCRIBE"}
                  </button>
                }
              />
              {emailError && (
                <p className="text-sm mt-2 text-red-400">{emailError}</p>
              )}
            </div>
          </div>
          {submitStatus && (
            <p
              className={`text-sm mt-2 ${
                submitStatus.includes("error")
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {submitStatus}
            </p>
          )}
        </div>
      </div>

      {/* Thank You Modal */}
      <Transition appear show={isThankYouModalOpen} as={Fragment}>
  <Dialog 
    as="div" 
    className="relative z-50" 
    onClose={closeThankYouModal}
  >
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel 
            className="
              w-full max-w-md 
              transform 
              overflow-hidden 
              rounded-2xl 
              bg-[#3D1D1D] 
              p-6 
              text-center 
              align-middle 
              shadow-2xl 
              transition-all 
              border-4 
              border-[#8B4513] 
              relative
            "
          >
            {/* Close Button */}
            <button 
              onClick={closeThankYouModal}
              className="
                absolute 
                top-4 
                right-4 
                text-white 
                hover:text-red-300 
                transition-colors 
                duration-300
              "
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>

            {/* Icon and Title */}
            <div className="mb-6">
              <div className="
                mx-auto 
                mb-4 
                w-20 
                h-20 
                bg-[#8B4513] 
                rounded-full 
                flex 
                items-center 
                justify-center
              ">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <Dialog.Title
                as="h3"
                className="
                  text-2xl 
                  font-bold 
                  text-white 
                  mb-2
                "
              >
                {modalType === 'success' 
                  ? 'Welcome to Dryaura Family!' 
                  : 'Already Connected'}
              </Dialog.Title>
            </div>

            {/* Content */}
            <div className="
              bg-[#8B4513]/20 
              rounded-xl 
              p-4 
              mb-6
            ">
              <p className="
                text-sm 
                text-white/80 
                leading-relaxed
              ">
                {modalType === 'success' 
                  ? "🎉 You're now part of our nutrition journey! Expect weekly insights, exclusive offers, and wellness tips straight to your inbox." 
                  : "🌟 You're already a valued member of our Dryaura community. Keep enjoying our latest updates!"}
              </p>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={closeThankYouModal}
              className="
                w-full 
                bg-[#8B4513] 
                text-white 
                py-3 
                rounded-xl 
                hover:bg-[#A0522D] 
                transition-colors 
                duration-300 
                font-semibold 
                uppercase 
                tracking-wider
                focus:outline-none 
                focus:ring-2 
                focus:ring-[#A0522D] 
                focus:ring-offset-2
              "
            >
              Continue to Dryaura
            </button>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>
    </>
  );
};

export default Subscribe;
