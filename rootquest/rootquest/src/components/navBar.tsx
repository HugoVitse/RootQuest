"use client";

import React, { useState } from "react";
import PictureProfil from "./pictureProfil";
import Link from "next/link";

const NavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="py-4 px-6 bg-gray-900 text-white flex items-center justify-between shadow-lg fixed top-0 left-0 w-full z-50">
      
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-extrabold text-blue-400 cursor-pointer">RootQuest</h1>
      </Link>

      {/* Navigation */}
      <div className="flex space-x-6 relative">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>

        {/* DROPDOWN Challenges */}
        <div 
          className="relative group"
        >
          <button className="hover:text-blue-400 transition focus:outline-none">
            Challenges ▼
          </button>

          {/* Menu déroulant visible uniquement au hover */}
          <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
            <Link href="/solo" className="block px-4 py-2 text-white hover:bg-gray-700">Challenge Solo</Link>
            <Link href="/duo" className="block px-4 py-2 text-white hover:bg-gray-700">Challenge Duo</Link>
          </div>
        </div>

        <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
      </div>

      {/* Profil */}
      <Link href="/profile">
        <PictureProfil
          imageUrl="https://www.portraitprofessionnel.fr/wp-content/uploads/2020/02/portrait-professionnel-corporate-4.jpg"
          size={50}
        />
      </Link>
    </nav>
  );
};

export default NavBar;
