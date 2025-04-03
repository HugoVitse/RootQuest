"use client";

import React, { useState } from "react";
import NavBar from "@/components/navBar";

const duoChallenges = [
  { title: "Cyberspace", difficulty: "Easy" },
  { title: "Red vs Blue Team", difficulty: "Hard" },
  { title: "Pentest Coop", difficulty: "Medium" },
  { title: "Capture the Flag", difficulty: "Hard" },
  { title: "Cyber Puzzle", difficulty: "Medium" }
];

const ChallengeDuo: React.FC = () => {


  const [difficulty, setDifficulty] = useState("All");

  // Filtrer les challenges par difficulté
  const filteredChallenges = difficulty === "All"
    ? duoChallenges
    : duoChallenges.filter(challenge => challenge.difficulty === difficulty);

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white font-sans">
      <NavBar />

      <div className="max-w-5xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold text-blue-400">Challenges Duo</h1>
        <p className="text-gray-300 mt-2">Affronte ou collabore avec un partenaire pour résoudre des défis en cybersécurité.</p>

        {/* Filtres */}
        <div className="mt-6 flex space-x-4">
          {["All", "Easy", "Medium", "Hard"].map(level => (
            <button
              key={level}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                difficulty === level ? "bg-blue-500 text-white" : "bg-gray-800 hover:bg-gray-700"
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
            <div key={index} className="p-4 bg-gray-900 rounded-lg flex justify-between items-center border border-gray-700">
              <div>
                <h2 className="text-xl font-semibold">{challenge.title}</h2>
                <p className="text-sm text-gray-400">Difficulté : 
                  <span className={
                    challenge.difficulty === "Easy" ? "text-green-400" : 
                    challenge.difficulty === "Medium" ? "text-yellow-400" : 
                    "text-red-400"
                  }>
                    {" " + challenge.difficulty}
                  </span>
                </p>
              </div>
              <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400">
                Trouver un partenaire
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDuo;