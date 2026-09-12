# Types and values

This lesson covers the primitive types, type inference, literal types, and the difference between `any`, `unknown`, and type assertions.

## Primitive types

TypeScript builds on JavaScript primitives. Each value can be annotated with a type.

```ts
const name: string = 'Ada'
const year: number = 2024
const active: boolean = true
const nothing: null = null
const notDefined: undefined = undefined
```

| Type | Examples | Notes |
|---|---|---|
| `string` | `'hello'`, `"
"
` | Text values |
| `number` | `42`, `-3.14`, `NaN` | All numbers are `number` |
| `boolean` | `true`, `false` | Logical values |
| `null` | `null` | Intentional absence |
| `undefined` | `undefined` | Uninitialized value |
| `symbol` | `Symbol('id')` | Unique keys |
| `bigint` | `100n` | Arbitrary-size integers |

## Inference

TypeScript often figures out the type from the value. You do not need to annotate everything.

```ts
const name = 'Ada'            // inferred as string
const count = 12              // inferred as number
const settings = {            // inferred as { dark: boolean }
  dark: true,
}
```

Add an annotation when the type is not obvious or when you want to document a contract.

```ts
const values: number[] = []   // empty array needs an annotation
```

Without the annotation, an empty array becomes `any[]` and loses type safety.

## Literal types

A literal type represents one exact value.

```ts
const course = 'TypeScript'   // literal 'TypeScript'
let status: 'draft' | 'published' = 'draft'
```

Using `let` with a string literal widens the type to `string` unless you add an explicit type.

```ts
let version = '2.0'           // inferred as string
const version: '2.0' = '2.0'  // literal type
```

## `any`, `unknown`, and `never`

`any` turns off type checking. Use it as a last resort.

```ts
let data: any = fetchData()
data.doesNotExist()           // compiles, may crash at runtime
```

`unknown` is safer. You must prove the type before using it.

```ts
function logLength(value: unknown): void {
  if (typeof value === 'string') {
    console.log(value.length)
  }
}
```

`never` means a value can never occur. It often appears in exhaustive checks or functions that always throw.

```ts
function fail(message: string): never {
  throw new Error(message)
}
```

## Type assertions

An assertion tells the compiler to treat a value as a specific type. It does not convert or validate the value.

```ts
const input = document.getElementById('name') as HTMLInputElement
console.log(input.value)
```

!!! warning
    A type assertion does not check the actual value. If the element is not an input, the program can crash. Validate data from the DOM, network, or files when the source is untrusted.

## Type aliases

Give a type a reusable name with `type`.

```ts
type UserId = string
type Role = 'admin' | 'editor' | 'viewer'

type User = {
  id: UserId
  role: Role
}
```

Type aliases can describe primitives, unions, tuples, and objects. They are useful for making intent explicit.

## Hands-on: validate a form input

1. In your project, create `src/form.ts`.
2. Declare a variable `rawInput: unknown` and assign a string value.
3. Write a function `toUpperCase(value: unknown): string` that:
   - returns the uppercased value if `typeof value === 'string'`
   - throws an error otherwise
4. Call `toUpperCase(rawInput)` and `console.log` the result.
5. Try passing a `number` and watch the function reject it at runtime while TypeScript still accepts the call because of `unknown`.
6. Change the parameter to `value: string` and observe how the call site now gets a compiler error for the number.

??? question "When should you use `unknown` instead of `any`?"
    Use `unknown` whenever you receive data you cannot trust. It forces you to check the shape before using it.

## Try it in the playground

```ts { .ts-runner data-expected="HELLO" data-title="Validate a form input" }
const rawInput: unknown = 'Hello'
if (typeof rawInput === 'string') {
  console.log(rawInput.toUpperCase()
}
```
