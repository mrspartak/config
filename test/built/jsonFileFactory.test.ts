import { describe, expect, it } from "vitest";
import { Config } from "../../dist/index.js";

describe("fromJSONFile", () => {
  it("must be a function", () => {
    expect(typeof Config.fromJSONFile).toBe("function");
  });
});
