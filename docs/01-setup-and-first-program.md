# Setup and first program

This lesson gets TypeScript running on your machine and explains what happens when a `.ts` file becomes JavaScript.

## What is TypeScript?

TypeScript is a typed layer on top of JavaScript. You write `.ts` files, the TypeScript compiler checks types, then emits plain JavaScript that runs in browsers, Node.js, or any JavaScript engine.

```
TypeScript source  --tsc-->  JavaScript output  --node/browser-->  runs
```

The types disappear at runtime. They exist to catch mistakes before the program runs.

## Install the compiler

Use the compiler that ships with the `typescript` package.

```bash
npm install -g typescript
```

Check the install:

```bash
tsc --version
```

!!! tip
    A global install is fine for learning. Real projects usually install TypeScript as a dev dependency (`npm install -D typescript`) so every teammate uses the same version.

## Your first file

Create `hello.ts`:

```ts
const greeting: string = 'Hello, TypeScript'
console.log(greeting)
```

Compile and run it:

```bash
tsc hello.ts
node hello.js
```

`tsc hello.ts` produces `hello.js`:

```js
var greeting = 'Hello, TypeScript'
console.log(greeting)
```

Notice the `: string` type annotation is gone. It only helped the compiler.

## Create a project

A real project uses a `tsconfig.json` file so the compiler knows the rules.

```bash
mkdir ts-intro
cd ts-intro
npm init -y
npm install -D typescript
tsc --init
```

`tsconfig.json` will contain many default settings. For learning, this minimal version is enough:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

| Setting | Purpose |
|---|---|
| `target` | JavaScript language version to emit |
| `module` | Module system for imports/exports |
| `strict` | Enables stronger type checking |
| `outDir` | Where compiled JavaScript goes |
| `rootDir` | Where source TypeScript lives |

Create `src/index.ts`:

```ts
const title = 'My first project'
console.log(title)
```

Compile:

```bash
npx tsc
```

Run the emitted file:

```bash
node dist/index.js
```

## Watch mode

For fast feedback while learning, run the compiler in watch mode. It recompiles whenever you save.

```bash
npx tsc --watch
```

!!! tip
    Keep one terminal running `npx tsc --watch` and another running `node dist/index.js` when you try the hands-on tasks.

## Hands-on: temperature converter

1. Create a project with `tsconfig.json` pointing `rootDir` at `src` and `outDir` at `dist`.
2. Add `src/temperature.ts`.
3. Write a function `celsiusToFahrenheit(c: number): number` that returns `(c * 9/5) + 32`.
4. Call it with a few temperatures and `console.log` the results.
5. Compile with `npx tsc` and run `node dist/temperature.js`.
6. Introduce an error on purpose: pass a string to `celsiusToFahrenheit` and see the compiler error.

??? question "What did the error teach you?"
    TypeScript noticed the wrong argument type before the program ran. Remove the wrong call and recompile.

## Try editing and running

```ts { .ts-runner data-expected="77" data-title="Temperature converter" }
function celsiusToFahrenheit(c: number): number {
  return (c * 9 / 5) + 32

console.log(celsiusToFahrenheit(25))
```

## Common first mistakes

- Forgetting that `.ts` files compile to `.js` and then running `node file.ts`. Run the `.js` output instead.
- Writing `tsc` without a `tsconfig.json` and getting unexpected output. Use `--init` or a project file.
- Ignoring red squiggles. TypeScript warnings usually prevent real bugs.
