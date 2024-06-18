# Typescript runtime configuration resolver

![GitHub Release](https://img.shields.io/github/v/release/mrspartak/config?style=for-the-badge&color=%231b1b1f)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/%40mrspartak/config?style=for-the-badge&color=%231b1b1f)
![NPM Downloads](https://img.shields.io/npm/dw/%40mrspartak%2Fconfig?style=for-the-badge&color=%231b1b1f)

* ⚡️ Runtime validation (no more deployments with the wrong configuration)
* 🧙‍♂️ TypeScript intelissense
* 🍃 Light, zero external dependencies
* 🤲 Merge configurations (defaults overwrite strategy)
* 👓 Support for JSON file/url config, Object config, [soon] ENV
* 🐻 Bring your validator library of choise. We support **Zod**, **Valibot**, **Yup**, **Superstruct** etc...
* ✅ Well-tested and production ready.
* [soon] Works as a run-time config provider on a front-end

## Quickstart
```sh
# yarn
yarn add @mrspartak/config

# npm
npm i @mrspartak/config

# pnpm
pnpm add @mrspartak/config

# bun
bun add @mrspartak/config
```

## Usage

1. Create a config resolver file
```ts
import { fromJSONFile } from "@mrspartak/config";
import * as z from "zod"

const config = await fromJSONFile({
  path: ["../config/default.json", "../config/runtime.json"],
  schema: z.object({
    db: z.object({
      host: z.string(),
      port: zv.number(),
      username: z.string(),
      password: z.string()
    }),
    app: z.object({
      port: z.number().optional().default(3000)
    })
  }),
});

export default config
```

2. Import resolved configuration anywhere you need
```ts
import config from 'config.js'
import db from 'some-db-provider'

const dbClient = db(config.db) // config.db will have full intelisense
```