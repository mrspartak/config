import { fromJSONFile } from "./factories/jsonFileFactory.js";
import { fromObject } from "./factories/objectFactory.js";
import { fromURL } from "./factories/urlFactory.js";
import { v } from "./util/validation.js";

const Config = {
  fromJSONFile,
  fromObject,
  fromURL,
};

export { Config, v };
