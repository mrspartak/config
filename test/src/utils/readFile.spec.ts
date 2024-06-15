import { mkdir, rm, rmdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { readFile } from "../../../src/util/readFile";

describe("readFile", () => {
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
    expect(typeof readFile).toBe("function");
  });

  it("must read a file", async (ctx) => {
    // writing file
    const filePath = path.resolve(directory, ctx.task.id);
    await writeFile(filePath, "readFile");

    expect(await readFile(filePath)).toContain("readFile");
  });

  it("must read a file with encoding", async (ctx) => {
    // writing file
    const filePath = path.resolve(directory, ctx.task.id);
    await writeFile(filePath, "readFile");

    expect(await readFile(filePath, "utf8")).toContain("readFile");
  });

  it("will throw an error if the file does not exist", async (ctx) => {
    const filePath = path.resolve(directory, ctx.task.id);

    try {
      await readFile(filePath);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it("will throw an error if the path is a directory", async (ctx) => {
    const filePath = path.resolve(directory, ctx.task.id);
    await mkdir(filePath);

    try {
      await readFile(filePath);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
