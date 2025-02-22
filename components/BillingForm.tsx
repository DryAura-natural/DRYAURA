// components/CustomerForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, BillingInfo } from "@/utils/validation";
import Input from "@/components/ui/Input";
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

  const onSubmits = async (data: BillingInfo) => {
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
    <form
      onSubmit={handleSubmit(onSubmits)}
      className="space-y-6 p-6 bg-white rounded-lg shadow-lg animate-fadeIn"
    >
      <div className="space-y-4">
        {/* Name, Email, and Contact fields */}
        <Input
          label="Full Name"
          {...register("name")}
          defaultValue={existingUser?.name || user?.fullName || ""}
          error={errors.name?.message}
          className="w-full"
        />
        <Input
          label="Email"
          {...register("email")}
          defaultValue={existingUser?.email || user?.primaryEmailAddress?.emailAddress || ""}
          error={errors.email?.message}
          className="w-full"
        />
        <Input
          label="Contact"
          {...register("phone")}
          defaultValue={existingUser?.phone || ""}
          error={errors.phone?.message}
          className="w-full"
        />

        {/* Address Fields */}
        <Input
          label="Flat, House no., Building, Company, Apartment"
          {...register("streetAddress")}
          defaultValue={existingUser?.streetAddress || ""}
          error={errors.streetAddress?.message}
          className="w-full"
        />
        <Input
          label="Area, Street, Sector, Village"
          {...register("city")}
          defaultValue={existingUser?.city || ""}
          error={errors.city?.message}
          className="w-full"
        />
        <Input
          label="Landmark"
          {...register("landmark")}
          defaultValue={existingUser?.landmark || ""}
          error={errors.landmark?.message}
          className="w-full"
        />
        <Input
          label="Pincode"
          {...register("postalCode")}
          defaultValue={existingUser?.postalCode || ""}
          error={errors.postalCode?.message}
          className="w-full"
        />

        <div className="flex flex-col md:flex-row md:space-x-2">
          <Input
            label="Town/City"
            {...register("town")}
            defaultValue={existingUser?.town || ""}
            error={errors.town?.message}
            className="flex-1"
          />

          {/* State as a Select Dropdown */}
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              {...register("state")}
              defaultValue={existingUser?.state || ""}
              className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1.5"
            >
              <option value="">Select State</option>
              {statesList.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full mb-4">
        {existingUser ? "Update Details" : "Submit Details"}
      </Button>
    </form>
  );
};

export default CustomerForm;