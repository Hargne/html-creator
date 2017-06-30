const htmlCreator = require('../src/document');

const page = new htmlCreator([
	{ type: 'head' },
	{
		type: 'body',
		props: [{ type: 'style', text: 'padding: 1rem;' }],
		content: [{
			type: 'div',
			content: [{
				type: 'span',
			}],
		}],
	},
]);

console.log(page.findElement({ type: 'span' }));
