# TypeScript interview prep

A mix of multiple-choice and code-based questions to check how well you know TypeScript at a senior level.

<quiz>
What is the main difference between `type` and `interface`?
- [ ] `type` can define primitive aliases, `interface` cannot.
- [x] `interface` supports declaration merging, `type` does not.
- [ ] `type` is checked faster by the compiler.
- [ ] `interface` can be generic, `type` cannot.

Two interfaces with the same name in the same scope are merged. `type` aliases cannot be reopened this way.
</quiz>

<quiz>
Which utility type extracts the parameter types of a function?
- [ ] `ReturnType<T>`
- [x] `Parameters<T>`
- [ ] `Arguments<T>`
- [ ] `ThisParameterType<T>`

`Parameters<T>` gives a tuple of the function's parameter types.
</quiz>

<quiz>
What does `satisfies` do?
- [ ] It replaces the type with a narrower one.
- [x] It checks an expression against a type without changing the inferred type of the expression.
- [ ] It removes `readonly` from a type.
- [ ] It enforces exact excess property checking.

`const x = { ... } satisfies Type` checks that the value matches `Type` while keeping the more specific inferred type for `x`.
</quiz>

<quiz>
What is a discriminated union?
- [ ] A union where every member has the same shape.
- [x] A union where every member has a common literal `kind` field that narrows the union.
- [ ] A union of function overloads.
- [ ] A union of `string` and `number`.

A common tag such as `kind` lets TypeScript narrow the union in `switch` and `if` statements.
</quiz>

<quiz>
Which of these is a valid way to define an object that is `readonly`?
- [ ] `const obj: readonly { a: string }`
- [x] `const obj: Readonly<{ a: string }>`
- [ ] `const obj: readonly Object = { a: '' }`
- [ ] `const obj: Frozen<{ a: string }>`

`Readonly<T>` is the built-in utility that maps every property of `T` to `readonly`.
</quiz>

<quiz>
What is the purpose of `as const`?
- [ ] It makes all values mutable.
- [x] It narrows the inferred type to a literal tuple or object.
- [ ] It overrides the compiler to any type.
- [ ] It converts an object into a `Map`.

`as const` infers the most literal types possible, which is useful for discriminated union tags and tuple types.
</quiz>

<quiz>
What does `infer` do inside a conditional type?
- [ ] It removes a type from a union.
- [x] It captures a type from a larger type so it can be reused.
- [ ] It forces strict null checks.
- [ ] It is an alias for `extends`.

`type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never` extracts `R` from the function return type.
</quiz>

<quiz>
Which keyword turns a function parameter type guard into a user-defined type guard?
- [x] `is`
- [ ] `as`
- [ ] `in`
- [ ] `instanceof`

`function isString(x: unknown): x is string { ... }` lets callers narrow `unknown` to `string`.
</quiz>

<quiz>
What is the structural type system?
- [ ] Types are compared by their names, not their members.
- [x] Types are compared by the shape of their members.
- [ ] Types are compared by memory location.
- [ ] Types are compared by the order of declaration.

TypeScript uses structural typing: an object is assignable if it has all required members with compatible types, regardless of the declared name.
</quiz>

<quiz>
Which of the following cannot be used to narrow `unknown`?
- [ ] `typeof x === 'string'`
- [ ] `x instanceof Date`
- [x] `x as number`
- [ ] `Array.isArray(x)`

`x as number` is a type assertion, not a runtime check. It does not narrow safely at runtime.
</quiz>

<quiz>
What is a mapped type?
- [x] A type that maps every key of another type to a new shape.
- [ ] A type that converts arrays to tuples.
- [ ] A type that maps JavaScript objects to JSON strings.
- [ ] A type that maps classes to interfaces.

`type Nullable<T> = { [K in keyof T]: T[K] | null }` is a mapped type.
</quiz>

<quiz>
What does `keyof` produce?
- [x] A string literal union of the property keys of a type.
- [ ] A union of all values of a type.
- [ ] A union of all methods of a type.
- [ ] A number literal of the object size.

`keyof T` gives the union of all known public property keys of `T`.
</quiz>

<quiz>
Which built-in utility removes a set of keys from a type?
- [x] `Omit<T, K>`
- [ ] `Exclude<T, U>`
- [ ] `Pick<T, K>`
- [ ] `Partial<T>`

`Omit<T, K>` removes the keys in `K` from `T`.
</quiz>

<quiz>
What is the difference between `Exclude` and `Omit`?
- [x] `Exclude` works on union members, `Omit` works on object keys.
- [ ] `Omit` works on union members, `Exclude` works on object keys.
- [ ] They are aliases.
- [ ] `Exclude` is for values, `Omit` is for types.

`Exclude<T, U>` removes union members. `Omit<T, K>` removes keys from an object type.
</quiz>

<quiz>
When would you use `NoInfer<T>`?
- [ ] To make all properties required.
- [x] To prevent the type parameter from being inferred from an argument, forcing a contextual type to be used.
- [ ] To remove `null` and `undefined` from a union.
- [ ] To create a nominal type.

`NoInfer<T>` is useful when you want a generic to keep a wider type and not narrow to a literal from the passed argument.
</quiz>

<quiz>
What is an assertion signature?
- [ ] A return type that makes the compiler throw a runtime error.
- [x] A function whose return type asserts that a condition is `true`, narrowing types after the call.
- [ ] A function that always returns `asserts`.
- [ ] A syntax for throwing custom errors in types.

`function assertIsString(x: unknown): asserts x is string { ... }` tells the compiler the argument is narrowed if the function returns.
</quiz>

<quiz>
What does `this` in a function type parameter do?
- [ ] It references the global object.
- [x] It binds the type of `this` inside the function body.
- [ ] It creates a callback that must use arrow functions.
- [ ] It is not valid in a function parameter list.

`function fn(this: Window) { ... }` declares the type of `this` for that function without adding a runtime parameter.
</quiz>

<quiz>
What is the result of `NonNullable<string | null | undefined>`?
- [ ] `string | null`
- [x] `string`
- [ ] `string | undefined`
- [ ] `never`

`NonNullable<T>` removes `null` and `undefined` from `T`.
</quiz>

<quiz>
Which of the following best describes a branded type?
- [ ] A type with a runtime-only property.
- [x] A type that uses an intersection with an impossible-to-create nominal tag to distinguish values at compile time.
- [ ] A type created by the `brand` keyword.
- [ ] A type that is exported from a module.

`type UserId = string & { readonly __brand: 'UserId' }` creates a nominal-like distinction without runtime cost.
</quiz>

## Code quiz

<quiz>
What is the inferred type of `value`?

```ts
const config = {
  host: 'localhost',
  port: 3000,
} as const

const value = config.port
```
- [ ] `number`
- [x] `3000`
- [ ] `string`
- [ ] `any`

The type of `value` is `3000`, not `number`, because `as const` makes every member a literal type.
</quiz>

<quiz>
Does this code compile? If it does, what does it print?

```ts
function logLength(x: string | number) {
  if (typeof x === 'string') {
    console.log(x.length)
  } else {
    console.log(x.toFixed(2))
  }
}

logLength(42)
```
- [ ] It does not compile.
- [ ] It compiles and prints `42`.
- [x] It compiles and prints `42.00`.
- [ ] It throws at runtime.

The `typeof` check narrows `x` to `string` in the `if` branch and to `number` in the `else` branch, so `toFixed(2)` is valid.
</quiz>

<quiz>
What is wrong with this generic constraint?

```ts
function getLength<T extends { length: number }>(x: T) {
  return x.length
}

console.log(getLength(42))
```
- [ ] The generic is unnecessary.
- [x] `number` does not have a `length` property, so `42` does not satisfy the constraint.
- [ ] It compiles and prints `undefined`.
- [ ] It compiles and prints `2`.

`number` does not satisfy `T extends { length: number }`, so the call is rejected.
</quiz>

<quiz>
What is the type of `result`?

```ts
type Action =
  | { type: 'increment'; value: number }
  | { type: 'decrement'; value: number }
  | { type: 'reset' }

function isReset(action: Action): action is { type: 'reset' } {
  return action.type === 'reset'
}

const action: Action = { type: 'reset' }
const result = isReset(action)
```
- [ ] `Action`
- [ ] `true`
- [x] `boolean`
- [ ] `never`

`result` is `boolean`. The type guard narrows `action`, not the returned `result` itself.
</quiz>

<quiz>
What does this conditional type resolve to?

```ts
type Item<T> = T extends (infer E)[] ? E : never

type X = Item<string[]>
```
- [ ] `string[]`
- [x] `string`
- [ ] `never`
- [ ] `unknown`

`X` is `string`. The conditional type extracts the element type `E` from an array.
</quiz>
