<p align="center">
  <img width="560" src="https://raw.githubusercontent.com/mrspartak/config/master/assets/logo.svg" alt="Vite logo">
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/@mrspartak/config"><img src="https://img.shields.io/npm/v/@mrspartak/config.svg" alt="npm package"></a>
  <a href="https://npmjs.com/package/@mrspartak/config"><img src="https://img.shields.io/bundlephobia/min/%40mrspartak/config.svg" alt="bundle size"></a>
  <a href="https://npmjs.com/package/@mrspartak/config"><img src="https://img.shields.io/npm/dw/%40mrspartak%2Fconfig.svg" alt="downloads"></a>
  <a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/@mrspartak/config.svg" alt="node compatibility"></a>
</p>
<br/>

# 🔧 Typescript runtime configuration resolver 

@mrspartak/config is a robust TypeScript runtime configuration resolver designed to ensure that your application runs with the correct settings every time. It supports dynamic runtime validation, deep merging of configurations, and integrates seamlessly with your choice of data validation libraries.

- ⚡️ **Runtime Validation**: Ensure your application never runs with the wrong configuration.
- 🧙‍♂️ **TypeScript IntelliSense**: Leverage auto-completion and type-checking at development time.
- 🍃 **Zero Dependencies**: Lightweight with no external dependencies
- 🤲 **Flexible Configuration Merging**: Supports merging multiple configurations with a default overwrite strategy.
- 👓 **Versatile Configuration Sources**: Load from JSON files, URLs, or direct objects. Inderect .env support
- 🐻 **Extensible Validation Support**: Compatible with **Zod**, **Valibot**, **Yup**, **Superstruct**, and more.
- ✅ **Production Ready**: Thoroughly tested and stable for use.
- 📦 **Front-end friendly**: Can be used on a front-end with bundlers.

## Installation
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

## Using with JSON config on a back-end

> This is a recomended way of doing back-end run-time configuration. It allows to have readable structures and can be used with configmaps and secrets on deploy. 

```ts
// file: state/config.ts
import { fromJSONFile } from "@mrspartak/config";
import * as z from "zod"

const config = await fromJSONFile({
  path: ["../config/default.json", "../config/runtime.json"],
  schema: z.object({
    db: z.object({
      host: z.string(),
      port: z.number(),
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

```ts
// file: index.ts
// Import your resolved configuration
import config from './state/config.js';

// Use the configuration in your application
import db from 'some-db-provider';
const dbClient = db(config.db); // Enjoy IntelliSense here!
```

## Using with .env configuration on back-end

> Libriaries that parse .env configuration files are rich with features, so no reason to write my own. But this library can still be used on top for validation and IntelliSense purposes.

```ts
// file: state/config.ts
import { fromObject } from "@mrspartak/config";
import * as z from "zod"

const schema = z
  .object({
    NODE_ENV: z.enum(["development", "production"]),
    DB_HOST: z.string(),
    DB_PORT: z.number(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    APP_PORT: z.number().default(3000),
  })
  .transform((data) => ({
    environment: data.NODE_ENV,
    port: data.APP_PORT,
    db: {
      host: data.DB_HOST,
      port: data.DB_PORT,
      user: data.DB_USER,
      password: data.DB_PASSWORD,
    },
  }));

const config = await fromObject({
  data: process.env,
  schema
})

export default config
```

```ts
// file index.ts
import 'dotenv/config'
// ! Configuration must be loaded after dotenv so it will populate process.env
import config from './state/config.js';

// Use the configuration in your application
import db from 'some-db-provider';
const dbClient = db(config.db); // Enjoy IntelliSense here!
```

## Using on front-end

> There is a separate build, that trims Node APIs for usage on front-end. Because this library is mostly build to improve DX, I see no reason to bundle it for usage on front-ends without a bundler (vite, webpack...)  
> It supports both build-time and run-time configurations

### Build-time front-end configuration
```ts
// file: state/config.ts
import { fromObject } from "@mrspartak/config/web"; // a separate build of the library
import * as z from "zod"

const schema = z
  .object({
    API_URL: z.string(),
  })

const config = await fromObject({
  data: import.meta.env, // example with vite 
  schema
})

export default config
```

### Run-time front-end configuration
```ts
// file: state/config.ts
import { fromURL } from "@mrspartak/config/web"; // a separate build of the library
import * as z from "zod"

const environment = import.meta.env.DEV ? "development" : "production"
const configPath = `/config/${environment}.json`

const schema = z
  .object({
    api_url: z.string(),
  })

const config = await fromURL({
  url: configPath, // will load a json from URL
  schema
})

export default config
```

### Front-end usage

```tsx
// file main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { ConfigProvider } from "@/context/ConfigContext"
import { Routes } from "@/routes"

async function main() {
  // Can be build-time, run-time or even both
  const config = await import("@/state/config"); 

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ConfigProvider config={config}>
        <Routes />
      </ConfigProvider>
    </React.StrictMode>
  )
}

main().catch(error => {
  console.error("Mount error", error)
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <div className="flex items-center justify-center h-screen">
          1. Try to reaload the page.
          <br />
          2. If doesn't help, please talk to developers, something went wrong.
      </div>
    </React.StrictMode>
})
```

API documentation is generated from TS declaration is avialable here: https://mrspartak.github.io/config/

## Contributing
I welcome contributions from the community! Whether it's improving the documentation, adding new features, or reporting bugs, please feel free to make a pull request or open an issue.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
 