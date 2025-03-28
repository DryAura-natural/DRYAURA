"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import getCustomerData from "@/actions/getCustomerData";
import BillingDialog from "@/components/BillingDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { BillingInfo } from "@/utils/validation";
import { MapPin, Edit, Phone, AlertTriangle } from "lucide-react";

const DeliveryAddress = () => {
  const { user, isLoaded } = useUser();
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
          const parsedData: BillingInfo = JSON.parse(storedData);
          setUserData(parsedData);
          setLoading(false);
          return;
        }

        const data = await getCustomerData(user.id);
        const customerData: BillingInfo = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          alternatePhone: data.alternatePhone,
          streetAddress: data.streetAddress,
          city: data.city,
          state: data.state,
          landmark: data.landmark,
          postalCode: data.postalCode,
          country: data.country || "India",
          town: data.town,
        };

        setUserData(customerData);
        localStorage.setItem("customerData", JSON.stringify(customerData));
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
      <div className="flex justify-center items-center h-full py-8">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-[#3D1D1D]/20 rounded-full"></div>
          <div className="h-4 bg-[#3D1D1D]/10 rounded w-48"></div>
        </div>
      </div>
    );
  
  if (error)
    return (
      <div className="flex flex-col items-center justify-center py-8 bg-red-50 rounded-lg">
        <div className="text-center">
          <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
          <p className="text-red-400 mt-2">Unable to load delivery address</p>
        </div>
      </div>
    );
  
  if (!userData) return null;

  return (
    <div className="relative space-y-6 bg-white border-2 border-[#3D1D1D]/10 rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#3D1D1D]/5 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#3D1D1D]/5 rounded-full translate-x-1/2 translate-y-1/2 z-0"></div>

      <div className="relative z-10 flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#3D1D1D]/10 rounded-full">
            <MapPin className="w-4 h-4 lg:w-6 lg:h-6 text-[#3D1D1D]" />
          </div>
          <h5 className="text-lg font-bold text-[#3D1D1D] tracking-tight">
            Delivery Address
          </h5>
        </div>
        <BillingDialog
          title="Edit Address"
          subtitle="Edit your delivery address"
          triggerLabel="Edit Address"
          onSuccess={() => setIsOpen(false)}
         
        />
      </div>

      <div className="relative z-10 space-y-4 bg-[#3D1D1D]/5 p-8 rounded-2xl">
        <div className="space-y-2 text-[#3D1D1D]/80">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 mt-1 text-[#3D1D1D]" />
            <div>
              <p className="text-base font-medium">{userData.streetAddress}</p>
              <p className="text-sm text-[#3D1D1D]/70">
                {userData.city}, {userData.state} - {userData.postalCode}
              </p>
              <p className="text-sm text-[#3D1D1D]/70">{userData.country}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 pt-2 border-t border-[#3D1D1D]/10">
            <Phone className="w-5 h-5 text-[#3D1D1D]" />
            <div>
              <p className="text-base font-medium text-[#3D1D1D]">
                Primary Phone: {userData.phone}
              </p>
              {userData.alternatePhone && (
                <p className="text-sm text-[#3D1D1D]/70">
                  Alternate Phone: {userData.alternatePhone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;