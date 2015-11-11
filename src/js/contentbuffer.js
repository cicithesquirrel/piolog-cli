"use strict";

var log4js = require('log4js');
var fs = require('fs');

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
