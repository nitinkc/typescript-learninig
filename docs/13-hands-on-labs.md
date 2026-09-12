# Hands-on labs

These labs pull together concepts from the learning path into realistic, self-contained projects. Work through them in order, or jump to the one that matches your current skill.

## Lab 1: e-commerce product catalog

Build a typed product catalog with filtering and sorting.

### Requirements

- `interface Product { id: string; name: string; price: number; category: 'electronics' | 'clothing' | 'home'; inStock: boolean }`
- A function `createProduct(data: Omit<Product, 'id'>): Product` that assigns a random `id`.
- A `filterByCategory(products, category)` that returns only matching products.
- A `sortByPrice(products, direction: 'asc' | 'desc')` function.
- A `totalInStockValue(products)` that sums the price of in-stock products.

### Stretch goals

- Add `readonly` to the `id` field.
- Use a generic `paginate<T>(items: T[], page: number, pageSize: number): T[]`.
- Add a `Result<Product[]>` return type for a search function.

#### Try editing and running

```ts { .ts-runner data-expected="Phone" data-title="Lab 1: e-commerce product catalog" }
interface Product {
  id: string
  name: string
  price: number
  category: 'electronics' | 'clothing' | 'home'
  inStock: boolean

const products: Product[] = [
  { id: '1', name: 'Phone', price: 999, category: 'electronics', inStock: true },
]

console.log(products[0].name)
```

## Lab 2: task manager with narrowing

Build a small task manager using discriminated unions.

### Requirements

- `type Task =
  | { kind: 'todo'; id: string; title: string }
  | { kind: 'in-progress'; id: string; title: string; startedAt: Date }
  | { kind: 'done'; id: string; title: string; completedAt: Date }`
- `function describe(task: Task): string` using a `switch` on `kind`.
- `function advance(task: Task): Task` that transitions a task to the next state.
- An array of mixed tasks and a `console.table` summary.

### Stretch goals

- Use `const` assertions for state literals.
- Add `totalTime(task: Task): number | null` that only returns a value for completed tasks.

#### Try editing and running

```ts { .ts-runner data-expected="Read" data-title="Lab 2: task manager with narrowing" }
type Task =
  | { kind: 'todo'; id: string; title: string }
  | { kind: 'done'; id: string; title: string; completedAt: Date }

function describe(task: Task): string {
  switch (task.kind) {
    case 'todo':
      return task.title
    case 'done'
      return task.title
  }
}

console.log(describe({ kind: 'todo', id: '1', title: 'Read' }))
```

## Lab 3: typed HTTP client

Build a wrapper around `fetch` that returns typed results.

### Requirements

- `type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string }`
- `async function getJson<T>(url: string): Promise<ApiResult<T>>` using `fetch` and `response.json()`.
- `interface Post { userId: number; id: number; title: string; body: string }`
- Fetch posts from `https://jsonplaceholder.typicode.com/posts` and handle errors.

### Stretch goals

- Add a small runtime validation check for the shape of `Post`.
- Add a `postJson<T, U>(url: string, body: U): Promise<ApiResult<T>>`.

#### Try editing and running

```ts { .ts-runner data-expected="Loaded" data-title="Lab 3: typed HTTP client" }
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

function message(result: ApiResult<string>): string {
  if (result.ok) {
    return result.data
  }
  return result.error

console.log(message({ ok: true, data: 'Loaded' }))
```

## Lab 4: React expense tracker

Build a small React app that tracks expenses.

### Requirements

- `interface Expense { id: string; amount: number; category: string; date: string }`
- Components: `ExpenseForm`, `ExpenseList`, `ExpenseSummary`.
- State for the list of expenses and derived totals.
- Type-safe event handlers for form inputs.
- Filter expenses by category.

### Stretch goals

- Use `useReducer` with a typed action union.
- Add `localStorage` persistence with a validation step before loading.

#### Try editing and running

```ts { .ts-runner data-expected="30" data-title="Lab 4: React expense tracker" }
interface Expense {
  id: string
  amount: number
  category: string
}

const total = (expenses: Expense[]): number => {
  return expenses.reduce((sum, e) => sum + e.amount)
}

console.log(total([
  { id: '1', amount: 10, category: 'food' },
  { id: '2', amount: 20, category: 'food' },
]))
```

## Lab 5: library class model

Use classes to model a small library system.

### Requirements

- `abstract class Item { id: string; title: string; abstract description(): string }`
- `class Book` and `class Magazine` extending `Item`.
- `interface Borrowable { borrow(): void; returnItem(): void }`.
- A `Library` class that owns `Item[]` and can search by title.

### Stretch goals

- Add `private` and `protected` fields.
- Implement a `borrow` history with `readonly` arrays.

#### Try editing and running

```ts { .ts-runner data-expected="TypeScript by Ada" data-title="Lab 5: library class model" }
abstract class Item {
  constructor(public id: string, public title: string) {}
  abstract description(): string
}

class Book extends Item {
  constructor(id: string, title: string, public author: string) {
    super(id, title)
  }

  description(): string {
    return `${this.title} by ${this.author}`
  }
}

const book = new Book('1', 'TypeScript', 'Ada'
console.log(book.description())
```

## How to verify your work

For each lab:

1. Write the types first.
2. Implement the functions or components.
3. Run `npx tsc --noEmit` to catch type errors without running anything.
4. Add sample data and run the program or the dev server.
5. Deliberately introduce a type error and read the message. This is the fastest way to learn what TypeScript is protecting you from.
