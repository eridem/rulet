/// <reference path="../typings/tsd.d.ts"/>
"use strict";
var SingleSettingsSingleTags_1 = require('../src/parsers/SingleSettingsSingleTags');
var chai_1 = require('chai');
describe('SingleSettingsSingleTags', function () {
    var parser;
    beforeEach(function () {
        parser = new SingleSettingsSingleTags_1.SingleSettingsSingleTags();
    });
    describe('satisface', function () {
        it('should accept an object and an array of tags', function () {
            var satisface = parser.satisfaces(null, [{ a: 1, b: 2 }, ['a', 'b']]);
            chai_1.expect(satisface).to.be.true;
        });
        it('should accept an object and an array of tags only', function () {
            var satisface = parser.satisfaces(null, null);
            chai_1.expect(satisface).to.be.false;
            satisface = parser.satisfaces(null, ['text', ['a']]);
            chai_1.expect(satisface).to.be.false;
            satisface = parser.satisfaces(null, ['text']);
            chai_1.expect(satisface).to.be.false;
            satisface = parser.satisfaces(null, [['a', 'b']]);
            chai_1.expect(satisface).to.be.false;
            satisface = parser.satisfaces(null, [null, ['a', 'b']]);
            chai_1.expect(satisface).to.be.false;
            satisface = parser.satisfaces(null, ['text', null]);
            chai_1.expect(satisface).to.be.false;
        });
    });
});
