"use client";

import { useEffect, useState } from "react";
import { useUser  } from "@clerk/nextjs";
import getCustomerData from "@/actions/getCustomerData";
import BillingDialog from "@/components/BillingDialog";
import { Card, CardContent } from "@/components/ui/card";

// Define an interface for the userData
export interface BillingInfo {
  streetAddress: string;
  city: string;
  state: string;
  landMark: string;
  postalCode: string;
  country: string;
  phone: string;
}

const DeliveryAddress = () => {
  const { user, isLoaded } = useUser ();
  const [userData, setUserData] = useState<BillingInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchUserData = async () => {
      try {
        const storedData = localStorage.getItem("customerData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          setLoading(false);
          return;
        }

        const data = await getCustomerData(user.id);
        setUserData({
          streetAddress: data.streetAddress,
          city: data.city,
          state: data.state,
          landMark: data.landmark,
          postalCode: data.postalCode,
          phone: data.phone,
          country: "INDIA",
        });

        localStorage.setItem("customerData", JSON.stringify({
          streetAddress: data.streetAddress,
          landMark: data.landmark,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          phone: data.phone,
          country: "INDIA",
        }));
      } catch (error) {
        console.error("No billing information", error);
        setError("No billing information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoaded, user]);

  if (loading)
    return (
      <p className="text-gray-600 text-center py-4 animate-pulse">
        Loading userData...
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center py-4 animate-shake">Error: {error}</p>
    );

  if (!userData) return null;

  return (
    <div className="space-y-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 px-6 py-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-semibold text-gray-800">Delivery Address</h5>
        <BillingDialog
          title="Edit Address"
          subtitle="Edit your delivery address"
          triggerLabel="Edit Address"
          onSuccess={() => setIsOpen(false)}
          
        />
      </div>
      <div className="space-y-2.5 text-gray-700">
        <p className="text-base">{userData.streetAddress}</p>
        <p className="text-base">{userData.city}, {userData.state} - {userData.postalCode}</p>
        <p className="text-base">{userData.country}</p>
        <p className="text-base font-medium">Phone: {userData.phone}</p>
      </div>
    </div>
  );
};

export default DeliveryAddress;