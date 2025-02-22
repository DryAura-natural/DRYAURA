"use client";

import { useEffect, useState } from "react";
import { useUser  } from "@clerk/nextjs";
import getCustomerData from "@/actions/getCustomerData";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/Button"; // Corrected import path
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomerForm from "@/components/BillingForm";

// Define an interface for the userData
export interface BillingInfo {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

const DeliveryAddress = () => {
  const { user, isLoaded } = useUser ();
  const [userData, setUserData] = useState<BillingInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchUserData = async () => {
      try {
        // Check localStorage for existing data
        const storedData = localStorage.getItem("customerData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          setLoading(false);
          return; // Exit if data is found in localStorage
        }

        // Fetch customer data using the getCustomerData function
        const data = await getCustomerData(user.id);
        setUserData({
          streetAddress: data.streetAddress,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          phone: data.phone,
          country: "INDIA", // Default to INDIA
        });

        // Store the fetched data in localStorage
        localStorage.setItem("customerData", JSON.stringify({
          streetAddress: data.streetAddress,
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
    <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-col gap-y-4">
            {/* User Name and Phone */}
            <div>
              <p className="text-lg font-semibold text-gray-800 animate-fadeIn">
                Deepak Choudhary
              </p>
              <p className="text-gray-600 animate-fadeIn">{userData.phone}</p>
            </div>

            {/* Address Details */}
            <div className="text-gray-600 space-y-2 animate-fadeIn">
              <p>{userData.streetAddress}</p>
              <p>
                {userData.city}, {userData.state} - {userData.postalCode}
              </p>
              <p>{userData.country}</p>
            </div>

            {/* Edit Button */}
            <Dialog>
              <div className="flex justify-end">
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-x-2 text-sm bg-white hover:bg-gray-50 border-gray-300 transition-transform transform hover:scale-105 active:scale-95"
                  >
                    <Edit size={16} className="text-gray-700" />
                    Edit Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-screen-sm overflow-y-auto max-h-[90vh] animate-slideIn">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold animate-fadeIn">
                      Edit Billing Information
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 animate-fadeIn">
                      Make changes to your Billing Information here. Click save
                      when you're done.
                    </DialogDescription>
                  </DialogHeader>

                  <CustomerForm onSuccess={() => {
                    // Update localStorage with the new data after successful submission
                    localStorage.setItem("customerData", JSON.stringify(userData));
                    // Optionally, you can re-fetch the data to ensure the UI is updated
                  }} />
                </DialogContent>
              </div>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryAddress;