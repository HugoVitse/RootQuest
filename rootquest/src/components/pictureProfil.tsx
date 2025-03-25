import React from "react";

interface PictureProfilProps {
  imageUrl: string;
  size?: number; // Optional size prop for the circle
}

const PictureProfil: React.FC<PictureProfilProps> = ({
  imageUrl,
  size = 100,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #000",
      }}
    >
      <img
        src={imageUrl}
        alt="Profile"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default PictureProfil;
