import { readFile as _readFile, stat } from "node:fs/promises";

export async function readFile(path: string, encoding: BufferEncoding = "utf-8"): Promise<string> {
  const stats = await stat(path);
  if (!stats.isFile()) throw new Error("Not a file");

  return _readFile(path, { encoding });
}
