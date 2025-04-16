"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


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

const Lobby = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleJoin = () => {
    router.push(`/lobby/${name}`);
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
              placeholder="Entrez un ID de session"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleJoin}>Rejoindre</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lobby;