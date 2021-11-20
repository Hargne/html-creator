import HTMLCreatorDocument from "./document";
import { HTMLCreatorConfig, HTMLCreatorElement } from "./index.d";
import { writeFile, logMessage } from "./utils";

class HtmlCreator {
  document: HTMLCreatorDocument;

  constructor(htmlContent?: HTMLCreatorElement[]) {
    this.document = new HTMLCreatorDocument(htmlContent);
  }

  withBoilerplate() {
    this.document.withBoilerplate();
    return this;
  }

  renderHTMLToFile(destination: string, config?: HTMLCreatorConfig) {
    if (!destination) {
      return Promise.reject(logMessage("error", "A file path is required"));
    }
    return writeFile(destination, this.renderHTML(config))
      .then(() => logMessage("success", `HTML generated (${destination})`))
      .catch((error) => logMessage("error", error));
  }

  renderHTML(config?: HTMLCreatorConfig) {
    if (config) {
      const { excludeHTMLtag } = config;
      if (excludeHTMLtag) {
        return this.document.renderContent();
      }
    }
    return this.document.getHTML(config);
  }
}

export default HtmlCreator;
