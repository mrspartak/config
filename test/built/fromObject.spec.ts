import { describe, expect, it } from "vitest";
import { fromObject } from "../../dist/index.js";

describe("fromObject", () => {
  it("must be a function", () => {
    expect(typeof fromObject).toBe("function");
  });
});
