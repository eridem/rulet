/// <reference path="../typings/tsd.d.ts"/>

import { SingleSettingsSingleTags } from '../src/parsers/SingleSettingsSingleTags'
import { expect } from 'chai';
import * as Mocha from 'mocha';

describe('SingleSettingsSingleTags', () => {
	let parser : SingleSettingsSingleTags;

	beforeEach(() => {
		parser = new SingleSettingsSingleTags();
	});

	describe('satisface', () => {
		it('should accept an object and an array of tags', () => {
            let satisface = parser.satisfaces(null, [{ a: 1, b: 2}, ['a', 'b']]);
			expect(satisface).to.be.true;
		});
        it('should accept an object and an array of tags only', () => {
            let satisface = parser.satisfaces(null, null);
			expect(satisface).to.be.false;

            satisface = parser.satisfaces(null, ['text', ['a']]);
			expect(satisface).to.be.false;

            satisface = parser.satisfaces(null, ['text']);
			expect(satisface).to.be.false;

            satisface = parser.satisfaces(null, [['a', 'b']]);
			expect(satisface).to.be.false;

            satisface = parser.satisfaces(null, [null, ['a', 'b']]);
			expect(satisface).to.be.false;

            satisface = parser.satisfaces(null, ['text', null]);
			expect(satisface).to.be.false;
		});
	});
});