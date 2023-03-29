import path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
import { HTMLCreatorElement } from "./index.d";

export const logMessage = (
  message: string,
  type: "default" | "success" | "error" = "default"
) => {
  const logTypes = {
    default: "\x1b[37m%s\x1b[0m",
    success: "\x1b[32m%s\x1b[0m",
    error: "\x1b[31m%s\x1b[0m",
  };
  const logColor = !logTypes[type] ? logTypes.default : logTypes[type];
  const logMsg = `HTML-Creator >> ${message}`;
  // Let's log messages to the terminal only if we aren't testing this very module
  if (process.env.JEST_WORKER_ID === undefined) {
    console.log(logColor, logMsg);
  }
  return { logColor, logMsg };
};

export const writeFile = async (filePath: string, content: string) => {
  await mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
};

export const searchForElement = ({
  stack,
  type,
  id,
  className,
}: {
  stack: HTMLCreatorElement["content"];
  type?: HTMLCreatorElement["type"];
  id?: string;
  className?: string;
}): HTMLCreatorElement[] => {
  const result = [];

  if (stack && Array.isArray(stack)) {
    // Look for matches and push to the result
    result.push(
      stack.filter((element) => {
        if (type) {
          return element.type === type;
        }
        if (id) {
          return element.attributes && element.attributes.id === id;
        }
        if (className) {
          return element.attributes && element.attributes.class === className;
        }
        return null;
      })
    );
    // Loop through the content of the element and look for matches
    stack.forEach((element) => {
      if (element.content && element.content.constructor === Array) {
        const deepSearch = searchForElement({
          stack: element.content,
          type,
          id,
          className,
        });
        if (deepSearch) {
          result.push(deepSearch);
        }
      }
    });
  }
  // Flatten result array or just return a single object
  const flatResult = result.flat();
  if (flatResult.length > 0) {
    if (flatResult.length === 1) {
      return [flatResult[0]];
    }
    return flatResult;
  }
  return [];
};

export const pushOrConcat = (
  targetArray: HTMLCreatorElement[],
  input: HTMLCreatorElement | HTMLCreatorElement[]
) => {
  if (Array.isArray(input)) {
    return targetArray.concat(input);
  }
  targetArray.push(input);
  return targetArray;
};
