"use client";

import { useEffect, useState } from "react";

// Define an interface for the userData
interface BillingInfo {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const DeliveryAddress = () => {
  const [userData, setUserData] = useState<BillingInfo | null>(null);

  useEffect(() => {
    // Safely access localStorage only on the client side
    const data = localStorage.getItem("billingInfo");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  if (!userData) {
    return null; // Render nothing if user data is not available
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Delivery Address
      </h2>
      <div className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="border-b pb-2">
          <span className="text-sm font-semibold text-gray-600">
            Street Address:
          </span>
          <span className="text-base text-gray-800 block">
            {userData.streetAddress || "Not available"}
          </span>
        </div>
        <div className="border-b pb-2">
          <span className="text-sm font-semibold text-gray-600">City:</span>
          <span className="text-base text-gray-800 block">
            {userData.city || "Not available"}
          </span>
        </div>
        <div className="border-b pb-2">
          <span className="text-sm font-semibold text-gray-600">State:</span>
          <span className="text-base text-gray-800 block">
            {userData.state || "Not available"}
          </span>
        </div>
        <div className="border-b pb-2">
          <span className="text-sm font-semibold text-gray-600">
            Postal Code:
          </span>
          <span className="text-base text-gray-800 block">
            {userData.postalCode || "Not available"}
          </span>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-600">Country:</span>
          <span className="text-base text-gray-800 block">
            {userData.country || "INDIA"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
