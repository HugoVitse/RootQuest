export default function EncodageDoublePage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Encodages imbriqués et dissimulés
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
              Qu’est-ce que c’est ?
            </h2>
          </div>
          <p className="text-gray-300">
            Dans certains challenges, les informations sensibles ne sont pas
            visibles directement dans le code source. Elles peuvent être cachées
            sous forme de chaînes encodées plusieurs fois, en utilisant des
            systèmes d'encodage populaires comme <strong>Base64</strong> ou{" "}
            <strong>Base58</strong>.
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
            Identifier des chaînes de caractères suspectes dans le code source
            ou dans le comportement d’une page web, puis les{" "}
            <strong>analyser</strong> et les <strong>décoder</strong>{" "}
            intelligemment pour révéler leur contenu réel.
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
            <li>
              Présence de chaînes étranges ou très longues dans le code source
            </li>
            <li>
              Caractères typiques des encodages (lettres, chiffres, pas de
              symboles)
            </li>
            <li>
              Doublons ou motifs cachés dans les variables JavaScript ou les
              commentaires HTML
            </li>
            <li>
              Des noms de fonctions ou variables qui évoquent une transformation
              ou un encodage
            </li>
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
            <li>Analyser le code source HTML, JS ou les requêtes réseau</li>
            <li>
              Utiliser des outils ou des scripts pour tester différents
              décodages
            </li>
            <li>Essayer d’imbriquer plusieurs décodages, dans le bon ordre</li>
            <li>
              Rester attentif à toute transformation non évidente (code
              compressé, ofuscation simple...)
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
              <span className="text-green-400">CyberChef</span> – Outil visuel
              pour enchaîner des opérations d’encodage/décodage
            </li>
            <li>
              <span className="text-green-400">Base58/64 decoder</span> –
              Disponible en ligne ou en librairies Python (ex:{" "}
              <code>base58</code>, <code>base64</code>)
            </li>
            <li>
              <span className="text-green-400">DevTools navigateur</span> – Pour
              analyser le DOM, les scripts et les requêtes
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
                CyberChef – The Cyber Swiss Army Knife
              </a>
            </li>
            <li>
              <a
                href="https://en.bitcoin.it/wiki/Base58Check_encoding"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Base58 – Bitcoin Wiki
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
