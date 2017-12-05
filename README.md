# jest-html-reporter
**Generate HTML with Node**

## Installation
```shell
npm install jest-html-reporter
```

## Usage
```Javascript
var htmlCreator = require('htmlCreator');
var html = new htmlCreator([
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
							className: 'button',
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
console.log(html.renderHTML());
```

This will result with the following:

```HTML
<html><head><title>Generated HTML</title></head><body style="padding: 1rem"><div><span class="button" style="padding: 5px;background-color: #eee;">A Button Span Deluxe</span><a href="/path-to-infinity" target="_blank">Click here</a></div><table><tbody><tr><td>I am in a table!</td></tr></tbody></table></body></html>
```

## Methods

### renderHTML()
Returns the rendered HTML output as a string.

### renderHTMLToFile()
Renders the HTML to a given destination file.

#### Example
```Javascript
var path = require('path');
var htmlCreator = require('htmlCreator');
var html = new htmlCreator();

html.renderHTMLToFile(path.join(process.cwd(), 'index.html'));
```

### document.findElementByType(string)
Searches the content for element objects of a given type and returns the results. This is useful for manipulating data after defining the initial content structure.

If there are several matches, an array of all the matches will be returned (Returns _null_ if there are no matches)

#### Example 1
```Javascript
var htmlCreator = require('htmlCreator');
var html = new htmlCreator([
	{
		type: 'body',
	},
]);
console.log(html.document.findElementByType('body'));
```
This will return:
```JSON
{ type: 'body' }
```
#### Example 2
```Javascript
var htmlCreator = require('htmlCreator');
var html = new htmlCreator([
	{
		type: 'div',
		content: 'first div',
	},
	{
		type: 'div',
		content: 'second div',
	},
]);
console.log(html.document.findElementByType('div'));
```
This will return:
```JSON
[{ type: 'div', content: 'first div' }, { type: 'div', content: 'second div' }]
```

### document.findElementByClassName(string)
Searches the content for element objects of a given class name and returns the results. This is useful for manipulating data after defining the initial content structure.

If there are several matches, an array of all the matches will be returned (Returns _null_ if there are no matches)

#### Example 1
```Javascript
var htmlCreator = require('htmlCreator');
var html = new htmlCreator([
	{
		type: 'div',
		attributes: {
			className: 'button',
		},
	}
]);
console.log(html.document.findElementByClassName('button'));
```
This will return:
```JSON
{ type: 'div', attributes: { className: 'button' } }
```
#### Example 2
```Javascript
var htmlCreator = require('htmlCreator');
var html = new htmlCreator([
	{
		type: 'div',
		content: [
			{
				type: 'p',
				content: 'Paragraphs are cool',
				attributes: {
					className: 'lookForMe',
				},
			},
		],
	},
	{
		type: 'span',
		content: 'Spantastic',
		attributes: {
			className: 'lookForMe',
		},
	},
]);
console.log(html.document.findElementByClassName('lookForMe'));
```
This will return:
```JSON
[{ type: 'p', content: 'Paragraphs are cool', attributes: { className: 'lookForMe' } }, { type: 'span', content: 'Spantastic', attributes: { className: 'lookForMe' } }]
```

### document.findElementById(string)
Searches the content for element objects of a given ID and returns the results. This is useful for manipulating data after defining the initial content structure.

If there are several matches, an array of all the matches will be returned (Returns _null_ if there are no matches)

#### Example 1
```Javascript
var htmlCreator = require('htmlCreator');
var html = new htmlCreator([
	{
		type: 'div',
		attributes: {
			id: 'findMe',
		},
	}
]);
console.log(html.document.findElementById('findMe'));
```
This will return:
```JSON
{ type: 'div', attributes: { id: 'findMe' } }
```

