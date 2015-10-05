"use strict";

var log4js = require('log4js');
var beautifier = require('js-beautify');

var logger = log4js.getLogger("piolog.formatter.json");

exports.format = function (game, options) {

    var text = JSON.stringify(game);

    if (options.indexOf('beautify') >= 0) {
        text = beautifier.js_beautify(text);
    }

    console.log(text);
};
