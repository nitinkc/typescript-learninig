# Async functions and promises

This lesson covers `Promise` types, `async`/`await`, typed error handling, and the risks of `any` at API boundaries.

## Promise types

A `Promise<T>` resolves to a value of type `T`.

```ts
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

## `async` functions

An `async` function always returns a `Promise`.

```ts
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json() as Promise<User>
}
```

The `as Promise<User>` assertion documents the expected shape but does not validate it.

!!! warning
    `response.json()` returns `Promise<any>`. Real code should validate the response body against a schema before trusting it.

## Handling errors

Errors in `async` functions are untyped and come through as `unknown`.

```ts
async function load(): Promise<string> {
  try {
    const user = await fetchUser('1')
    return user.name
  } catch (error) {
    if (error instanceof Error) return `Failed: ${error.message}`
    return 'Failed with an unknown error'
  }
}
```

## Promise helpers

```ts
const users = await Promise.all([fetchUser('1'), fetchUser('2')])
```

`Promise.all` preserves the tuple of types when the input is a tuple.

```ts
const [user1, user2] = await Promise.all([
  fetchUser('1'),
  fetchUser('2'),
])
```

## Return type annotation

Always annotate the return type of public async functions. It makes the contract clear and catches mistakes.

```ts
async function listCourses(): Promise<Course[]> {
  const response = await fetch('/api/courses')
  if (!response.ok) return []
  return (await response.json()) as Course[]
}
```

## Hands-on: typed fetch wrapper

1. Create `src/api.ts`.
2. Define `interface Todo { userId: number; id: number; title: string; completed: boolean }`.
3. Write `async function fetchTodo(id: number): Promise<Todo>` using `fetch` and `https://jsonplaceholder.typicode.com/todos/${id}`.
4. Add a check for `response.ok` and throw a typed `Error`.
5. In `src/main.ts`, call `fetchTodo(1)`, `console.log` the title, and catch errors.
6. Run with `npx tsx src/main.ts` or compile with `npx tsc` and run `node dist/main.js`.
7. Change the `Todo` shape to something wrong and observe the assertion still compile. Discuss why validation is safer than assertion.
