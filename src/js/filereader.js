"use strict";

var log4js = require('log4js');
var fs = require('fs');

var logger = log4js.getLogger("piolog.filereader");


function assertMustBeOpened(reader) {
    if (!reader.isOpened()) {
        throw Error('File is not opened');
    }
}

function assertMustNotBeOpened(reader) {
    if (reader.isOpened()) {
        throw Error('File is already opened');
    }
}

exports.ContentBuffer = function (encoding) {
    return {
        buffer: new Buffer(0),
        size: 0,
        encoding: encoding,

        getTempBufferContent: function () {
            var retval;
            if (this.size > 0) {
                retval = this.buffer.toString(this.encoding, 0, this.size);
            } else {
                retval = '';
            }
            return retval;
        },


        getOneLineFromTempBuffer: function () {
            var contentAsString = this.getTempBufferContent();

            var indexOfCR = contentAsString.indexOf('\n');

            var retval;
            if (indexOfCR >= 0) {
                retval = contentAsString.substring(0, indexOfCR);
                var consumedBytes = Buffer.byteLength(retval, this.encoding) + 1;
                this.buffer = this.buffer.slice(consumedBytes);
                this.size = this.size - consumedBytes;
            } else {
                retval = undefined;
            }
            return retval;
        },

        clear: function () {
            this.size = 0;
        },

        isEmpty: function () {
            return this.size === 0;
        },

        append: function (toAppend, toAppendSize) {
            if (this.size === 0) {
                this.buffer = new Buffer(toAppend);
                this.size = toAppendSize;
            } else {
                var currentContentBuffer = this.buffer.slice(0, this.size);
                var additionalContentBuffer = toAppend.slice(0, toAppendSize);
                this.buffer = Buffer.concat([currentContentBuffer, additionalContentBuffer]);
                this.size = this.size + toAppendSize;
            }
        }
    };
};




exports.FileReader = function (fileName, encoding, readBufferSize) {

    if (!encoding) {
        encoding = 'utf-8';
    }

    if (!readBufferSize) {
        readBufferSize = 32;
    }

    var tmpBuffer = new Buffer(readBufferSize);

    return {
        fileName: fileName,
        encoding: encoding,
        fd: null,
        eof: false,
        buffer: new exports.ContentBuffer(encoding),

        open: function () {
            assertMustNotBeOpened(this);
            this.fd = fs.openSync(this.fileName, 'r');
            this.eof = false;
        },

        isOpened: function () {
            return (this.fd !== null);
        },


        __readMoreBytes: function () {
            var readBytes = fs.readSync(this.fd, tmpBuffer, 0, readBufferSize);

            if (readBytes < readBufferSize) {
                this.eof = true;
            }

            this.buffer.append(tmpBuffer, readBytes);
        },

        readLine: function () {
            assertMustBeOpened(this);

            var retval = this.buffer.getOneLineFromTempBuffer();

            while (!retval && !this.eof) {
                this.__readMoreBytes();
                retval = this.buffer.getOneLineFromTempBuffer();
            }

            if (!retval && this.eof) {
                retval = this.buffer.getTempBufferContent();
                this.buffer.clear();
            }

            return retval;
        },
        isEndOfFile: function () {
            return this.eof;
        },
        close: function () {
            assertMustBeOpened(this);
            fs.closeSync(this.fd);
            this.fd = null;
        }
    };
};
