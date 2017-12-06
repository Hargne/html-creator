# jest-html-reporter
**Generate HTML with Node**

## Installation
```shell
npm install html-creator
```

## Usage
```Javascript
var htmlCreator = require('html-creator');
var html = new htmlCreator([
	{ type: 'head', content: [{ type: 'title', content: 'Generated HTML' }] },
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
						content: 'A Button Span Deluxe',
						attributes: {
							className: 'button',
							style: 'padding: 5px; background-color: #eee;',
						},
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
			{ type: 'table', content: [{ type: 'td', content: 'I am in a table!' }] },
		],
	},
]);
console.log(html.renderHTML());
```

This will result with the following:

```HTML
<html>
	<head>
		<title>Generated HTML</title>
	</head>
	<body style="padding: 1rem">
		<div>
			<span class="button" style="padding: 5px; background-color: #eee;">A Button Span Deluxe</span>
			<a href="/path-to-infinity" target="_blank">Click here</a>
		</div>
		<table>
			<td>I am in a table!</td>
		</table>
	</body>
</html>
```

## Content Structure
------
When initially creating the html-creator class you can pass an array of objects (elements) to the plugin that should be rendered as a HTML document.
Each object or element has the following available properties:

### type (string)
The HTML tag type. 
#### Example
`'div', 'p', 'table'`

### attributes (object)
An object containing the HTML Tag attributes that should be applied. The key is the attribute name and the value is its value. 
#### Example
`{ style: 'padding: 5px;' }` will become `style="padding: 5px`

### content (string|array)
The content applied within the element tag. This can either be a string or an array of element objects.
#### Example 1
`{ content: 'A text' }`

#### Example 2
```Javascript
{
	type: 'div',
	content: [
		{
			type: 'span',
			content: 'Inner span',
		},
	],
}

// Result: <div><span>Inner span</span></div>
```

## Dynamically Add Content
------
It is possible to define or change the content of the document after the html-creator class has been created:

```Javascript
var htmlCreator = require('html-creator');
var html = new htmlCreator();

html.setContent([{ type: 'body' }]);
html.document.findElementByType('body').content = 'Added content!';

console.log(html.renderHTML());

// <html><body>Added content!</body></html>
```

## Methods
------
### renderHTML()
`Returns: STRING`

Returns the rendered HTML output as a string.

### renderHTMLToFile()
`Returns: PROMISE`

Renders the HTML to a given destination file.

#### Example
```Javascript
var path = require('path');
var htmlCreator = require('html-creator');
var html = new htmlCreator();

html.renderHTMLToFile(path.join(process.cwd(), 'index.html'));
```

### document.findElementByType(string)
`Returns: ARRAY | OBJECT | NULL`

Searches the content for element objects of a given type and returns the results. This is useful for manipulating data after defining the initial content structure.
If there are several matches, an array of all the matches will be returned (Returns _null_ if there are no matches)

#### Example 1 - Single Match
```Javascript
var htmlCreator = require('html-creator');
var html = new htmlCreator([
	{
		type: 'body',
	},
]);
console.log(html.document.findElementByType('body'));

// { type: 'body' }
```

#### Example 2 - Multiple matches
```Javascript
var htmlCreator = require('html-creator');
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

// [{ type: 'div', content: 'first div' }, { type: 'div', content: 'second div' }]
```

### document.findElementByClassName(string)
`Returns: ARRAY | OBJECT | NULL`

Searches the content for element objects of a given class name and returns the results. This is useful for manipulating data after defining the initial content structure.
If there are several matches, an array of all the matches will be returned (Returns _null_ if there are no matches)

_For examples of responses see **document.findElementByType(string)**_

### document.findElementById(string)
`Returns: ARRAY | OBJECT | NULL`

Searches the content for element objects of a given ID and returns the results. This is useful for manipulating data after defining the initial content structure.
If there are several matches, an array of all the matches will be returned (Returns _null_ if there are no matches)

_For examples of responses see **document.findElementByType(string)**_


