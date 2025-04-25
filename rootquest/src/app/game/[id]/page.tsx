"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { socket } from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import { message } from "@/types/gameSessionTypes";
import { fetchUsername } from "@/lib/infoClient";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';



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
    type flag = {
      flag: string;
      validated: boolean;
    }
    const params = useParams();
    const id = params.id;
    console.log(id);

    const [flags, setFlags] = useState<flag[]>([]);
    const [messages, setMessages] = useState<message[]>([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [ip, setIp] = useState("");
    const [error, setError] = useState("");
    const [team, setTeam] = useState(0);
    const [team1Success, setTeam1Success] = useState(false);
    const [team2Success, setTeam2Success] = useState(false);

    const handleFlagSubmit =  async (index: number) => {
      const rep_image = await axios.post(`/api/gameImage`, {sessionId:id});
      const rep = await axios.post(`/api/validateFlag`, {flag: flags[index].flag, image: rep_image.data.image, flag_number:index});
      if(rep.data.success) {

        const newFlags = [...flags];
        newFlags[index].validated = true;
        setFlags(newFlags);
        const success = newFlags.every(flag => flag.validated);
  

        if (success) {
          if(team === 1) {
            setTeam1Success(true);
          }
          else {
            setTeam2Success(true);
          }
          console.log(team, "ok")
          socket.emit("flagsFound", id, team);
        }
        
        toast.success(`Good flag ! ${rep.data.message} `, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      else {
        toast.error('Wrong flag !', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

    
    }

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages((prev) => [...prev, {message:message, sender: username}]);
            setMessage("");
            console.log(id,message,username)
            socket.emit("message", id, message, username);
        }
    };

    useEffect(()=>{
      const wrap = async() => {
        try {

          const gameOk = await axios.post(`/api/isGameOk`, {id});
          if(!gameOk.data.ok) {
            router.push("/");
            return;
          }

          setTeam(gameOk.data.team);

          const rep = await axios.post(`/api/gameLaunched`, {sessionId: id});
          
          if(!gameOk.data.launched) {
            setError("La partie n'a pas encore commencé !");
            return;
          }
          else {
            setIp(rep.data.ip);
          }
          
        } catch (err) {
          console.log(err);
        }
        const nbFlags = await axios.post(`/api/getNbFlags`, {id});
        console.log(nbFlags.data);
        for(let i = 0; i < nbFlags.data; i++) {
          setFlags((prev) => [...prev, {flag:"",validated:false}]);
        }
        const username_ = await fetchUsername();
        socket.emit("messageRequest", id);
        setUsername(username_);
      }

      socket.on("message", (messages: message[]) => {
          setMessages(messages);
      });

      socket.on("flagsFound", (sessionId:string, team:number) => {
        console.log("team", team)
        if(sessionId == id) {
          if(team === 1) {
            setTeam1Success(true);
          }
          else {
            setTeam2Success(true);
          }
        }
      });

      wrap();
        

      return () => {
          socket.disconnect();
      };
    },[])

    useEffect(() => {
      console.log("team1Success", team1Success);
      console.log("team2Success", team2Success);
      const wrap = async() => { 
        if(team1Success && team2Success){
          const rep = await axios.post(`/api/stopGame`, {sessionId: id});
          if(rep.data.success) {
            router.push("/duo");
          }
        }
      }
      wrap();
    },[team1Success, team2Success])

  

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <div className="absolute top-4 right-4">
      <Button onClick={() => {
        window.location.href = `/api/vpnClient`;
      }}>Obtenez votre fichier client OpenVPN</Button>
    </div>
    <motion.h1
      className="text-4xl font-bold mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Lobby Multijoueur
    </motion.h1>

    <motion.h3
      className="text-2éxl font-bold mb-8 text-green-500"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      IP de la machine: {ip}
    </motion.h3>
    <motion.h2
        className="text-1xl font-bold mb-8 text-red-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {error}
      </motion.h2>



    <Card className="w-full max-w-xl p-6 mb-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Soumettre des Flags</h2>
        {flags.map((flag, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <Input
            placeholder={`Flag ${index + 1}`}
            value={flag.flag}
            onChange={(e) =>
              setFlags((prev) => {
                const newFlags = [...prev];
                newFlags[index].flag = e.target.value;
                return newFlags;
              })
            }
          />
          <Button disabled={flag.validated} onClick={() => handleFlagSubmit(index)}>{flag.validated ? "Validé" : "Soumettre"}</Button>
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
            <span className="font-bold">{msg.sender}:</span> {msg.message}
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