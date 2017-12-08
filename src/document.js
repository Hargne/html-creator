const Element = require('./element.js');
const Tools = require('./tools');

class Document {
	constructor(content) {
		if (content) {
			this.setContent(content);
		} else {
			this.setContent([]);
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
	 * Parses the content and returns the elements in HTML
	 */
	getContentInHTML() {
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
		return `<!DOCTYPE html><html>${this.getContentInHTML()}</html>`;
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
	 * Helper function that sets a simple boilerplate content
	 * @param {Array} content
	 */
	withBoilerplate(content) {
		this.content = [
			{
				type: 'head',
				content: [
					{ type: 'meta', attributes: { charset: 'utf-8' } },
					{ type: 'meta', attributes: { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' } },
				],
			},
			{ type: 'body', content },
		];
		return this;
	}

	/**
	 * Adds element data to the content. This method is chainable.
	 * @param {Object} elementData
	 */
	addElement(elementData) {
		this.content = Tools.pushOrConcat(this.content, elementData);
		return this;
	}

	/**
	 * Adds element data to the specified target (id, class or type). This method is chainable.
	 * @param {Object} elementData
	 * @param {Object} targetData
	 */
	addElementToTarget(elementData, targetData) {
		let targetElement;

		// Look up the target element
		if (targetData && targetData.id) {
			targetElement = this.findElementById(targetData.id);
		} else if (targetData && targetData.class) {
			targetElement = this.findElementByClassName(targetData.class);
		} else if (targetData && targetData.type) {
			targetElement = this.findElementByType(targetData.type);
		}

		// Internal method for adding the element data to a given content
		const addContent = ({ targetContent, data }) => {
			let newContent = targetContent;
			if (targetContent && targetContent.constructor === Array) {
				newContent = Tools.pushOrConcat(newContent, data);
			} else if (targetContent && targetContent.constructor === String) {
				const oldContent = targetElement.content;
				newContent = [];
				newContent.push({ content: oldContent });
				newContent = Tools.pushOrConcat(newContent, data);
			} else {
				newContent = [];
				newContent = Tools.pushOrConcat(newContent, data);
			}
			return newContent;
		};

		// Add the element to the target element
		if (targetElement && targetElement.constructor === Array) {
			// If we have found several matching target elements, we need to parse and add the data to each of them
			targetElement.map((el, i) => {
				targetElement[i].content = addContent({ targetContent: el.content, data: elementData });
				return true;
			});
		} else {
			// If one one match was found, simply add the data to its content
			targetElement.content = addContent({ targetContent: targetElement.content, data: elementData });
		}
		return this;
	}

	/**
	 * Adds element data to given class name
	 * @param {String} className
	 * @param {Object} elementData
	 */
	addElementToClass(className, elementData) {
		return this.addElementToTarget(elementData, { class: className });
	}

	/**
	 * Adds element data to given ID
	 * @param {String} className
	 * @param {Object} elementData
	 */
	addElementToId(id, elementData) {
		return this.addElementToTarget(elementData, { id });
	}

	/**
	 * Adds element data to given type
	 * @param {String} className
	 * @param {Object} elementData
	 */
	addElementToType(type, elementData) {
		return this.addElementToTarget(elementData, { type });
	}
}

module.exports = Document;
