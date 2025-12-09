"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { fetchUsername } from "@/lib/infoClient";
import { isGameExists , isGameLaunched} from "@/lib/infoGame";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  const router = useRouter();
  const params = useParams();
  const id = params.id?.toString() || "";
  console.log(id);
  
  const [players, setPlayers] = useState<string[]>([]);
  const [team1, setTeam1] = useState<string[]>([]);
  const [team2, setTeam2] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [go, setGo] = useState(false);
  const [username, setUsername] = useState("");
  const [host, setHost] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");
  const [isLaunched, setIsLaunched] = useState(false);
  
  const addPlayer = (player: string) => {
    console.log(players,player, players.includes(player))
    if(!players.includes(player)) {
      setPlayers((prev) => [...prev, player]);
    }
  }

  useEffect(() => {
    const wrap = async () => {

      const exists = await isGameExists(id);
      if(!exists) {
        router.push("/lobby");
        console.log("Session does not exist");
        return;
      }
      const data = await isGameLaunched(id)
      setHost(data.host);
      if(data.launched){
        setError("La partie a déjà commencé !");
      }
      console.log(data)
      setIsLaunched(data.launched);

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

    socket.on("go", async (idSession:string) => {
      console.log("ok");
      console.log(idSession, id);
      if(idSession === id) {
        const rep = await axios.post(`/api/launchGame`, {id: id});
        if(rep.status === 200) {
          router.push(`/game/${id}`);
        }
        else {
          setError("Erreur lors du lancement de la partie");
        }
      }
    });


    wrap();
    checkTeams();
  }, []);

  const checkTeams = () => {
    console.log(team1.length, team2.length);
    if(team1.length > 1) {
      setError("Trop de joueurs dans l'équipe 1 !");
    }
    else if(team2.length > 1) {
      setError("Trop de joueurs dans l'équipe 2 !");
    }
    else if(team1.length === 1 && team2.length === 1 && !isLaunched) {
      setError("");
    }
  }

  const handleJoin = () => {
    if (username.trim()) {
      socket.emit("join", id, username);
    }
  };

  const handleRejoin = () => {
    router.push(`/game/${id}`);
  }

  const handleReady = async() => {
    console.log(id,"ok");
    socket.emit("go", id);
    const rep = await axios.post(`/api/launchGame`, {id: id});
    if(rep.status === 200) {
      router.push(`/game/${id}`);
    }
    else {
      setError("Erreur lors du lancement de la partie");
    }

  };

  useEffect(() => {
    if (players.includes(username)) {
      setIsDisabled(true);
    }
    if(players.length >=2) {
      setIsDisabled(true);
    }
  },[players]);

  useEffect(() => {
    checkTeams();
  },[team1, team2]);

  useEffect(() => {
    console.log(error);
  }, [error]);


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Lobby Multijoueur
      </motion.h1>

      <motion.div
        className="flex items-center gap-4 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-lg font-semibold">ID de la session :</span>
        <div className="flex items-center bg-gray-800 px-4 py-2 rounded-xl">
          <span className="text-white">{id}</span>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(id);
            }}
            className="ml-2 text-blue-500 hover:text-blue-400 transition"
          >
            Copier
          </button>
        </div>
      </motion.div>

      <motion.h2
        className="text-1xl font-bold mb-8 text-red-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {error}
      </motion.h2>

      <Card className="w-full max-w-xl p-6 mb-6">
        <CardContent>
          <div className="flex justify-center mb-4">
           
            <Button disabled={isDisabled || isLaunched} onClick={handleJoin}>Rejoindre</Button>
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
                {player === username && !isLaunched && (<Button
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
                </Button>)}
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
                {player === username && !isLaunched && (<Button
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
                </Button>)}
              </motion.div>
              ))}
            </div>
            </div>
        </CardContent>
      </Card>

      { (username===host || isLaunched) && <Button
        onClick={isLaunched ? handleRejoin : handleReady}
      >
        {isLaunched ? "Revenir en jeu":"Lancer la partie !"}
      </Button>}
    </div>
  );
};

export default Lobby;