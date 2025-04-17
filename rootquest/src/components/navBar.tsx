"use client";

import React from "react";
import PictureProfil from "./pictureProfil";
import Link from "next/link";
import { fetchUsername } from "@/lib/infoClient";

const NavBar: React.FC = () => {

  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {
    
    const wrap = async () => { 
      const username = await fetchUsername();
      setUsername(username); };
    wrap();
  }, []);



  return (
    <nav className="py-4 px-0 flex items-center justify-end">
      <div className="flex items-center justify-between px-5 w-full">
        <h1 className="text-2xl font-bold">{username}</h1>
        <div className="flex items-center">
          <Link href="/" className="mx-2">Home</Link>
          <button className="mx-2">Challenges</button>
          <button className="mx-2">Contact</button>
        </div>
      </div>
      <div className=" flex items-center justify-end px-5">
        <PictureProfil
          imageUrl="https://www.portraitprofessionnel.fr/wp-content/uploads/2020/02/portrait-professionnel-corporate-4.jpg"
          size={50}
        />
      </div>
    </nav>
  );
};

export default NavBar;
