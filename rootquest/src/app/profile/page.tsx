"use client";

import React, { useEffect, useState } from "react";
import PictureProfil from "@/components/pictureProfil";  // Assure-toi que ce composant existe
import { MdOutlineLock, MdOutlineLogout } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navBar";


const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null); // Stocke les données utilisateur
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post("/api/infoClient"); // API pour récupérer les infos de l'utilisateur
        if (response.data.username) {
          setUser(response.data); // Stocker les infos dans le state
        } else {
          setUser(null); // Si pas de user, rien à afficher
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        setUser(null); // Gestion d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <div>Utilisateur non authentifié</div>; // Afficher un message si l'utilisateur n'est pas authentifié
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white font-sans">
     <NavBar />

      <div className="pt-24 px-6 max-w-4xl mx-auto">
        {/* HEADER PROFIL */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-700">
          <PictureProfil
            imageUrl={user.imageUrl || "https://www.portraitprofessionnel.fr/wp-content/uploads/2020/02/portrait-professionnel-corporate-4.jpg"}
            size={100}
          />
          <h1 className="text-3xl font-bold mt-4">{user.name} (@{user.username})</h1>
          <p className="text-blue-400 text-lg font-medium">"Description{user.rank}"</p>
        </div>

        {/* STATISTIQUES */}
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

        {/* BADGES */}
        {/* <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Achievements</h2>
          <div className="flex flex-wrap gap-4">
            {user.badges.map((badge: string, index: number) => (
              <span key={index} className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white">
                {badge}
              </span>
            ))}
          </div>
        </div> */}

        {/* MINI-TERMINAL
        <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Recent Challenges</h2>
          <div className="text-sm font-mono text-blue-300 bg-black p-4 rounded-lg">
            {user.recentChallenges.map((challenge: { title: string; difficulty: string }, index: number) => (
              <p key={index} className="mb-1">
                <span className="text-green-400">[✔]</span> {challenge.title} - 
                <span className={challenge.difficulty === "Easy" ? "text-green-300" : challenge.difficulty === "Medium" ? "text-yellow-300" : "text-red-300"}>
                  {challenge.difficulty}
                </span>
              </p>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
