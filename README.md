# html-creator
**Generate HTML with NodeJS**

[![NPM](https://nodei.co/npm/html-creator.png?downloads=true&stars=true)](https://nodei.co/npm/html-creator/)

This plugin was written to make HTML generation in node modules more dynamic and easier to set up. It was inspired by [xmlbuilder-js](https://github.com/oozcitak/xmlbuilder-js)

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
		attributes: { style: 'padding: 1rem' },
		content: [
			{
				type: 'div',
				content: [
					{
						type: 'span',
						content: 'A Button Span Deluxe',
						attributes: { className: 'button' },
					},
					{
						type: 'a',
						content: 'Click here',
						attributes: { href: '/path-to-infinity', target: '_blank' },
					},
				],
			},
			{ type: 'table', content: [{ type: 'td', content: 'I am in a table!' }] },
		],
	},
]);

html.renderHTML();
```

This will result with the following:

```HTML
<!DOCTYPE html>
<html>
	<head>
		<title>Generated HTML</title>
	</head>
	<body style="padding: 1rem">
		<div>
			<span class="button">A Button Span Deluxe</span>
			<a href="/path-to-infinity" target="_blank">Click here</a>
		</div>
		<table>
			<td>I am in a table!</td>
		</table>
	</body>
</html>
```

## Element Structure

When initially creating the html-creator class you can pass an array of objects (elements) to the plugin that should be rendered as a HTML document.
Each object or element has the following available properties:

| Param  		| Type                	| Description  |
| ------ 		| ------------------- 	| ------------ |
| type  		| `string` 				| `'div'` `'p'` `'table'` The HTML tag type. |
| attributes  	| `object` 				| `{ style: 'padding: 5px;' }` An object containing the HTML Tag attributes that should be applied. The key is the attribute name and the value is its value. |
| content  		| `string` `array` 		| The content applied within the element tag. This can either be a string or an array of element objects. |

***

# Methods

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

### withBoilerplate(content)
| Param  		| Type                	| Description  |
| ------ 		| ------------------- 	| ------------ |
| id  			| `array` 				| Array containing element objects that will be added to the body |

Sets the content to a generic boilerplate for easier setup. If content is passed as a parameter, it will be placed under the BODY tag.

**Example:**
```Javascript
var html = new htmlCreator().withBoilerplate([{ type: 'div', content: 'hello there' }]);

console.log(html.renderHTML());

// <!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /></head><body><div>hello there</div></body></html>
```

### document.findElementByType(type)
| Param  		| Type                	| Description  |
| ------ 		| ------------------- 	| ------------ |
| type  		| `string` 			| HTML type to search |

`Returns: ARRAY | OBJECT | NULL`

Searches the content for element objects of a given type and returns the results. This is useful for manipulating data after defining the initial content structure.
If there are several matches, an array of all the matches will be returned (Returns _null_ if there are no matches)

#### Example 1 - Single Match
```Javascript
var htmlCreator = require('html-creator');
var html = new htmlCreator([{ type: 'body' }]);

console.log(html.document.findElementByType('body'));

// { type: 'body' }
```

#### Example 2 - Multiple matches
```Javascript
var htmlCreator = require('html-creator');
var html = new htmlCreator([
	{ type: 'div', content: 'first div' },
	{ type: 'div', content: 'second div' },
]);

console.log(html.document.findElementByType('div'));

// [{ type: 'div', content: 'first div' }, { type: 'div', content: 'second div' }]
```

### document.findElementByClassName(class)
| Param  		| Type                	| Description  |
| ------ 		| ------------------- 	| ------------ |
| class  		| `string` 			| class name to search |

`Returns: ARRAY | OBJECT | NULL`

Searches the content for element objects of a given class name and returns the results. This is useful for manipulating data after defining the initial content structure.
If there are several matches, an array of all the matches will be returned (Returns _null_ if there are no matches)

_For examples of responses see **document.findElementByType(string)**_

### document.findElementById(id)
| Param  		| Type                	| Description  |
| ------ 		| ------------------- 	| ------------ |
| id  			| `string` 				| ID to search |

`Returns: ARRAY | OBJECT | NULL`

Searches the content for element objects of a given ID and returns the results. This is useful for manipulating data after defining the initial content structure.
If there are several matches, an array of all the matches will be returned (Returns _null_ if there are no matches)

_For examples of responses see **document.findElementByType(string)**_

### document.setTitle(title)
| Param  		| Type                	| Description  |
| ------ 		| ------------------- 	| ------------ |
| title  		| `string` 				| The title of the document |

`Returns: STRING`

A helper function to set the title of the document. It searches the content for an existing title tag and replaces it if it exists, otherwise it will be automatically added.

### document.addElement(elementData)
| Param  		| Type                			| Description  |
| ------ 		| ------------------- 			| ------------ |
| elementData  	| `object` `array` 			| A single element object or an array of elements objects |

_Chainable._
Adds an element directly to the bottom of the content.

#### Example
```Javascript
var htmlCreator = require('html-creator');
var html = new htmlCreator()
	.addElement({ type: 'head' })
	.addElement({ type: 'body' });

console.log(html.renderHTML());

// <!DOCTYPE html><head></head><body></body></html>
```

### document.addElementToTarget(elementData, target)
| Param  		| Type                			| Description  |
| ------ 		| ------------------- 			| ------------ |
| elementData  	| `object` `array` 			| A single element object or an array of elements objects |
| target 		| `object` 						| `{ id: 'unique' }` `{ class: 'button' }` `{ type: 'body' }`    |

_Chainable._
Adds an element to the content of a specified target. If you specify a target class or type that exists in multiple places, the new element will be added to all of the elements of the specified type/class.

#### Example
```Javascript
var htmlCreator = require('html-creator');
var html = new htmlCreator([
	{
		type: 'body',
		content: [{ type: 'div', attributes: { id: 'anID' }, content: 'hello there' }],
	},
]);

html.addElementToTarget({ type: 'span', content: 'Yay!' }, { id: 'anID' });

console.log(html.renderHTML());

// <!DOCTYPE html><body><div id="anId">Hello there<span>yay</span></div></body></html>
````

# Examples
Please visit the [wiki](https://github.com/Hargne/html-creator/wiki) for examples of usage, tips & tricks and further reading.


