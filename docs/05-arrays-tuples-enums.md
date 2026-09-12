# Arrays, tuples, and enums

This lesson covers ordered collections, fixed-length tuples, and the two kinds of enums available in TypeScript.

## Arrays

An array type is written with `T[]` or `Array<T>`.

```ts
const tags: string[] = ['typescript', 'javascript']
const scores: Array<number> = [92, 87, 95]
```

TypeScript infers array types from the literals.

```ts
const mixed = [1, 'two', 3]   // (string | number)[]
```

For arrays that should not change, add `readonly`.

```ts
const days: readonly string[] = ['Mon', 'Tue', 'Wed']
```

## Array methods

Common methods keep their types.

```ts
const numbers = [1, 2, 3, 4]
const doubled = numbers.map((n) => n * 2)       // number[]
const evens = numbers.filter((n) => n % 2 === 0) // number[]
const first = numbers.find((n) => n > 2)        // number | undefined
const sum = numbers.reduce((acc, n) => acc + n, 0) // number
```

## Tuples

A tuple has a fixed length and a type for each position.

```ts
const point: [number, number] = [10, 20]
const user: [string, number, boolean] = ['Ada', 36, true]
```

Named tuples can improve readability.

```ts
type RGB = [r: number, g: number, b: number]
const red: RGB = [255, 0, 0]
```

## Readonly arrays and tuples

Prevent mutation with `readonly`.

```ts
const route: readonly [string, string] = ['start', 'end']
```

## Enums

### String and numeric enums

```ts
enum Status {
  Draft,
  Review,
  Published,
}

enum Role {
  Admin = 'admin',
  Editor = 'editor',
}
```

Numeric enums default to `0`, `1`, `2`. String enums require explicit values.

### Const enums

`const enum` values are inlined at compile time and leave no runtime object.

```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

!!! warning
    Non-const `enum` creates a real JavaScript object. Many teams prefer string literal unions over `enum` to avoid the runtime object.

## Prefer literal unions

For closed sets of strings, a union is usually simpler.

```ts
type Status = 'draft' | 'review' | 'published'
```

This produces no runtime code and works well with narrowing and autocompletion.

## Hands-on: schedule tracker

1. Create `src/schedule.ts`.
2. Define a `type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'`.
3. Define `interface Task` with `title`, `durationMinutes`, and `day: Day`.
4. Create an array `tasks: Task[]` with at least three tasks.
5. Use `filter` to find all tasks for `'Mon'`.
6. Use `map` to produce an array of strings in the form `'Title - X minutes'`.
7. Use `reduce` to total the duration of all tasks.
8. Create a `readonly [string, number]` tuple named `dailyLimit` and try to reassign one of its elements.
