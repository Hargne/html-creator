/* global describe it expect */

const htmlCreator = require('../src/index');
const mockData = require('./_mockData');

describe('Index', () => {
	describe('withBoilerplate', () => {
		it('should be able to create a HTML boilerplate when initializing', () => {
			const html = new htmlCreator().withBoilerplate([{ type: 'div', content: 'hello there' }]);
			expect(html.renderHTML()).toEqual(mockData.boilerPlateHtml);
		});
	});

	describe('renderHTML', () => {
		it('should return the content with a surrounding HTML tag', () => {
			const html = new htmlCreator([{ type: 'div', content: 'hello there' }]);
			expect(html.renderHTML()).toEqual('<!DOCTYPE html><html><div>hello there</div></html>');
		});
		it('should only return the content if excludeHTMLtag is set', () => {
			const html = new htmlCreator([{ type: 'div', content: 'hello there' }]);
			expect(html.renderHTML({ excludeHTMLtag: true })).toEqual('<div>hello there</div>');
		});
	});

	describe('renderHTMLToFile', () => {
		it('should be able to render HTMl to a file', () => {
			const html = new htmlCreator().withBoilerplate([{ type: 'div', content: 'hello there' }]);
			return html.renderHTMLToFile('index.html').then(response => {
				expect(response.logMsg).toEqual('HTML-Creator >> HTML generated (index.html)');
			});
		});
		it('should log errors', () => {
			expect.assertions(1);
			const html = new htmlCreator().withBoilerplate([{ type: 'div', content: 'hello there' }]);
			return html.renderHTMLToFile().then(response => {
				expect(response.logMsg).toEqual('HTML-Creator >> A file path is required');
			});
		});
	});
});
