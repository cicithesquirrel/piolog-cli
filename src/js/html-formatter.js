"use strict";

var log4js = require('log4js');
var handlebars = require('handlebars');
var fs = require('fs');
var piolog = require('piolog');

var logger = log4js.getLogger("piolog.formatter.html");

exports.format = function (game, options) {

    game.stats.nthTurnLabelAsHtml = function () {
        var numberOfTurns = game.turns.length - 1;
        var label = '' + numberOfTurns;
        if (numberOfTurns % 10 === 1) {
            label = label + '<sup>st</sup>';
        } else if (numberOfTurns % 10 === 2) {
            label = label + '<sup>nd</sup>';
        } else {
            label = label + '<sup>th</sup>';
        }
        return label;
    };

    var page = fs.readFileSync("./src/html/html-formatter.html", "utf8");

    var template = handlebars.compile(page);

    var html = template(game);

    console.log(html);
};
