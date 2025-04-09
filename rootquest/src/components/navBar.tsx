"use client";

import React, { useEffect, useState } from "react";
import PictureProfil from "./pictureProfil";
import Link from "next/link";
import { MdOutlineLock, MdOutlineLogout, MdSettings, MdPerson } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post("/api/infoClient");
        if (response.data.username) {
          setUsername(response.data.username);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUsername(null);
      router.push('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="py-4 px-6 bg-gray-900 text-white flex items-center justify-between shadow-lg fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <Link href="/" className="text-2xl font-extrabold text-blue-400 cursor-pointer">
        RootQuest
      </Link>

      {/* Navigation */}
      <div className="flex space-x-6">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
        <div className="relative group">
          <button className="hover:text-blue-400 transition focus:outline-none">
            Challenges ▼
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
            <Link href="/solo" className="block px-4 py-2 text-white hover:bg-gray-700">Challenge Solo</Link>
            <Link href="/duo" className="block px-4 py-2 text-white hover:bg-gray-700">Challenge Duo</Link>
          </div>
        </div>
        <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
      </div>

      {/* Profil + Auth */}
      <div className="flex items-center space-x-6">
        {isAuthenticated ? (
          <>
            <div className="flex items-center space-x-4">
              <strong className="text-white text-lg">{username}</strong>
            </div>

            {/* Menu Profil + Déconnexion */}
            <div className="relative group">
              <button className="flex items-center space-x-2 hover:text-blue-400 transition focus:outline-none">
                <PictureProfil
                  imageUrl="https://www.portraitprofessionnel.fr/wp-content/uploads/2020/02/portrait-professionnel-corporate-4.jpg"
                  size={50}
                />
                <span className="hover:text-blue-400 text-white text-sm">▼</span>
              </button>

              {/* Menu déroulant */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 hover:text-blue-400 block px-4 py-2 text-white hover:bg-gray-700 rounded-t-lg transition-all duration-200"
                >
                  <MdPerson className="inline mr-2" /> Voir le Profil
                </Link>
                
                <button className="block px-4 py-2 w-full text-left text-white hover:bg-gray-700 hover:text-blue-400 rounded-b-lg transition-all duration-200">
                  <MdSettings className="inline mr-2 text-lg" /> Réglages
                </button>

                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 w-full text-left text-white hover:bg-red-600 hover:text-white rounded-b-lg transition-all duration-300 ease-in-out"
                >
                  <MdOutlineLogout className="inline mr-2" /> Déconnexion
                </button>
              </div>
            </div>
          </>
        ) : (
          <Link href="/login">
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <MdOutlineLock className="text-2xl text-white" />
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
