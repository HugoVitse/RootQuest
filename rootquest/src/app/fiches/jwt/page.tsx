export default function JwtManipulationPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Modification d’un JWT
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
              Qu’est-ce qu’un JWT ?
            </h2>
          </div>
          <p className="text-gray-300">
            Un <strong>JWT</strong> (JSON Web Token) est un jeton
            d’authentification contenant trois parties :{" "}
            <code>header.payload.signature</code>. Il est utilisé pour
            transmettre des informations (ex: rôle admin, user ID) de manière
            sécurisée entre un client et un serveur. Mal configuré, il peut être
            modifié facilement.
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
              Exemple typique
            </h2>
          </div>
          <p className="text-gray-300 mb-4">Un JWT ressemblant à ceci :</p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>
              {`eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJyb2xlIjogInVzZXIifQ.dummysignature`}
            </code>
          </pre>
          <p className="text-gray-300 mt-4">
            En modifiant <code>role: "user"</code> en <code>role: "admin"</code>{" "}
            et en utilisant une faiblesse de vérification côté serveur, on peut
            accéder à des ressources administrateur.
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
            <li>
              Escalade de privilèges (passer de <code>user</code> à{" "}
              <code>admin</code>)
            </li>
            <li>Falsification d’identité</li>
            <li>
              Désactivation de la signature avec <code>alg: none</code>
            </li>
            <li>Signature faible ou connue (clé HMAC "secret")</li>
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
              Comment se protéger ?
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              Utiliser une signature forte et secrète (clé longue et aléatoire)
            </li>
            <li>
              Refuser les jetons non signés (<code>alg: none</code>)
            </li>
            <li>Ne jamais faire confiance au contenu du JWT côté client</li>
            <li>Vérifier les rôles et permissions côté serveur</li>
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
              Outils utiles
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              <span className="text-green-400">jwt.io</span> pour décoder,
              modifier et tester des JWT
            </li>
            <li>
              <span className="text-green-400">Burp Suite</span> pour
              intercepter les requêtes et modifier les tokens
            </li>
            <li>
              <span className="text-green-400">Postman</span> pour envoyer des
              requêtes avec jeton modifié
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
                href="https://portswigger.net/web-security/jwt"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                PortSwigger – Attaques sur les JWT
              </a>
            </li>
            <li>
              <a
                href="https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Auth0 – Best practices pour JWT
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
