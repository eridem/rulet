/// <reference path="../typings/tsd.d.ts"/>

import * as Models from '../src/rulet.d';
import { Rulet } from '../src/index'
import { expect } from 'chai';
import * as Mocha from 'mocha';

describe('SingleSettingsSingleTags', () => {
    let rulet: Models.IRulet;

    beforeEach(() => {
        rulet = new Rulet({}, []);
    });

    describe('createConfiguration', () => {

        it('should accept a configuration object and array of tags', () => {
            let config = rulet.createConfiguration({}, []);
            expect(config).to.deep.equal({});
        });

        it('should accept a configuration object and array of tags only', () => {
            let config = rulet.createConfiguration(null, null);
            expect(config).to.be.null;

            config = rulet.createConfiguration({}, null);
            expect(config).to.be.null;

            config = rulet.createConfiguration(null, []);
            expect(config).to.be.null;

            config = rulet.createConfiguration('wrong', null);
            expect(config).to.be.null;

            config = rulet.createConfiguration(null, 'wrong');
            expect(config).to.be.null;
        });

        it('should return the first condition', () => {
            let tags = ['myTag1'];
            let results = [{ a: 1, b: 2, c: { d: 3, e: 4 } }];
            let finalResult = results[0];
            let rules = {};

            for (let i = 0; i < tags.length; i++) {
                rules[`${tags[i]}`] = results[i];
            }

            let config = rulet.createConfiguration(rules, tags);
            expect(config).to.eql(finalResult);

            config = rulet.createConfiguration(rules, []);
            expect(config).to.not.eql(finalResult);
        });

        it('should combine two conditions', () => {
            let tags = ['myTag1', 'myTag2'];
            let results = [{ a: 1, b: 2, c: { d: 3, e: 4 } }, { d: 5 }];
            let finalResult = { a: 1, b: 2, c: { d: 3, e: 4 }, d: 5 };
            let rules = {};

            for (let i = 0; i < tags.length; i++) {
                rules[`${tags[i]}`] = results[i];
            }

            let config = rulet.createConfiguration(rules, tags);
            expect(config).to.eql(finalResult);

            config = rulet.createConfiguration(rules, []);
            expect(config).to.not.eql(finalResult);
        });

        it('should ignore one condition', () => {
            let tags = ['myTag1', 'myTag2'];
            let results = [{ a: 1, b: 2, c: { d: 3, e: 4 } }, { d: 5 }];
            let tagToCompare = [ tags[0] ];
            let finalResult = results[0];
            let rules = {};

            for (let i = 0; i < tags.length; i++) {
                rules[`${tags[i]}`] = results[i];
            }

            let config = rulet.createConfiguration(rules, tagToCompare);
            expect(config).to.eql(finalResult);

            config = rulet.createConfiguration(rules, []);
            expect(config).to.not.eql(finalResult);
        });

        it('should work with OR conditions', () => {
            let tags = ['myTag1', 'myTag2'];
            let result = { a: 1, b: 2, c: { d: 3, e: 4 } };
            let rules = {};

            rules[`${tags[0]} || ${tags[1]}`] = result;

            let config = rulet.createConfiguration(rules, tags);
            expect(config).to.eql(result);

            config = rulet.createConfiguration(rules, [tags[0]]);
            expect(config).to.eql(result);

            config = rulet.createConfiguration(rules, [tags[1]]);
            expect(config).to.eql(result);

            config = rulet.createConfiguration(rules, []);
            expect(config).to.not.eql(result);
        });

        it('should work with AND conditions', () => {
            let tags = ['myTag1', 'myTag2'];
            let result = { a: 1, b: 2, c: { d: 3, e: 4 } };
            let rules = {};

            rules[`${tags[0]} && ${tags[1]}`] = result;

            let config = rulet.createConfiguration(rules, tags);
            expect(config).to.eql(result);

            config = rulet.createConfiguration(rules, [tags[0]]);
            expect(config).to.not.eql(result);

            config = rulet.createConfiguration(rules, [tags[1]]);
            expect(config).to.not.eql(result);

            config = rulet.createConfiguration(rules, []);
            expect(config).to.not.eql(result);
        });
    });
});