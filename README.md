# Opionated Typescript runtime configuration resolver

* Runtime validation (no more deployments with the wrong configuration)
* TS intelissense
* Merge configurations (defaults overwrite strategy)
* Support for JSON file/url config, Object config, [soon] ENV
* Uses valibot for validation 
* [soon] Works as a run-time config provider on a front-end

# Usage

1. Create a config resolver file
```ts
import { v, Config } from "@mrspartak/config";

export default await Config.fromJSONFile({
  path: ["../config/default.json", "../config/runtime.json"],
  schema: v.object({
    db: v.object({
      host: v.string(),
      port: v.number(),
      username: v.string(),
      password: v.string()
    }),
    app: v.object({
      port: v.optional(v.number(), 3000)
    })
  }),
});
```

2. Import resolved configuration anywhere you need
```ts
import config from 'config.js'
import db from 'some-db-provider'

const dbClient = db(config.db)
```