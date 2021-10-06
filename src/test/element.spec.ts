import * as Element from "../element";
import mockData from "./__mock__";

describe("Element", () => {
  describe("generateElement", () => {
    it("should return a rendered HTML element", () => {
      const element = Element.generateElement(mockData.singleElement);
      expect(element.replace(/(\r\n|\n|\r|\t|  +)/gm, "")).toEqual(
        '<div class="some-class">Single div</div>'
      );
    });

    it("should return a rendered string content if no type was provided", () => {
      const element = Element.generateElement({ content: "hey" });
      expect(element.replace(/(\r\n|\n|\r|\t|  +)/gm, "")).toEqual("hey");
    });

    it("should return a an empty string if provided invalid content", () => {
      // @ts-ignore
      const numberElement = Element.generateElement({ content: 122 });
      // @ts-ignore
      const arrayElement = Element.generateElement({ content: ["1"] });

      expect(numberElement.replace(/(\r\n|\n|\r|\t|  +)/gm, "")).toEqual("");
      expect(arrayElement.replace(/(\r\n|\n|\r|\t|  +)/gm, "")).toEqual("");
    });
  });

  describe("applyElementAttributes", () => {
    it("should return a string with the HTML attributes", () => {
      const attributeString = Element.applyElementAttributes({
        class: "new",
        dataTest: "test",
      });
      expect(attributeString).toEqual(' class="new" data-test="test"');
    });
  });
});
