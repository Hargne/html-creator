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

  /**
   * Helper function to set the title of the document
   * @param {String} newTitle
   */
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

  /**
   * Adds element data to the content. This method is chainable.
   * @param {Object} elementData
   */
  addElement(element: HTMLCreatorElement | HTMLCreatorElement[]) {
    this.content = pushOrConcat(this.content, element);
    return this;
  }

  /**
   * Adds element data to the specified target (id, class or type). This method is chainable.
   */
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

  /**
   * Adds element data to given class name
   * @param {String} className
   * @param {Object} elementData
   */
  addElementToClass(className: string, element: HTMLCreatorElement) {
    return this.addElementToTarget(element, { class: className });
  }

  /**
   * Adds element data to given ID
   * @param {String} className
   * @param {Object} elementData
   */
  addElementToId(id: string, element: HTMLCreatorElement) {
    return this.addElementToTarget(element, { id });
  }

  /**
   * Adds element data to given type
   * @param {String} className
   * @param {Object} elementData
   */
  addElementToType(
    type: HTMLCreatorElement["type"],
    element: HTMLCreatorElement
  ) {
    return this.addElementToTarget(element, { type });
  }

  /**
   * Finds and returns an element by type.
   * Returns null if not found.
   * @param {String} needle
   */
  findElementByType(needle: HTMLCreatorElement["type"]) {
    return searchForElement({ stack: this.content, type: needle });
  }
  /**
   * Finds and returns an element by ID.
   * Returns null if not found.
   * @param {String} needle
   */
  findElementById(needle: string) {
    return searchForElement({ stack: this.content, id: needle });
  }
  /**
   * Finds and returns an element by class.
   * Returns null if not found.
   * @param {String} needle
   */
  findElementByClassName(needle: string) {
    return searchForElement({ stack: this.content, className: needle });
  }

  /**
   * Helper function that sets a simple boilerplate content
   * @param {Array} content
   */
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
