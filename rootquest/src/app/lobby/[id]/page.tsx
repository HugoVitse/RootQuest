"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { fetchUsername } from "@/lib/infoClient";

interface Player {
  team: number;
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
  
  const [players, setPlayers] = useState<string[]>([]);
  const [team1, setTeam1] = useState<string[]>([]);
  const [team2, setTeam2] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [username, setUsername] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  
  const addPlayer = (player: string) => {
    console.log(players,player, players.includes(player))
    if(!players.includes(player)) {
      setPlayers((prev) => [...prev, player]);
    }
  }

  useEffect(() => {
    const wrap = async () => {
      const username_ = await fetchUsername();
      setUsername(username_);
      console.log("ok")
      socket.emit("playerRequest", id);
      socket.emit("teamsRequest", id);
    }

    socket.on("playerList", (playerList: string[]) => {
      setPlayers(playerList);
      setTeam1(playerList[0] ? [playerList[0]] : []);
      setTeam2(playerList[1] ? [playerList[1]] : []);
    });
    socket.on("joiners", (username: string) => {
      addPlayer(username);
      setTeam2((prev) => [...prev, username]);
    })
    socket.on("updateTeam", (idSession:string, team1_: string[], team2_:string[]) => {
      if(idSession === id){
        setTeam1(team1_);
        setTeam2(team2_);
      }
      
    })


    wrap();
  }, []);

  const handleJoin = () => {
    if (username.trim()) {
      socket.emit("join", id, username);
    }
  };


  const handleReady = () => {
    setIsReady(true);
  };

  useEffect(() => {
    if (players.includes(username)) {
      setIsDisabled(true);
    }
    if(players.length >=2) {
      setIsDisabled(true);
    }
  },[players]);


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
          <div className="flex justify-center mb-4">
           
            <Button disabled={isDisabled} onClick={handleJoin}>Rejoindre</Button>
          </div>
            <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-center text-xl font-bold mb-4">Équipe 1</h2>
              {team1.map((player) => (
              <motion.div
                key={player}
                className="flex items-center gap-4 p-2 bg-gray-800 rounded-xl shadow mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Avatar>
                <AvatarFallback>{player[0]}</AvatarFallback>
                </Avatar>
                <span className="text-lg font-semibold">{player}</span>
                <Button
                  onClick={() => {
                    let newTeam1 = team1.filter((p) => p !== player);
                    let newTeam2 = [...team2, player];
                    setTeam1(newTeam1);
                    setTeam2(newTeam2);
                    console.log(newTeam1, newTeam2);
                    if(players.length !== 0){
                      socket.emit("updateTeam", id, newTeam1, newTeam2);
                    }
                  }}
                >
                Changer d'équipe
                </Button>
              </motion.div>
              ))}
            </div>
            <div>
              <h2 className="text-center text-xl font-bold mb-4">Équipe 2</h2>
              {team2.map((player) => (
              <motion.div
                key={player}
                className="flex items-center gap-4 p-2 bg-gray-800 rounded-xl shadow mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Avatar>
                <AvatarFallback>{player[0]}</AvatarFallback>
                </Avatar>
                <span className="text-lg font-semibold">{player}</span>
                <Button
                onClick={() => {
                  let newTeam2 = team2.filter((p) => p !== player);
                  let newTeam1 = [...team1, player];
                  setTeam1(newTeam1);
                  setTeam2(newTeam2);
                 
                

                  if(players.length !== 0){
                    socket.emit("updateTeam", id, newTeam1, newTeam2);
                  }
                  
                }}
                >
                Changer d'équipe
                </Button>
              </motion.div>
              ))}
            </div>
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