const _ = require('lodash');
const Element = require('./element.js');

const parseElements = (input) => {
	let output = '';
	if (input && input.constructor === Array) {
		input.forEach(element => {
			output += Element.create(element);
		});
	}
	return output;
};

class Document {
	constructor(content) {
		this.setContent(content);
	}

	setContent(content) {
		this.content = content;
	}

	renderHTML() {
		return `<!DOCTYPE html><html>${parseElements(this.content)}</html>`;
	}
}

module.exports = Document;
