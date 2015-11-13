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


    function buildEvolutionGraph(jsVarName, propertyName) {
        var graph = [
             ['Turn']
            ];

        for (var i = 0; i < game.playerOrder.length; i++) {
            graph[0].push(game.playerOrder[i]);
        }

        for (var j = 0; j < game.turns.length; j++) {
            var turn = game.turns[j];

            var turnForGraph = [];
            turnForGraph.push(j);

            for (i = 0; i < game.playerOrder.length; i++) {
                var player = game.playerOrder[i];

                var propertyValue = turn.players[player][propertyName];

                if (propertyValue) {
                    turnForGraph.push(propertyValue);
                }
            }

            graph.push(turnForGraph);
        }

        var asString = JSON.stringify(graph);

        return '<script>var ' + jsVarName + ' = ' + asString + ';</script>';
    }

    game.stats.graphs = {
        score: function () {
            return buildEvolutionGraph('gameGraphsScore', 'score');
        },
        diceByPlayer: function () {
            var gameGraphsScore = [
             ['Dice'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'], ['10'], ['11'], ['12']
            ];

            var i, j;

            for (i = 0; i < game.playerOrder.length; i++) {
                gameGraphsScore[0].push(game.playerOrder[i]);

                for (j = 1; j < 12; j++) {
                    gameGraphsScore[j].push(0);
                }
            }

            logger.info(JSON.stringify(gameGraphsScore));

            for (i = 1; i < game.turns.length; i++) {
                var turn = game.turns[i];

                for (j = 0; j < game.playerOrder.length; j++) {
                    var player = game.playerOrder[j];
                    var dice = turn.players[player].dice;
                    if (dice) {
                        var index = dice - 1;
                        var arrayForDice = gameGraphsScore[index];
                        arrayForDice[j + 1] = arrayForDice[j + 1] + 1;
                    }
                }
            }

            var asString = JSON.stringify(gameGraphsScore);

            return '<script>var gameGraphsDiceByPlayer = ' + asString + ';</script>';
        }
    };

    var page = fs.readFileSync("./src/html/html-formatter.html", "utf8");

    var template = handlebars.compile(page);

    var html = template(game);

    console.log(html);
};
