"use client"; // Assure-toi de marquer ce fichier comme client component.

import Link from "next/link";
import { MdOutlineLock, MdOutlineLogout } from "react-icons/md";
import { useState } from "react";
import NavBar from "@/components/navBar";
import { FaUsers, FaUserAlt } from "react-icons/fa"; // Icônes de 1 ou 2 personnes

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="bg-gradient-to-b from-blue-500 to-indigo-700 min-h-screen text-white font-sans">
      {/* NavBar Section */}
      <NavBar />

      {/* Header Section */}
      <header className="relative bg-cover bg-center h-[60vh] flex justify-center items-center text-center bg-no-repeat" style={{ backgroundImage: 'url("/images/ctf-banner.jpg")' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 px-6 py-12">
          <h1 className="text-5xl font-extrabold leading-tight mb-4 text-gradient animate__animated animate__fadeIn">RootQuest: La plateforme de Pentesting interactive</h1>
          <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s max-w-2xl mx-auto">Développe tes compétences en cybersécurité grâce à des challenges réalistes, seuls ou en équipe, dans un environnement immersif.</p>
          <Link href="/register">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Commencez maintenant
            </button>
          </Link>
        </div>
      </header>

      {/* À propos de RootQuest */}
      <section className="py-16 bg-gray-800 text-center">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8">Qu'est-ce que RootQuest ?</h2>
        <p className="text-xl max-w-4xl mx-auto text-gray-300">
          RootQuest est une plateforme immersive dédiée à l’entraînement au pentesting. En mettant l'accent sur des challenges pratiques, elle permet aux utilisateurs de s’entraîner dans des environnements réalistes. Que vous soyez un débutant ou un expert, vous trouverez des défis qui vous feront progresser à votre rythme et avec un réel impact sur vos compétences en cybersécurité.
        </p>
      </section>

      {/* Modes de Challenge */}
      <section className="py-16 bg-gray-900">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-blue-400 mb-8">Modes de Challenge: Solo ou Duo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 px-4">
            <Link href="/solo">
              <div className="bg-gray-800 hover:bg-blue-600 transition p-8 rounded-lg shadow-lg text-white text-center transform hover:scale-105">
                <FaUserAlt className="mx-auto mb-4 text-5xl text-white" />
                <h3 className="text-xl font-semibold">Challenge Solo</h3>
                <p className="mt-4">Teste et renforce tes compétences en cybersécurité à ton propre rythme, avec des missions de pentesting adaptées à ton niveau.</p>
              </div>
            </Link>
            <Link href="/duo">
              <div className="bg-gray-800 hover:bg-blue-600 transition p-8 rounded-lg shadow-lg text-white text-center transform hover:scale-105">
                <FaUsers className="mx-auto mb-4 text-5xl text-white" />
                <h3 className="text-xl font-semibold">Challenge Duo</h3>
                <p className="mt-4">Collabore avec un ami ou un collègue pour résoudre des défis plus complexes, dans un esprit de coopération proche du monde professionnel.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-gray-800 text-center">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8">Ce que disent nos utilisateurs</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl italic text-white">
            "RootQuest m'a permis d'acquérir des compétences en pentesting tout en me challengeant. Le mode Duo m'a aussi permis de travailler en équipe, un atout précieux pour le monde professionnel."
          </p>
          <p className="mt-4 text-lg text-gray-400">- Alice, Analyste Sécurité</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-900 text-center text-white">
        <p>&copy; 2025 RootQuest. Tous droits réservés.</p>
        <div className="mt-4">
          <Link href="/terms" className="text-blue-400 hover:underline mr-4">Conditions d'utilisation</Link>
          <Link href="/privacy" className="text-blue-400 hover:underline">Politique de confidentialité</Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
