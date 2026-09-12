# Interactive playground

This is a proof-of-concept in-browser TypeScript editor. It compiles TypeScript to JavaScript directly in your browser and prints the result.

!!! note
    This page is a quick demo. It transpiles TypeScript and runs the emitted JavaScript. It does not perform full project-level type checking, and it cannot use Node.js or npm packages.

## Editor

Write TypeScript in the box below and click **Run TypeScript**. If you arrived from another page, the starter code is already filled in.

<div style="margin: 1rem 0;">
<textarea id="ts-playground-input" spellcheck="false" style="font-family: 'SFMono-Regular', Consolas, monospace; width: 100%; min-height: 14rem; padding: 0.5rem; border-radius: 0.25rem; border: 1px solid var(--md-default-fg-color--lightest, #ccc);">const greeting: string = 'Hello from the browser'
console.log(greeting)

function add(a: number, b: number): number {
  return a + b
}

console.log('2 + 3 =', add(2, 3))
</textarea>
<br>
<button id="ts-playground-run" class="md-button md-button--primary" style="margin-top: 0.5rem;">Run TypeScript</button>
<pre id="ts-playground-output" style="background: var(--md-code-bg-color, #f5f5f5); padding: 0.5rem; border-radius: 0.25rem; min-height: 3rem;"></pre>
<p id="ts-playground-expected-label" style="display: none; margin-top: 1rem;"><strong>Expected output:</strong></p>
<pre id="ts-playground-expected" style="display: none; background: var(--md-code-bg-color, #f5f5f5); padding: 0.5rem; border-radius: 0.25rem; min-height: 3rem;"></pre>
</div>

<script src="https://cdn.jsdelivr.net/npm/typescript@5.5/lib/typescript.js"></script>
<script>
  (function () {
    const params = new URLSearchParams(window.location.search)
    const starter = params.get('code')
    const expected = params.get('expected')
    const title = params.get('title')

    if (starter) {
      document.getElementById('ts-playground-input').value = starter
    }

    if (expected) {
      document.getElementById('ts-playground-expected-label').style.display = 'block'
      const expectedOutput = document.getElementById('ts-playground-expected')
      expectedOutput.style.display = 'block'
      expectedOutput.textContent = expected
    }

    if (title) {
      const heading = document.querySelector('h1')
      if (heading) heading.textContent = title
    }
  })()

  document.getElementById('ts-playground-run').addEventListener('click', function () {
    const input = document.getElementById('ts-playground-input').value
    const output = document.getElementById('ts-playground-output')
    const logs = []

    const originalLog = console.log
    console.log = function () {
      const line = Array.prototype.slice.call(arguments).map(String).join(' ')
      logs.push(line)
    }

    try {
      const result = window.ts.transpileModule(input, {
        compilerOptions: {
          module: window.ts.ModuleKind.ES2015,
          target: window.ts.ScriptTarget.ES2020,
          strict: false,
          noImplicitAny: false,
        },
        reportDiagnostics: true,
      })

      if (result.diagnostics && result.diagnostics.length > 0) {
        const messages = result.diagnostics.map(function (d) {
          const text = window.ts.flattenDiagnosticMessageText(d.messageText, '\n')
          return 'Error: ' + text
        })
        output.textContent = messages.join('\n')
        return
      }

      eval(result.outputText)
      output.textContent = logs.length > 0 ? logs.join('\n') : '(no output)'
    } catch (err) {
      output.textContent = 'Runtime error: ' + err
    } finally {
      console.log = originalLog
    }
  })
</script>

## Suggested things to try

- Add an explicit type annotation that conflicts with a value, such as `const count: number = 'hello'`, and see the transpile error.
- Define an interface and a function that uses it.
- Use `map` and `filter` on an array.
- Try adding `import` or `fetch` calls — these will fail because the playground has no module loader or network.

## How it works

1. The page loads the `typescript` compiler from a CDN.
2. When you click **Run**, `transpileModule` converts the TypeScript to JavaScript in the browser.
3. The emitted JavaScript is evaluated, and `console.log` output is captured into the result panel.

## Limitations

- No full type checking. Complex type errors may not appear.
- No `npm` packages or Node.js APIs.
- No `import`/`export` support.
- `eval` is used for the runner, so only run code you trust.
