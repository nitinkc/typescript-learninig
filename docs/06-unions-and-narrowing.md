# Unions and narrowing

This lesson covers union types, intersection types, type guards, discriminated unions, and how to safely work with values that can be more than one thing.

## Union types

A union says a value can be one of several types.

```ts
type Id = string | number
```

You can call only the methods that exist on every member of the union.

```ts
function describe(id: Id): string {
  return id.toString()  // works on both string and number
}
```

Trying to call `id.toUpperCase()` would fail because `number` does not have that method.

## Intersection types

An intersection requires a value to satisfy all combined types.

```ts
type Named = { name: string }
type Aged = { age: number }

type Person = Named & Aged
```

A `Person` must have both `name` and `age`.

```ts
const ada: Person = { name: 'Ada', age: 36 }
```

## Narrowing with `typeof`

Use type guards to narrow a union to a single member.

```ts
function format(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value.toFixed(2)
}
```

Inside the `if` block, `value` is narrowed to `string`. In the `else`, it is `number`.

## Narrowing with `in`

```ts
type Circle = { kind: 'circle'; radius: number }
type Square = { kind: 'square'; side: number }

type Shape = Circle | Square

function area(shape: Shape): number {
  if ('radius' in shape) {
    return Math.PI * shape.radius ** 2
  }
  return shape.side ** 2
}
```

## Discriminated unions

Give each member a shared literal property called the discriminant.

```ts
type Result<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

function message<T>(result: Result<T>): string {
  switch (result.status) {
    case 'idle':
      return 'Ready'
    case 'loading':
      return 'Loading...'
    case 'success':
      return `Got ${JSON.stringify(result.data)}`
    case 'error':
      return result.message
  }
}
```

The `switch` on `status` narrows `result` inside each `case`. TypeScript knows whether `data` or `message` is available.

## Excess property checks

Object literals are checked for extra properties beyond the declared type.

```ts
type Point = { x: number; y: number }
const p: Point = { x: 1, y: 2, z: 3 }  // error: excess property z
```

This does not happen when assigning an existing variable because excess property checking only applies to fresh object literals.

## Hands-on: shape area calculator

1. Create `src/shapes.ts`.
2. Define a discriminated union `Shape` with members `Circle`, `Rectangle`, and `Triangle`.
   - `Circle` uses `radius`
   - `Rectangle` uses `width` and `height`
   - `Triangle` uses `base` and `height`
3. Write `function area(shape: Shape): number` with a `switch`.
4. Create an array of mixed shapes and use `map` to compute all areas.
5. Write `function totalArea(shapes: Shape[]): number` using `reduce`.
6. Add a fourth shape `Triangle` only if the previous switch handled it with an explicit case. Try adding an unhandled case and see the compiler warn.

## Try editing and running

```ts { .ts-runner data-expected="100" data-title="Shape area calculator" }
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius
    case 'square'
      return shape.side * shape.side
  }
}

console.log(area({ kind: 'square', side: 10 }))
```
