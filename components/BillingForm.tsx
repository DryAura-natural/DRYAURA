// components/BillingForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, BillingInfo } from "@/utils/validation";
import  Input  from "@/components/ui/Input";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/Button";
import stateList from "@/public/data/index";
import toast from "react-hot-toast";
import getCustomerData from "@/actions/getCustomerData"; // Import the function

const statesList = stateList;

interface CustomerFormProps {
  onSuccess?: () => void;
}

const CustomerForm = ({ onSuccess }: CustomerFormProps) => {
  const { user, isLoaded } = useUser();
  const [existingUser, setExistingUser] = useState<BillingInfo | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BillingInfo>({
    resolver: zodResolver(customerSchema),
  });

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchUserData = async () => {
      try {
        // Check localStorage for existing data
        const storedData = localStorage.getItem("customerData");
        if (storedData) {
          const userData = JSON.parse(storedData);
          setExistingUser(userData);
          setFormValues(userData);
          return; // Exit if data is found in localStorage
        }

        // Fetch customer data using the getCustomerData function
        const userData = await getCustomerData(user.id);
        setExistingUser(userData);

        // Store the fetched data in localStorage
        localStorage.setItem("customerData", JSON.stringify(userData));

        // Set default values for the form fields
        setFormValues(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const setFormValues = (userData: BillingInfo) => {
      setValue("name", userData.name || user?.fullName || "");
      setValue("email", userData.email || user?.primaryEmailAddress?.emailAddress || "");
      setValue("phone", userData.phone || "");
      setValue("streetAddress", userData.streetAddress || "");
      setValue("city", userData.city || "");
      setValue("landmark", userData.landmark || "");
      setValue("postalCode", userData.postalCode || "");
      setValue("town", userData.town || "");
      setValue("state", userData.state || "");
    };

    fetchUserData();
  }, [isLoaded, user, setValue]);

  const onSubmit = async (data: BillingInfo) => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    const userData = {
      userId: user.id,
      name: data.name || user.fullName,
      email: data.email,
      phone: data.phone,
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: "India",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/customer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message || "Failed to submit user data");
      }

      const result = await response.json();
      toast.success(result.message);

      // Update localStorage with the new data
      localStorage.setItem("customerData", JSON.stringify(userData));

      onSuccess?.(); // Close the dialog on success
    } catch (error) {
      console.error("Error submitting user data:", error);
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 md:p-6 bg-white rounded-lg shadow-lg animate-fadeIn w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
          <Input
            id="name"
            {...register("name")}
            defaultValue={existingUser?.name || user?.fullName || ""}
            error={errors.name?.message}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <Input
            id="email"
            {...register("email")}
            defaultValue={existingUser?.email || user?.primaryEmailAddress?.emailAddress || ""}
            error={errors.email?.message}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Contact</label>
          <Input
            id="phone"
            {...register("phone")}
            defaultValue={existingUser?.phone || ""}
            error={errors.phone?.message}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="streetAddress" className="text-sm font-medium text-gray-700">Street Address</label>
          <Input
            id="streetAddress"
            {...register("streetAddress")}
            defaultValue={existingUser?.streetAddress || ""}
            error={errors.streetAddress?.message}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
          <Input
            id="city"
            {...register("city")}
            defaultValue={existingUser?.city || ""}
            error={errors.city?.message}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="landmark" className="text-sm font-medium text-gray-700">Landmark</label>
          <Input
            id="landmark"
            {...register("landmark")}
            defaultValue={existingUser?.landmark || ""}
            error={errors.landmark?.message}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Postal Code</label>
          <Input
            id="postalCode"
            {...register("postalCode")}
            defaultValue={existingUser?.postalCode || ""}
            error={errors.postalCode?.message}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="town" className="text-sm font-medium text-gray-700">Town/City</label>
          <Input
            id="town"
            {...register("town")}
            defaultValue={existingUser?.town || ""}
            error={errors.town?.message}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium text-gray-700">State</label>
          <select
            id="state"
            {...register("state")}
            defaultValue={existingUser?.state || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select State</option>
            {statesList.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button type="submit" className="w-full bg-[#2D1515] py-2 rounded-md shadow-md transition-all hover:bg-[#3D1D1D] text-white">
        {existingUser ? "Update Details" : "Submit Details"}
      </Button>
    </form>
  );
};

export default CustomerForm;