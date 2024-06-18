import { fromJSONFile } from "@mrspartak/config";
import * as z from "zod";

const schema = z.object({
  environment: z.enum(["development", "production"]),
  port: z.number().default(3000),
  db: z.object({
    host: z.string(),
    port: z.number(),
    user: z.string(),
    password: z.string(),
  }),
});

const data = await fromJSONFile({
  path: ["config/default.json", "config/production.json"],
  schema,
});

console.log(data); // { environment: 'production', port: 3000, db: { host: 'localhost', port: 5432, user: 'admin', password: 'admin' } }
const db = data.db; // Object { host: 'localhost', port: 5432, user: 'admin', password: 'admin' }
