"use client";

import Link from "next/link";
import { FaUsers, FaUserAlt } from "react-icons/fa";
import NavBar from "@/components/navBar";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-900 min-h-screen text-white font-sans">
      {/* NavBar */}
      <NavBar />

      {/* Hero Section */}
      <header className="relative h-[70vh] flex justify-center items-center text-center bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url("/images/ctf-banner.jpg")' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 px-6 py-12 max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-extrabold text-white leading-tight mb-4 animate__animated animate__fadeIn animate__delay-1s">RootQuest: Plateforme de Pentesting</h1>
          <p className="text-lg text-gray-300 mb-8 animate__animated animate__fadeIn animate__delay-1s">
            Améliore tes compétences en cybersécurité avec des défis immersifs, seul ou en duo. Prépare-toi à des expériences proches du monde professionnel.
          </p>
          <Link href="/register">
            <button className="bg-gradient-to-r from-blue-400 to-blue-600 py-3 px-8 rounded-lg shadow-xl hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 text-white font-semibold">
              Commencez maintenant
            </button>
          </Link>
        </div>
      </header>

      {/* À propos de RootQuest */}
      <section className="py-20 bg-gray-900 text-center">
        <h2 className="text-4xl font-semibold text-blue-400 mb-6">Qu'est-ce que RootQuest ?</h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          RootQuest est une plateforme immersive pour entraîner vos compétences en pentesting. Que ce soit en solo ou en duo, chaque challenge simule des situations réelles, parfait pour se préparer aux défis futurs.
        </p>
      </section>

      {/* Modes de Challenge */}
      <section className="py-20 bg-gray-800">
        <h2 className="text-4xl font-semibold text-blue-400 text-center mb-12">Choisis ton Mode de Challenge</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {/* Solo Challenge */}
          <Link href="/solo">
            <div className="bg-gray-700 hover:bg-blue-600 transition-all p-8 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl text-white text-center relative">
              <FaUserAlt className="text-6xl mb-4 mx-auto text-white" />
              <h3 className="text-2xl font-semibold mb-4">Challenge Solo</h3>
              <p className="text-lg">Teste tes compétences à ton rythme, avec des missions réalistes.</p>
              <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-lg transition-all duration-300 transform group-hover:opacity-30"></div>
            </div>
          </Link>

          {/* Duo Challenge */}
          <Link href="/duo">
            <div className="bg-gray-700 hover:bg-blue-600 transition-all p-8 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl text-white text-center relative">
              <FaUsers className="text-6xl mb-4 mx-auto text-white" />
              <h3 className="text-2xl font-semibold mb-4">Challenge Duo</h3>
              <p className="text-lg">
                Apprends à collaborer efficacement sur des défis plus complexes. Développe tes compétences en travail d'équipe.
              </p>
              <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-lg transition-all duration-300 transform group-hover:opacity-30"></div>
            </div>
          </Link>

          {/* New Challenge */}
          <div className="bg-gray-700 hover:bg-blue-600 transition-all p-8 rounded-lg shadow-xl transform hover:scale-105 hover:shadow-2xl text-white text-center relative">
            <FaUserAlt className="text-6xl mb-4 mx-auto text-white" />
            <h3 className="text-2xl font-semibold mb-4">Explorer les Défis</h3>
            <p className="text-lg">Choisis des défis variés et découvre des problématiques à résoudre.</p>
            <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-lg transition-all duration-300 transform group-hover:opacity-30"></div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-gray-900 text-center">
        <h2 className="text-3xl font-semibold text-blue-400 mb-6">Ce que disent nos utilisateurs</h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg italic text-white mb-4">
            "RootQuest m'a permis d'améliorer mes compétences techniques et de travailler efficacement avec un partenaire, un atout précieux pour ma carrière."
          </p>
          <p className="text-xl text-gray-300">- Alice, Analyste en Sécurité Informatique</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-white">
        <p>&copy; 2025 RootQuest. Tous droits réservés.</p>
        <div className="mt-4">
          <Link href="/" className="text-blue-400 hover:underline mr-4">Conditions d'utilisation</Link>
          <Link href="/" className="text-blue-400 hover:underline">Politique de confidentialité</Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
