# Utility types

This lesson covers the built-in utility types that transform existing types without repeating yourself.

## Common utilities

TypeScript ships with helpers that modify properties, keys, and structure.

```ts
interface User {
  id: string
  name: string
  email: string
  age: number
  isAdmin: boolean
}
```

### `Partial<T>`

Makes every property optional.

```ts
type UserDraft = Partial<User>
```

### `Required<T>`

Makes every property required.

```ts
type UserUpdate = Required<User>
```

### `Pick<T, K>`

Keeps only the chosen properties.

```ts
type UserPreview = Pick<User, 'id' | 'name'>
```

### `Omit<T, K>`

Removes the chosen properties.

```ts
type UserFormData = Omit<User, 'id' | 'isAdmin'>
```

### `Readonly<T>`

Makes every property readonly.

```ts
type ImmutableUser = Readonly<User>
```

### `Record<K, V>`

Creates a type with keys `K` and values `V`.

```ts
type UserById = Record<string, User>
```

## `ReturnType` and `Parameters`

Extract a function's return type or parameter tuple.

```ts
function createUser(name: string, age: number): User {
  return { id: '1', name, email: '', age, isAdmin: false }
}

type CreateUserReturn = ReturnType<typeof createUser>
type CreateUserParams = Parameters<typeof createUser>
```

## `keyof` and indexed access

```ts
type UserKey = keyof User          // 'id' | 'name' | 'email' | 'age' | 'isAdmin'
type UserName = User['name']       // string
```

## `typeof` for values

Derive a type from a value.

```ts
const defaultUser = {
  id: '0',
  name: 'Guest',
}

type DefaultUser = typeof defaultUser
```

## Mapped types

Create a new type by transforming each property.

```ts
type Nullable<T> = {
  [K in keyof T]: T[K] | null
}
```

!!! tip
    Utility types are most useful when the original type already describes the source of truth. They reduce duplicated shape definitions.

## Hands-on: profile editor

1. Create `src/profile.ts`.
2. Define `interface User` with `id`, `name`, `email`, `age`, and `isAdmin`.
3. Define `type UserUpdate = Partial<Omit<User, 'id' | 'isAdmin'>>` for fields a user can edit.
4. Write `function applyUpdate(user: User, update: UserUpdate): User` that returns a new user with changes merged in.
5. Use `Readonly<User>` for a `currentUser` constant and try to mutate it.
6. Use `Record<string, User>` to build a `userByEmail` lookup.
7. Use `ReturnType` to define a type alias from a `function makeUser(): User`.
