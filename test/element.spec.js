/* global describe it expect */

const Element = require('../src/element.js');
const mockData = require('./_mockdata');

describe('Element', () => {
	describe('create', () => {
		it('should return a rendered HTML element', () => {
			const element = Element.create(mockData.singleElement);
			expect(element).toEqual('<div class="some-class">Single div</div>');
		});
	});

	describe('applyAttributes', () => {
		it('should return a string with the HTML attributes', () => {
			const attributeString = Element.applyAttributes({
				class: 'new',
				dataTest: 'test',
			});
			expect(attributeString).toEqual(' class="new" data-test="test"');
		});
	});
});
