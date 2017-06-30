const applyTagProps = (tagProps) => {
	let output = '';
	if (tagProps && tagProps.constructor === Array) {
		tagProps.forEach(tagProperty => {
			output += ` ${tagProperty.type}="${tagProperty.text}"`;
		});
	}
	return output;
};

const create = ({ type, props, content }) => (type ? `<${type}${applyTagProps(props)}>${content || ''}</${type}>` : '');

module.exports = {
	create,
	applyTagProps,
};
