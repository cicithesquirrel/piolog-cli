"use strict";

var piolog = require('piolog');
var fs = require('fs');
var program = require('commander');
var log4js = require('log4js');
var Buffer = require('buffer').Buffer;
var jsonformatter = require('./json-formatter');
var htmlformatter = require('./html-formatter');

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
var input = fs.openSync(program.args[0], 'r');

var currentLine = '';

function nextLogFileLine() {

    logger.trace('currentLine: ' + currentLine);

    var retval;

    var indexOfCR = currentLine.indexOf('\n');

    if (indexOfCR < 0) {

        var eof = false;
        var bufferSize = 128;
        var buffer = new Buffer(bufferSize);

        while (indexOfCR < 0 && !eof) {

            var bytesRead = fs.readSync(input, buffer, 0, bufferSize);

            var bufferAsString = buffer.toString(undefined, 0, bytesRead);

            logger.trace('buffer: "' + bufferAsString + '" with size: ' + bytesRead);

            eof = (bytesRead < bufferSize);

            currentLine = currentLine + bufferAsString;

            indexOfCR = currentLine.indexOf('\n');
        }
    }

    logger.trace('indexOfCR: ' + indexOfCR);

    if (indexOfCR >= 0) {
        retval = currentLine.substring(0, indexOfCR);
        currentLine = currentLine.substring(indexOfCR + 1, currentLine.length);
    } else if (currentLine.trim() !== '') {
        retval = currentLine;
        currentLine = '';
    }

    logger.trace('retval: ' + retval);

    return retval;
}

// parse file
var game = piolog.parse(nextLogFileLine);

// close fine
fs.closeSync(input);

var formatter = formatters[program.format];

var formatOptions = [];
if (program.formatopt) {
    formatOptions = program.formatopt.split(',');
}

formatter.format(game, formatOptions);
