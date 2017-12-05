
const Tools = require('./tools');
const Document = require('./document');

class HtmlCreator {
	constructor(content) {
		this.document = new Document(content);
	}

	renderHTML() {
		return this.document.getHTML();
	}

	renderHTMLToFile(destination) {
		return this.renderHTML()
			.then(Tools.writeFile.bind(null, destination))
			.then(() => Tools.logMessage('success', `HTML generated (${destination})`))
			.catch(error => Tools.logMessage('error', error));
	}
}

module.exports = HtmlCreator;
