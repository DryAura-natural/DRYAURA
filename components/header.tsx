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
  CarFront,
  Search,
  Menu,
  X,
  UserCog,
  Truck,
  Home,
  Store,
  ShoppingCart,
  List,
  User,
} from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { NavbarAction } from "./navbar-action";
import OfferBanner from "./ui/OfferBanner";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState<string | null>(null);
  const { user } = useUser();

  const socialIcons = [
    { icon: Facebook, link: "#" },
    { icon: Linkedin, link: "#" },
    { icon: Youtube, link: "#" },
    { icon: Twitter, link: "#" },
  ];

  const navItems = [
    { label: "HOME", link: "/" },
    { label: "CATEGORIES", link: "/categories" },
    { label: "PRODUCTS", link: "/products" },
    { label: "GALLERY", link: "/gallery" },
    { label: "ABOUT US", link: "/about" },
    { label: "TESTIMONIALS", link: "/testimonials" },
    { label: "CONTACT US", link: "/contact" },
  ];

  const mobileBottomNavItems = [
    { icon: Home, label: "Home", link: "/" },
    { icon: Store, label: "Shop", link: "/shop" },
    { icon: ShoppingCart, label: "Cart", link: "/cart" },
    { icon: User, label: "Account", link: "/sign-in" },
  ];

  const handleNavItemClick = (label: string) => {
    setSelectedNavItem(label);
  };

  return (
    <header className="w-full bg-[#3D1D1D]">
      {/* Top Bar (Desktop) */}
      <div className="container mx-auto px-4 py-1 text-white text-sm hidden md:flex justify-between">
        <div className="flex items-center space-x-4 flex-wrap">
          {socialIcons.map(({ icon: Icon, link }, index) => (
            <Link key={index} href={link} className="hover:text-orange-300">
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
        <span className="mt-2 hover:scale-105">
          🎉 Free Delivery on All Orders! 🎉
        </span>
        <span className="mt-2 hover:scale-105">
          🔥 Use Code: SAVE40 to Get 40% Off! 🔥
        </span>
        <div className="flex items-center space-x-6 flex-wrap">
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
            <div className="flex items-center space-x -2">
              <span className="font-semibold text-white flex gap-x-2 border p-1.5 rounded-full">
                <UserCog size={20} />
                {user?.fullName}
              </span>
            </div>
          </SignedIn>
          <SignedOut>
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
      <hr className="opacity-10" />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 ">
        {/* Hamburger Menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-orange-300 transition-transform duration-300 ease-in-out transform hover:scale-110"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Brand Logo (Always Visible) */}
        <Link href="/" className="mx-auto">
          <Image
            src="https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67a9d0130039f0ca3918/view?project=67a96cd2001e32766970&mode=admin"
            width={150}
            height={150}
            alt="DRYAURA_LOGO"
            className="transition-opacity duration-300 hover:opacity-80"
            priority
          />
        </Link>

        {/* Right Side Icons (Search, User) */}
        <div className="flex items-center space-x-4">
          {/* Search Icon (Expands on Click) */}
          <button
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="text-white hover:text-orange-300 transition-transform duration-300 ease-in-out transform hover:scale-110"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>
          <Truck className="w-8 h-6" color="white" />

          {/* User Icon */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-white hover:text-orange-300 transition-transform duration-300 ease-in-out transform hover:scale-110"
            >
              <UserCog className="w-6 h-6" />
            </Link>
          </SignedOut>
        </div>
      </div>
      <OfferBanner className={"md:hidden"} />

      {/* Expanded Search Bar (Mobile) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isSearchExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-[#2D1515]">
          <div className="flex items-center bg-white rounded-lg p-2 shadow-lg">
            <Input
              label=""
              type="search"
              placeholder="Search..."
              className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 px-4 rounded-lg">
              <Search className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Side Navigation Menu (Mobile) */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 h-full bg-[#2D1515] shadow-lg">
          <div className="p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-orange-300 transition-transform duration-300 ease-in-out transform hover:scale-110"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <ul className="flex flex-col space-y-4 p-4 text-white ">
            {navItems.map(({ label, link }) => (
              <li key={label}>
                <Link
                  href={link}
                  className="hover :text-orange-300 block py-2 transition-colors duration-300 ease-in-out"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex space-x-5 justify-center absolute bottom-0 left-14 mb-10">
            {socialIcons.map(({ icon: Icon, link }, index) => (
              <Link
                key={index}
                href={link}
                className="hover:text-orange-300 hover:scale-150 transition-all "
              >
                <Icon className="w-5 h-5" color="white" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Cart Button for Mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <NavbarAction className="bg-[#3D1D1D] hover:bg-[#3D1D1D] p-4" />
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#3D1D1D] shadow-lg rounded-lg mb-1 hover:outline outline-orange-200 outline-1">
        <div className="flex justify-around items-center p-3">
          {mobileBottomNavItems.map(({ icon: Icon, label, link }, index) => (
            <Link
              key={index}
              href={link}
              onClick={() => handleNavItemClick(label)}
              className={`flex flex-col items-center text-white hover:text-orange-300 transition-colors duration-300 ease-in-out ${
                selectedNavItem === label
                  ? "text-orange-400 scale-110 rounded-full" // Add circle for active item
                  : "text-white"
              }`}
            >
              <Icon className="w-6 h-6" />

              <span className="text-xs">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content (Desktop) */}
      <div className="container mx-auto px-4 hidden md:flex flex-col md:flex-row items-center justify-between ">
        {/* Brand Logo (Desktop) */}
        <Link href="/" className="mr-8">
          <Image
            src="https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67a9d0130039f0ca3918/view?project=67a96cd2001e32766970&mode=admin"
            width={150}
            height={150}
            alt="DRYAURA_LOGO"
            className="transition-opacity duration-300 hover:opacity-80"
            priority
          />
        </Link>

        {/* Navigation Menu (Desktop) */}
        <nav className="flex-1">
          <ul className="flex space-x-6 text-white flex-wrap">
            {navItems.map(({ label, link }) => (
              <li key={label}>
                <Link
                  href={link}
                  className="hover:text-orange-300 block py-2 transition-colors duration-300 ease-in-out"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white rounded-lg p-1 shadow-lg justify-between">
            <Input
              label=""
              type="search"
              placeholder="Search..."
              className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="bg-orange-500 hover:bg-orange-600  rounded-lg">
              <Search className="w-4 h-4 text-white" />
            </Button>
          </div>

          {/* Account & Cart (Desktop) */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-white hover:text-orange-300 transition-colors duration-300 ease-in-out"
              >
                <UserCog className="w-6 h-6" />
              </Link>
            </SignedOut>
            <NavbarAction />
          </div>
        </div>
      </div>
    </header>
  );
}
