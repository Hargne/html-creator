<p align="center">
  <h3 align="center">⚙️ html-creator</h3>

  <p align="center">
    Generate HTML with NodeJS
    <br>
    <a href="https://github.com/Hargne/html-creator/wiki"><strong>Documentation »</strong></a>
  </p>
</p>

## Installation

```shell
$ npm i html-creator
```

## Usage

```Javascript
const htmlCreator = require("html-creator");

const html = new htmlCreator([
  {
    type: "head",
    content: [
      {
        type: "title",
        content: "Generated HTML",
      },
      {
        type: "style",
        content: `
          #cool-text {
            color: red;
          }
        `,
      },
    ],
  },
  {
    type: "body",
    content: [
      {
        type: "div",
        content: [
          {
            type: "div",
            content: "This is a cool text 😎",
            attributes: { id: "cool-text" },
          },
          {
            type: "a",
            content: "Click here",
            attributes: { href: "/path-to-infinity", target: "_blank" },
          },
        ],
      },
    ],
  },
]);
const result = html.renderHTML();
```

The above code will result with the following HTML output:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Generated HTML</title>
    <style>
      #cool-text {
        color: red;
      }
    </style>
  </head>
  <body>
    <div>
      <div id="cool-text">This is a cool text 😎</div>
      <a href="/path-to-infinity" target="_blank">Click here</a>
    </div>
  </body>
</html>
```

Visit the **[wiki](https://github.com/Hargne/html-creator/wiki)** for more examples of usage, method reference and further reading.

# Wanna Contribute?

Do you believe that something is missing from this plugin or perhaps is not working as intended? Awesome-pants! Help is always appreciated.
Just be sure to read through the [Contributing Handbook](Contributing-Handbook) (and remember to have a jolly good time).
