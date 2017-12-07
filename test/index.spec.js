/* global describe it expect */

const htmlCreator = require('../lib/index');
const mockData = require('./_mockdata');

describe('Document', () => {
	describe('withBoilerplate', () => {
		it('should be able to create a HTML boilerplate when initializing', () => {
			const html = new htmlCreator().withBoilerplate([{ type: 'div', content: 'hello there' }]);
			expect(html.renderHTML()).toEqual(mockData.boilerPlateHtml);
		});
	});
});
