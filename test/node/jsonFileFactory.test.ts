import { describe, expect, it } from "vitest";
import { Config } from "../../dist.node/node.js";

describe("fromJSONFile", () => {
  it("must be a function", () => {
    expect(typeof Config.fromJSONFile).toBe("function");
  });
});
