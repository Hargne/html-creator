const Element = require('./element.js');
const Tools = require('./tools');

class Document {
	constructor(content) {
		if (content) {
			this.setContent(content);
		}
	}

	/**
	 * Sets the content of the Document
	 * @param {Array} content
	 */
	setContent(content) {
		if (!content || content.constructor !== Array) {
			return Tools.logMessage('error', 'The content needs to be provided as an Array');
		}
		this.content = content;
		return content;
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
	 * Returns the content in HTML as a string
	 */
	getHTML() {
		return `<!DOCTYPE html>${this.parseContent()}</html>`;
	}

	/**
	 * Helper function to set the title of the document
	 * @param {String} newTitle
	 */
	setTitle(newTitle) {
		// Begin by searching for an existing title tag
		const titleTag = this.findElementByType('title');
		if (titleTag) {
			titleTag.content = newTitle;
			return newTitle;
		}
		// Next search for an existing head tag
		const headTag = this.findElementByType('head');
		if (headTag) {
			if (headTag.content && headTag.content.constructor === Array) {
				headTag.content.push({
					type: 'title',
					content: newTitle,
				});
			} else {
				headTag.content = [{
					type: 'title',
					content: newTitle,
				}];
			}
			return newTitle;
		}
		// If we passed to this point, we simply add a new head tag and a title tag
		this.content.push({
			type: 'head',
			content: [{
				type: 'title',
				content: newTitle,
			}],
		});
		return newTitle;
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
}

module.exports = Document;
