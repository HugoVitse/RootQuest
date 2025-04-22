// ProfilePage.tsx

"use client";

import NavBar from "@/components/navBar";
import UploadProfilePicture from "@/components/UploadProfilePicture";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post("/api/infoClient");
        if (response.data.username) {
          setUser(response.data);
          // Vérification si la photo au format pseudo.jpg existe
          const profilePic = `/uploads/${response.data.username}.jpg`;
          const profilePicExists = await checkIfFileExists(profilePic);

          if (profilePicExists) {
            setPreviewImage(profilePic); // Si l'image existe, on la met
          } else {
            setPreviewImage(null); // Sinon, on affiche l'image par défaut
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fonction pour vérifier si le fichier existe
  const checkIfFileExists = async (filePath: string): Promise<boolean> => {
    try {
      const response = await fetch(filePath, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'existence du fichier:",
        error
      );
      return false;
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
          <div
            className="relative group cursor-pointer"
            style={{ width: 100, height: 100 }}
            onClick={() => setShowModal(true)}
          >
            <img
              src={
                previewImage || "/defaultAvatar.jpg" // Si aucune photo, utiliser l'avatar par défaut
              }
              alt="Photo de profil"
              className="w-full h-full object-cover rounded-full transition duration-300 group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <div className="bg-white bg-opacity-80 p-2 rounded-full shadow">
                <Pencil className="w-5 h-5 text-gray-800" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold mt-4">
            {user.name} (@{user.username})
          </h1>
          <p className="text-blue-400 text-lg font-medium">
            "Description{user.rank}"
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-gray-800 rounded-lg text-center border border-gray-700">
            <p className="text-lg font-semibold">Challenges</p>
            <p className="text-2xl font-bold text-blue-400">
              0 {user.challengesCompleted}
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center border border-gray-700">
            <p className="text-lg font-semibold">Score</p>
            <p className="text-2xl font-bold text-blue-400">
              {user.score}1600 Pts
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center border border-gray-700">
            <p className="text-lg font-semibold">Rank</p>
            <p className="text-2xl font-bold text-blue-400">1230 {user.rank}</p>
          </div>
        </div>
      </div>

      {/* Modal d’upload */}
      <UploadProfilePicture
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ProfilePage;
