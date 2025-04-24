export default function LoginSourceLeakPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Fuite d'identifiants dans le code source (Login PHP)
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
            Il s'agit d'une mauvaise pratique de développement dans laquelle les
            identifiants de connexion (nom d'utilisateur et mot de passe) sont
            présents directement dans le code source HTML d'une page web. Cela
            signifie que n'importe quel utilisateur peut les retrouver en
            inspectant le code de la page via son navigateur.
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
            Voici un exemple de code HTML mal conçu visible dans le navigateur :
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`<!-- Identifiants dans le code source -->
<!-- username: admin -->
<!-- password: azerty123 -->

<form method="POST" action="login.php">
  <input type="text" name="username" placeholder="Nom d'utilisateur" />
  <input type="password" name="password" placeholder="Mot de passe" />
  <button type="submit">Se connecter</button>
</form>`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            Un simple clic droit puis "Afficher le code source" permet à un
            attaquant de récupérer les identifiants et de se connecter sans
            effort.
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
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <li>Accès non autorisé à des pages protégées</li>
            <li>Compromission d’un compte administrateur</li>
            <li>Fuite de données sensibles stockées dans l'application</li>
            <li>
              Utilisation de ces identifiants sur d'autres services (recyclage
              de mots de passe)
            </li>
          </ul>
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
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              Ne jamais stocker d'identifiants dans le code HTML ou JavaScript
              côté client
            </li>
            <li>
              Utiliser une base de données sécurisée pour stocker les
              identifiants (hashés)
            </li>
            <li>
              Configurer un système de gestion d'utilisateurs avec sessions
              sécurisées
            </li>
            <li>
              Faire des revues de code régulières pour détecter les fuites
              d’informations
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
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              <span className="text-green-400">Navigateur Web</span> :
              inspecteur d’éléments pour lire le code source
            </li>
            <li>
              <span className="text-green-400">Burp Suite</span> : pour
              surveiller les échanges et voir si des infos fuitent
            </li>
            <li>
              <span className="text-green-400">WhatWeb</span> : outil de
              reconnaissance des technologies et fuites d’infos
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
                href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                OWASP Authentication Cheat Sheet
              </a>
            </li>
            <li>
              <a
                href="https://www.php.net/manual/fr/features.http-auth.php"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                PHP.net – Authentification HTTP
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
