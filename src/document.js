const _ = require('lodash');
const Element = require('./element.js');

/**
 * Parses the content and returns the rendered elements
 * @param {Array} content
 */
const parseElements = (content) => {
	let output = '';
	if (content && content.constructor === Array) {
		content.forEach(element => {
			output += Element.create(element);
		});
	}
	return output;
};

/**
 * Search a stack for an element matching the given needle
 * @param {Array} stack
 * @param {String} type
 * @param {String} id
 * @param {String} className
 */
const searchForElement = ({ stack, type, id, className }) => {
	const result = [];

	if (stack && stack.constructor === Array) {
		// Look for matches and push to the result
		result.push(stack.filter(element => {
			if (type) { return element.type === type; }
			if (id) { return element.attributes && element.attributes.id === id; }
			if (className) { return element.attributes && element.attributes.className === className; }
			return null;
		}));
		// Loop through the content of the element and look for matches
		stack.forEach(element => {
			if (element.content && element.content.constructor === Array) {
				const deepSearch = searchForElement({ stack: element.content, type, id, className });
				if (deepSearch) { result.push(deepSearch); }
			}
		});
	}
	// Flatten result array or just return a single object
	const flatResult = _.flattenDeep(result);
	if (flatResult.length > 0) {
		if (flatResult.length === 1) {
			return flatResult[0];
		}
		return flatResult;
	}
	return null;
};

class Document {
	constructor(content) {
		this.setContent(content);
	}

	/**
	 * Sets the content of the Document
	 * @param {Array} content
	 */
	setContent(content) {
		this.content = content;
	}

	/**
	 * Finds and returns an element by type.
	 * Returns null if not found.
	 * @param {String} needle
	 */
	findElementByType(needle) {
		return searchForElement({ stack: this.content, type: needle });
	}
	/**
	 * Finds and returns an element by ID.
	 * Returns null if not found.
	 * @param {String} needle
	 */
	findElementById(needle) {
		return searchForElement({ stack: this.content, id: needle });
	}
	/**
	 * Finds and returns an element by class.
	 * Returns null if not found.
	 * @param {String} needle
	 */
	findElementByClassName(needle) {
		return searchForElement({ stack: this.content, className: needle });
	}

	/**
	 * Returns the content in HTML as a string
	 */
	getHTML() {
		return new Promise((resolve) => resolve(`<!DOCTYPE html>${parseElements(this.content)}</html>`));
	}
}

module.exports = Document;
