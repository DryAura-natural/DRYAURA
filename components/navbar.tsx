"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MainNav } from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import { NavbarAction } from "./navbar-action";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { PackageSearch, Menu, X } from "lucide-react";

export const revalidate = 0;

export const Navbar = async () => {
  const categories = await getCategories();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">DRYAURA</p>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Main Navigation */}
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row lg:items-center absolute lg:static bg-white lg:bg-transparent w-full lg:w-auto left-0 top-16 lg:top-auto z-10 lg:z-auto space-y-4 lg:space-y-0 lg:space-x-6`}
          >
            <MainNav data={categories} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-x-4">
            <NavbarAction />

            {/* Desktop View */}
            <span className="hidden md:flex items-center gap-x-4">
              <SignedIn>
                <Link href="/dashboard">
                  <span className="font-semibold flex cursor-pointer hover:font-extrabold hover:text-green-900">
                    <PackageSearch color="green" /> Orders
                  </span>
                </Link>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </span>

            {/* Mobile View */}
            <span className="flex md:hidden items-center gap-x-1">
              <SignedIn>
                <Link href="/orders">
                  <span className="font-semibold flex cursor-pointer hover:font-extrabold hover:text-green-900 space-x-0">
                    <PackageSearch color="green" />
                  </span>
                </Link>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};
