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
  Home,
  Store,
  ShoppingCart,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  User,
  ArrowBigRight,
  ShoppingBag,
  ListOrdered,
  Settings,
  Instagram,
} from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { NavbarAction } from "./navbar-action";
import OfferBanner from "./ui/OfferBanner";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TrackOrderDialog from './orders/TrackOrder';
import { FaWhatsapp } from "react-icons/fa";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState<string | null>(null);
  const { user } = useUser();

  const socialIcons = [
    { icon: Instagram, link: "https://instagram/dryaura" },
    { icon: Facebook, link: "https://facebook/dryaura" },
    { icon: FaWhatsapp, link: "https://whatsapp/dryaura" },
    { icon: Youtube, link: "https://www.youtube.com/@dryaura" },
    { icon: Twitter, link: "https://twitter.com/dryaura" },
  ];

  const navItems = [
    // { label: " Holi Fiest", link: "/holi-fiest", icon: "🎉" },
    { label: "Shop Now", link: "/all", icon: "🛒" },
    { label: "Jumbo Nuts", link: "/jumbo-nuts", icon: "🥜" },
    { label: "Healthy Snacking", link: "/healthy-snacking", icon: "🍎" },
    { label: "New Launch", link: "/new-launch", icon: "🚀" },
    { label: "Gifting", link: "/gifting", icon: "🎁" },
    { label: "Bulk Orders", link: "/contact-us", icon: "📦" },
    { label: "Contact Us", link: "/contact-us", icon: "📞" },
  ];

  const mobileBottomNavItems = [
    { 
      icon: Home, 
      label: "Home", 
      link: "/", 
      prefetch: true 
    },
    { 
      icon: Store, 
      label: "Shop", 
      link: "/collections/all", 
      prefetch: true 
    },
    { 
      icon: ShoppingCart, 
      label: "Cart", 
      link: "/cart", 
      prefetch: true 
    },
    {
      icon: SignedIn ? UserCog : User,
      label: SignedIn ? "Account" : "Sign In",
      link: SignedIn ? "/account" : "/sign-in",
      prefetch: true
    },
  ];

  const handleNavItemClick = (label: string) => {
    setSelectedNavItem(label);
  };

  return (
    <header className="w-full ">
      {/* Top Bar (Desktop) */}
      <div className=" bg-black   px-4 py-0 text-white text-sm hidden md:flex justify-between">
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
            <span>Jammu and Kashmir</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Link
                href="/account/orders"
                className="hover:text-orange-300 flex items-center space-x-2"
              >
                <CarFront className="w-4 h-4" />
                <span>Track Order</span>
              </Link>
            </DialogTrigger>
            <DialogContent>
              <TrackOrderDialog />
            </DialogContent>
          </Dialog>
          <SignedIn>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-white flex gap-x-2 border p-1 rounded-full">
                <UserCog size={20} />
                {user?.fullName}
              </span>
            </div>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="hover:text-orange-300 text-white">
              Log In
            </Link>
            <span>|</span>
            <Link href="/sign-up" className="hover:text-orange-300 text-white">
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
      <hr className="opacity-10" />

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 ">
        {/* Hamburger Menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-black hover:text-orange-300 transition-transform duration-300 ease-in-out transform hover:scale-110"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 self-end" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Brand Logo (Always Visible) */}
        <Link href="/" className="mx-auto">
          <Image
            src="https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67bdcdab001289b11b75/view?project=67a96cd2001e32766970&mode=admin"
            width={100}
            height={100}
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
            className="text-black hover:text-orange-300 transition-transform duration-300 ease-in-out transform hover:scale-110"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>

          <NavbarAction className="p-0 bg-black/80 rounded-lg text-white border border-black/20" />
          {/* User Icon */}
        </div>
      </div>
      <OfferBanner className={"md:hidden"} />

      {/* Expanded Search Bar (Mobile) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isSearchExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-white">
          <div className="flex items-center bg-white rounded-lg p-2 shadow-lg">
            <Input
              label=""
              type="search"
              placeholder="Search..."
              className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="  px-4 rounded-lg">
              <Search className="w-4 h-4 text-black" />
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
        <div className="w-64 h-full bg-white shadow-lg">
          <div className="p-4 flex justify-between">
          <SignedIn>
              <Link
                href="/account"
                className="text-black  border border-black/20 rounded-full hover:text-orange-300 transition-all flex px-2 items-center  justify-center  py-0.5"
              >
                Account{" "}
                <User
                  className="w-5 h-5 border p-1 rounded-full"
                  color="black"
                />
              </Link>
            </SignedIn>
           
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black hover:text-orange-300 transition-transform duration-300 ease-in-out transform hover:scale-110 ml-auto"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
         
          </div>
          <div className="space-x-1 flex items-center justify-center">
         
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-black hover:text-orange-300 transition-all border border-black/20 px-4 py-1 rounded-full"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="text-black hover:text-orange-300 transition-all border border-black/20 px-4 py-1 rounded-full flex items-center"
              >
                Sign Up <ArrowBigRight className="w-5 h-5" color="black" />
              </Link>
            </SignedOut>
          </div>
          <ul className="flex flex-col space-y-4 p-4 text-black ">
            {navItems.map(({ label, link, icon }) => (
              <li key={label} className="flex items-center space-x-2">
                <Link
                  href={`collections${link}`}
                  className="hover:text-orange-300 block py-2 transition-colors duration-300 ease-in-out"
                >
                  {icon}
                  {label}
                </Link>
              </li>
            ))}
          </ul>
         
       
         
        
          <div className="flex space-x-2 justify-center items-center absolute bottom-0 mb-10 bg-black text-white rounded-xl p-2 ml-2">
            Follows Us:{""}{" "}
            {socialIcons.map(({ icon: Icon, link }, index) => (
              <Link
                key={index}
                href={link}
                className="hover:text-orange-300 hover:scale-150 transition-all "
              >
                <Icon
                  className="w-5 h-5 border p-1 rounded-full border-white ml-2"
                  color="white"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
   

      {/* Floating Cart Button for Mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-50 p-0">
        <NavbarAction className=" bg-black/100 rounded-lg text-white border border-black/20" />
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black shadow-lg rounded-lg  hover:outline outline-orange-200 outline-1 mt-5">
        <div className="flex justify-around items-center p-4 ">
          {mobileBottomNavItems.map(({ icon: Icon, label, link }, index) => (
            <Link
              key={index}
              href={link}
              onClick={() => handleNavItemClick(label)}
              className={`flex flex-col items-center text-white hover:text-orange-300 transition-colors duration-300 ease-in-out ${
                selectedNavItem === label
                  ? "text-orange-800 scale-110 rounded-full relative "
                  : "text-black"
              }`}
            >
              <Icon className="w-6 h-6" color="white" />
              {selectedNavItem === label && (
                <div className="absolute -top-3 p-2  border-2     border-orange-300 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white  font-bold text-white text-xs">
                  {" "}
                  &#9679;{" "}
                </div>
              )}
              <span className="text-xs">{label}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* Main Content (Desktop) */}
      <div className="container mx-auto px-16 hidden   lg:flex flex-col lg:flex-row items-center justify-between ">
        {/* Brand Logo (Desktop) */}
        <Link href="/" className="mr-8">
          <Image
            src="https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67bdcdab001289b11b75/view?project=67a96cd2001e32766970&mode=admin"
            width={100}
            height={100}
            alt="DRYAURA_LOGO"
            className="transition-opacity duration-300 hover:opacity-80"
            priority
          />
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white rounded-lg p-1 shadow-lg justify-between border">
            <Input
              label=""
              type="search"
              placeholder="Search..."
              className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className=" bg-white rounded-lg border border-black hover:border-orange-300 hover:bg-black/10">
              <Search className="w-4 h-4 text-black " />
            </Button>
          </div>

          {/* Account & Cart (Desktop) */}
         <div className="flex items-center space-x-4">
  <SignedIn>
    <NavigationMenu 
      className="flex items-center bg-white rounded-lg shadow-lg 
                 md:flex-row md:space-x-4 md:space-y-0  
                 w-full md:w-auto p-2"
    >
      <NavigationMenuList 
        className="flex flex-col md:flex-row w-full md:w-auto border rounded-md"
      >
        <NavigationMenuItem 
          className="flex items-center w-full"
        >
          <NavigationMenuTrigger 
            className="text-black hover:text-orange-500 
                      transition-colors duration-300 ease-in-out 
                      flex items-center p-2 w-full md:w-auto"
          >
            <User className="w-6 h-6 mr-2" />
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className="flex flex-col space-y-2 bg-white 
                      rounded-lg shadow-lg p-1 w-full 
                      max-w-sm md:w-[200px]"
          >
            <Link
              href="/account/orders"
              className="text-black hover:text-orange-500 
                        transition-colors duration-300 ease-in-out 
                        p-2 rounded-md hover:bg-orange-50  
                         items-center space-x-2 flex justify-center  gap-x-2"
            >
              <ListOrdered name="Package" className="w-6 h-6 mr-2" />
              View Your Order History
            </Link>
            <Link
              href="/account"
              className="text-black hover:text-orange-500 
                        transition-colors duration-300 ease-in-out 
                        p-2 rounded-md hover:bg-orange-50  
                         items-center space-x-2 flex justify-center  gap-x-2"
            >
              <Settings name="User" className="w-6 h-6 mr-2" />
              Manage Your Profile &amp; Settings
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </SignedIn>
  
  <SignedOut>
    <Link
      href="/sign-in"
      className="text-black hover:text-orange-300 
                transition-colors duration-300 ease-in-out 
                p-2 rounded-md hover:bg-orange-50"
    >
      <UserCog className="w-6 h-6" />
    </Link>
  </SignedOut>
  
  <NavbarAction className="bg-black/100 rounded-xl shadow-lg hover:bg-black/80 text-white"/>
 
</div>
        </div>
      </div>
      {/* Navigation Menu (Desktop) */}
      <div className="hidden lg:block">
        <ul className="flex items-center space-x-6 text-white bg-black flex-wrap justify-center p-2">
          {navItems.map(({ label, link, icon }) => (
            <li key={label}>
              <Link
                href={`collections/${link}`}
                className="flex items-center gap-2 justify-center hover:text-orange-300 transition-colors duration-300 ease-in-out hover:bg-white px-2  py-0.5 rounded-full"
              >
                {icon} {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
