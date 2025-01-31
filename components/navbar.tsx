import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MainNav } from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import { NavbarAction } from "./navbar-action";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { PackageSearch } from "lucide-react";
import getCurrentUser from "@/app/api/currentUser";

export const revalidate = 0;

export const Navbar = async () => {
  const categories = await getCategories();
  const user = await getCurrentUser(); // Ensure this is awaited

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">DRYAURA</p>
          </Link>
          <MainNav data={categories} />
          
          <div className="flex items-center gap-x-4">
            <NavbarAction />
            <span className="hidden md:flex items-center gap-x-4">
              <SignedIn>
                <Link href="/dashboard">
                  <span className="font-semibold flex cursor-pointer hover:font-extrabold hover:text-green-900">
                    <PackageSearch color="green" /> Orders
                  </span>
                </Link>
                <span className="font-semibold">Hello, {user?.fullName}</span> {/* Assuming `user.name` is available */}
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </span>

            {/* Mobile view for orders and user button */}
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
