"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, BillingInfo } from "@/utils/validation";
import Input from "@/components/ui/Input";
import { useUser } from "@clerk/nextjs";
import Button from "@/components/ui/Button";
import stateList from "@/public/data/index";
import toast from "react-hot-toast";

const statesList = stateList;

const CustomerForm = () => {
  const { user, isLoaded } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BillingInfo>({
    resolver: zodResolver(customerSchema),
  });

  // Pre-fill form fields with Clerk user data
  useEffect(() => {
    if (isLoaded && user) {
      setValue("name", user.fullName || "");
      setValue("email", user.emailAddresses?.[0]?.emailAddress || "");
      setValue("contact", user.phoneNumbers?.[0]?.phoneNumber || "");
    }
  }, [isLoaded, user, setValue]);

  // Handle form submission
  const onSubmits = async (data: BillingInfo) => {
    console.log("User Data:", data);

    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    // Structure the data properly
    const userData = {
      userId: user.id, // Clerk user ID
      firstName: user.firstName,
      lastName:user.lastName, // Ensure lastName is not missing
      email: data.email,
      phone: data.contact,
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: "India", // Ensure country is not missing
    };

    try {
      // Send data to the backend API route
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit user data");
      }

      const result = await response.json();
      console.log("Server Response:", result);

      // Save data in localStorage (optional)
      localStorage.setItem("userData", JSON.stringify(userData));

      toast.success("User data submitted successfully!");
    } catch (error) {
      console.error("Error submitting user data:", error);
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmits)} className="space-y-6">
      <div className="space-y-4">
        {/* Name, Email, and Contact fields */}
        <Input
          label="Full Name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Contact"
          {...register("contact")}
          error={errors.contact?.message}
        />

        {/* Updated address fields */}
        <Input
          label="Flat, House no., Building, Company, Apartment"
          {...register("streetAddress")}
          error={errors.streetAddress?.message}
        />
        <Input
          label="Area, Street, Sector, Village"
          {...register("city")}
          error={errors.city?.message}
        />
        <Input
          label="Landmark"
          {...register("landmark")}
          error={errors.landmark?.message}
        />
        <Input
          label="Pincode"
          {...register("postalCode")}
          error={errors.postalCode?.message}
        />
        <div className="flex space-x-2">
          <Input
            label="Town/City"
            {...register("town")}
            error={errors.town?.message}
          />

          {/* State as a Select Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              {...register("state")}
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

      <Button type="submit" className="w-full mb-20">
        Submit details
      </Button>
    </form>
  );
};

export default CustomerForm;