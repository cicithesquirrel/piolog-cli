"use strict";

var log4js = require('log4js');
var fs = require('fs');
var contentbuffer = require('./contentbuffer');

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
        buffer: new contentbuffer.ContentBuffer(encoding),

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
