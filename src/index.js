
const Tools = require('./tools');
const Document = require('./document');

class HtmlCreator {
	constructor(content) {
		this.document = new Document(content);
	}

	/**
	 * Helper function that sets a simple boilerplate content
	 * @param {Array} content
	 */
	withBoilerplate(content) {
		this.document.withBoilerplate(content);
		return this;
	}

	renderHTML(config) {
		if (config) {
			const { excludeHTMLtag } = config;
			if (excludeHTMLtag) {
				return this.document.getContentInHTML();
			}
		}
		return this.document.getHTML();
	}

	renderHTMLToFile(destination) {
		return Tools.writeFile(destination, this.renderHTML())
			.then(() => Tools.logMessage('success', `HTML generated (${destination})`))
			.catch(error => Tools.logMessage('error', error));
	}
}

module.exports = HtmlCreator;
