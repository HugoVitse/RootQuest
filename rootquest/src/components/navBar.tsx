import React from "react";
import PictureProfil from "./pictureProfil";

const NavBar: React.FC = () => {
  return (
    <nav className="py-4 px-0">
      <div className=" mx-auto flex items-center justify-end px-1  ">
        <PictureProfil
          imageUrl="https://www.portraitprofessionnel.fr/wp-content/uploads/2020/02/portrait-professionnel-corporate-4.jpg"
          size={50}
        />
        <div className="flex items-center bg-black px-4 py-1 rounded-3xl cursor-pointer h-full hover:bg-gray-900 ml-4">
          <p className="text-white text-2xl mr-1 font-bold">Menu</p>
          <img src="menu.svg" alt="menu icon" className="size-10" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
