// components/BillingForm.tsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { billingSchema, BillingInfo } from "@/utils/validation";
import Input from "@/components/ui/Input";
import { useUser } from "@clerk/nextjs";
import Button from "@/components/ui/Button";
import stateList from "@/public/data/index";
import toast from "react-hot-toast";

const statesList = stateList;

const BillingForm = () => {
  const { user, isLoaded } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BillingInfo>({
    resolver: zodResolver(billingSchema),
  });

  useEffect(() => {
    if (isLoaded && user) {
      if (user.fullName) setValue("name", user.fullName);
      if (user.emailAddresses.length > 0)
        setValue("email", user.emailAddresses[0].emailAddress);
      if (user.phoneNumbers.length > 0)
        setValue("contact", user.phoneNumbers[0].phoneNumber);
    }
  }, [isLoaded, user, setValue]);

  const onSubmits = (data: BillingInfo) => {
    console.log("Billing Information:", data);

    try {
      localStorage.setItem("billingInfo", JSON.stringify(data));
      console.log("Form data successfully stored in localStorage");
      toast.success("submit successfully")
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
    window.location.reload();
  };

  // Log form errors for debugging
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form Errors:", errors);
    }
  }, [errors]);

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

export default BillingForm;
