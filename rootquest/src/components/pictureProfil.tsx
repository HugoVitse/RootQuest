import React from "react";
import Link from "next/link";

interface PictureProfilProps {
  imageUrl: string;
  size?: number; // Taille optionnelle du cercle
}

const PictureProfil: React.FC<PictureProfilProps> = ({ imageUrl, size = 100 }) => {
  return (
    <Link href="/profile" className="rounded-full overflow-hidden flex justify-center items-center border border-gray-200 cursor-pointer"
    style={{ width: `${size}px`, height: `${size}px` }}>

      <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
    </Link>
  );
};

export default PictureProfil;
