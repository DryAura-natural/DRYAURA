// components/BillingForm.tsx
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
import getCustomerData from "@/actions/getCustomerData";
import { MapPin, Phone, Mail, User } from "lucide-react";

const CustomerForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { user, isLoaded } = useUser();
  const [existingUser, setExistingUser] = useState<BillingInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
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
          return;
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
      setValue("alternatePhone", userData.alternatePhone || "");
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
      alternatePhone: data.alternatePhone,
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: "India",
      landmark: data.landmark,
      town: data.town,
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

      // Trigger page refresh
      window.location.reload();

      onSuccess?.(); // Close the dialog on success
    } catch (error) {
      console.error("Error submitting user data:", error);
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 p-6 md:p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-fadeIn w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <User className="w-6 h-6 text-[#3D1D1D]" />
          Personal & Contact Details
        </h2>
        <p className="text-gray-500 mt-2">Please provide your accurate contact information</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              label="Full Name"
              id="name"
              icon={<User className="w-5 h-5 text-gray-400" />}
              {...register("name")}
              defaultValue={existingUser?.name || user?.fullName || ""}
              error={errors.name?.message}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Email Address"
              id="email"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              {...register("email")}
              defaultValue={existingUser?.email || user?.primaryEmailAddress?.emailAddress || ""}
              error={errors.email?.message}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Primary Contact"
              id="phone"
              icon={<Phone className="w-5 h-5 text-gray-400" />}
              {...register("phone")}
              defaultValue={existingUser?.phone || ""}
              error={errors.phone?.message}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Alternate Contact"
              id="alternatePhone"
              icon={<Phone className="w-5 h-5 text-gray-400" />}
              {...register("alternatePhone")}
              defaultValue={existingUser?.alternatePhone || ""}
              error={errors.alternatePhone?.message}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              label="Street Address"
              id="streetAddress"
              icon={<MapPin className="w-5 h-5 text-gray-400" />}
              {...register("streetAddress")}
              defaultValue={existingUser?.streetAddress || ""}
              error={errors.streetAddress?.message}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Input
              label="City/Town"
              id="city"
              icon={<MapPin className="w-5 h-5 text-gray-400" />}
              {...register("city")}
              defaultValue={existingUser?.city || ""}
              error={errors.city?.message}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Landmark"
              id="landmark"
              icon={<MapPin className="w-5 h-5 text-gray-400" />}
              {...register("landmark")}
              defaultValue={existingUser?.landmark || ""}
              error={errors.landmark?.message}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                label="Postal Code"
                id="postalCode"
                icon={<MapPin className="w-5 h-5 text-gray-400" />}
                {...register("postalCode")}
                defaultValue={existingUser?.postalCode || ""}
                error={errors.postalCode?.message}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <div className="relative">
                <select
                  id="state"
                  {...register("state")}
                  defaultValue={existingUser?.state || ""}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="">Select State</option>
                  {stateList.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full max-w-md bg-[#3D1D1D] hover:bg-[#2C1515] text-white font-semibold py-3 rounded-lg transition-colors duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#3D1D1D] focus:ring-offset-2"
        >
          <div className="flex items-center space-x-2">
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            )}
            <span>{isSubmitting ? "Saving Details..." : "Save Personal Information"}</span>
          </div>
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;