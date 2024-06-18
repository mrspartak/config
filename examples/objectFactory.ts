import { fromObject } from "@mrspartak/config";
import * as z from "zod";

const schema = z.object({
  name: z.string(),
  age: z.number(),
  isStudent: z.boolean(),
});

const data = await fromObject({
  data: { name: "Alice", age: 25, isStudent: true },
  schema,
});

console.log(data); // { name: 'Alice', age: 25, isStudent: true }
const name: string = data.name; // OK
