let elements;

const initialize = (input) => {
	elements = input;
	return 
};

const applyTagProps = (tagProps) => {
	let output = '';
	if (tagProps && tagProps.constructor === Array) {
		tagProps.forEach(tagProperty => {
			output += ` ${tagProperty.type}="${tagProperty.text}"`;
		});
	}
	return output;
};

const createElement = ({ type, props, content }) => (type ? `
	<${type}${applyTagProps(props)}>${content || ''}</${type}>` : '');

const parseElements = (input) => {
	let output = '';
	if (input && input.constructor === Array) {
		input.forEach(element => {
			output += createElement(element);
		});
	}
	return output;
};

const render = (input) => `
<!DOCTYPE html>
<html>${parseElements(input)}
</html>`;

module.exports = {
	initialize,
	elements,
	render,
};
