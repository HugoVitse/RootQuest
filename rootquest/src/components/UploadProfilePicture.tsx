"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface UploadProfilePictureProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Récupérer le username
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post("/api/infoClient");
        if (response.data.username) {
          setUser(response.data);
          setPreviewUrl(response.data.profilePicture);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(""); // Réinitialiser l'erreur si tout est bon
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Veuillez sélectionner une image avant d'uploader.");
      return;
    }

    if (!user) {
      setError("Utilisateur non trouvé.");
      return;
    }

    // Convertir l'image en JPG
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = previewUrl as string;

    img.onload = async () => {
      // Créer un canvas avec l'image convertie en JPG
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      // Convertir l'image en data URL en format JPEG
      const jpgDataUrl = canvas.toDataURL("image/jpeg");

      // Créer un Blob à partir de la data URL pour l'envoyer
      const response = await fetch(jpgDataUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("photo", blob, `${user.username}.jpg`);
      formData.append("username", user.username); // Ajouter le username pour l'API

      // Envoi du fichier à l'API
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadResponse.ok) {
        // Image uploadée avec succès
        setPreviewUrl(uploadData.url); // Mettre à jour l'URL pour l'affichage
        setUploadSuccess(true); // Afficher le GIF de succès
        setTimeout(() => {
          setUploadSuccess(false); // Cacher le GIF après 3 secondes
          onClose(); // Fermer la modale après le succès
          window.location.reload();
        }, 1500);
      } else {
        setError(uploadData.error || "Erreur lors de l'upload");
      }
    };
  };

  if (!isOpen) return null;

  return (
    <div>
      {/* Fond sombre et animation de succès */}
      {uploadSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="flex items-center justify-center">
            <img
              src="check.gif"
              alt="Success"
              className="w-64 h-64" // Ajustez la taille du GIF comme souhaité
            />
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
        <div
          ref={modalRef}
          className="bg-white text-black rounded-2xl shadow-lg p-8 w-full max-w-md relative"
        >
          <button
            className="absolute top-3 right-6 text-gray-500 hover:text-black"
            onClick={onClose}
          >
            ✕
          </button>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">
              Mettre à jour votre photo de profil
            </h2>
            <p className="text-gray-600 mb-4">
              Choisissez une nouvelle image à uploader
            </p>

            {/* Preview de l'image */}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border"
              />
            )}

            {/* Message d'erreur */}
            {error && (
              <p className="text-red-500 text-sm font-medium mb-2">{error}</p>
            )}

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="flex flex-col items-center gap-4"
            >
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProfilePicture;