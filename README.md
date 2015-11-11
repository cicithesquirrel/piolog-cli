# Description

Interface en ligne de commande pour [piolog](https://github.com/cicithesquirrel/piolog). Génère un rapport dans un format textuel à partir du log d'une partie. Les formats possibles sont :
  * JSON : obtenu avec l'API standard `JSON.stringify()` éventuellement indenté avec [js-beautify](https://www.npmjs.com/package/js-beautify) ;
  * HTML : obtenu par templating [Handlebars](http://handlebarsjs.com/) et incluant un graphique [Google Charts API](https://developers.google.com/chart/) pour les statistiques.

# Commandes utiles

## NPM

  * Exécuter en ligne de commande : `npm run main -- [args]`
  * Déboguer avec Chrome : `npm run debug -- [args]`
  * Exécuter les tests : `npm test`
  * Exécuter les tests avec mesure de la couverture de code : `npm run cover`
    * Le rapport est `coverage/lcov-report/index.html`

Voir les commandes dans le fichier `package.json`.

## Gulp

  * Nettoyer les fichiers générés : `gulp clean`
  * Construire la version minifiée : `gulp scripts`
    * Le résultat est dans `./build`

Voir les commandes dans le fichier `gulpfile.js`.

# Structure du projet

  * `src` : Sources
    * `js/piolog-cli.js` : Programme en ligne de commande
    * `js/html-formatter.js` : Génération d'un rapport au format HTML
    * `js/json-formatter.js` : Génération d'un rapport au format JSON
    * `js/contentbuffer.js` : API pour un buffer en mémoire (utilisé pour la lecture du fichier de log d'une partie)
    * `js/filereader.js` : API pour la lecture du fichier de log d'une partie
    * `html/html-formatter.html` : Modèle de page HTML pour le rendu dans ce format
  * `test` : Tests et fichiers de test
  * `.gitignore` : Configuration Git
  * `.jshintrc` : Configuration JSHint
  * `gulpfile.js` : Script de build Gulp
  * `LICENSE` : Fichier de licence
  * `log4js-config.json` : Exemple de configuration des loggers
  * `package.json` : Configuration NPM
  * `README.md` : Documentation du module

# Installation

  * Exécuter un checkout Git de [piolog](https://github.com/cicithesquirrel/piolog)
  * Exécuter un checkout Git de [piolog-cli](https://github.com/cicithesquirrel/piolog-cli)
  * Dans le répertoire de `piolog-cli`, exécuter `npm install /path/to/piolog` puis `npm install` pour installer les autres dépendances