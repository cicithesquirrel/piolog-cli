"use strict";

var test = require('unit.js');
var contentbuffer = require('../../src/js/contentbuffer');

describe('"ContentBuffer" tests', function () {

    it('New content buffer is empty', function () {

        var cb = new contentbuffer.ContentBuffer();

        test.bool(cb.isEmpty()).isTrue();
    });

    it('Empty buffer size', function () {

        var cb = new contentbuffer.ContentBuffer();

        test.number(cb.size).is(0);
    });

    it('Empty buffer content', function () {

        var cb = new contentbuffer.ContentBuffer();

        test.string(cb.getTempBufferContent()).is('');
    });

    it('Append content to empty buffer', function () {

        var cb = new contentbuffer.ContentBuffer();

        cb.append(new Buffer('abc def\nghi jkl '), 16);

        test.number(cb.size).is(16);
    });

    it('Non-empty buffer is not empty', function () {

        var cb = new contentbuffer.ContentBuffer();
        cb.append(new Buffer('abc def\nghi jkl '), 16);

        test.bool(cb.isEmpty()).isFalse();
    });

    it('Non-empty buffer size', function () {

        var cb = new contentbuffer.ContentBuffer();
        cb.append(new Buffer('abc def\nghi jkl '), 16);

        test.number(cb.size).is(16);
    });

    it('Append content to non-empty buffer', function () {

        var cb = new contentbuffer.ContentBuffer();
        cb.append(new Buffer('abc def\nghi jkl '), 16);

        cb.append(new Buffer('mno pqr\nstu vwx '), 16);

        test.number(cb.size).is(32);
    });

    it('Content of non-empty buffer', function () {

        var cb = new contentbuffer.ContentBuffer();
        cb.append(new Buffer('abc def\nghi jkl '), 16);

        test.string(cb.getTempBufferContent()).is('abc def\nghi jkl ');
    });

    it('Get one line of text when buffer contains one', function () {

        var cb = new contentbuffer.ContentBuffer();
        cb.append(new Buffer('abc def\nghi jkl '), 16);

        test.string(cb.getOneLineFromTempBuffer()).is('abc def');

        test.number(cb.size).is(8);
    });

    it('Get one line of text when buffer does not contain one', function () {

        var cb = new contentbuffer.ContentBuffer();
        cb.append(new Buffer('abc def ghi jkl '), 16);

        test.value(cb.getOneLineFromTempBuffer()).isUndefined();

        test.number(cb.size).is(16);
    });

    it('Get one line of text when buffer is empty', function () {

        var cb = new contentbuffer.ContentBuffer();

        test.value(cb.getOneLineFromTempBuffer()).isUndefined();
    });

    it('Size of cleared already empty buffer', function () {

        var cb = new contentbuffer.ContentBuffer();

        cb.clear();

        test.number(cb.size).is(0);
    });

    it('Size of cleared non-empty buffer', function () {

        var cb = new contentbuffer.ContentBuffer();
        cb.append(new Buffer('abc def ghi jkl '), 16);

        cb.clear();

        test.number(cb.size).is(0);
    });

});
