import { HTMLCreatorElement } from "./index.d";

const VoidElements = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

/**
 * Returns a string with the props as HTML attributes
 * @param {Object} props
 */
export const applyElementAttributes = (
  attributes: HTMLCreatorElement["attributes"]
) => {
  if (attributes) {
    return Object.keys(attributes)
      .map(
        (key) =>
          ` ${key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)}="${
            attributes[key]
          }"`
      )
      .join("");
  }
  return "";
};

/**
 * Parses given content. If the content is an array, recursive parsing will be performed
 * @param {String/Array} content
 * @param {Function} createElementMethod
 */
export const parseElementContent = (
  content?: HTMLCreatorElement["content"]
) => {
  if (content && content.constructor === Array) {
    return content.map((element) => generateElement(element)).join("");
  }
  return content || "";
};

/**
 * Generates a HTML element from the given data
 * @param {String} type - The HTML Tag type
 * @param {Object} applyAttributes - The HTML attributes to be added to the tag
 * @param {String/Array} content - The content of the tag. Can be either a string or an array of elements
 */
export const generateElement = (element: HTMLCreatorElement): string => {
  if (element.type) {
    if (VoidElements.includes(element.type)) {
      return `<${element.type}${applyElementAttributes(element.attributes)} />`;
    }
    return `<${element.type}${applyElementAttributes(
      element.attributes
    )}>${parseElementContent(element.content)}</${element.type}>`;
  }
  return typeof element.content === "string" ||
    element.content instanceof String
    ? (element.content as string)
    : "";
};
