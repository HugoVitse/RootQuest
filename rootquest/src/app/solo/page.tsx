"use client";

import NavBar from "@/components/navBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImageClient } from "@/types/image";

const challenges = [
  { title: "SQL Injection", difficulty: "Medium" },
  { title: "XSS Attack", difficulty: "Easy" },
  { title: "Privilege Escalation", difficulty: "Hard" },
  { title: "Reverse Engineering", difficulty: "Hard" },
  { title: "Directory Traversal", difficulty: "Medium" },
];

const ChallengeSolo: React.FC = () => {
  const [difficulty, setDifficulty] = useState("All");
  const [challenges, setChallenges] = useState<ImageClient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/getChallengesSolo`);
      setChallenges(response.data.images);
    }
    fetchData();
  }, []);

  // Filtrer les challenges par difficulté
  const filteredChallenges =
    difficulty === "All"
      ? challenges
      : challenges.filter((challenge) => challenge.difficulty === difficulty);

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white font-sans">
      <NavBar />

      <div className="max-w-5xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold text-blue-400">Challenges Solo</h1>
        <p className="text-gray-300 mt-2">
          Entraîne-toi seul sur des challenges techniques pour améliorer tes
          compétences en cybersécurité.
        </p>

        {/* Filtres */}
        <div className="mt-6 flex space-x-4">
          {["All", "Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                difficulty === level
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={() => setDifficulty(level)}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Liste des challenges */}
        <div className="mt-8 space-y-6">
          {filteredChallenges.map((challenge, index) => (
            <div
              key={index}
              className="p-4 bg-gray-900 rounded-lg flex justify-between items-center border border-gray-700"
            >
              <div>
                <h2 className="text-xl font-semibold">{challenge.name}</h2>
                <p className="text-sm text-gray-400">
                  Difficulté :
                  <span
                    className={
                      challenge.difficulty === "Easy"
                        ? "text-green-400"
                        : challenge.difficulty === "Medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }
                  >
                    {" " + challenge.difficulty}
                  </span>
                </p>
              </div>
              <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400">
                Commencer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeSolo;
