import { fromURL } from "@mrspartak/config";
import * as z from "zod";

const schema = z.object({
  name: z.string(),
  age: z.number(),
  isStudent: z.boolean(),
});

const data = await fromURL({
  url: "https://example.com/data.json",
  schema,
});

console.log(data); // { name: 'Alice', age: 25, isStudent: true }
const name: string = data.name; // OK
