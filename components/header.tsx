"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  Menu,
  X,
  UserCog,
  CarFront,
  Search,
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { NavbarAction } from "./navbar-action";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="w-full bg-[#3D1D1D]">
   
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-2 text-white text-sm hidden md:flex justify-between ">
        <div className="flex items-center space-x-4 ">
          {[Facebook, Linkedin, Youtube, Twitter].map((Icon, index) => (
            <Link key={index} href="#" className="hover:text-orange-300">
              <Icon className="w-4 h-4" />
            </Link>
          ))}
          <div className="flex gap-x-3">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91-7678208283</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>dryauranatural@gmail.in</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Malad West</span>
          </div>
          <Link
            href="#"
            className="hover:text-orange-300 flex items-center space-x-2"
          >
            <CarFront className="w-4 h-4" />
            <span>Track Order</span>
          </Link>
          <SignedIn>
            {/* Show user info and Sign Out link */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-white flex gap-x-2 border p-1.5 rounded-full">
                <UserCog size={20} />
                {user?.fullName}
              </span>
              {/* <SignInButton>
                    <Button className="hover:text-orange-300">Sign Out</Button>
                  </SignInButton> */}
            </div>
          </SignedIn>
          <SignedOut>
            {/* Show Sign In and Sign Up links */}
            <Link href="/sign-in" className="hover:text-orange-300">
              Log In
            </Link>
            <span>|</span>
            <Link href="/sign-up" className="hover:text-orange-300">
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between py-1  ">
        {/* Logo & Mobile Menu Button */}
        <div className="flex justify-between w-full md:w-auto items-center">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/djlopmpiz/image/upload/c_crop,w_1004,h_565,ar_16:9/v1737277094/Where_Nature_Meets_Luxury_DryAura_Naturals._1_euyuri.png"
              width={150}
              height={150}
              alt="DRYAURA_LOGO"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-orange-300"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full px-5 w-full ">
          <div className="flex w-full justify-center flex-1">
            <div className="flex-1">
              <Input
                label=""
                type="search"
                placeholder="Search..."
                className=" rounded-r-none w-full border focus-visible:ring-0 focus-visible:ring-offset-0" // Input should take full width inside flex container
              />
            </div>
            <Button className="w-auto rounded-l-none bg-orange-500 hover:bg-orange-600 px-4 py-5  mt-1  lg:py-2 ">
              <Search /> Search
            </Button>
          </div>
        </div>

           {/* mobile view */}
      <div className="flex justify-center">
      <div className="flex md:hidden justify-center space-x-4 bg-[#3D1D1D] py-2">
        {[Facebook, Linkedin, Youtube, Twitter].map((Icon, index) => (
          <Link
            key={index}
            href="#"
            className="text-white hover:text-orange-300"
          >
            <Icon className="w-5 h-5" />
          </Link>
        ))}
        <div>
        <Link
          href="#"
          className="hover:text-orange-300 flex items-center space-x-2"
        >
          <CarFront className="w-4 h-4 text-white" />
          <span className="text-white">Track Order</span>
        </Link>
        </div>
        
      </div>
      </div>
     

        {/* Account & Cart (Desktop) */}
        <div className="hidden md:flex items-center gap-x-2">
          <span className="flex items-center gap-x-2 text-white font-bold">
            Account <UserButton />
          </span>
          <Button
            variant="outline"
            className="text-black border-black hover:bg-orange-500 hover:text-white"
          >
            {<NavbarAction />}
            Cart
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav
        className={`bg-[#2D1515] ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block`}
      >
            
          {/* Mobile Account & Cart */}
          <div className="flex  items-center gap-y-4 md:hidden px-5 pt-2 justify-end ">
            <span className="flex items-center gap-x-2 text-white ">
               <UserButton />My Account
            </span>
          </div>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-6 py-4 text-white">
            {[
              "HOME",
              "CATEGORIES",
              "PRODUCTS",
              "GALLERY",
              "ABOUT US",
              "TESTIMONIALS",
              "CONTACT US",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-orange-300 block py-2 md:py-0"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </nav>

      {/* Floating Cart Button for Mobile */}
      <div className="md:hidden fixed bottom-4 right-4 z-30">
        <Button
          variant="outline"
          className="bg-orange-500 hover:bg-orange-600 text-white border-none rounded-full p-3 shadow-lg"
        >
          {/* <ShoppingCart className="h-6 w-6" /> */}
          {<NavbarAction />}
        </Button>
      </div>
    </header>
  );
}
