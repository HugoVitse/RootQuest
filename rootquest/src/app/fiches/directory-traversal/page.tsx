export default function DirectoryTraversalPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Directory Traversal
        </h1>

        {/* Définition */}
        <section className="mb-10">
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/question.gif"
              alt="question"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              Qu'est-ce que c'est ?
            </h2>
          </div>
          <p className="text-gray-300">
            Le Directory Traversal est une vulnérabilité qui permet à un
            attaquant d'accéder à des fichiers et répertoires situés en dehors
            des répertoires autorisés d'une application web. Cela peut entraîner
            la divulgation de fichiers sensibles du serveur, comme des fichiers
            de configuration, des mots de passe ou des clés privées. Ce type
            d'attaque repose souvent sur une mauvaise gestion des entrées
            utilisateurs dans les chemins de fichiers.
          </p>
        </section>

        {/* Exemple */}
        <section className="mb-10">
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/loupe.gif"
              alt="loupe"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              Exemple simple
            </h2>
          </div>
          <p className="text-gray-300 mb-2">
            Imaginons un site web qui permet à un utilisateur de télécharger des
            fichiers via une URL, en donnant simplement le nom du fichier à
            télécharger :
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`https://monsite.com/download?file=rapport.pdf`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            Le serveur concatène le nom du fichier avec un chemin de base pour
            accéder au fichier sur le serveur :
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`readFile("/var/www/files/" + fichier);`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            Un utilisateur malveillant pourrait alors modifier l'URL pour
            accéder à des fichiers sensibles en dehors du dossier autorisé :
          </p>
          <pre className="bg-gray-900 text-red-400 p-4 rounded-lg text-sm overflow-x-auto mt-2">
            <code>{`https://monsite.com/download?file=../../../../etc/passwd`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            Le serveur lit le fichier demandé sans vérification, ce qui permet à
            l'attaquant d'accéder à des fichiers systèmes sensibles.
          </p>
        </section>

        {/* Risques */}
        <section className="mb-10">
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/alarme.gif"
              alt="alarme"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              Pourquoi c’est dangereux ?
            </h2>
          </div>
          <p className="text-gray-300">
            Une attaque de Directory Traversal peut avoir des conséquences
            graves, comme :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <li>Accès non autorisé à des fichiers sensibles du serveur</li>
            <li>
              Exfiltration de données confidentielles, comme des mots de passe
              ou des clés
            </li>
            <li>
              Modification de fichiers systèmes critiques pour l’application
            </li>
            <li>
              Exécution d'autres attaques en chaîne, comme des escalades de
              privilèges
            </li>
          </ul>
          <p className="text-gray-300 mt-4">
            Les attaques de Directory Traversal peuvent être difficiles à
            détecter et à prévenir sans des mécanismes de sécurité appropriés en
            place.
          </p>
        </section>

        {/* Défenses */}
        <section className="mb-10">
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/bouclier.gif"
              alt="bouclier"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              Comment s’en protéger ?
            </h2>
          </div>
          <p className="text-gray-300 mb-2">
            Voici plusieurs bonnes pratiques pour se protéger contre les
            attaques de Directory Traversal :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              <strong className="text-blue-400">
                Valider les entrées utilisateur
              </strong>{" "}
              : s'assurer que le chemin du fichier ne contient pas de séquences
              comme <code className="bg-gray-800 px-1 py-0.5 rounded">../</code>
            </li>
            <li>
              <strong className="text-blue-400">
                Limiter les fichiers accessibles
              </strong>{" "}
              : ne permettre l'accès qu'à des répertoires spécifiques et
              contrôlés, comme{" "}
              <code className="bg-gray-800 px-1 py-0.5 rounded">
                /var/www/files/
              </code>
              .
            </li>
            <li>
              <strong className="text-blue-400">
                Utiliser des chemins absolus
              </strong>{" "}
              : utiliser des chemins absolus plutôt que des chemins relatifs
              pour éviter toute manipulation.
            </li>
            <li>
              <strong className="text-blue-400">
                Restreindre les permissions
              </strong>{" "}
              : s'assurer que les fichiers sensibles ne sont accessibles que par
              les utilisateurs et processus autorisés.
            </li>
          </ul>
        </section>

        {/* Outils */}
        <section className="mb-10">
          <div className="flex items-center mb-2">
            <img
              src="/fiches-gif/outils.gif"
              alt="outils"
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-2xl font-semibold text-yellow-400">
              Outils pour tester
            </h2>
          </div>
          <p className="text-gray-300 mb-2">
            Voici quelques outils utiles pour tester les vulnérabilités de
            Directory Traversal :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              <span className="text-green-400">Burp Suite</span> : utile pour
              tester les chemins de fichiers et manipuler les paramètres d'URL.
            </li>
            <li>
              <span className="text-green-400">DirBuster</span> : outil pour
              brute-forcer les répertoires et détecter les chemins vulnérables.
            </li>
            <li>
              <span className="text-green-400">Nikto</span> : scanner de
              vulnérabilités web qui détecte également les problèmes de
              Directory Traversal.
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
          <p className="text-gray-300 mb-2">
            Voici quelques ressources de qualité pour approfondir les attaques
            de Directory Traversal :
          </p>
          <ul className="list-disc list-inside text-blue-400 space-y-1">
            <li>
              <a
                href="https://owasp.org/www-community/attacks/Path_Traversal"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                OWASP – Directory Traversal
              </a>
            </li>
            <li>
              <a
                href="https://portswigger.net/web-security/file-inclusion/directory-traversal"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                PortSwigger – Directory Traversal
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
