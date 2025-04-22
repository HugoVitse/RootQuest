export default function SQLInjectionPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">SQL Injection</h1>

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
            Une injection SQL (ou SQLi) est une faille de sécurité qui survient
            lorsqu'une application web ne filtre pas correctement les données
            saisies par l'utilisateur avant de les insérer dans une requête SQL.
            Un attaquant peut alors injecter du code SQL malveillant afin de
            manipuler directement la base de données : lire des données
            sensibles, contourner une authentification ou même supprimer des
            tables entières. C’est l’une des vulnérabilités les plus anciennes
            et les plus critiques sur le web.
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
            Voici une requête SQL classique utilisée pour vérifier les
            identifiants d'un utilisateur lors d'une connexion :
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`SELECT * FROM users WHERE username = 'axel' AND password = '1234';`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            Si le développeur ne filtre pas les entrées, un attaquant pourrait
            écrire ceci dans le champ "nom d'utilisateur" :
            <code className="bg-gray-800 px-2 py-1 rounded ml-1">
              {" "}
              ' OR 1=1 --{" "}
            </code>
          </p>
          <p className="text-gray-300 mt-2">
            Cela transformerait la requête en :
          </p>
          <pre className="bg-gray-900 text-red-400 p-4 rounded-lg text-sm overflow-x-auto mt-2">
            <code>{`SELECT * FROM users WHERE username = '' OR 1=1 --' AND password = '...'`}</code>
          </pre>
          <p className="text-gray-300 mt-2">
            La condition <span className="text-yellow-400">1=1</span> étant
            toujours vraie, l’accès est accordé même sans mot de passe valide.
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
            Une injection SQL réussie peut avoir de lourdes conséquences pour
            une application web :
          </p>
          <p className="text-gray-300 mt-4">
            Elle permet par exemple de se connecter à n’importe quel compte sans
            mot de passe, voire à un compte administrateur. Un attaquant peut
            également explorer toute la base de données, copier des informations
            personnelles, modifier ou supprimer des enregistrements, voire
            exécuter des commandes système dans les cas les plus graves
            (notamment sur des bases comme MySQL avec certaines fonctions
            activées).
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
            Il existe plusieurs bonnes pratiques pour se prémunir des injections
            SQL :
          </p>
          <p className="text-gray-300 mt-2">
            La plus efficace est d’utiliser des{" "}
            <strong className="text-blue-400">requêtes préparées</strong> (ou
            "prepared statements") qui séparent le code SQL des données
            insérées, empêchant toute interprétation malveillante. Il est aussi
            essentiel d’échapper les entrées utilisateur, d’utiliser des ORM
            fiables (comme Prisma ou Sequelize), et de limiter les permissions
            des utilisateurs SQL : inutile qu’un compte puisse supprimer des
            tables si ce n’est pas son rôle.
          </p>
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
            Voici quelques outils que tu peux utiliser pour simuler ou détecter
            des injections SQL :
          </p>
          <p className="text-gray-300 mt-2">
            <span className="text-green-400">sqlmap</span> est l’outil de
            référence pour l’automatisation de ce type d’attaque. Il permet
            d’exploiter une faille en quelques secondes.
          </p>
          <p className="text-gray-300 mt-2">
            <span className="text-green-400">Burp Suite</span> est un proxy web
            très utilisé en pentest. Il permet d’intercepter les requêtes HTTP
            et de tester des charges malveillantes.
          </p>
          <p className="text-gray-300 mt-2">
            <span className="text-green-400">OWASP ZAP</span> est une
            alternative gratuite à Burp, parfaite pour débuter dans le scan
            d'applications web.
          </p>
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
            Si tu veux approfondir le sujet, voici deux ressources très
            complètes :
          </p>
          <ul className="list-disc list-inside text-blue-400 space-y-1">
            <li>
              <a
                href="https://owasp.org/www-community/attacks/SQL_Injection"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                OWASP – SQL Injection
              </a>
            </li>
            <li>
              <a
                href="https://portswigger.net/web-security/sql-injection"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                PortSwigger Academy – SQL Injection
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
