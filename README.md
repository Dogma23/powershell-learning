# PowerShell Path

An interactive, self-contained website that teaches PowerShell from the ground up — built as a static site (plain HTML/CSS/JS, no build step, no dependencies).

## Features

- **9 progressive lessons** — from "what is PowerShell?" through cmdlets, the pipeline, variables, control flow, functions, file operations, and writing real scripts.
- **Practice terminal** — a safe, simulated PowerShell prompt embedded in most lessons. Recognizes common intro commands (`Get-Date`, `Get-Process`, `Get-ChildItem`, `Get-Verb`, variable assignment, string interpolation, and more) so you can try things as you read.
- **Quizzes** — a quick knowledge check at the end of each lesson.
- **Progress tracking** — mark lessons complete; your progress is saved in the browser (`localStorage`).
- **Syntax-highlighted, copyable code blocks.**
- **Responsive** — works on mobile with a collapsible sidebar.

## Running it

No build or install required. Just open the site:

```bash
# Option 1: open the file directly
open index.html          # macOS
start index.html         # Windows

# Option 2: serve it locally (nicer, avoids any file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
powershell-learning/
├── index.html          # page shell (sidebar + content area)
├── css/
│   └── style.css       # all styling
├── js/
│   ├── lessons.js      # lesson content (edit here to add/change lessons)
│   └── app.js          # navigation, progress, quizzes, terminal simulator
└── README.md
```

## Adding or editing lessons

All content lives in `js/lessons.js` as an array of lesson objects:

```js
{
  id: "unique-id",          // used in the URL hash + progress tracking
  nav: "Short sidebar text",
  title: "Full lesson title",
  tag: "Category",
  html: `...lesson HTML...`  // supports code blocks, callouts, quizzes, terminals
}
```

Special blocks you can drop into a lesson's `html`:

- **Quiz:** `<div class="quiz" data-answer="0"> ...` with `<button class="quiz-opt">` options (`data-answer` is the zero-based index of the correct one).
- **Practice terminal:** copy the `<div class="terminal" data-sim="true">` block from any lesson.
- **Code block:** `<div class="code-block" data-lang="powershell"><pre><code>...</code></pre></div>` — use the `tok-*` span classes for coloring.

## Note

The practice terminal is a **simulation** for learning — it does not run real PowerShell. To run real commands, install [PowerShell 7+](https://aka.ms/powershell) and use `pwsh`.
