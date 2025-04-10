"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

interface Player {
  id: string;
  name: string;
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white/10 rounded-2xl p-4 shadow ${className}`}>{children}</div>
);

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "outline";
}> = ({ children, onClick, disabled, variant = "default" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-xl text-white font-semibold transition ${
      variant === "outline"
        ? "border border-white hover:bg-white/10"
        : "bg-blue-600 hover:bg-blue-700"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
);

const Input: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 w-full"
  />
);

const Avatar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white">
    {children}
  </div>
);

const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

const Lobby = () => {

  const params = useParams();
  const id = params.id;
  console.log(id);
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fakePlayers = [
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" },
    ];
    setPlayers(fakePlayers);
  }, []);

  const handleJoin = () => {
    if (name.trim()) {
      setPlayers((prev) => [...prev, { id: Date.now().toString(), name }]);
    }
  };

  const handleReady = () => {
    setIsReady(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Lobby Multijoueur
      </motion.h1>

      <Card className="w-full max-w-xl p-6 mb-6">
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Entrez votre pseudo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleJoin}>Rejoindre</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {players.map((player) => (
              <motion.div
                key={player.id}
                className="flex items-center gap-4 p-2 bg-gray-800 rounded-xl shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Avatar>
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-lg font-semibold">{player.name}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        variant={isReady ? "outline" : "default"}
        onClick={handleReady}
        disabled={isReady || !name.trim()}
      >
        {isReady ? "Prêt !" : "Je suis prêt"}
      </Button>
    </div>
  );
};

export default Lobby;