# Modules and tooling

This lesson covers the module system, type-only imports, declaration files, and the parts of `tsconfig.json` you will touch most often.

## ES modules

TypeScript supports the standard ES module syntax.

```ts
// math.ts
export function add(a: number, b: number): number {
  return a + b
}

export const PI = 3.14159
```

```ts
// main.ts
import { add, PI } from './math.js'
```

!!! note
    TypeScript allows `import ... from './math.js'` even when the source file is `math.ts`. The `.js` extension matches the emitted file and keeps the import valid at runtime.

## Default and named exports

```ts
// logger.ts
export function log(message: string): void {
  console.log(message)
}

export default log
```

```ts
import log from './logger.js'
import { log as writeLog } from './logger.js'
```

## Type-only imports

Use `import type` when you only need the type at compile time.

```ts
import type { User } from './user.js'

export type { User }
```

These imports are erased from the emitted JavaScript.

## Re-exports

```ts
export { User, log } from './shared.js'
```

## Declaration files

A `.d.ts` file describes types for JavaScript code.

```ts
// types.d.ts
declare const API_URL: string
declare function format(value: number): string
```

These are common when consuming untyped libraries or writing global types.

## tsconfig.json in practice

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "exactOptionalPropertyTypes": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

| Flag | Effect |
|---|---|
| `strict` | Enables the strongest common checks |
| `noImplicitAny` | Flags places where `any` is inferred |
| `noUnusedLocals` | Warns about unused variables |
| `exactOptionalPropertyTypes` | Distinguishes `undefined` from missing |

## Path mapping

For larger projects, map import aliases.

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Hands-on: split a project into modules

1. In your project `src/` folder, create `utils.ts`, `user.ts`, and `main.ts`.
2. In `user.ts`, export `interface User` and `function createUser(name: string): User`.
3. In `utils.ts`, export `function formatName(name: string): string`.
4. In `main.ts`, import the user and utility, create a user, and log a formatted name.
5. Use `import type { User } from './user.js'` in a file that does not need the runtime `createUser` function.
6. Add `"noUnusedLocals": true` to `tsconfig.json` and remove any unused variables the compiler reports.
