"use strict";

var log4js = require('log4js');
var mustache = require('mustache');
var fs = require('fs');
var piolog = require('piolog');

var logger = log4js.getLogger("piolog.formatter.html");

exports.format = function (game, options) {

    game.stats.nthTurnLabel = function () {
        var numberOfTurns = game.turns.length - 1;
        var label = '' + numberOfTurns;
        if (numberOfTurns % 10 === 1) {
            label = label + 'st';
        } else if (numberOfTurns % 10 === 2) {
            label = label + 'nd';
        } else {
            label = label + 'th';
        }
        return label;
    };

    var page = fs.readFileSync("./src/html/html-formatter.html", "utf8");

    var html = mustache.to_html(page, game);

    console.log(html);
};
