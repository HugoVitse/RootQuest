"use client";

import React, { useEffect, useState } from "react";
import PictureProfil from "./pictureProfil";
import Link from "next/link";
import axios from "axios";

const NavBar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>("/defaultAvatar.jpg");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post("/api/infoClient");
        const username = response.data?.username;

        if (username) {
          setUsername(username);

          const profilePicPath = `/uploads/${username}.jpg`;
          const exists = await checkIfFileExists(profilePicPath);
          if (exists) {
            setProfileImage(profilePicPath);
          } else {
            setProfileImage("/defaultAvatar.jpg");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };

    fetchUserData();
  }, []);

  const checkIfFileExists = async (filePath: string): Promise<boolean> => {
    try {
      const res = await fetch(filePath, { method: "HEAD" });
      return res.ok;
    } catch (err) {
      return false;
    }
  };

  return (
    <nav className="py-4 px-0 flex items-center justify-end">
      <div className="flex items-center justify-between px-5 w-full">
        <h1 className="text-2xl font-bold">{username}</h1>
        <div className="flex items-center">
          <Link href="/" className="mx-2">Home</Link>
          <button className="mx-2">Challenges</button>
          <button className="mx-2">Contact</button>
        </div>
      </div>
      <div className="flex items-center justify-end px-5">
        <PictureProfil imageUrl={profileImage} size={50} />
      </div>
    </nav>
  );
};

export default NavBar;