import { describe, expect, it } from "vitest";
import { deepMerge } from "../../../src/util/mergeObjects";

describe("deepMerge", () => {
  it("must be a function", () => {
    expect(typeof deepMerge).toBe("function");
  });

  it("must merge two objects", () => {
    const a = { a: 1 };
    const b = { b: 2 };
    expect(deepMerge(a, b)).toEqual({ a: 1, b: 2 });
  });

  it("must merge two objects with the same key", () => {
    const a = { a: 1 };
    const b = { a: 2 };
    expect(deepMerge(a, b)).toEqual({ a: 2 });
  });

  it("must merge two objects with nested objects", () => {
    const a = { a: { a: 1 } };
    const b = { a: { b: 2 } };
    expect(deepMerge(a, b)).toEqual({ a: { a: 1, b: 2 } });
  });

  it("must merge two objects with nested objects with the same key", () => {
    const a = { a: { a: 1 } };
    const b = { a: { a: 2 } };
    expect(deepMerge(a, b)).toEqual({ a: { a: 2 } });
  });

  it("must merge two objects with nested objects with nested objects", () => {
    const a = { a: { a: { a: 1 } } };
    const b = { a: { a: { b: 2 } } };
    expect(deepMerge(a, b)).toEqual({ a: { a: { a: 1, b: 2 } } });
  });
});
