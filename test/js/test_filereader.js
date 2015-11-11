"use strict";

var test = require('unit.js');
var filereader = require('../../src/js/filereader');


describe('"FileReader" tests', function () {

    it('New file reader is not opened', function () {

        var fr = new filereader.FileReader('inexistent_file');

        test.bool(fr.isOpened()).isFalse();
    });

    it('Opened file is opened', function () {

        var fr = new filereader.FileReader('test/data/empty_file');
        fr.open();

        test.bool(fr.isOpened()).isTrue();

        fr.close();
    });

    it('Closed file is not opened', function () {

        var fr = new filereader.FileReader('test/data/empty_file');
        fr.open();
        fr.close();

        test.bool(fr.isOpened()).isFalse();
    });

    it('File is not EOF when just opened', function () {

        var fr = new filereader.FileReader('test/data/empty_file');
        fr.open();

        test.bool(fr.isEndOfFile()).isFalse();

        fr.close();
    });

    it('Read empty file reaches EOF', function () {

        var fr = new filereader.FileReader('test/data/empty_file');
        fr.open();

        var line = fr.readLine();
        test.string(line).is('');

        test.bool(fr.isEndOfFile()).isTrue();

        fr.close();
    });

    it('Read three lines of a file', function () {

        var fr = new filereader.FileReader('test/data/five_lines_file');
        fr.open();

        var line;

        test.bool(fr.isEndOfFile()).isFalse();

        line = fr.readLine();
        test.string(line).is('07:20:20 Connexion à localhost, port 5556');
        test.bool(fr.isEndOfFile()).isFalse();

        line = fr.readLine();
        test.string(line).is('07:20:20 Le joueur 3 s\'appelle maintenant cyril.');
        test.bool(fr.isEndOfFile()).isFalse();

        line = fr.readLine();
        test.string(line).is('07:20:20 Le joueur 1 s\'appelle maintenant Bach.');
        test.bool(fr.isEndOfFile()).isFalse();

        fr.close();
    });

    it('Read all lines of a file', function () {

        var fr = new filereader.FileReader('test/data/five_lines_file');
        fr.open();

        var line;

        line = fr.readLine();
        test.string(line).is('07:20:20 Connexion à localhost, port 5556');

        line = fr.readLine();
        test.string(line).is('07:20:20 Le joueur 3 s\'appelle maintenant cyril.');

        line = fr.readLine();
        test.string(line).is('07:20:20 Le joueur 1 s\'appelle maintenant Bach.');

        line = fr.readLine();
        test.string(line).is('07:20:20 Le joueur 0 s\'appelle maintenant Coolio.');

        line = fr.readLine();
        test.string(line).is('07:20:20 Le joueur 2 s\'appelle maintenant Saddam Hussein.');

        test.bool(fr.isEndOfFile()).isTrue();

        fr.close();
    });
});
