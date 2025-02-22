"use client";
import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
    orderNumber: "", // Added for order-related queries
    issueType: "", // Added for non-order-related issues
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedQueryType, setSelectedQueryType] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, queryType: selectedQueryType }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          message: "",
          orderNumber: "",
          issueType: "",
        });
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Failed to submit the form");
    } finally {
      setSubmitting(false);
    }
  };

  const handleQueryTypeClick = (queryType: any) => {
    setSelectedQueryType(queryType);
    console.log("Selected Query Type:", queryType);
  };

  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Left Section - Text Content */}
        <div className="text-center fade-in">
          <h1 className="text-4xl font-bold mb-4">We're Happy to Help!</h1>
          <p className="text-lg mb-2">
            Have any queries or feedback? We would be happy to assist you.
          </p>
          <p className="text-lg mb-8">
            10:00 AM - 7:00 PM (Monday to Saturday)
          </p>
        </div>

        {/* Right Section - Contact Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 ml-8 slide-in">
          {/* Email */}
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-red-700 mr-4" />
            <p>customercare@dryaura.in</p>
          </div>

          {/* Phone */}
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-red-700 mr-4" />
            <div>
              <p>Call: +91-8384086292</p>
              <p>Chat: +91-8384086292</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-red-700 mr-4" />
            <p>
              Pegasus Tower, Office No. 702, 7th Floor, Sector 68, Noida, Uttar
              Pradesh 201307
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl fade-in">
          {/* Left Section */}
          <div className="bg-gradient-to-b from-red-800 to-red-600 text-white p-8 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex flex-col justify-between slide-in">
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Query Type</h2>
              <hr className="border-gray-300 mb-4" />
              <button
                className="bg-white text-red-800 font-semibold py-2 px-4 rounded-lg mb-4 transition duration-300 hover:bg-red-100"
                onClick={() => handleQueryTypeClick("Order Related Queries")}
              >
                Order Related Queries
              </button>
              <p
                className="mb-4 transition duration-300 hover:text-red-300 cursor-pointer"
                onClick={() => handleQueryTypeClick("Non-Order Related Issues")}
              >
                Non-Order Related Issues
              </p>
              <p
                className="mb-4 transition duration-300 hover:text-red-300 cursor-pointer"
                onClick={() => handleQueryTypeClick("Other Issues")}
              >
                Other Issues
              </p>
              <hr className="border-gray-300 mb-4" />
              <p
                className="flex items-center justify-between transition duration-300 hover:text-red-300 cursor-pointer"
                onClick={() =>
                  handleQueryTypeClick("Frequently Asked Questions")
                }
              >
                Frequently Asked Questions
                <i className="fas fa-chevron-right"></i>
              </p>
            </div>
            <div className="flex space-x-4 mt-8">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin-in"></i>
              <i className="fab fa-pinterest-p"></i>
              <i className="fab fa-telegram-plane"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-8 flex-1 slide-in">
            <h2 className="text-2xl font-semibold mb-6">Contact Me</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name*
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name*
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number*
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email*
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Dynamic Fields Based on Query Type */}
              {selectedQueryType === "Order Related Queries" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Order Number*
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {selectedQueryType === "Non-Order Related Issues" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Issue Type*
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    type="text"
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Write Your Message*
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-red-600"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                className="bg-red-800 text-white font-semibold py-2 px-4 rounded-lg w-full md:w-auto transition duration-300 hover:bg-red-700"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "SUBMIT NOW"}
              </button>
            </form>

            {message && (
              <div className="mt-4 text-center text-red-600">
                {message}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center">
                <img
                  alt="Icon"
                  className="mr-4"
                  height="40"
                  src="https://placehold.co/40x40"
                  width="40"
                />
                <div>
                  <p className="font-semibold">
                    TRACK, CANCEL, RETURN/EXCHANGE
                  </p>
                  <p className="text-sm text-gray-600">Manage your purchases</p>
                </div>
              </div>
              <button className="bg-red-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-red-700">
                ENQUIRE NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;