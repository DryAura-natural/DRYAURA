"use client";
import React, { useState, Fragment, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { useAuth } from '@clerk/nextjs';

import { 
  FaShoppingCart,   // Order Related Queries
  FaQuestionCircle, // Non-Order Related Issues
  FaWhatsapp,       // WhatsApp Support
  FaBoxOpen,        // Bulk Order Inquiry
  FaExclamationTriangle, // Other Issues
  FaBook,            // Frequently Asked Questions
  FaChevronRight
} from 'react-icons/fa';

interface SubmissionStatus {
  id: string;
  userId: string;
  status: string;
  statusUpdateReason?: string;
  createdAt: string;
  queryType: string;
}

const ContactUs = () => {
  const router = useRouter();
  const { userId } = useAuth(); 
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
    orderNumber: "", 
    issueType: "", 
    bulkOrderDetails: "", 
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedQueryType, setSelectedQueryType] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [userSubmissions, setUserSubmissions] = useState<SubmissionStatus[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [submissionsError, setSubmissionsError] = useState<string | null>(null);



  const fetchUserSubmissions = async () => {
    if (!userId) return;

    setSubmissionsLoading(true);
    setSubmissionsError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-us?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setUserSubmissions(data.submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setSubmissionsError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setSubmissionsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserSubmissions();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const apiUrls = [
      process.env.NEXT_PUBLIC_API_URL,
      'http://localhost:3000/api/52c181d1-539d-4df1-bb5b-4bd27ded858b'
    ];

    const validApiUrl = apiUrls.find(url => url && url.trim() !== '');

    if (!validApiUrl) {
      setMessage("No valid API URL found. Please contact support.");
      return;
    }

    const requiredFields: (keyof typeof formData)[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'message'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setMessage(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (selectedQueryType === "Order Related Queries" && !formData.orderNumber) {
      setMessage("Please provide an Order Number for Order Related Queries");
      return;
    }

    if (selectedQueryType === "Non-Order Related Issues" && !formData.issueType) {
      setMessage("Please specify the Issue Type");
      return;
    }

    if (selectedQueryType === "WhatsApp Support" && !whatsappNumber) {
      setMessage("Please provide a WhatsApp number for WhatsApp Support");
      return;
    }

    if (selectedQueryType === "Bulk Order Inquiry" && !formData.bulkOrderDetails) {
      setMessage("Please provide details about your bulk order");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const payload = {
      ...formData,
      queryType: selectedQueryType,
      whatsappNumber: selectedQueryType === "WhatsApp Support" ? whatsappNumber : null,
      timestamp: new Date().toISOString(),
      source: "contact_form"
    };

    try {
      const cleanUrl = validApiUrl.replace(/\/+$/, '');
      const fullUrl = `${cleanUrl}/contect-us`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); 

      const fetchOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        mode: 'cors', 
        credentials: 'omit' 
      };

      const response = await fetch(fullUrl, fetchOptions)
        .catch(error => {
          console.error('Fetch error:', error);
          throw new Error(`Network error: ${error.message}`);
        });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        
        setMessage(`Server error: ${response.status} - ${errorText}`);
        setSubmitting(false);
        return;
      }

      const data = await response.json();

      setMessage(data.message || "Your message has been sent successfully!");
      
      setSubmissionId(data.submissionId || null);
      setIsSuccessModalOpen(true);
      
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        message: "",
        orderNumber: "",
        issueType: "",
        bulkOrderDetails: "",
      });
      setSelectedQueryType("");
      setWhatsappNumber("");

    } catch (error) {
      console.error('Submission error details:', {
        name: error instanceof Error ? error.name : 'Unknown Error',
        message: error instanceof Error ? error.message : 'No error message',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });

      if (error instanceof TypeError) {
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          setMessage("Unable to connect to the server. Please check your internet connection.");
        } else {
          setMessage(`Connection error: ${error.message}`);
        }
      } else if (error instanceof DOMException && error.name === 'AbortError') {
        setMessage("Request timed out. Please check your connection and try again.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleQueryTypeClick = (queryType: string) => {
    setSelectedQueryType(queryType);
  };

  const closeSuccessModal = () => {
    router.push('/');
    setIsSuccessModalOpen(false);
    setSubmissionId(null);
  };

  // Status Update Pinned Message Component
  const StatusUpdatePinnedMessage = ({ 
    defaultQueryType, 
    onQueryTypeSelect 
  }: { 
    defaultQueryType?: string, 
    onQueryTypeSelect?: (queryType: string) => void 
  }) => {
    const queryTypesWithIcons = [
      { 
        type: "Order Related Queries", 
        icon: FaShoppingCart,
        color: "text-blue-600"
      },
      { 
        type: "Non-Order Related Issues", 
        icon: FaQuestionCircle,
        color: "text-green-600"
      },
      { 
        type: "WhatsApp Support", 
        icon: FaWhatsapp,
        color: "text-green-500"
      },
      { 
        type: "Bulk Order Inquiry", 
        icon: FaBoxOpen,
        color: "text-purple-600"
      },
      { 
        type: "Other Issues", 
        icon: FaExclamationTriangle,
        color: "text-red-600"
      },
      { 
        type: "Frequently Asked Questions", 
        icon: FaBook,
        color: "text-gray-600"
      }
    ];

    const handleQueryTypeClick = (queryType: string) => {
      setSelectedQueryType(queryType);
      onQueryTypeSelect?.(queryType);
    };

    return (
      <div className="bg-blue-50 border-l-4 border-red-500 p-4 mb-6 shadow-md">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg 
              className="h-6 w-6 text-blue-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700 font-medium">
              Important: After submitting your form, we will send status updates via email.
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Please check your email regularly for the latest updates on your submission.
            </p>
            
            {defaultQueryType && (
              <div className="mt-2">
                <p className="text-xs text-blue-600 font-semibold">
                  Recommended Query Type:
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {queryTypesWithIcons
                    .filter(({ type }) => 
                      type.toLowerCase().includes(defaultQueryType.toLowerCase())
                    )
                    .map(({ type, icon: Icon, color }) => (
                      <button
                        key={type}
                        onClick={() => handleQueryTypeClick(type)}
                        className={`
                          flex items-center gap-1 px-2 py-1 
                          bg-blue-100 ${color} rounded-full 
                          text-xs hover:bg-blue-200 
                          transition-colors
                        `}
                      >
                        <Icon className="mr-1" />
                        {type}
                      </button>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-black">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-3 sm:mb-4 animate-fade-in">
          We're Happy to Help!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-black max-w-2xl mx-auto mb-2 px-4">
          Have any queries or feedback? We would be delighted to assist you.
        </p>
        <p className="text-xs sm:text-sm text-black mb-6 sm:mb-8">
          Customer Support Hours: 10:00 AM - 7:00 PM (Monday to Saturday)
        </p>
      </div>
      <StatusUpdatePinnedMessage defaultQueryType="Order Related Queries" onQueryTypeSelect={handleQueryTypeClick} />

      {/* Contact Container */}
      <div className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8 bg-[#4E2828] shadow-2xl rounded-2xl overflow-hidden">
          {/* Left Section - Query Types */}
          <div className="bg-gradient-to-br from-[#3D1D1D] to-[#4E2828] text-[#F5F5F5] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Select Query Type</h2>
              <div className="space-y-2 sm:space-y-4">
                {[
                  { 
                    type: "Order Related Queries", 
                    icon: FaShoppingCart,
                    color: "text-white"
                  },
                  { 
                    type: "Non-Order Related Issues", 
                    icon: FaQuestionCircle,
                    color: "text-white"
                  },
                  { 
                    type: "WhatsApp Support", 
                    icon: FaWhatsapp,
                    color: "text-white"
                  },
                  { 
                    type: "Bulk Order Inquiry", 
                    icon: FaBoxOpen,
                    color: "text-white"
                  },
                  { 
                    type: "Other Issues", 
                    icon: FaExclamationTriangle,
                    color: "text-white"
                  },
                  { 
                    type: "Frequently Asked Questions", 
                    icon: FaBook,
                    color: "text-white"
                  }
                ].map(({ type, icon: Icon, color }) => (
                  <button
                    key={type}
                    className={`
                      w-full text-left py-2 sm:py-3 px-3 sm:px-4 rounded-lg 
                      transition duration-300 
                      hover:bg-[#5D2D2D] 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-[#7D4D4D] 
                      flex items-center justify-between space-x-10 
                      text-sm sm:text-base
                    `}
                    onClick={() => handleQueryTypeClick(type)}
                  >
                    <div className="flex items-center">
                      <Icon className={`mr-2  ${color} w-5 h-5`} />
                      
                      <span>{type}</span>
                    </div>
                    <FaChevronRight className="text-xs sm:text-sm text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4 sm:space-x-6 mt-4 sm:mt-8 justify-center">
              {["facebook", "instagram", "linkedin", "pinterest", "telegram", "youtube"].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-lg sm:text-2xl hover:text-[#D0D0D0] transition duration-300"
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="p-6 sm:p-8 bg-[#F5F5F5] text-[#3D1D1D]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#3D1D1D]">Contact Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                {[
                  { name: "firstName", label: "First Name", type: "text" },
                  { name: "lastName", label: "Last Name", type: "text" },
                  { name: "phoneNumber", label: "Phone Number", type: "tel" },
                  { name: "email", label: "Email", type: "email" }
                ].map(({ name, label, type }) => (
                  <div key={name}>
                    <label className="block text-xs sm:text-sm font-medium text-[#3D1D1D] mb-1 sm:mb-2">{label}*</label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 border border-[#7D4D4D]/50 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-[#3D1D1D] 
                        transition duration-300 text-sm sm:text-base"
                    />
                  </div>
                ))}
              </div>

              {/* Dynamic Fields */}
              {selectedQueryType === "Order Related Queries" && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#3D1D1D] mb-1 sm:mb-2">Order Number*</label>
                  <input
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-[#7D4D4D]/50 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-[#3D1D1D] 
                      transition duration-300 text-sm sm:text-base"
                  />
                </div>
              )}

              {selectedQueryType === "Non-Order Related Issues" && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#3D1D1D] mb-1 sm:mb-2">Issue Type*</label>
                  <input
                    type="text"
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-[#7D4D4D]/50 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-[#3D1D1D] 
                      transition duration-300 text-sm sm:text-base"
                  />
                </div>
              )}

              {selectedQueryType === "WhatsApp Support" && (
                <div>
                  <label className=" text-xs sm:text-sm font-medium text-[#3D1D1D] mb-1 sm:mb-2 flex items-center">
                    <FaWhatsapp className="mr-2 text-green-500" /> WhatsApp Number*
                  </label>
                  <div className="flex items-center">
                    <div className="mr-2 text-sm sm:text-base">+91</div>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      required
                      placeholder="Enter your WhatsApp number"
                      className="w-full px-3 sm:px-4 py-2 border border-[#7D4D4D]/50 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-[#3D1D1D] 
                        transition duration-300 text-sm sm:text-base"
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    We'll connect with you directly on WhatsApp
                  </div>
                </div>
              )}
              {selectedQueryType === "Bulk Order Inquiry" && (
                <div>
                  <label 
                    htmlFor="bulkOrderDetails" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bulk Order Details
                  </label>
                  <textarea
                    id="bulkOrderDetails"
                    name="bulkOrderDetails"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3D1D1D] focus:ring-[#3D1D1D] sm:text-sm border border-[#7D4D4D]/50 p-2"
                    placeholder="Please provide details about your bulk order (e.g., quantity, product type, delivery requirements)"
                    value={formData.bulkOrderDetails}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#3D1D1D] mb-1 sm:mb-2">Your Message*</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 border border-[#7D4D4D]/50 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-[#3D1D1D] 
                    transition duration-300 resize-none text-sm sm:text-base"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#3D1D1D] text-[#F5F5F5] font-bold py-2 sm:py-3 rounded-lg 
                  hover:bg-[#2D1D1D] transition duration-300 
                  focus:outline-none focus:ring-2 focus:ring-[#5D2D2D] 
                  disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {submitting ? "Submitting..." : "SUBMIT INQUIRY"}
              </button>
            </form>

            {message && (
              <div className={`mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg text-center text-xs sm:text-sm ${message.includes("error") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Additional Support Section */}
        <div className="mt-6 sm:mt-12 bg-[#4E2828] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <div className="bg-[#3D1D1D] rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
              <FaShoppingCart className="text-[#F5F5F5] text-2xl sm:text-3xl" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-xl font-bold text-[#F5F5F5]">Track & Manage Purchases</h3>
              <p className="text-xs sm:text-sm text-[#D0D0D0]">Cancel, Return, or Exchange with Ease</p>
            </div>
          </div>
          <button 
            className="bg-[#3D1D1D] text-[#F5F5F5] font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg 
            hover:bg-[#2D1D1D] transition duration-300 
            focus:outline-none focus:ring-2 focus:ring-[#5D2D2D] 
            text-sm sm:text-base"
            onClick={() => router.push('/account/orders')}
          >
            MANAGE ORDERS
          </button>
        </div>
      </div>
      
      {/* Success Modal */}
      <Transition appear show={isSuccessModalOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-50" 
          onClose={closeSuccessModal}
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
            <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 mr-2 text-green-500" 
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
                    Inquiry Submitted Successfully
                  </Dialog.Title>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Your inquiry has been received. We'll get back to you soon.
                    </p>
                    
                    {submissionId && (
                      <div className="mt-3 bg-gray-100 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">
                          <strong>Submission ID:</strong> {submissionId}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          You can use this ID to track the status of your inquiry.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#3D1D1D] px-4 py-2 text-sm font-medium text-white hover:bg-[#2D1D1D] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={closeSuccessModal}
                    >
                      Close
                    </button>
                    
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ContactUs;