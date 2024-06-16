import { describe, expect, it } from "vitest";
import { fromJSONFile } from "../../dist/index.js";

describe("fromJSONFile", () => {
  it("must be a function", () => {
    expect(typeof fromJSONFile).toBe("function");
  });
});
