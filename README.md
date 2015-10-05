# Description

Interface en ligne de commande pour [piolog](https://github.com/cicithesquirrel/piolog). Génère un rapport dans un format textuel à partir du log d'une partie. Les formats possibles sont :
  * JSON : obtenu avec l'API standard `JSON.stringify()` éventuellement indenté avec [js-beautify](https://www.npmjs.com/package/js-beautify) ;
  * HTML : obtenu par templating [{{Mustache}}](http://mustache.github.io/) et incluant un graphique [Google Charts API](https://developers.google.com/chart/) pour les statistiques.

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

  * `src` : Sources
    * `js/piolog-cli.js` : Programme en ligne de commande
    * `html/html-formatter.html` : Modèle de page HTML pour le rendu dans ce format
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