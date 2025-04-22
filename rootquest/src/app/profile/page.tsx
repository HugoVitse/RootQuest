"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navBar";
import { Pencil } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post("/api/infoClient");
        if (response.data.username) {
          setUser(response.data);
          setPreviewImage(response.data.profilePicture);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageClick = () => {
    inputFileRef.current?.click();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const res = await axios.post("/api/uploadProfilePic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.imageUrl) {
        setPreviewImage(res.data.imageUrl); // met à jour avec l'URL retournée
      } else {
        const localUrl = URL.createObjectURL(file);
        setPreviewImage(localUrl); // fallback local si pas d'URL
      }
    } catch (err) {
      console.error("Erreur d'upload :", err);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Utilisateur non authentifié</div>;

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white font-sans">
      <NavBar />

      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-700">
          {/* Avatar avec survol */}
          <div className="relative group cursor-pointer" style={{ width: 100, height: 100 }} onClick={handleImageClick}>
            <img
              src={previewImage || "https://www.portraitprofessionnel.fr/wp-content/uploads/2020/02/portrait-professionnel-corporate-4.jpg"}
              alt="Photo de profil"
              className="w-full h-full object-cover rounded-full transition duration-300 group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <div className="bg-white bg-opacity-80 p-2 rounded-full shadow">
                <Pencil className="w-5 h-5 text-gray-800" />
              </div>
            </div>
            <input
              type="file"
              ref={inputFileRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <h1 className="text-3xl font-bold mt-4">{user.name} (@{user.username})</h1>
          <p className="text-blue-400 text-lg font-medium">"Description{user.rank}"</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-gray-800 rounded-lg text-center border border-gray-700">
            <p className="text-lg font-semibold">Challenges</p>
            <p className="text-2xl font-bold text-blue-400">0 {user.challengesCompleted}</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center border border-gray-700">
            <p className="text-lg font-semibold">Score</p>
            <p className="text-2xl font-bold text-blue-400">{user.score}1600 Pts</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center border border-gray-700">
            <p className="text-lg font-semibold">Rank</p>
            <p className="text-2xl font-bold text-blue-400">1230 {user.rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
