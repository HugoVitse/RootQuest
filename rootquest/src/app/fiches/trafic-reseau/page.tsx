export default function TraficReseauPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-400 mb-6">
          Analyse de trafic réseau
        </h1>

        {/* Définition */}
        <section className="mb-10">
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/question.gif"
              alt="packet"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              Qu’est-ce que c’est ?
            </h2>
          </div>
          <p className="text-gray-300">
            Certains challenges consistent à récupérer des informations
            dissimulées dans des fichiers de capture réseau (<code>.pcap</code>,{" "}
            <code>.pcapng</code>), ou à observer le trafic généré par une page
            web pour y découvrir des éléments intéressants.
          </p>
        </section>

        {/* Objectif */}
        <section className="mb-10">
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/loupe.gif"
              alt="loupe"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              Objectif du challenge
            </h2>
          </div>
          <p className="text-gray-300">
            Identifier des éléments sensibles (identifiants, clés, flags...)
            transmis sur le réseau ou cachés dans le contenu des paquets
            échangés entre client et serveur.
          </p>
        </section>

        {/* Indices généraux */}
        <section className="mb-10">
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/ampoule.gif"
              alt="ampoule"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              À quoi faire attention ?
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Contenu des paquets HTTP (GET, POST, headers, cookies…)</li>
            <li>Requêtes suspectes ou volumineuses</li>
            <li>
              Données en clair transmises sur des ports non chiffrés (HTTP,
              FTP...)
            </li>
            <li>Transferts de fichiers, communications inhabituelles</li>
            <li>Trames DNS, WebSocket ou autre protocole spécial</li>
          </ul>
        </section>

        {/* Bonnes pratiques */}
        <section className="mb-10">
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/clavier.gif"
              alt="clavier"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              Comment aborder ce type de challenge ?
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              Ouvrir le fichier avec Wireshark et repérer les conversations
              actives
            </li>
            <li>
              Filtrer par protocole : <code>http</code>, <code>ftp</code>,{" "}
              <code>dns</code>, <code>tcp.port == 80</code>, etc.
            </li>
            <li>Suivre les flux TCP ou HTTP pour reconstituer une session</li>
            <li>
              Utiliser le menu <em>Export Objects</em> dans Wireshark pour
              extraire des fichiers
            </li>
            <li>
              Utiliser les DevTools (onglet Réseau) pour observer les échanges
              temps réel sur un site
            </li>
          </ul>
        </section>

        {/* Outils utiles */}
        <section className="mb-10">
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/outils.gif"
              alt="outils"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              Outils recommandés
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <span className="text-green-400">Wireshark</span> – Analyse
              détaillée de fichiers .pcap
            </li>
            <li>
              <span className="text-green-400">tcpdump</span> – Capture de
              paquets en ligne de commande
            </li>
            <li>
              <span className="text-green-400">Browser DevTools</span> – Analyse
              réseau des requêtes web
            </li>
            <li>
              <span className="text-green-400">NetworkMiner</span> – Analyse
              forensique des échanges réseau
            </li>
          </ul>
        </section>

        {/* Ressources */}
        <section>
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/livre.gif"
              alt="livre"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              Pour aller plus loin
            </h2>
          </div>
          <ul className="list-disc list-inside text-blue-400 space-y-1">
            <li>
              <a
                href="https://www.wireshark.org/docs/wsug_html_chunked/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Documentation officielle de Wireshark
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sophron/packet-forensics-challenges"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Exercices pratiques d’analyse de paquets
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
