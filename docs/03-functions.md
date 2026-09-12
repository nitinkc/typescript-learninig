# Functions

This lesson covers function signatures, arrow functions, optional and default parameters, rest parameters, callbacks, and return types.

## Function declarations

Add types after the parameters and after the return arrow.

```ts
function add(a: number, b: number): number {
  return a + b
}
```

If a function does not return a value, use `void`.

```ts
function log(message: string): void {
  console.log(message)
}
```

## Arrow functions

Arrow functions use the same type placement.

```ts
const multiply = (a: number, b: number): number => a * b
```

When the function body is an expression, the return type is inferred from the expression.

```ts
const multiply = (a: number, b: number) => a * b
```

Inference works here, but explicit types help readers and catch mistakes.

## Optional and default parameters

Mark a parameter optional with `?`. Provide a default with `=`.

```ts
function greet(name: string, greeting?: string): string {
  const prefix = greeting ?? 'Hello'
  return `${prefix}, ${name}`
}

function greet2(name: string, greeting = 'Hello'): string {
  return `${greeting}, ${name}`
}
```

`greeting?` gives `string | undefined`. The default parameter is `string` and has the value `Hello` when omitted.

## Rest parameters

Collect remaining arguments into a typed array.

```ts
function sum(...values: number[]): number {
  return values.reduce((total, value) => total + value, 0)
}

sum(1, 2, 3) // 6
```

## Callback types

Functions that accept other functions are common in array methods and event handlers.

```ts
function withNumber(n: number, action: (value: number) => void): void {
  action(n)
}

withNumber(10, (value) => {
  console.log(value * 2)
})
```

TypeScript infers the parameter type of the callback when it is in context.

## Function overloads

Overloads let a single function have different signatures for different inputs.

```ts
function format(input: string): string
function format(input: number): number
function format(input: string | number): string | number {
  if (typeof input === 'string') {
    return input.trim()
  }
  return input.toFixed(2)
}
```

The first two lines are the public signatures. The final implementation accepts the union.

## Returning objects and arrays

Always annotate return types for public functions or when inference is too broad.

```ts
function makeUser(name: string): { id: string; name: string } {
  return { id: crypto.randomUUID(), name }
}
```

!!! tip
    Return type annotations prevent accidentally returning the wrong shape. They also make the function contract obvious to the next reader.

## Hands-on: score calculator

1. Create `src/scores.ts`.
2. Write `function totalScore(...scores: number[]): number`.
3. Write `function averageScore(scores: number[], round = false): number` that returns the average and optionally rounds it to an integer.
4. Write `function describe(score: number): string` that returns `'pass'` for `>= 70`, `'retake'` otherwise.
5. Compose the functions: compute the total, the average, and a description for an array of scores.
6. Add `void` to a function `printResult(score: number, description: string): void` that logs them together.
7. Introduce a wrong `round` value such as `'yes'` and watch the compiler complain.

## Try editing and running

```ts { .ts-runner data-expected="85.5" data-title="Format a score" }
function formatScore(score: number): string {
  return score.toFixed(1)
}

console.log(formatScore())
```
