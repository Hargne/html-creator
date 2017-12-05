/**
 * Returns a string with the props as HTML attributes
 * @param {Object} props
 */
const applyAttributes = (attributes) => {
	if (attributes && attributes.constructor === Object) {
		return Object.keys(attributes).map(key => ` ${key}="${attributes[key]}"`).join('');
	}
	return '';
};

/**
 * Parses given content. If the content is an array, recursive parsing will be performed
 * @param {String/Array} content
 * @param {Function} createElementMethod
 */
const parseContent = (content, createElementMethod) => {
	if (content && content.constructor === Array) {
		return content.map(element => createElementMethod(element)).join('');
	}
	return content || '';
};

/**
 * Creates a HTML element from the given data
 * @param {String} type - The HTML Tag type
 * @param {Object} applyAttributes - The HTML attributes to be added to the tag
 * @param {String/Array} content - The content of the tag. Can be either a string or an array of elements
 */
const create = ({ type, attributes, content }) => (
	type ? `<${type}${applyAttributes(attributes)}>${parseContent(content, create)}</${type}>` : content
);

module.exports = {
	create,
	applyAttributes,
};
