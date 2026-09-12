# Practical TypeScript syntax reference

Use this page as a visual decoder while reading or writing TypeScript. It focuses on syntax you will repeatedly encounter in frontend applications, backend services, tests, and shared libraries.

For a logical, hands-on learning path, start with [Setup and first program](01-setup-and-first-program.md) and follow the numbered lessons in the navigation. Return to this page whenever you need a quick refresher on a specific syntax.

!!! info "Useful across ecosystems"
    TypeScript is not specific to React. The core language on this page applies equally to **Angular**, **Node.js**, and framework-independent projects. React adds TSX and props, Angular adds decorators and templates, and Node.js adds server APIs, but all three use the same types, interfaces, unions, generics, narrowing, modules, and compiler.

!!! tip "How to use this reference"
    Keep this page open beside your code. Find the unfamiliar symbol, learn its name, and compare its example with the code you are reading. You do not need to memorize everything before building.

## Symbols at a glance

| Syntax | Name | Meaning |
|---|---|---|
| `: string` | Type annotation | The value must be a string. |
| `A \| B` | Union type | The value may be type `A` **or** type `B`. |
| `A & B` | Intersection type | The value must satisfy both types. |
| `T[]` | Array type | An array whose items are type `T`. |
| `readonly T[]` | Read-only array | The array must not be mutated through this reference. |
| `<T>` | Generic type parameter | A placeholder for a type supplied later. |
| `value?: T` | Optional property | The property may be absent. |
| `value!` | Non-null assertion | Claims a value is present; use sparingly. |
| `value as T` | Type assertion | Treats a value as `T`; it performs no runtime validation. |
| `object?.key` | Optional chaining | Reads `key` only if `object` exists. |
| `value ?? fallback` | Nullish coalescing | Uses the fallback only for `null` or `undefined`. |
| `...value` | Spread syntax | Copies entries into a new object or array. |
| `` `${value}` `` | Template literal | Builds a string and inserts expressions. |
| `State['items']` | Indexed access type | Reuses the type of a property. |
| `keyof T` | Key union | Produces a union of the property names of `T`. |
| `typeof value` | Type query | Produces the TypeScript type of a value. |

## Values, inference, and annotations

TypeScript often learns a type from the assigned value. Add an annotation when it documents a contract or inference is too broad.

=== "Inferred"

    ```ts
    const course = 'TypeScript' // string
    const lessons = 12          // number
    const published = true      // boolean
    ```

=== "Annotated"

    ```ts
    const course: string = 'TypeScript'
    const lessons: number = 12
    const published: boolean = true
    ```

`:` is read as **“has type.”** Prefer inference for obvious local values and explicit types for function boundaries, domain models, and public APIs.

### `const` and `let`

```ts
const framework = 'Angular'
let completedLessons = 0
completedLessons += 1
```

Use `const` when the variable will not be reassigned and `let` when it will. `const` does not make an object immutable; it only prevents reassigning the variable.

## Arrays and tuples

```ts
const tags: string[] = ['react', 'angular', 'node']
const coordinates: readonly [number, number] = [40.7, -74.0]
```

- `string[]` is an array of strings.
- `[number, number]` is a tuple with a fixed order and length.
- `readonly` prevents mutation through that reference.

## Type aliases and literal unions

A `type` alias gives a useful name to a type. Quoted values in a type are **string literal types**, so only those exact strings are accepted.

```ts
type LearningStatus =
  | 'not-started'
  | 'learning'
  | 'confident'

let status: LearningStatus = 'learning'
```

A closed union prevents spelling mistakes and allows editors to suggest every valid value. Assigning `'done'` would be a type error.

## Interfaces and object shapes

An `interface` names the required shape of an object.

```ts
interface Lesson {
  readonly id: string
  title: string
  durationMinutes: number
  description?: string
}
```

- Property names appear before `:` and their types appear after it.
- `readonly` prevents assignment through this type.
- `?` makes `description` optional.

!!! note
    `readonly` is a compile-time check, not a runtime lock. It does not freeze the JavaScript object.

### `interface` versus `type`

Both can describe objects. Interfaces are convenient for extendable object contracts; type aliases can also represent unions, tuples, primitives, and mapped types.

```ts
interface Identified {
  id: string
}

interface Lesson extends Identified {
  title: string
}

type Result = { ok: true; value: Lesson } | { ok: false; error: string }
```

## Functions

Type parameters follow function parameters after `:`.

```ts
function formatDuration(minutes: number): string {
  return `${minutes} minutes`
}

const double = (value: number): number => value * 2
```

For callbacks, TypeScript frequently infers parameter types from context:

```ts
const lessonTitles = lessons.map((lesson) => lesson.title)
```

If `lessons` is `Lesson[]`, TypeScript knows that `lesson` is a `Lesson`.

## Optional chaining and nullish coalescing

These operators handle missing values without treating valid values such as `0` or `''` as absent.

```ts
const firstTitle = lessons[0]?.title ?? 'No lessons yet'
```

Read it left to right:

1. Get the first array item.
2. `?.title` reads `title` only if that item exists.
3. `??` uses the fallback only if the result is `null` or `undefined`.

`??` differs from `||`: `0 || 10` produces `10`, while `0 ?? 10` keeps `0`.

## Object and array spread

Spread syntax creates a shallow copy and is commonly used for immutable updates.

```ts
const updatedLesson = { ...lesson, title: 'Generics' }
const nextLessons = [...lessons, updatedLesson]
```

Nested objects and arrays still need their own copy when changed.

## Destructuring

Destructuring extracts named properties or positions into local variables.

```ts
const { title, durationMinutes } = lesson
const [firstLesson, secondLesson] = lessons
```

It also appears in function parameters:

```ts
function LessonTitle({ title }: Lesson): string {
  return title
}
```

## Type-only imports and modules

Use `type` when an import is needed only by the TypeScript checker.

```ts
import { readFile, type PathLike } from 'node:fs'
import type { Lesson } from './lesson.js'

export type { Lesson }
export { formatDuration }
```

Type-only imports disappear from emitted JavaScript. Runtime imports remain.

## Generics: reusable type placeholders

A generic keeps relationships between types without replacing them with `any`.

```ts
interface ApiResponse<T> {
  data: T
  receivedAt: string
}

function first<T>(items: readonly T[]): T | undefined {
  return items[0]
}

const response: ApiResponse<Lesson[]> = {
  data: lessons,
  receivedAt: new Date().toISOString(),
}
```

`T` is a placeholder supplied later. Here it becomes `Lesson[]`.

### Generic constraints

Use `extends` to require a capability:

```ts
function getId<T extends { id: string }>(value: T): string {
  return value.id
}
```

`T` may contain additional properties, but it must contain a string `id`.

## Utility types

TypeScript includes helpers that transform existing types.

```ts
type LessonDraft = Omit<Lesson, 'id'>
type LessonUpdate = Partial<Lesson>
type RequiredLesson = Required<Lesson>
type LessonSummary = Pick<Lesson, 'id' | 'title'>
type LessonById = Record<string, Lesson>
```

| Utility | Purpose |
|---|---|
| `Partial<T>` | Makes every property optional. |
| `Required<T>` | Makes every property required. |
| `Pick<T, K>` | Keeps selected properties. |
| `Omit<T, K>` | Removes selected properties. |
| `Record<K, V>` | Describes keys mapped to values. |
| `Readonly<T>` | Makes every property read-only. |

## Indexed access, `keyof`, and `typeof`

```ts
type LessonTitle = Lesson['title']
type LessonKey = keyof Lesson

const defaultLesson = { title: 'Basics', durationMinutes: 20 }
type DefaultLesson = typeof defaultLesson
```

- `Lesson['title']` reuses one property's type.
- `keyof Lesson` produces a union such as `'id' | 'title' | ...`.
- `typeof defaultLesson` derives a type from an existing value.

## Discriminated unions and narrowing

A shared literal property can identify each member of a union.

```ts
type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

function message(state: LoadState<Lesson[]>): string {
  switch (state.status) {
    case 'idle': return 'Ready to load'
    case 'loading': return 'Loading…'
    case 'success': return `${state.data.length} lessons`
    case 'error': return state.message
  }
}
```

The `status` property is the **discriminant**. Each `case` narrows the union so TypeScript knows which properties are available.

## Narrowing `unknown`

Use `unknown` for untrusted values, then prove their type before use.

```ts
function toMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}
```

Prefer `unknown` over `any` at network, JSON, environment, storage, and error boundaries. `any` disables useful checking.

## Assertions versus validation

```ts
const status = input as LearningStatus
```

`as LearningStatus` tells the compiler to trust you. It does **not** inspect the value at runtime.

!!! warning "Assertions are not validators"
    Assertions can be reasonable when surrounding code guarantees a type. Validate data from requests, URLs, files, databases, environment variables, and user input before trusting it.

## Classes and access modifiers

Classes are especially common in Angular and some Node.js codebases.

```ts
class CourseService {
  constructor(private readonly baseUrl: string) {}

  public async getLessons(): Promise<Lesson[]> {
    const response = await fetch(`${this.baseUrl}/lessons`)
    return response.json() as Promise<Lesson[]>
  }
}
```

| Keyword | Meaning |
|---|---|
| `public` | Accessible anywhere; this is the default. |
| `private` | Accessible only inside the class. |
| `protected` | Accessible in the class and subclasses. |
| `readonly` | Assignable during initialization, then not reassigned. |
| `implements` | Requires a class to satisfy an interface. |

## Async functions and promises

An `async` function always returns a `Promise`.

```ts
async function loadLesson(id: string): Promise<Lesson> {
  const response = await fetch(`/api/lessons/${id}`)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json() as Promise<Lesson>
}
```

The assertion above documents an expectation but does not validate JSON. Production code should validate untrusted responses.

## Framework-specific TypeScript

The language fundamentals above are portable. Framework syntax sits on top of them.

=== "React"

    React commonly uses typed props, events, Hooks, generic Context values, and TSX.

    ```tsx
    interface CounterProps {
      initialValue?: number
    }

    function Counter({ initialValue = 0 }: CounterProps) {
      const [count, setCount] = useState<number>(initialValue)
      return <button onClick={() => setCount(count + 1)}>{count}</button>
    }
    ```

=== "Angular"

    Angular commonly uses classes, decorators, dependency injection, interfaces, RxJS generics, and HTML templates.

    ```ts
    @Component({
      selector: 'app-course',
      templateUrl: './course.component.html',
    })
    export class CourseComponent {
      course?: Course

      constructor(private readonly courses: CourseService) {}
    }
    ```

    `@Component(...)` is a decorator: framework metadata attached to a class.

=== "Node.js"

    Node.js commonly uses typed request data, async functions, module imports, environment values, and service contracts.

    ```ts
    import { readFile } from 'node:fs/promises'

    interface Config {
      port: number
    }

    async function loadConfig(path: string): Promise<Config> {
      const text = await readFile(path, 'utf8')
      return JSON.parse(text) as Config
    }
    ```

    `JSON.parse` returns `any`, so real applications should validate parsed configuration before using it.

## TSX and JSX expressions

This section is primarily for React and other JSX-based tools. A `.tsx` file supports TypeScript plus JSX.

```tsx
<section>
  <ProgressRing value={completion} label="Course completion" />
  <p>{completedCount} completed lessons</p>
</section>
```

| Form | Meaning |
|---|---|
| `<section>` | A native HTML element |
| `<ProgressRing />` | A component |
| `value={completion}` | A prop receiving an expression |
| `label="Course completion"` | A prop receiving a string |
| `{completedCount}` | An expression rendered inside JSX |
| `/>` | A self-closing tag |

Angular normally uses `.ts` component classes plus separate or inline HTML templates rather than TSX. Node.js normally uses `.ts` unless it renders JSX through a specific library.

## Common collection methods

```ts
const longLessons = lessons.filter((lesson) => lesson.durationMinutes > 30)
const titles = lessons.map((lesson) => lesson.title)
const firstMatch = lessons.find((lesson) => lesson.id === requestedId)
const total = lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0)
```

- `filter` keeps matching items.
- `map` transforms every item.
- `find` returns the first match or `undefined`.
- `reduce` combines all items into one result.

These are JavaScript methods whose callback types TypeScript infers from the collection.

## Compiler terms you will see

| Name | Meaning |
|---|---|
| Type checking | Finding incompatible values without running the program |
| Transpilation | Converting TypeScript syntax into JavaScript |
| `tsconfig.json` | Project compiler configuration |
| Strict mode | A family of stronger type-safety checks enabled by `"strict": true` |
| Declaration file | A `.d.ts` file describing types for JavaScript code |
| Source map | A mapping from generated JavaScript back to TypeScript source |
| Target | The JavaScript language version emitted by the compiler |
| Module | The import/export system and generated module format |

## Recommended learning order

1. Values, inference, and annotations
2. Arrays, object shapes, and functions
3. Unions and narrowing
4. Modules and type-only imports
5. Generics and utility types
6. Async boundaries and runtime validation
7. The framework-specific section matching your project

## Quick knowledge check

??? question "Why is `'done'` rejected as a LearningStatus?"
    `LearningStatus` is a closed union containing only `'not-started'`, `'learning'`, and `'confident'`.

??? question "Does `as Lesson` validate data at runtime?"
    No. A type assertion affects TypeScript checking only and disappears from emitted JavaScript.

??? question "Why use `?.` before reading the first lesson's title?"
    The array may be empty, so its first item can be `undefined`. Optional chaining avoids reading a property from a missing item.

??? question "What does `Lesson['title']` produce?"
    It produces the declared type of the `title` property, allowing another declaration to reuse it.

??? question "Which sections apply to React, Angular, and Node.js?"
    Every core TypeScript section applies to all three. Only framework-specific syntax—such as React TSX or Angular decorators and templates—is specialized.
