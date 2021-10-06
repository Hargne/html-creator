import htmlCreator from "../index";
import mockData from "./__mock__";

describe("Index", () => {
  describe("withBoilerplate", () => {
    it("should be able to create a HTML boilerplate when initializing", () => {
      const html = new htmlCreator([
        { type: "div", content: "hello there" },
      ]).withBoilerplate();
      expect(html.renderHTML().replace(/(\r\n|\n|\r|\t|  +)/gm, "")).toEqual(
        mockData.boilerPlateHtml.replace(/(\r\n|\n|\r|\t|  +)/gm, "")
      );
    });
  });

  describe("renderHTML", () => {
    it("should return the content with a surrounding HTML tag", () => {
      const html = new htmlCreator([{ type: "div", content: "hello there" }]);
      expect(html.renderHTML().replace(/(\r\n|\n|\r|\t|  +)/gm, "")).toEqual(
        "<!DOCTYPE html><html><div>hello there</div></html>"
      );
    });

    it("should return additional attributes to the HTML tag", () => {
      const html = new htmlCreator([{ type: "div", content: "hello there" }]);
      expect(
        html
          .renderHTML({ htmlTagAttributes: { lang: "EN" } })
          .replace(/(\r\n|\n|\r|\t|  +)/gm, "")
      ).toEqual('<!DOCTYPE html><html lang="EN"><div>hello there</div></html>');
    });

    it("should only return the content if excludeHTMLtag is set", () => {
      const html = new htmlCreator([{ type: "div", content: "hello there" }]);
      expect(
        html
          .renderHTML({ excludeHTMLtag: true })
          .replace(/(\r\n|\n|\r|\t|  +)/gm, "")
      ).toEqual("<div>hello there</div>");
    });
  });

  describe("renderHTMLToFile", () => {
    it("should be able to render HTML to a file", () => {
      const html = new htmlCreator([
        { type: "div", content: "hello there" },
      ]).withBoilerplate();
      return html.renderHTMLToFile("index.html").then((response) => {
        expect(response.logMsg).toEqual(
          "HTML-Creator >> HTML generated (index.html)"
        );
      });
    });
    it("should log errors", () => {
      const html = new htmlCreator([
        { type: "div", content: "hello there" },
      ]).withBoilerplate();
      // @ts-ignore
      return html.renderHTMLToFile().catch((response) => {
        expect(response.logMsg).toEqual(
          "HTML-Creator >> A file path is required"
        );
      });
    });
  });
});
