"use strict";

var piolog = require('piolog');
var fs = require('fs');
var program = require('commander');
var log4js = require('log4js');
var Buffer = require('buffer').Buffer;
var jsonformatter = require('./json-formatter');
var htmlformatter = require('./html-formatter');
var filereader = require('./filereader');

var logger = log4js.getLogger("piolog.main");

program.version('1.0.0')
    .usage('[options] <pio log file>')
    .option('-f, --format <format>', 'Output format [json]', 'json', /^(json|html)$/i)
    .option('-o, --formatopt <options>', 'Output formatter options (comma separated list)')
    .parse(process.argv);


var formatters = {
    'json': jsonformatter,
    'html': htmlformatter
};

// open file
var input = filereader.FileReader(program.args[0]);
input.open();

function nextLogFileLine() {

    var currentLine = input.readLine();

    logger.trace('currentLine: ' + currentLine);

    return currentLine;
}

// parse file
var game = piolog.parse(nextLogFileLine);

// close file
input.close();

var formatter = formatters[program.format];

var formatOptions = [];
if (program.formatopt) {
    formatOptions = program.formatopt.split(',');
}

formatter.format(game, formatOptions);
