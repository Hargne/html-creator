import * as Utils from "../utils";

describe("utils", () => {
  describe("logMessage", () => {
    it("should log a given message of an existing log type", () => {
      // Given
      const log = Utils.logMessage("msg", "success");
      // Then
      expect(log.logColor).toEqual("\x1b[32m%s\x1b[0m");
      expect(log.logMsg).toEqual("HTML-Creator >> msg");
    });
    it("should set the log type to default if none or an invalid type was provided", () => {
      // Given
      // @ts-ignore
      const log1 = Utils.logMessage("msg");
      // @ts-ignore
      const log2 = Utils.logMessage("msg", "invalidType");
      // Then
      expect(log1.logColor).toEqual("\x1b[37m%s\x1b[0m");
      expect(log2.logColor).toEqual("\x1b[37m%s\x1b[0m");
    });
  });
});
