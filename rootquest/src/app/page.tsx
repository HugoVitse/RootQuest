import NavBar from "@/components/navBar";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gray-950 text-white">
      <NavBar />

      {/* Arrière-plan avec effet de flou */}
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url("images/back.jpg")', filter: 'blur(5px)' }}></div>

      <div className="relative z-10 w-full max-w-5xl px-6 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight tracking-wide">
          <span className="text-blue-400">Pentest</span> & Cybersecurity
          <br />
          <span className="text-blue-200">Master Ethical Hacking</span> with Advanced Tools
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-300">
          Unlock the power of penetration testing and ethical hacking with cutting-edge tools and real-world challenges.
        </p>
        <a href="#about-site" className="mt-6 inline-block bg-blue-600 text-white py-3 px-8 rounded-full text-xl transition transform hover:scale-105 hover:shadow-xl">
          Learn More
        </a>
      </div>

      {/* Section About */}
      <section id="about-site" className="w-full max-w-5xl text-left py-16 px-6 space-y-6">
        <h2 className="text-4xl font-extrabold text-blue-400">About Our Pentest Platform</h2>
        <p className="text-lg text-gray-300">
          Our platform provides an interactive environment for security enthusiasts and professionals to improve their penetration testing skills with hands-on labs, challenges, and real-world scenarios.
        </p>
        <a href="#" className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full text-xl transition hover:bg-blue-500">
          Explore Now
        </a>
      </section>

      {/* Section CTF */}
      <section id="exclusive-ctf" className="w-full max-w-5xl text-left py-16 px-6 space-y-6">
        <h2 className="text-4xl font-extrabold text-blue-400">Exclusive CTF Challenges</h2>
        <p className="text-lg text-gray-300">
          Join exclusive Capture The Flag (CTF) challenges with top cybersecurity teams. Work on cutting-edge security scenarios and compete against the best.
        </p>
        <a href="#" className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full text-xl transition hover:bg-blue-500">
          Join the Challenge
        </a>
      </section>

      {/* Section CTF Challenges */}
      <section id="ctf-exercises" className="w-full max-w-7xl text-left py-16 px-6 space-y-8">
        <h2 className="text-4xl font-extrabold text-blue-400">CTF Challenges</h2>
        <p className="text-lg text-gray-300">
          Test your skills with a variety of CTF challenges inspired by real-world scenarios.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: "Web Exploitation", img: "/images/web_ctf.webp" },
            { title: "Reverse Engineering", img: "/images/reverse_ctf.webp" },
            { title: "Cryptography", img: "/images/crypto_ctf.webp" },
            { title: "Forensics", img: "/images/forensics_ctf.webp" },
            { title: "Binary Exploitation", img: "/images/binary_ctf.webp" },
            { title: "Networking", img: "/images/network_ctf.webp" }
          ].map((challenge, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-lg transition transform hover:scale-105">
              <img src={challenge.img} alt={challenge.title} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-2xl font-bold text-white mt-4">{challenge.title}</h3>
              <p className="text-gray-400 mt-2">Solve real-world scenarios and improve your hacking skills.</p>
              <a href="#" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg transition hover:bg-blue-500">
                Try Now
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}