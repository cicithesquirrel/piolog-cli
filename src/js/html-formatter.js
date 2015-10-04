"use strict";

var log4js = require('log4js');
var mustache = require('mustache');
var fs = require('fs');

var logger = log4js.getLogger("piolog.formatter.html");

exports.format = function (game, options) {



    /*var demoData = {
        records: [{
            "name": "Steve Balmer",
            "company": "Microsoft",
            "systems": [{
                "os": "Windows XP"
        }, {
                "os": "Vista"
        }, {
                "os": "Windows 7"
        }, {
                "os": "Windows 8"
        }]
    }, {
            "name": "Steve Jobs",
            "company": "Apple",
            "systems": [{
                "os": "OSX Lion"
        }, {
                "os": "OSX Leopard"
        }, {
                "os": "IOS"
        }]
    }, {
            "name": "Mark Z.",
            "company": "Facebook"
    }]
    };*/

    game.stats = {
        nthTurnLabel: function () {
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
        }
    };

    game.utils = {
        colonyLabel: function () {
            return this.colony > 1 ? 'colonies' : 'colony';
        }
    };

    var page = fs.readFileSync("./src/html/html-formatter.html", "utf8");

    var html = mustache.to_html(page, game);

    console.log(html);
};
