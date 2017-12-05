const path = require('path');
const htmlCreator = require('../src');

const html = new htmlCreator([
	{
		type: 'head',
		content: [
			{
				type: 'title',
				content: 'Generated HTML',
			},
		],
	},
	{
		type: 'body',
		attributes: {
			style: 'padding: 1rem',
		},
		content: [
			{
				type: 'div',
				content: [
					{
						type: 'span',
						attributes: {
							class: 'button',
							style: `
								padding: 5px;
								background-color: #eee;
							`,
						},
						content: 'A Button Span Deluxe',
					},
					{
						type: 'a',
						content: 'Click here',
						attributes: {
							href: '/path-to-infinity',
							target: '_blank',
						},
					},
				],
			},
			{
				type: 'table',
				content: [
					{
						type: 'td',
						content: 'I am in a table!',
					},
				],
			},
		],
	},
]);

html.renderHTMLToFile(path.join(process.cwd(), 'index.html'));
