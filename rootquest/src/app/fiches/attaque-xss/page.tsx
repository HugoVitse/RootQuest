export default function XSSPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Cross-Site Scripting (XSS)
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
            Le Cross-Site Scripting (ou XSS) est une faille de sécurité qui
            permet à un attaquant d'injecter du code JavaScript malveillant dans
            une page web consultée par d'autres utilisateurs. Le but est
            généralement de voler des informations (comme des cookies de
            session), détourner l’interface utilisateur, rediriger vers des
            sites frauduleux ou encore exécuter des actions à la place de la
            victime. Cette vulnérabilité est très fréquente sur les sites
            dynamiques où les données utilisateurs sont affichées sans filtrage.
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
            Imaginons une page web qui permet aux utilisateurs de laisser un
            commentaire. Le site insère ensuite le texte directement dans le
            HTML sans le filtrer :
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`document.getElementById("zone-affichage-commentaires").innerHTML = commentaire;`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            Un utilisateur malveillant pourrait alors écrire ceci comme
            commentaire :
          </p>
          <pre className="bg-gray-900 text-red-400 p-4 rounded-lg text-sm overflow-x-auto mt-2">
            <code>{`<script>alert('XSS !');</script>`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            Quand un autre utilisateur visitera la page, le script sera exécuté
            automatiquement, déclenchant une alerte, ou pire : exfiltrant ses
            données.
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
            Une attaque XSS peut compromettre entièrement la sécurité d’un
            utilisateur :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <li>Vol de cookies de session pour se connecter à sa place</li>
            <li>
              Défiguration de l’interface ou injection de contenu trompeur
            </li>
            <li>Redirection automatique vers un site malveillant</li>
            <li>
              Envoi de requêtes à l’insu de l’utilisateur (CSRF combiné à XSS)
            </li>
          </ul>
          <p className="text-gray-300 mt-4">
            Les attaques XSS sont particulièrement dangereuses lorsqu'elles
            ciblent les administrateurs d'un site ou les interfaces internes.
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
            Voici plusieurs bonnes pratiques pour se prémunir des attaques XSS :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              <strong className="text-blue-400">Échapper le HTML</strong> : ne
              jamais afficher du texte utilisateur brut dans le DOM, sauf s’il a
              été encodé (avec des fonctions comme{" "}
              <code className="bg-gray-800 px-1 py-0.5 rounded">
                .textContent
              </code>{" "}
              au lieu de{" "}
              <code className="bg-gray-800 px-1 py-0.5 rounded">
                .innerHTML
              </code>
              ).
            </li>
            <li>
              <strong className="text-blue-400">
                Utiliser des frameworks sûrs
              </strong>{" "}
              : React, Vue et Angular encodent automatiquement les données
              injectées dans le HTML.
            </li>
            <li>
              <strong className="text-blue-400">
                Filtrer et valider les entrées
              </strong>{" "}
              : empêcher les balises dangereuses comme{" "}
              <code className="bg-gray-800 px-1 py-0.5 rounded">{`<script>`}</code>
              , <code className="bg-gray-800 px-1 py-0.5 rounded">onerror</code>
              , etc.
            </li>
            <li>
              <strong className="text-blue-400">
                Configurer une CSP (Content Security Policy)
              </strong>{" "}
              : empêche l'exécution de scripts non autorisés.
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
            Voici quelques outils utiles pour tester les vulnérabilités XSS :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              <span className="text-green-400">Burp Suite</span> : excellent
              pour injecter des charges XSS dans les paramètres et observer les
              réactions.
            </li>
            <li>
              <span className="text-green-400">XSStrike</span> : outil
              d’automatisation d’injections XSS avec analyse de contexte.
            </li>
            <li>
              <span className="text-green-400">OWASP ZAP</span> : scanner de
              vulnérabilités web open source qui détecte aussi les XSS.
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
            Voici quelques ressources de qualité pour approfondir les XSS :
          </p>
          <ul className="list-disc list-inside text-blue-400 space-y-1">
            <li>
              <a
                href="https://owasp.org/www-community/attacks/xss/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                OWASP – XSS
              </a>
            </li>
            <li>
              <a
                href="https://portswigger.net/web-security/cross-site-scripting"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                PortSwigger Academy – Cross-Site Scripting
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
