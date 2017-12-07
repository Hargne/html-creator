const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const _ = require('lodash');

/**
 * Fetches config from package.json
 */
const packageJson = require(path.join(process.cwd(), 'package.json')); // eslint-disable-line import/no-dynamic-require
const config = {};
try {
	const cfg = (packageJson || {})['html-creator'];
	if (cfg) { Object.assign(config, cfg); }
} catch (e) { /** do nothing */ }

/**
 * Creates a file at the given destination
 * @param  {String} filePath
 * @param  {Any} 	content
 */
const writeFile = (filePath, content) => new Promise((resolve, reject) => {
	mkdirp(path.dirname(filePath), mkdirpErr => {
		if (!mkdirpErr) {
			return resolve(fs.writeFile(filePath, content, fsErr => reject(`Something went wrong when writing to the file: ${fsErr}`)));
		}
		return reject(`Something went wrong when creating the file: ${mkdirpErr}`);
	});
});

/**
* Logs a message of a given type in the terminal
* @param {String} type
* @param {String} msg
* @return {Object}
*/
const logMessage = (type, msg) => {
	const types = { default: '\x1b[37m%s\x1b[0m', success: '\x1b[32m%s\x1b[0m', error: '\x1b[31m%s\x1b[0m' };
	const logColor = (!types[type]) ? types.default : types[type];
	const logMsg = `HTML-Creator >> ${msg}`;
	console.log(logColor, logMsg); // eslint-disable-line no-console
	return { logColor, logMsg }; // Return for testing purposes
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
			if (className) { return element.attributes && element.attributes.class === className; }
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

const pushOrConcat = (targetArray, input) => {
	if (input.constructor === Array) {
		return targetArray.concat(input);
	}
	targetArray.push(input);
	return targetArray;
};

module.exports = {
	logMessage,
	writeFile,
	config,
	searchForElement,
	pushOrConcat,
};
