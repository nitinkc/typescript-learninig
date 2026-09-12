# Classes

This lesson covers classes, access modifiers, `readonly`, `implements`, and the differences between classes and interfaces.

## Class basics

```ts
class Lesson {
  id: string
  title: string

  constructor(id: string, title: string) {
    this.id = id
    this.title = title
  }

  summary(): string {
    return `${this.id}: ${this.title}`
  }
}
```

Create an instance with `new`.

```ts
const lesson = new Lesson('1', 'TypeScript basics')
```

## Parameter properties

TypeScript can declare and assign properties directly in the constructor.

```ts
class Course {
  constructor(
    public readonly id: string,
    public title: string,
    private lessons: string[] = []
  ) {}

  addLesson(lesson: string): void {
    this.lessons.push(lesson)
  }
}
```

## Access modifiers

| Modifier | Access |
|---|---|
| `public` | Anywhere |
| `private` | Only inside the class |
| `protected` | Inside the class and subclasses |

```ts
class User {
  public name: string
  private passwordHash: string
  protected role: string
}
```

## `implements`

A class can implement an interface.

```ts
interface Printable {
  print(): string
}

class Report implements Printable {
  constructor(public content: string) {}

  print(): string {
    return this.content
  }
}
```

## `readonly`

A `readonly` property can be assigned once during initialization.

```ts
class Point {
  constructor(public readonly x: number, public readonly y: number) {}
}
```

## Inheritance

```ts
class Animal {
  constructor(public name: string) {}

  speak(): string {
    return `${this.name} makes a sound`
  }
}

class Dog extends Animal {
  speak(): string {
    return `${this.name} barks`
  }
}
```

## Classes versus interfaces

- Use `class` when you need runtime behavior, constructors, or instances.
- Use `interface` when you only need to describe a shape.

## Hands-on: library catalog

1. Create `src/library.ts`.
2. Define `interface Borrowable { borrow(): void; returnItem(): void }`.
3. Create an abstract-ish base class `CatalogItem` with `id`, `title`, and a `description()` method.
4. Create `class Book extends CatalogItem implements Borrowable` with `author`, `isBorrowed`, and methods `borrow`/`returnItem`.
5. Create `class DVD extends CatalogItem implements Borrowable` with `runtimeMinutes`.
6. Create an array of `CatalogItem[]`, add a `Book` and a `DVD`, and call `description()` on each.
7. Try to access a `private` property from outside the class and observe the error.
