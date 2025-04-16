export default function PrivilegeEscalationPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Escalade de Privilèges (Privilege Escalation)
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
            L'escalade de privilèges est une technique utilisée par un attaquant
            pour obtenir des privilèges plus élevés ou un accès à des ressources
            normalement protégées. Cela peut se produire de deux manières :
            l'escalade de privilèges horizontale (accès à d'autres comptes avec
            des privilèges similaires) ou l'escalade de privilèges verticale
            (accès à des privilèges plus élevés, comme l'administrateur).
            L'escalade de privilèges peut se produire sur un système local ou à
            distance et est souvent le résultat de failles dans les systèmes de
            gestion des permissions ou dans des logiciels mal sécurisés.
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
            Imaginons un système avec des utilisateurs ayant des privilèges
            différents : un utilisateur avec des privilèges limités et un autre
            avec des privilèges d'administrateur. Un attaquant, en exploitant
            une vulnérabilité dans un service qui fonctionne avec des privilèges
            élevés, peut réussir à élever ses privilèges pour exécuter des
            actions normalement interdites.
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`sudo <commande>`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            En utilisant la commande{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded">sudo</code> avec
            une commande malveillante, un utilisateur de niveau inférieur peut
            exécuter des actions administratives.
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
            L'escalade de privilèges peut causer des dommages considérables :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <li>Accès non autorisé à des informations sensibles</li>
            <li>Modification des configurations systèmes critiques</li>
            <li>
              Exécution de commandes malveillantes affectant l'ensemble du
              système
            </li>
            <li>
              Installation de logiciels malveillants ou backdoors pour un accès
              persistant
            </li>
          </ul>
          <p className="text-gray-300 mt-4">
            Ces attaques sont particulièrement dangereuses sur des serveurs ou
            dans des environnements de production.
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
            Voici quelques bonnes pratiques pour limiter les risques d'escalade
            de privilèges :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              <strong className="text-blue-400">
                Minimiser les privilèges
              </strong>{" "}
              : appliquer le principe du moindre privilège pour limiter l'accès
              des utilisateurs aux ressources essentielles.
            </li>
            <li>
              <strong className="text-blue-400">
                Utiliser des mécanismes de contrôle d'accès renforcés
              </strong>{" "}
              : utiliser des ACL (Access Control Lists) et des rôles bien
              définis pour chaque utilisateur.
            </li>
            <li>
              <strong className="text-blue-400">
                Mettre à jour régulièrement les logiciels
              </strong>{" "}
              : appliquer des patchs de sécurité pour corriger les
              vulnérabilités connues dans les systèmes ou logiciels utilisés.
            </li>
            <li>
              <strong className="text-blue-400">
                Utiliser l'audit et la surveillance
              </strong>{" "}
              : mettre en place des systèmes de logs et de surveillance pour
              détecter toute activité suspecte en temps réel.
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
            Voici quelques outils pour tester les vulnérabilités liées à
            l'escalade de privilèges :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              <span className="text-green-400">LinPEAS</span> : outil de
              reconnaissance pour détecter les vulnérabilités locales permettant
              l'escalade de privilèges.
            </li>
            <li>
              <span className="text-green-400">GTFOBins</span> : base de données
              d'outils qui peuvent être utilisés pour contourner les
              restrictions et obtenir des privilèges élevés.
            </li>
            <li>
              <span className="text-green-400">
                Privilege Escalation Awesome List
              </span>{" "}
              : une liste de ressources, outils et techniques pour l'escalade de
              privilèges.
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
            Voici quelques ressources pour approfondir vos connaissances sur
            l'escalade de privilèges :
          </p>
          <ul className="list-disc list-inside text-blue-400 space-y-1">
            <li>
              <a
                href="https://book.hacktricks.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                HackTricks - Privilege Escalation
              </a>
            </li>
            <li>
              <a
                href="https://www.exploit-db.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Exploit-DB - Escalade de privilèges
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
