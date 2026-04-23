import React from 'react';
import Link from 'next/link';
// Using Font Awesome icons from the react-icons library
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#001b3d] text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Filters & Logo */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Filters</h3>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">All</span>
            <span className="text-2xl font-extrabold tracking-tighter uppercase italic">
              Ele<span className="text-blue-400">z</span>tronik
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-12">
            © 2024 American
          </p>
        </div>
        {/* Column 2: About Us */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">About Us</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Column 3: Follow Us */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Follow Us</h3>
          <div className="flex gap-4">
            <Link 
              href="#" 
              className="bg-[#003366] p-3 rounded-full hover:bg-blue-600 transition-all flex items-center justify-center"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </Link>
            <Link 
              href="#" 
              className="bg-[#003366] p-3 rounded-full hover:bg-blue-600 transition-all flex items-center justify-center"
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </Link>
            <Link 
              href="#" 
              className="bg-[#003366] p-3 rounded-full hover:bg-blue-600 transition-all flex items-center justify-center"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;