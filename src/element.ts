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

export const applyElementAttributes = (
  attributes: HTMLCreatorElement["attributes"]
) => {
  if (attributes) {
    return Object.keys(attributes)
      .filter(
        (key) => attributes[key] !== undefined && attributes[key] !== null
      )
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

export const parseElementContent = (
  content?: HTMLCreatorElement["content"]
) => {
  if (content && content.constructor === Array) {
    return content.map((element) => generateElement(element)).join("");
  }
  return content || "";
};

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
