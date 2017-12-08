/* global describe it expect */

const Document = require('../src/document.js');
const mockData = require('./_mockdata');

describe('Document', () => {
	describe('class constructor', () => {
		it('should be able to execute successfully', () => {
			const document = new Document();
			expect(document.content).toEqual([]);
		});
	});

	describe('getHTML', () => {
		it('should successfully return a string containing HTML', () => {
			const document = new Document(mockData.contentObject);
			const html = document.getHTML();
			expect(html).toEqual('<!DOCTYPE html><html><body style="padding: 1rem"><div class="first-div"><span class="button" style="padding: 5px;background-color: #eee;">A Button Span Deluxe</span></div><table><td id="first" class="button">I am in a table!</td><td>I am in a table too!</td></table></body></html>'); // eslint-disable-line
		});
	});

	describe('getContentInHTML', () => {
		it('should successfully create and return the content in HTML', () => {
			const document = new Document(mockData.contentObject);
			const content = document.getContentInHTML();
			expect(content).toEqual('<body style="padding: 1rem"><div class="first-div"><span class="button" style="padding: 5px;background-color: #eee;">A Button Span Deluxe</span></div><table><td id="first" class="button">I am in a table!</td><td>I am in a table too!</td></table></body>'); // eslint-disable-line
		});
	});

	describe('setContent', () => {
		it('should set the content object of the document', () => {
			const document = new Document();
			document.setContent(mockData.contentObject);
			expect(document.content).toEqual(mockData.contentObject);
		});
		it('should throw an error if invalid content was provided', () => {
			expect.assertions(1);
			const document = new Document();
			document.setContent({});
			expect(document.content).toEqual([]);
		});
	});

	describe('findElementByType', () => {
		it('should return a single object if there is only one match', () => {
			const document = new Document(mockData.contentObject);
			expect(document.findElementByType('span')).toEqual({
				type: 'span',
				attributes: {
					class: 'button',
					style: 'padding: 5px;background-color: #eee;',
				},
				content: 'A Button Span Deluxe',
			});
		});
		it('should return an array if there are multiple matches', () => {
			const document = new Document(mockData.contentObject);
			expect(document.findElementByType('td')).toEqual([
				{
					type: 'td',
					attributes: {
						id: 'first',
						class: 'button',
					},
					content: 'I am in a table!',
				},
				{
					type: 'td',
					content: 'I am in a table too!',
				},
			]);
		});
		it('should return null if there were no matches', () => {
			const document = new Document(mockData.contentObject);
			expect(document.findElementByType('nothing')).toBeNull();
		});
	});

	describe('findElementById', () => {
		it('should return a single object if there is only one match', () => {
			const document = new Document(mockData.contentObject);
			expect(document.findElementById('first')).toEqual({
				type: 'td',
				attributes: {
					id: 'first',
					class: 'button',
				},
				content: 'I am in a table!',
			});
		});
		it('should return null if there were no matches', () => {
			const document = new Document(mockData.contentObject);
			expect(document.findElementById('nothing')).toBeNull();
		});
	});

	describe('findElementByClassName', () => {
		it('should return a single object if there is only one match', () => {
			const document = new Document(mockData.contentObject);
			expect(document.findElementByClassName('first-div')).toEqual({
				type: 'div',
				attributes: {
					class: 'first-div',
				},
				content: [
					{
						type: 'span',
						attributes: {
							class: 'button',
							style: 'padding: 5px;background-color: #eee;',
						},
						content: 'A Button Span Deluxe',
					},
				],
			});
		});
		it('should return an array if there are multiple matches', () => {
			const document = new Document(mockData.contentObject);
			expect(document.findElementByClassName('button')).toEqual([
				{
					type: 'span',
					attributes: {
						class: 'button',
						style: 'padding: 5px;background-color: #eee;',
					},
					content: 'A Button Span Deluxe',
				},
				{
					type: 'td',
					attributes: {
						id: 'first',
						class: 'button',
					},
					content: 'I am in a table!',
				},
			]);
		});
		it('should return null if there were no matches', () => {
			const document = new Document(mockData.contentObject);
			expect(document.findElementByClassName('nothing')).toBeNull();
		});
	});

	describe('setTitle', () => {
		it('should be able to set a title on a document with an existing title tag', () => {
			const document = new Document([
				{
					type: 'head',
					content: [
						{
							type: 'title',
							content: 'Title',
						},
					],
				},
			]);
			document.setTitle('New title');
			expect(document.findElementByType('title')).toEqual({
				type: 'title',
				content: 'New title',
			});
		});
		it('should be able to set a title on a document with a HEAD tag but no title tag', () => {
			const document = new Document([
				{
					type: 'head',
				},
			]);
			document.setTitle('New title');
			expect(document.findElementByType('title')).toEqual({
				type: 'title',
				content: 'New title',
			});
		});
		it('should be able to set a title on a document with no HEAD tag', () => {
			const document = new Document([
				{
					type: 'body',
				},
			]);
			document.setTitle('New title');
			expect(document.findElementByType('title')).toEqual({
				type: 'title',
				content: 'New title',
			});
		});
	});

	describe('withBoilerplate', () => {
		it('should set the content to the boilerplate', () => {
			const document = new Document();
			document.withBoilerplate([
				{ type: 'div', content: 'hello there' },
			]);
			const html = document.getHTML();
			expect(html).toEqual(mockData.boilerPlateHtml);
		});
	});

	describe('addElement', () => {
		it('should add element data to the content', () => {
			const document = new Document().addElement({ type: 'div', content: 'hello there' });
			expect(document.content).toEqual([{ type: 'div', content: 'hello there' }]);
		});
		it('should be able to add an array of elements', () => {
			const document = new Document().addElement([
				{ type: 'div', content: 'hello there' },
				{ type: 'div', content: 'hello there again' },
			]);
			expect(document.content).toEqual([{ type: 'div', content: 'hello there' }, { type: 'div', content: 'hello there again' }]);
		});
		it('should be chainable', () => {
			const document = new Document()
				.addElement({ type: 'div', content: 'hello there' })
				.addElement({ type: 'div', content: 'hello there again' });
			expect(document.content).toEqual([{ type: 'div', content: 'hello there' }, { type: 'div', content: 'hello there again' }]);
		});
	});

	describe('addElementToTarget', () => {
		it('should add element data to a specified element ID that has string content', () => {
			const document = new Document([{ type: 'div', attributes: { id: 'anId' }, content: 'hello there' }]);
			document.addElementToTarget({
				type: 'span', content: 'in here',
			}, { id: 'anId' });
			expect(document.content).toEqual([{
				type: 'div',
				attributes: { id: 'anId' },
				content: [
					{ content: 'hello there' },
					{ type: 'span', content: 'in here' },
				] }]);
		});

		it('should add element data to a specified element ID that has no content', () => {
			const document = new Document([{ type: 'div', attributes: { id: 'anId' } }]);
			document.addElementToTarget({
				type: 'span', content: 'in here',
			}, { id: 'anId' });
			expect(document.content).toEqual([{
				type: 'div',
				attributes: { id: 'anId' },
				content: [
					{ type: 'span', content: 'in here' },
				] }]);
		});

		it('should add element data to a specified element ID that has content', () => {
			const document = new Document([{ type: 'div', attributes: { id: 'anId' }, content: [{ content: 'hello there' }] }]);
			document.addElementToTarget({
				type: 'span', content: 'in here',
			}, { id: 'anId' });
			expect(document.content).toEqual([{
				type: 'div',
				attributes: { id: 'anId' },
				content: [
					{ content: 'hello there' },
					{ type: 'span', content: 'in here' },
				] }]);
		});

		it('should add element data to all elements of given Class', () => {
			const document = new Document([
				{
					type: 'div',
					attributes: { class: 'aClass' },
					content: [{ content: 'hello there' }],
				},
				{
					type: 'div',
					attributes: { class: 'aClass' },
					content: [{ content: 'hello there 2' }],
				},
			]);
			document.addElementToTarget({
				type: 'span', content: 'in here',
			}, { class: 'aClass' });
			expect(document.content).toEqual([
				{
					type: 'div',
					attributes: { class: 'aClass' },
					content: [{ content: 'hello there' }, { type: 'span', content: 'in here' }],
				},
				{
					type: 'div',
					attributes: { class: 'aClass' },
					content: [{ content: 'hello there 2' }, { type: 'span', content: 'in here' }],
				},
			]);
		});
	});

	describe('addElementToClass', () => {
		it('should add element data to all elements of given Class', () => {
			const document = new Document([
				{
					type: 'div',
					attributes: { class: 'aClass' },
					content: [{ content: 'hello there' }],
				},
				{
					type: 'div',
					attributes: { class: 'aClass' },
					content: [{ content: 'hello there 2' }],
				},
			]);
			document.addElementToClass('aClass', {
				type: 'span', content: 'in here',
			});
			expect(document.content).toEqual([
				{
					type: 'div',
					attributes: { class: 'aClass' },
					content: [{ content: 'hello there' }, { type: 'span', content: 'in here' }],
				},
				{
					type: 'div',
					attributes: { class: 'aClass' },
					content: [{ content: 'hello there 2' }, { type: 'span', content: 'in here' }],
				},
			]);
		});
	});

	describe('addElementToId', () => {
		it('should add element data to a specified element ID', () => {
			const document = new Document([{ type: 'div', attributes: { id: 'anId' }, content: 'hello there' }]);
			document.addElementToId('anId', {
				type: 'span', content: 'in here',
			});
			expect(document.content).toEqual([{
				type: 'div',
				attributes: { id: 'anId' },
				content: [
					{ content: 'hello there' },
					{ type: 'span', content: 'in here' },
				] }]);
		});
	});

	describe('addElementToType', () => {
		it('should add element data to all elements of given HTML type', () => {
			const document = new Document([
				{ type: 'div', content: [{ content: 'hello there' }] },
				{ type: 'div', content: [{ content: 'hello there 2' }] },
			]);
			document.addElementToType('div', { type: 'span', content: 'in here' });
			expect(document.content).toEqual([
				{
					type: 'div',
					content: [{ content: 'hello there' }, { type: 'span', content: 'in here' }],
				},
				{
					type: 'div',
					content: [{ content: 'hello there 2' }, { type: 'span', content: 'in here' }],
				},
			]);
		});
	});
});
