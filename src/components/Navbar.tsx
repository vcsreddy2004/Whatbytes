"use client";
import React, { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  // Navigate with search
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if(search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };
  // Enter key support
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <nav className="bg-[#0758A8] text-white shadow-md"> 
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div
          className="text-2xl md:text-3xl font-bold tracking-tight cursor-pointer"
          onClick={() => router.push("/")}
        >
          Logo
        </div>
        {/* Desktop Search */}
        <div className="relative hidden md:flex grow max-w-2xl mx-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-gray-200" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for products..."
            className="w-full py-2.5 pl-12 pr-4 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          {/* Optional search button */}
          <button
            onClick={handleSearch}
            className="ml-2 px-4 bg-white hover:cursor-pointer text-black rounded-lg"
          >
            Go
          </button>
        </div>
        {/* Cart */}
        <div className="hidden md:block">
          <Link href={"/cart"}>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#002A5A] hover:bg-[#001a35] hover:cursor-pointer rounded-xl font-medium">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </button>
          </Link>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="w-full py-2.5 pl-10 pr-4 bg-white/10 border border-white/20 rounded-lg text-white"
            />
          </div>
          <Link href={"/cart"}>
            <button className="flex items-center justify-center gap-3 w-full py-4 bg-[#002A5A] hover:cursor-pointer rounded-xl font-semibold">
              <ShoppingCart className="w-6 h-6" />
              <span>View Cart</span>
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;