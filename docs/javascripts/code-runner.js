(function () {
  let tsPromise = null

  function loadTypeScript() {
    if (window.ts) return Promise.resolve(window.ts)
    if (tsPromise) return tsPromise
    tsPromise = new Promise(function (resolve, reject) {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/typescript@5.5/lib/typescript.js'
      script.onload = function () {
        if (window.ts) resolve(window.ts)
        else reject(new Error('TypeScript library did not attach to window.ts'))
      }
      script.onerror = function () {
        reject(new Error('Could not load TypeScript compiler'))
      }
      document.head.appendChild(script)
    })
    return tsPromise
  }

  function runCode(code, output, expected) {
    output.textContent = 'Loading TypeScript...'
    loadTypeScript().then(function (ts) {
      const logs = []
      const originalLog = console.log
      console.log = function () {
        logs.push(Array.prototype.slice.call(arguments).map(String).join(' '))
      }
      try {
        const result = ts.transpileModule(code, {
          compilerOptions: {
            module: ts.ModuleKind.ES2015,
            target: ts.ScriptTarget.ES2020,
            strict: false,
            noImplicitAny: false,
          },
          reportDiagnostics: true,
        })
        if (result.diagnostics && result.diagnostics.length > 0) {
          const messages = result.diagnostics.map(function (d) {
            return 'Error: ' + ts.flattenDiagnosticMessageText(d.messageText, '\n')
          })
          output.textContent = messages.join('\n')
          return
        }
        eval(result.outputText)
        let text = logs.length > 0 ? logs.join('\n') : '(no output)'
        if (expected) {
          text += '\n' + (text === expected ? 'OK — matches expected' : 'FAIL — expected: ' + expected)
        }
        output.textContent = text
      } catch (err) {
        output.textContent = 'Runtime error: ' + err
      } finally {
        console.log = originalLog
      }
    }).catch(function (err) {
      output.textContent = err.message
    })
  }

  function addRunButtons() {
    document.querySelectorAll('div.language-ts pre > code, div.language-typescript pre > code').forEach(function (code) {
      const pre = code.parentElement
      const container = pre.parentElement

      const editor = document.createElement('textarea')
      editor.className = 'code-editor'
      editor.spellcheck = false
      editor.value = code.textContent

      const runButton = document.createElement('button')
      runButton.type = 'button'
      runButton.textContent = 'Run'
      runButton.className = 'md-button code-runner-button md-button--primary'
      runButton.setAttribute('aria-label', 'Run this TypeScript snippet')

      const expected = (container && container.dataset.expected) || ''
      if (expected) {
        runButton.setAttribute('title', 'Expected: ' + expected)
      }

      runButton.addEventListener('click', function () {
        let output = runButton.nextElementSibling
        if (!output || !output.classList.contains('code-output')) {
          output = document.createElement('pre')
          output.className = 'code-output'
          output.setAttribute('aria-label', 'Output')
          runButton.insertAdjacentElement('afterend', output)
        }
        output.style.display = 'block'
        runCode(editor.value, output, expected)
      })

      pre.replaceWith(editor)
      editor.insertAdjacentElement('afterend', runButton)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addRunButtons)
  } else {
    addRunButtons()
  }
})()
