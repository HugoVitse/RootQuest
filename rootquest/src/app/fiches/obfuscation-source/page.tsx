export default function ObfuscationCodeSourcePage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Obfuscation encodée dans le code source
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
            C’est une technique utilisée pour cacher des données dans le code
            source d’une page web (HTML, JavaScript), souvent en les encodant en
            base64, en les chiffrant, ou en les rendant volontairement
            illisibles. Cela peut masquer un mot de passe, une URL ou même un
            script entier afin de tromper l’utilisateur ou ralentir l’analyse.
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
            Voici un exemple où un mot de passe est encodé en base64 dans le
            code JavaScript :
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`// Dans le code source
let encodedPassword = "cGFzc3dvcmQxMjM=";
let password = atob(encodedPassword); // "password123"`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            En inspectant le code source, un attaquant peut rapidement décoder
            ces données avec <code>atob()</code> ou tout outil de décodage
            base64.
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
            <li>Un attaquant peut récupérer des données sensibles encodées</li>
            <li>
              Une fausse impression de sécurité (l'encodage n'est pas du
              chiffrement)
            </li>
            <li>Peut dissimuler du code malveillant (malwares, backdoors)</li>
            <li>Empêche les audits de sécurité efficaces</li>
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
              Ne jamais inclure de données sensibles dans le code côté client
            </li>
            <li>
              Utiliser des API sécurisées côté serveur pour manipuler les
              données
            </li>
            <li>
              Analyser le code source à la recherche d'encodages suspects
              (base64, eval, etc.)
            </li>
            <li>
              Utiliser un Content Security Policy (CSP) pour limiter l'exécution
              de scripts non sûrs
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
              <span className="text-green-400">Inspecteur du navigateur</span>{" "}
              pour visualiser le code JavaScript
            </li>
            <li>
              <span className="text-green-400">CyberChef</span> pour décoder des
              données (base64, hex, etc.)
            </li>
            <li>
              <span className="text-green-400">Burp Suite</span> pour détecter
              les payloads masqués dans les réponses
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
                href="https://gchq.github.io/CyberChef/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                CyberChef – Outil d’analyse et de décodage
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/fr/docs/Web/API/WindowBase64/Base64_encoding_and_decoding"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                MDN – Base64 Encoding & Decoding
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
