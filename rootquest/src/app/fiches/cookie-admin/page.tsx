export default function CookieAdminPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Cookie Admin détecté
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
            Un cookie d’administration (souvent nommé <code>admin=true</code> ou
            similaire) est un cookie stocké dans le navigateur du client qui
            peut permettre de débloquer des droits ou fonctionnalités
            normalement réservés à un compte administrateur. Lorsqu’il n’est pas
            correctement sécurisé, il peut être modifié manuellement pour
            contourner les contrôles d’accès.
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
            Voici un exemple de cookie vulnérable accessible dans l’onglet «
            Application » d’un navigateur :
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`admin=true`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            En changeant cette valeur, un attaquant pourrait accéder à des pages
            protégées ou à des fonctions interdites.
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
            <li>Contournement des contrôles d’accès</li>
            <li>Élévation de privilèges non autorisée</li>
            <li>Modification facile avec les outils de développement</li>
            <li>Accès à des fonctionnalités d’administration sensibles</li>
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
            <li>Ne jamais stocker de logique métier dans les cookies</li>
            <li>
              Vérifier les droits d’accès côté serveur, indépendamment du cookie
            </li>
            <li>Signer les cookies avec une clé secrète (JWT ou HMAC)</li>
            <li>Utiliser des sessions sécurisées côté serveur</li>
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
              <span className="text-green-400">DevTools (F12)</span> dans
              l’onglet Application pour voir/modifier les cookies
            </li>
            <li>
              <span className="text-green-400">Burp Suite</span> pour
              intercepter et modifier les cookies à la volée
            </li>
            <li>
              <span className="text-green-400">EditThisCookie</span> (extension
              Chrome) pour manipuler facilement les cookies
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
                href="https://owasp.org/www-community/HttpOnly"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                OWASP – Sécurité des cookies
              </a>
            </li>
            <li>
              <a
                href="https://portswigger.net/web-security/authentication/design-flaws"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                PortSwigger – Cookie design flaws
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
