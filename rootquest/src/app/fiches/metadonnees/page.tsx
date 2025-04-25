export default function MetadonneesPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white font-sans px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          Exploitation des métadonnées
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
              Qu’est-ce que les métadonnées ?
            </h2>
          </div>
          <p className="text-gray-300">
            Les <strong>métadonnées</strong> sont des informations intégrées
            dans un fichier qui décrivent son contenu ou son historique (auteur,
            logiciel utilisé, chemin, date, etc). Elles sont souvent invisibles
            à l’œil nu mais peuvent révéler des données sensibles !
          </p>
        </section>

        {/* Exemple typique */}
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
          <p className="text-gray-300 mb-4">
            Un fichier PDF ou Word mis en ligne peut contenir :
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              Le nom d’utilisateur du créateur (souvent <code>nom.prenom</code>)
            </li>
            <li>Le logiciel utilisé (ex: Word 2016, Photoshop, etc.)</li>
            <li>
              Le chemin d’origine du fichier (
              <code>C:\Users\Admin\Documents\...</code>)
            </li>
            <li>La date de création ou modification</li>
          </ul>
          <p className="text-gray-300 mt-4">
            Ces infos peuvent aider un attaquant à profiler une cible ou à
            deviner des identifiants, chemins d'accès, etc.
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
            <li>Révélation de noms d’utilisateurs ou d’adresses email</li>
            <li>
              Fuite d’informations internes (répertoire réseau, version de
              logiciel)
            </li>
            <li>Aide à la phase de reconnaissance lors d’un pentest</li>
            <li>Exposition d’informations confidentielles involontaires</li>
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
              Supprimer les métadonnées avant publication (ex: via l’outil
              "Inspecter le document" dans Word)
            </li>
            <li>
              Utiliser des versions exportées sans métadonnées (ex: PDF "clean")
            </li>
            <li>
              Mettre en place une politique de contrôle avant publication de
              fichiers
            </li>
            <li>Sensibiliser les utilisateurs à ce risque</li>
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
              <span className="text-green-400">ExifTool</span> – Analyse
              complète de fichiers (images, PDF, DOCX...)
            </li>
            <li>
              <span className="text-green-400">strings</span> – Affiche les
              chaînes lisibles d’un fichier
            </li>
            <li>
              <span className="text-green-400">pdfinfo</span> – Analyse de
              fichiers PDF
            </li>
            <li>
              <span className="text-green-400">Mat2</span> – Outil Linux pour
              supprimer les métadonnées
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
                href="https://exiftool.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                ExifTool – Site officiel
              </a>
            </li>
            <li>
              <a
                href="https://wiki.archlinux.org/title/MAT2"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                MAT2 – Metadata Anonymisation Toolkit
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
