export default function ReverseEngineeringPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Reverse Engineering
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
            Le Reverse Engineering (ou ingénierie inverse) est le processus qui
            consiste à analyser un produit ou un système pour en comprendre son
            fonctionnement, souvent dans le but d'extraire des informations ou
            de reproduire un modèle sans avoir accès au code source ou à la
            conception originale. Cette pratique est couramment utilisée dans le
            domaine de la sécurité informatique pour découvrir des
            vulnérabilités, dans le piratage de logiciels, et pour l'analyse de
            malware.
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
            Un exemple classique de Reverse Engineering serait l'analyse d'un
            programme binaire compilé (comme un fichier .exe sur Windows) pour
            comprendre comment il fonctionne. Cela peut inclure l'examen du code
            machine généré à partir du code source d'origine. Des outils comme{" "}
            <strong>IDA Pro</strong>, <strong>Ghidra</strong>, ou{" "}
            <strong>OllyDbg</strong> peuvent être utilisés pour décompiler ou
            désassembler le programme et en examiner le comportement.
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`ghidra -open <fichier.binaire>`}</code>
          </pre>
          <p className="text-gray-300 mt-4">
            En utilisant des outils comme{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded">Ghidra</code>, un
            ingénieur en reverse engineering peut analyser le programme et en
            extraire des informations telles que des algorithmes secrets ou des
            clés de chiffrement utilisées dans le logiciel.
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
            Le Reverse Engineering peut être dangereux si utilisé à des fins
            malveillantes, par exemple pour découvrir des vulnérabilités dans un
            programme afin de l'exploiter. Cela peut également permettre
            d'extraire des secrets commerciaux ou de contourner des mécanismes
            de protection comme des licences logicielles ou des DRM.
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <li>
              Exploitation des vulnérabilités pour exécuter des attaques
              malveillantes
            </li>
            <li>
              Vol de propriété intellectuelle (extraction de secrets
              commerciaux)
            </li>
            <li>
              Contournement de protections logicielles (piratage de logiciels)
            </li>
            <li>
              Injection de code malveillant dans des systèmes pour compromettre
              leur sécurité
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
          <p className="text-gray-300 mb-2">
            Voici quelques stratégies pour se protéger contre le reverse
            engineering :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              <strong className="text-blue-400">Obfuscation du code</strong> :
              modifier le code pour le rendre difficile à comprendre tout en
              conservant son fonctionnement.
            </li>
            <li>
              <strong className="text-blue-400">
                Chiffrement des données sensibles
              </strong>{" "}
              : s'assurer que les données critiques sont chiffrées, afin
              qu'elles soient inutilisables en cas d'extraction via reverse
              engineering.
            </li>
            <li>
              <strong className="text-blue-400">
                Utilisation de DRM (Digital Rights Management)
              </strong>{" "}
              : pour limiter la distribution non autorisée ou le piratage de
              logiciels.
            </li>
            <li>
              <strong className="text-blue-400">
                Vérification de l'intégrité des fichiers
              </strong>{" "}
              : utiliser des méthodes pour vérifier si un fichier a été modifié
              de manière suspecte, comme les signatures numériques.
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
            Voici quelques outils utilisés en reverse engineering pour analyser
            et comprendre des programmes :
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>
              <span className="text-green-400">IDA Pro</span> : un des outils
              les plus populaires pour l'analyse de binaires, offrant une
              interface de désassemblage et de décompilation.
            </li>
            <li>
              <span className="text-green-400">Ghidra</span> : un framework
              open-source de reverse engineering développé par la NSA, utilisé
              pour l'analyse de logiciels.
            </li>
            <li>
              <span className="text-green-400">OllyDbg</span> : un débogueur
              pour Windows, souvent utilisé pour l'analyse dynamique des
              binaires.
            </li>
            <li>
              <span className="text-green-400">Radare2</span> : une suite
              d'outils open-source pour l'analyse statique et dynamique de
              binaires.
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
            Voici quelques ressources pour approfondir vos connaissances sur le
            Reverse Engineering :
          </p>
          <ul className="list-disc list-inside text-blue-400 space-y-1">
            <li>
              <a
                href="https://www.hex-rays.com/products/ida/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                IDA Pro - Official Website
              </a>
            </li>
            <li>
              <a
                href="https://ghidra-sre.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Ghidra - Official Website
              </a>
            </li>
            <li>
              <a
                href="https://www.owasp.org/index.php/Reverse_Engineering"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                OWASP Reverse Engineering Resources
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
