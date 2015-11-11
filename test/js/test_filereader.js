"use strict";

var test = require('unit.js');
var filereader = require('../../src/js/filereader');

describe('"filereader" tests', function () {

    describe('"ContentBuffer" tests', function () {

        it('New content buffer is empty', function () {

            var cb = new filereader.ContentBuffer();

            test.bool(cb.isEmpty()).isTrue();

            test.string(cb.getTempBufferContent()).is('');
        });

    });

    describe('"FileReader" tests', function () {
        // TODO FileReader tests
    });

});
