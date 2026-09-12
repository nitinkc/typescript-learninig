# Objects and interfaces

This lesson explains how to describe object shapes, when to use `interface` versus `type`, and how to model optional, readonly, and nested data.

## Interfaces

An `interface` defines a contract for an object.

```ts
interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
}
```

A variable that satisfies the interface can be used anywhere the interface is expected.

```ts
const ada: User = {
  id: '1',
  name: 'Ada',
  email: 'ada@example.com',
  isAdmin: true,
}
```

## Optional and readonly properties

```ts
interface Lesson {
  readonly id: string
  title: string
  description?: string
}
```

- `readonly` stops the property from being reassigned through this type.
- `?` makes the property optional.

!!! note
    `readonly` is a compile-time check. It does not freeze the object at runtime.

## Extending interfaces

Use `extends` to build larger interfaces from smaller ones.

```ts
interface Entity {
  id: string
  createdAt: Date
}

interface Course extends Entity {
  title: string
  lessons: Lesson[]
}
```

## Type aliases for objects

`type` can also describe objects and can represent things `interface` cannot, such as unions.

```ts
type Result =
  | { ok: true; value: Course }
  | { ok: false; error: string }
```

For most object contracts, either `interface` or `type` works. A common convention is to use `interface` for object shapes that may be extended, and `type` for unions, tuples, and computed types.

## Index signatures

When an object has a dynamic set of keys, use an index signature.

```ts
interface Gradebook {
  [studentId: string]: number
}

const grades: Gradebook = {
  'stu-1': 92,
  'stu-2': 87,
}
```

## Nested shapes

Types can reference other types.

```ts
interface Address {
  city: string
  country: string
}

interface Contact {
  name: string
  address: Address
}
```

## Hands-on: model a course catalog

1. Create `src/catalog.ts`.
2. Define `interface Lesson` with `readonly id`, `title`, `durationMinutes`, and optional `description`.
3. Define `interface Course` with `id`, `title`, `instructor`, and `lessons: Lesson[]`.
4. Create one `Course` object with at least two lessons.
5. Write `function totalDuration(course: Course): number` that sums `durationMinutes`.
6. Try to reassign a lesson's `id` and observe the compiler error from `readonly`.
7. Add an index signature to `interface Progress` that maps a lesson id to a boolean `completed`.
