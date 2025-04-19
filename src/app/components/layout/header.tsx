"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Button from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCart } from "@/app/lib/actions";

// Clerk imports
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchCart() {
      const cart = await getCart();
      setCartItemCount(cart?.items.length || 0);
    }

    fetchCart();
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const categoryItems = [
    { name: "Rings", href: "/products?category=rings" },
    { name: "Necklaces", href: "/products?category=necklaces" },
    { name: "Earrings", href: "/products?category=earrings" },
    { name: "Bracelets", href: "/products?category=bracelets" },
    { name: "Bridal", href: "/products?category=bridal" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      {/* Top bar */}
      <div className="bg-[#443627] py-2 text-white text-center text-sm">
      Custom Jewelry Available - Order Yours Now!
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl tracking-wide">
            ROYAL ART JEWELLERS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.name === "Shop" ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-sm font-medium hover:text-[#443627] py-2">
                      Shop
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-white">
                    {categoryItems.map((category) => (
                      <DropdownMenuItem
                        key={category.name}
                        asChild
                        className="hover:bg-amber-50"
                      >
                        <Link href={category.href}>{category.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium py-2 border-b-2 ${
                    pathname === item.href
                      ? "border-[#443627] text-[#443627]"
                      : "border-transparent hover:text-[#443627] hover:border-[#2e241a]"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Icons (hide on small screens) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/search" className="text-gray-700 hover:text-[#443627]">
              <Search className="h-5 w-5" />
            </Link>

            <Link href="/wishlist" className="text-gray-700 hover:text-[#443627]">
              <Heart className="h-5 w-5" />
            </Link>

            <Link
              href="/cart"
              className="text-gray-700 hover:text-[#443627] relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#443627] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            <div className="text-gray-700 hover:text-[#443627]">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <User className="h-5 w-5 cursor-pointer" />
                </SignInButton>
              </SignedOut>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-[#443627]"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-serif text-xl">Menu</span>
            <button
              className="text-gray-700 hover:text-[#443627]"
              onClick={closeMenu}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sm font-medium hover:text-[#443627]"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t">
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full justify-start"
                  label="Wishlist Button"
                >
                  <Link href="/wishlist" onClick={closeMenu}>
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                </Button>

                <Button
                  asChild
                  className="w-full justify-start bg-[#443627] hover:bg-[#30261b]"
                  label="Cart Button"
                >
                  <Link href="/cart" onClick={closeMenu}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart ({cartItemCount})
                  </Link>
                </Button>

                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button label="Sign In" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
