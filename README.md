<p align="center">
  <h2 align="center">html-creator</h2>

  <p align="center">
    Generate HTML with NodeJS
    <br>
    <a href="https://github.com/Hargne/html-creator/wiki"><strong>Documentation »</strong></a>
	<br />
	<br />
	<img src="https://nodei.co/npm/html-creator.png?downloads=true&stars=true" alt="">
  </p>
</p>

<br>

# Installation
```shell
npm install html-creator
```

# Usage
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
	</body>
</html>
```

# 📖 Documentation
Visit the **[wiki](https://github.com/Hargne/html-creator/wiki)** for more examples of usage, method reference and further reading.

# Contribute
Do you believe that something is missing from this plugin or perhaps is not working as intended? Awesome-pants! Help is always appreciated.
Just be sure to read through the [Contributing Handbook](Contributing-Handbook) (and remember to have a jolly good time).


