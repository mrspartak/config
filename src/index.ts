import { fromJSONFile } from "./factories/jsonFileFactory.js";
import { fromObject } from "./factories/objectFactory.js";
import { fromURL } from "./factories/urlFactory.js";

const Config = {
  fromJSONFile,
  fromObject,
  fromURL,
};

export { Config };
