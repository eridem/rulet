/// <reference path="../typings/tsd.d.ts"/>
"use strict";
var chai_1 = require('chai');
var Rulet = require('../src/index');
describe('SingleSettingsSingleTags', function () {
    var rulet;
    beforeEach(function () {
        rulet = new Rulet({}, []);
    });
    describe('createConfiguration', function () {
        it('should accept a configuration object and array of tags', function () {
            var config = rulet.createConfiguration({}, []);
            chai_1.expect(config).to.deep.equal({});
        });
        it('should accept a configuration object and array of tags only', function () {
            var config = rulet.createConfiguration(null, null);
            chai_1.expect(config).to.be.null;
            config = rulet.createConfiguration({}, null);
            chai_1.expect(config).to.be.null;
            config = rulet.createConfiguration(null, []);
            chai_1.expect(config).to.be.null;
            config = rulet.createConfiguration('wrong', null);
            chai_1.expect(config).to.be.null;
            config = rulet.createConfiguration(null, 'wrong');
            chai_1.expect(config).to.be.null;
        });
        it('should return the first condition', function () {
            var tags = ['myTag1'];
            var results = [{ a: 1, b: 2, c: { d: 3, e: 4 } }];
            var finalResult = results[0];
            var rules = {};
            for (var i = 0; i < tags.length; i++) {
                rules[("" + tags[i])] = results[i];
            }
            var config = rulet.createConfiguration(rules, tags);
            chai_1.expect(config).to.eql(finalResult);
            config = rulet.createConfiguration(rules, []);
            chai_1.expect(config).to.not.eql(finalResult);
        });
        it('should combine two conditions', function () {
            var tags = ['myTag1', 'myTag2'];
            var results = [{ a: 1, b: 2, c: { d: 3, e: 4 } }, { d: 5 }];
            var finalResult = { a: 1, b: 2, c: { d: 3, e: 4 }, d: 5 };
            var rules = {};
            for (var i = 0; i < tags.length; i++) {
                rules[("" + tags[i])] = results[i];
            }
            var config = rulet.createConfiguration(rules, tags);
            chai_1.expect(config).to.eql(finalResult);
            config = rulet.createConfiguration(rules, []);
            chai_1.expect(config).to.not.eql(finalResult);
        });
        it('should ignore one condition', function () {
            var tags = ['myTag1', 'myTag2'];
            var results = [{ a: 1, b: 2, c: { d: 3, e: 4 } }, { d: 5 }];
            var tagToCompare = [tags[0]];
            var finalResult = results[0];
            var rules = {};
            for (var i = 0; i < tags.length; i++) {
                rules[("" + tags[i])] = results[i];
            }
            var config = rulet.createConfiguration(rules, tagToCompare);
            chai_1.expect(config).to.eql(finalResult);
            config = rulet.createConfiguration(rules, []);
            chai_1.expect(config).to.not.eql(finalResult);
        });
        it('should work with OR conditions', function () {
            var tags = ['myTag1', 'myTag2'];
            var result = { a: 1, b: 2, c: { d: 3, e: 4 } };
            var rules = {};
            rules[(tags[0] + " || " + tags[1])] = result;
            var config = rulet.createConfiguration(rules, tags);
            chai_1.expect(config).to.eql(result);
            config = rulet.createConfiguration(rules, [tags[0]]);
            chai_1.expect(config).to.eql(result);
            config = rulet.createConfiguration(rules, [tags[1]]);
            chai_1.expect(config).to.eql(result);
            config = rulet.createConfiguration(rules, []);
            chai_1.expect(config).to.not.eql(result);
        });
        it('should work with AND conditions', function () {
            var tags = ['myTag1', 'myTag2'];
            var result = { a: 1, b: 2, c: { d: 3, e: 4 } };
            var rules = {};
            rules[(tags[0] + " && " + tags[1])] = result;
            var config = rulet.createConfiguration(rules, tags);
            chai_1.expect(config).to.eql(result);
            config = rulet.createConfiguration(rules, [tags[0]]);
            chai_1.expect(config).to.not.eql(result);
            config = rulet.createConfiguration(rules, [tags[1]]);
            chai_1.expect(config).to.not.eql(result);
            config = rulet.createConfiguration(rules, []);
            chai_1.expect(config).to.not.eql(result);
        });
    });
});
