/// <reference path="../typings/tsd.d.ts"/>
"use strict";
var Parsers_1 = require('./parsers/Parsers');
var Util = require('util');
var Rulet = (function () {
    function Rulet() {
        var _this = this;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i - 0] = arguments[_i];
        }
        this._parsers = new Array();
        this._parsers.push(new Parsers_1.SingleSettingsSingleTags());
        this._parsers.forEach(function (argumentInit) {
            if (argumentInit.satisfaces(_this, params)) {
                _this._currentParser = argumentInit;
            }
        });
        if (!this._currentParser) {
            throw new Error("Could not start Rulet with these arguments: " + JSON.stringify(params));
        }
    }
    Rulet.prototype.getConfiguration = function () {
        return this._currentParser.getConfiguration();
    };
    Rulet.prototype.createConfiguration = function (obj, tags) {
        if (obj === null || obj === undefined || tags === null || tags === undefined || typeof obj !== 'object' || !Util.isArray(tags)) {
            return null;
        }
        var result = {};
        var tag = this.createVirtualTags(tags);
        for (var condition in obj) {
            var newCondition = this.createConditionWithVirtualTags(condition);
            var satisfaces = eval("(" + newCondition + ")");
            if (satisfaces) {
                Object.assign(result, obj[condition]);
            }
        }
        return result;
    };
    Rulet.prototype.createConditionWithVirtualTags = function (oldCondition) {
        if (!oldCondition)
            return "";
        return oldCondition.replace(/([\w]+[\w\d]*)/g, "tag.$1");
    };
    Rulet.prototype.createVirtualTags = function (tags) {
        if (!(tags instanceof Array)) {
            return null;
        }
        var result = {};
        tags.forEach(function (tag) { result[tag] = true; });
        return result;
    };
    return Rulet;
}());
module.exports = Rulet;
