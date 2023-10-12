import Prettier from "prettier";
import { generateElement } from "./element";
import { HTMLCreatorConfig, HTMLCreatorElement } from "./index.d";
import { pushOrConcat, searchForElement } from "./utils";

class HTMLCreatorDocument {
  content: HTMLCreatorElement[];

  constructor(content?: HTMLCreatorElement[]) {
    this.content = content && Array.isArray(content) ? content : [];
  }

  // Parses the content and returns the elements in HTML
  renderContent() {
    let output = "";
    if (this.content) {
      this.content.forEach((element) => {
        output += `${generateElement(element)}`;
      });
    }
    return output;
  }

  // Returns the content in HTML as a string
  getHTML(options?: HTMLCreatorConfig) {
    const html = `<!DOCTYPE html>${generateElement({
      type: "html",
      content: this.renderContent(),
      attributes: options?.htmlTagAttributes,
    })}`;
    return options?.disablePrettier
      ? html.replace(/(\r\n|\n|\r)/gm, "")
      : Prettier.format(html, { parser: "html" });
  }

  setTitle(newTitle: string) {
    // Begin by searching for an existing title tag
    const titleTag = this.findElementByType("title")[0];
    if (titleTag) {
      titleTag.content = newTitle;
      return newTitle;
    }
    // Next search for an existing head tag
    const headTag = this.findElementByType("head")[0];
    if (headTag) {
      if (headTag.content && headTag.content.constructor === Array) {
        headTag.content.push({
          type: "title",
          content: newTitle,
        });
      } else {
        headTag.content = [
          {
            type: "title",
            content: newTitle,
          },
        ];
      }
      return newTitle;
    }
    // If we passed to this point, we simply add a new head tag and a title tag
    this.content.push({
      type: "head",
      content: [
        {
          type: "title",
          content: newTitle,
        },
      ],
    });
    return this;
  }

  addElement(element: HTMLCreatorElement | HTMLCreatorElement[]) {
    this.content = pushOrConcat(this.content, element);
    return this;
  }

  addElementToTarget(
    element: HTMLCreatorElement,
    search: { id?: string; class?: string; type?: string }
  ) {
    if (!search) {
      return this;
    }

    let targetElementList: HTMLCreatorElement[] = [];
    if (search.id) {
      targetElementList = this.findElementById(search.id);
    } else if (search.class) {
      targetElementList = this.findElementByClassName(search.class);
    } else if (search.type) {
      targetElementList = this.findElementByType(search.type);
    }

    if (targetElementList.length > 0) {
      targetElementList.forEach((targetElement) => {
        if (!targetElement.content) {
          targetElement.content = [element];
          return;
        }

        if (Array.isArray(targetElement.content)) {
          targetElement.content.push(element);
          return;
        }

        if (
          typeof targetElement.content === "string" ||
          targetElement.constructor === String
        ) {
          targetElement.content = [
            {
              content: targetElement.content,
            },
            element,
          ];
        }
      });
    }

    return this;
  }

  addElementToClass(
    className: string,
    element: HTMLCreatorElement | HTMLCreatorElement[]
  ) {
    if (Array.isArray(element)) {
      for (const elementItem of element) {
        this.addElementToTarget(elementItem, { class: className });
      }
      return this;
    }
    return this.addElementToTarget(element, { class: className });
  }

  addElementToId(
    id: string,
    element: HTMLCreatorElement | HTMLCreatorElement[]
  ) {
    if (Array.isArray(element)) {
      for (const elementItem of element) {
        this.addElementToTarget(elementItem, { id });
      }
      return this;
    }
    return this.addElementToTarget(element, { id });
  }

  addElementToType(
    type: HTMLCreatorElement["type"],
    element: HTMLCreatorElement | HTMLCreatorElement[]
  ) {
    if (Array.isArray(element)) {
      for (const elementItem of element) {
        this.addElementToTarget(elementItem, { type });
      }
      return this;
    }
    return this.addElementToTarget(element, { type });
  }

  findElementByType(needle: HTMLCreatorElement["type"]) {
    return searchForElement({ stack: this.content, type: needle });
  }

  findElementById(needle: string) {
    return searchForElement({ stack: this.content, id: needle });
  }

  findElementByClassName(needle: string) {
    return searchForElement({ stack: this.content, className: needle });
  }

  withBoilerplate() {
    this.content = [
      {
        type: "head",
        content: [
          { type: "meta", attributes: { charset: "utf-8" } },
          {
            type: "meta",
            attributes: {
              name: "viewport",
              content: "width=device-width, initial-scale=1, shrink-to-fit=no",
            },
          },
        ],
      },
      {
        type: "body",
        content: this.content,
      },
    ];
    return this;
  }
}

export default HTMLCreatorDocument;
