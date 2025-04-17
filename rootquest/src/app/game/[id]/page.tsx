"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { socket } from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import { message } from "@/types/gameSession";
import { fetchUsername } from "@/lib/infoClient";
import axios from "axios";



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
    const params = useParams();
    const id = params.id;
    console.log(id);

    const [flags, setFlags] = useState<string[]>([]);
    const [messages, setMessages] = useState<message[]>([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");

    const handleFlagSubmit = (index: number) => {
        console.log(`Flag ${index + 1} submitted: ${flags[index]}`);
        // Add logic to handle flag submission
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages((prev) => [...prev, {message:message, sender: "User"}]);
            setMessage("");
            console.log(id,message,username)
            socket.emit("message", id, message, username);
        }
    };

    useEffect(()=>{
      const wrap = async() => {
        const nbFlags = await axios.post(`/api/getNbFlags`, {id});
        console.log(nbFlags.data);
        for(let i = 0; i < nbFlags.data; i++) {
          setFlags((prev) => [...prev, ""]);
        }
        const username_ = await fetchUsername();
        setUsername(username_);
      }

      socket.on("message", (messages: message[]) => {
          setMessages(messages);
      });

      wrap();
        

      return () => {
          socket.disconnect();
      };
    },[])

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
        <h2 className="text-2xl font-semibold mb-4">Soumettre des Flags</h2>
        {flags.map((flag, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <Input
            placeholder={`Flag ${index + 1}`}
            value={flag}
            onChange={(e) =>
            setFlags((prev) => {
              const newFlags = [...prev];
              newFlags[index] = e.target.value;
              return newFlags;
            })
            }
          />
          <Button onClick={() => handleFlagSubmit(index)}>Soumettre</Button>
        </div>
        ))}
      </CardContent>
    </Card>

    <Card className="w-full max-w-xl p-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Chat</h2>
        <div className="h-40 overflow-y-auto bg-gray-800 p-4 rounded-xl mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg.message}
          </div>
        ))}
        </div>
        <div className="flex gap-2">
        <Input
          placeholder="Entrez un message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage}>Envoyer</Button>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default Lobby;