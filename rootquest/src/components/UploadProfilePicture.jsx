import { useRef, useState } from 'react'
import { Pencil } from 'lucide-react'

export default function UploadProfilePicture({ initialImageUrl, size = 100 }) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl)
  const inputRef = useRef()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result)
        
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div
      className="relative group cursor-pointer"
      style={{ width: size, height: size }}
      onClick={() => inputRef.current.click()}
    >
      <img
        src={imageUrl}
        alt="Photo de profil"
        className="w-full h-full object-cover rounded-full transition duration-300 group-hover:brightness-75"
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="bg-white bg-opacity-80 p-2 rounded-full shadow">
          <Pencil className="w-5 h-5 text-gray-800" />
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
