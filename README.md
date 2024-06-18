# Typescript runtime configuration resolver

@mrspartak/config is a robust TypeScript runtime configuration resolver designed to ensure that your application runs with the correct settings every time. It supports dynamic runtime validation, deep merging of configurations, and integrates seamlessly with your choice of data validation libraries.

![GitHub Release](https://img.shields.io/github/v/release/mrspartak/config?style=for-the-badge&color=%231b1b1f)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/%40mrspartak/config?style=for-the-badge&color=%231b1b1f)
![NPM Downloads](https://img.shields.io/npm/dw/%40mrspartak%2Fconfig?style=for-the-badge&color=%231b1b1f)

* ⚡️ Runtime Validation: Ensure your application never runs with the wrong configuration.
* 🧙‍♂️ TypeScript IntelliSense: Leverage auto-completion and type-checking at development time.
* 🍃 Zero Dependencies: Lightweight with no external dependencies
* 🤲 Flexible Configuration Merging: Supports merging multiple configurations with a default overwrite strategy.
* 👓 Versatile Configuration Sources: Load from JSON files, URLs, or direct objects.
* 🐻 Extensible Validation Support: Compatible with **Zod**, **Valibot**, **Yup**, **Superstruct**, and more.
* ✅ Production Ready: Thoroughly tested and stable for use.

## Roadmap

* 📁 Support for .env files.
* 🌐 Enhance front-end compatibility.
* 📚 Expand documentation.
* ⚙️ Integrate GitHub Actions for test coverage reporting.

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

## Quick Start

Create a config resolver file
```ts
// file: state/config.ts
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

Import resolved configuration anywhere you need
```ts
// file: index.ts
// Import your resolved configuration
import config from './state/config.js';

// Use the configuration in your application
import db from 'some-db-provider';
const dbClient = db(config.db); // Enjoy IntelliSense here!
```

Full documentation is generated from TS declaration avialable here: https://mrspartak.github.io/config/

## Contributing
I welcome contributions from the community! Whether it's improving the documentation, adding new features, or reporting bugs, please feel free to make a pull request or open an issue.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
 