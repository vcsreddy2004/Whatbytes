"use client";

import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-[#0758A8] text-white shadow-md">
      {/* Main Container */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-bold tracking-tight">
          Logo
        </div>
        {/* Desktop Search Bar (Hidden on Mobile) */}
        <div className="relative hidden md:flex grow max-w-2xl mx-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-gray-200" />
          </div>
          <input
            type="text"
            className="w-full py-2.5 pl-12 pr-4 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="Search for products..."
          />
        </div>
        {/* Desktop Cart Button (Hidden on Mobile) */}
        <div className="hidden md:block">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#002A5A] hover:bg-[#001a35] hover:cursor-pointer rounded-xl font-medium transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </button>
        </div>
        {/* Mobile Menu Button (Visible only on Mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-white/10 hover:cursor-pointer transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-300" />
            <input
              type="text"
              className="w-full py-2.5 pl-10 pr-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 hover:cursor-pointer"
              placeholder="Search..."
            />
          </div>
          {/* Mobile Cart Button */}
          <button className="flex items-center justify-center gap-3 w-full py-4 bg-[#002A5A] hover:cursor-pointer rounded-xl font-semibold active:scale-95 transition-transform">
            <ShoppingCart className="w-6 h-6" />
            <span>View Cart</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;