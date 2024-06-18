import { readFile as _readFile, stat } from "node:fs/promises";

/**
 * Asynchronously reads the content of a file at a given path with specified encoding.
 * This function checks if the target path is a valid file before reading it. If the path
 * does not correspond to a file, it throws an error.
 *
 * @param {string} path - The path to the file to be read.
 * @param {BufferEncoding} encoding - The encoding format in which to read the file. Defaults to 'utf-8'.
 * @returns {Promise<string>} - A promise that resolves with the contents of the file as a string.
 * @throws {Error} If the provided path does not point to a valid file.
 */
export async function readFile(path: string, encoding: BufferEncoding = "utf-8"): Promise<string> {
  const stats = await stat(path);
  if (!stats.isFile()) throw new Error("Not a file"); // Validate that the path is actually a file

  return _readFile(path, { encoding }); // Read and return the file content
}
