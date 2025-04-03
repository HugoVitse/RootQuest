"use client";

import React, { useEffect, useState } from "react";
import PictureProfil from "./pictureProfil";
import Link from "next/link";
import { MdOutlineLock, MdOutlineLogout } from "react-icons/md"; // Icônes Connexion & Déconnexion
import axios from "axios";

const NavBar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect exécuté");
    // Vérifie l'authentification côté client en appelant l'API pour récupérer le cookie
    const fetchSessionData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/vpnClient", {}, {
          withCredentials: true, // On s'assure que les cookies sont envoyés avec la requête
        });
        console.log("heyyy");

         // Log de la réponse pour voir les données récupérées
         console.log("Réponse de /api/vpnClient : ", response.data); // Affiche la réponse complète de l'API
        
         // Log des cookies envoyés avec la requête
         console.log("Cookies envoyés : ", document.cookie); // Affiche les cookies du navigateur

        // Vérifie la réponse du backend et met à jour l'état
        if (response.data && response.data.username) {
          setUsername(response.data.username); // On récupère le pseudo depuis la réponse
          setIsAuthenticated(true); // Si le pseudo est présent, on considère l'utilisateur authentifié
        } else {
          setIsAuthenticated(false); // Sinon, utilisateur non authentifié
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de session", error);
        setIsAuthenticated(false); // En cas d'erreur, l'utilisateur n'est pas authentifié
      }
    };

    fetchSessionData(); // Appel à la fonction pour vérifier l'authentification
  }, []); // Ce code ne s'exécute qu'une seule fois lors du montage du composant

  const handleLogout = async () => {
    try {
      // Effectuer une requête de déconnexion pour supprimer le cookie côté serveur
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });

      // Mise à jour de l'état pour la déconnexion
      setIsAuthenticated(false);
      setUsername(null); // Réinitialisation du pseudo
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <nav className="py-4 px-6 bg-gray-900 text-white flex items-center justify-between shadow-lg fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <Link href="/" className="text-2xl font-extrabold text-blue-400 cursor-pointer">
        RootQuest
      </Link>

      {/* Navigation */}
      <div className="flex space-x-6 relative">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>

        {/* DROPDOWN Challenges */}
        <div className="relative group">
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

      {/* Profil + Auth */}
      <div className="flex items-center space-x-4">
        {/* Login / Logout */}
        {isAuthenticated ? (
          // 🚪 Icône Déconnexion si connecté
          <button 
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            onClick={handleLogout} // Déconnexion
          >
            <MdOutlineLogout className="text-2xl text-red-400" />
          </button>
        ) : (
          // 🔐 Icône Connexion si pas connecté
          <Link href="/login">
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <MdOutlineLock className="text-2xl text-white" />
            </button>
          </Link>
        )}

        {/* Avatar Profil (visible que si connecté) */}
        {isAuthenticated && username && (
          <div className="flex items-center">
            <span className="text-white mr-2">{username}</span> {/* Affiche le pseudo */}
            <Link href="/profile">
              <PictureProfil
                imageUrl="https://www.portraitprofessionnel.fr/wp-content/uploads/2020/02/portrait-professionnel-corporate-4.jpg"
                size={50}
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
