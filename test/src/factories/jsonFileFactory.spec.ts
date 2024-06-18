import { mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as z from "zod";
import { fromJSONFile } from "../../../src/factories/jsonFileFactory";

describe("fromJSONFile", () => {
  let directory = "";

  beforeAll(async () => {
    // Creating tmp folder for tests
    directory = path.resolve(os.tmpdir(), Math.random().toString(36).substring(2, 15));
    await mkdir(directory, { recursive: true });
  });

  afterAll(async () => {
    // Removing tmp folder
    await rm(directory, { recursive: true });
  });

  it("must be a function", () => {
    expect(typeof fromJSONFile).toBe("function");
  });

  it("must read a file", async (ctx) => {
    // writing file
    const filePath = path.resolve(directory, ctx.task.id);
    await writeFile(filePath, JSON.stringify({ test: "readFile" }));

    const config = await fromJSONFile({
      path: filePath,
      schema: z.object({ test: z.string() }),
    });

    expect(config).toEqual({ test: "readFile" });
  });

  it("must merge config files", async (ctx) => {
    // writing file
    const defaultConfigPath = path.resolve(directory, ctx.task.id);
    await writeFile(defaultConfigPath, JSON.stringify({ a: 1 }));

    const runtimeConfigPath = path.resolve(directory, ctx.task.id + 1);
    await writeFile(runtimeConfigPath, JSON.stringify({ a: 2 }));

    const config = await fromJSONFile({
      path: [defaultConfigPath, runtimeConfigPath],
      schema: z.object({ a: z.number() }),
    });

    expect(config).toEqual({ a: 2 });
  });

  it("will throw an error if the file does not exist", async (ctx) => {
    const filePath = path.resolve(directory, ctx.task.id);

    try {
      await fromJSONFile({
        path: filePath,
        schema: z.object({ test: z.string() }),
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it("will throw an error if the path is a directory", async (ctx) => {
    const filePath = path.resolve(directory, ctx.task.id);
    await mkdir(filePath);

    try {
      await fromJSONFile({
        path: filePath,
        schema: z.object({ test: z.string() }),
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it("should throw an error, wrong validator", async (ctx) => {
    // writing file
    const defaultConfigPath = path.resolve(directory, ctx.task.id);
    await writeFile(defaultConfigPath, JSON.stringify({ a: 1 }));

    // @ts-expect-error Testing error
    expect(() => fromJSONFile({ path: defaultConfigPath, schema: { test: "test" } })).rejects.toThrowError(
      "Could not find a validator function in the given schema. We suppurt validators like zod, yup, superstruct, etc.",
    );
  });

  it("should throw an error, wrong data", async (ctx) => {
    // writing file
    const defaultConfigPath = path.resolve(directory, ctx.task.id);
    await writeFile(defaultConfigPath, JSON.stringify({ a: 1 }));

    expect(() =>
      fromJSONFile({ path: defaultConfigPath, schema: z.object({ test: z.string() }) }),
    ).rejects.toThrowError();
  });
});
