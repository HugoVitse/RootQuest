"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { socket } from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import { message } from "@/types/gameSession";
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
    const image = params.image;

    const [flags, setFlags] = useState<flag[]>([]);
    const [messages, setMessages] = useState<message[]>([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [ip, setIp] = useState("");
    const [error, setError] = useState("");
    const [team, setTeam] = useState(0);
    const [success, setSuccess] = useState(false);

    const handleFlagSubmit =  async (index: number) => {
      const rep = await axios.post(`/api/validateFlag`, {flag: flags[index].flag, image: image, flag_number:index});
      if(rep.data.success) {

        const newFlags = [...flags];
        newFlags[index].validated = true;
        setFlags(newFlags);
        const success_ = newFlags.every(flag => flag.validated);
  

        if (success_) {
          setSuccess(true);
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



    useEffect(()=>{
      const wrap = async() => {
        try {

          const gameOk = await axios.post(`/api/isGameOkSolo`, {image});
          if(!gameOk.data.ok) {
            router.push("/");
          }   
          
          else {
            setIp(gameOk.data.ip);
            const nbFlags = gameOk.data.nbflags;
            console.log("nbFlags", nbFlags);
            for(let i = 0; i < nbFlags; i++) {
              setFlags((prev) => [...prev, {flag:"",validated:false}]);
            }
          }
          
        } catch (err) {
          console.log(err);
        }
        
        const username_ = await fetchUsername();
        setUsername(username_);
      }

      wrap();
        

      return () => {
          socket.disconnect();
      };
    },[])

    useEffect(() => {
      const wrap = async() => { 
        if(success){
          const rep = await axios.post(`/api/stopGameSolo`, {image: image});
        }
      }
      wrap();
    },[success])

  

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
      Game Solo
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

   
    </div>
  );
};

export default Lobby;