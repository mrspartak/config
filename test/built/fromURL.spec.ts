import { describe, expect, it } from "vitest";
import { fromURL } from "../../dist/index.js";

describe("fromURL", () => {
  it("must be a function", () => {
    expect(typeof fromURL).toBe("function");
  });
});
