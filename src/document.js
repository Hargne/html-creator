const Element = require('./element.js');
const Tools = require('./tools');

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
	 * Parses the content and returns the rendered elements
	 */
	parseContent() {
		let output = '';
		if (this.content && this.content.constructor === Array) {
			this.content.forEach(element => {
				output += Element.create(element);
			});
		}
		return output;
	}

	/**
	 * Finds and returns an element by type.
	 * Returns null if not found.
	 * @param {String} needle
	 */
	findElementByType(needle) {
		return Tools.searchForElement({ stack: this.content, type: needle });
	}
	/**
	 * Finds and returns an element by ID.
	 * Returns null if not found.
	 * @param {String} needle
	 */
	findElementById(needle) {
		return Tools.searchForElement({ stack: this.content, id: needle });
	}
	/**
	 * Finds and returns an element by class.
	 * Returns null if not found.
	 * @param {String} needle
	 */
	findElementByClassName(needle) {
		return Tools.searchForElement({ stack: this.content, className: needle });
	}

	/**
	 * Returns the content in HTML as a string
	 */
	getHTML() {
		return `<!DOCTYPE html>${this.parseContent()}</html>`;
	}
}

module.exports = Document;
