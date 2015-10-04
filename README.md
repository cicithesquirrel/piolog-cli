# Description

Interface en ligne de commande pour [piolog](https://github.com/cicithesquirrel/piolog).

# Commandes utiles

## NPM

  * Exécuter en ligne de commande : `npm run main -- [args]`
  * Déboguer avec Chrome : `npm run debug -- [args]`

Voir les commandes dans le fichier `package.json`.

## Gulp

  * Nettoyer les fichiers générés : `gulp clean`
  * Construire la version minifiée : `gulp scripts`
    * Le résultat est dans `./build`

Voir les commandes dans le fichier `gulpfile.js`.

# Structure du projet

  * `src/js` : Sources
    * `piolog-cli.js` : Programme en ligne de commande
  * `log4js-config.json` : Exemple de configuration des loggers
  * `.jshintrc` : Configuration JSHint
  * `.gitignore` : Configuration Git
  * `gulpfile.js` : Script de build Gulp
  * `package.json` : Configuration NPM
  * `README.md` : Documentation du module

# Installation

  * Exécuter un checkout Git de [piolog](https://github.com/cicithesquirrel/piolog)
  * Exécuter un checkout Git de [piolog-cli](https://github.com/cicithesquirrel/piolog-cli)
  * Dans le répertoire de `piolog-cli`, exécuter `npm install /path/to/piolog` puis `npm install` pour installer les autres dépendances