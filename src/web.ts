import { fromObject } from "./factories/objectFactory.js";
import { fromURL } from "./factories/urlFactory.js";
import { v } from "./util/validation.js";

const Config = {
  fromObject,
  fromURL,
};

export { Config, v };
