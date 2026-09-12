# Generics

This lesson explains generics: placeholders for types that keep relationships between inputs and outputs without resorting to `any`.

## Generic functions

A generic function introduces a type parameter in angle brackets.

```ts
function first<T>(items: T[]): T | undefined {
  return items[0]
}

const firstNumber = first([1, 2, 3])   // number | undefined
const firstString = first(['a', 'b'])  // string | undefined
```

`T` is chosen when the function is called, based on the argument.

## Generic interfaces and types

Types can also be generic.

```ts
interface Box<T> {
  value: T
}

const numberBox: Box<number> = { value: 42 }
const stringBox: Box<string> = { value: 'hello' }
```

## Multiple type parameters

You can have more than one.

```ts
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b]
}
```

## Generic constraints

Use `extends` to require that a type has certain properties.

```ts
interface HasId {
  id: string
}

function byId<T extends HasId>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id)
}
```

`T` can be any type that has an `id` string.

```ts
interface User extends HasId {
  name: string
}

byId<User>([], '1')
```

## Default type parameters

```ts
interface ApiResponse<T = unknown> {
  data: T
  status: number
}
```

If no type is supplied, `T` is `unknown`.

## Generic utility pattern

```ts
function map<T, U>(items: T[], transform: (item: T) => U): U[] {
  return items.map(transform)
}
```

This captures the relationship between the input array item type and the output array item type.

## Hands-on: generic data store

1. Create `src/store.ts`.
2. Define `interface Identifiable { id: string }`.
3. Write a generic class-like object or module `createStore<T extends Identifiable>()` that returns:
   - `add(item: T): void`
   - `get(id: string): T | undefined`
   - `remove(id: string): void`
   - `all(): readonly T[]`
4. Create one store for `interface User` and one for `interface Product`.
5. Add, retrieve, and remove items.
6. Try to add an item without an `id` and observe the constraint error.

## Try editing and running

```ts { .ts-runner data-expected="a" data-title="Generic data store" }
function first<T>(items: T[]): T | undefined {
  return items[0]

console.log(first(['a', 'b']))
```
