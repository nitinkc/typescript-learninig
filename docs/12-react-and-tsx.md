# React and TSX

This lesson covers the TypeScript additions you use when writing React with TSX: typed props, events, state, and common hooks.

## JSX in TSX

A `.tsx` file allows JSX alongside TypeScript. The compiler transforms JSX into JavaScript function calls.

```tsx
function App() {
  return <h1>Hello, TypeScript</h1>
}
```

## Typed props

Define an interface for component props.

```tsx
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
```

## Children

```tsx
interface CardProps {
  title: string
  children: React.ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  )
}
```

## UseState with explicit types

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  )
}
```

If the initial value is `null` or `undefined`, provide a type.

```tsx
const [user, setUser] = useState<User | null>(null)
```

## Event types

```tsx
function Form() {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return <input value={value} onChange={handleChange} />
}
```

## Generic components

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>
}
```

## Discriminated unions in state

```tsx
type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

function DataView<T>({ state }: { state: LoadState<T> }) {
  if (state.status === 'loading') return <p>Loading...</p>
  if (state.status === 'error') return <p>{state.message}</p>
  if (state.status === 'success') return <pre>{JSON.stringify(state.data)}</pre>
  return <p>Ready</p>
}
```

## Hands-on: user card

1. Set up a React + TypeScript project with Vite: `npm create vite@latest user-cards -- --template react-ts`.
2. Define `interface User { id: number; name: string; email: string }`.
3. Create a `UserCard` component with props `user: User` and an `onSelect: (user: User) => void`.
4. Create a `UserList` component that accepts `users: User[]` and renders a `UserCard` for each.
5. Add state in `App` for `selectedUser: User | null` and pass the selection handler down.
6. Add a form with one controlled input for `name` typed as `React.ChangeEvent<HTMLInputElement>`.
7. Try to pass a `string` instead of `User` to `onSelect` and fix the compiler error.
