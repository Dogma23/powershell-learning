/*
 * Lesson content for PowerShell Path.
 * Each lesson is HTML. Helper tags used by app.js:
 *   <div class="terminal" data-sim="true"> ... </div>  -> interactive mock terminal
 *   <div class="quiz" data-answer="1"> ... </div>       -> interactive quiz
 * Code blocks use <pre><code> with token spans for coloring.
 */

const LESSONS = [
  /* ---------------------------------------------------------------- */
  {
    id: "intro",
    nav: "What is PowerShell?",
    title: "What is PowerShell?",
    tag: "Getting started",
    html: `
      <p>PowerShell is a <strong>command-line shell</strong> and <strong>scripting language</strong> built for automating tasks and managing systems. It started life on Windows but now runs on macOS and Linux too (as <em>PowerShell 7+</em>, also called <em>PowerShell Core</em>).</p>

      <p>What makes it special: unlike older shells (like <code class="inline">cmd.exe</code> or Bash) that pass plain <em>text</em> between commands, PowerShell passes <strong>objects</strong> — real structured data with properties and methods. That single idea makes it far more powerful for automation.</p>

      <h2>Text vs. Objects</h2>
      <p>In Bash, when you list files you get lines of text and you have to slice them apart with tools like <code class="inline">awk</code> or <code class="inline">cut</code>. In PowerShell, each file is an object you can ask questions about directly:</p>

      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-comment"># Get files, then keep only ones bigger than 1 MB, sorted by size</span>
<span class="tok-cmd">Get-ChildItem</span> <span class="tok-op">|</span> <span class="tok-cmd">Where-Object</span> <span class="tok-var">$_</span>.Length <span class="tok-op">-gt</span> <span class="tok-num">1MB</span> <span class="tok-op">|</span> <span class="tok-cmd">Sort-Object</span> Length</code></pre>
      </div>

      <p>No text parsing — you just reach into the <code class="inline">.Length</code> property of each object. And yes, PowerShell understands <code class="inline">1MB</code>, <code class="inline">1GB</code>, etc. as real numbers.</p>

      <div class="callout tip">
        <div class="callout-title">Key idea</div>
        <p>Everything in PowerShell is an object. Commands output objects, and you connect commands together with the pipe <code class="inline">|</code> to build powerful one-liners.</p>
      </div>

      <h2>Where do I run it?</h2>
      <ul>
        <li><strong>Windows:</strong> Open the Start menu and type <em>"PowerShell"</em>, or install the modern <a href="https://aka.ms/powershell" target="_blank" rel="noopener">PowerShell 7</a> and use <em>Windows Terminal</em>.</li>
        <li><strong>macOS / Linux:</strong> Install PowerShell 7 (e.g. <code class="inline">brew install powershell</code> on macOS), then run <code class="inline">pwsh</code>.</li>
        <li><strong>Right here:</strong> Every lesson has a practice terminal below. It's a safe simulation — try the commands as you read.</li>
      </ul>

      <h2>Your first command</h2>
      <p>Try typing <code class="inline">Get-Date</code> in the terminal below and press Enter.</p>

      <div class="terminal" data-sim="true" data-hint="Try: Get-Date  ·  Get-Host  ·  clear">
        <div class="terminal-head"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span style="margin-left:8px">PowerShell 7 — practice terminal</span></div>
        <div class="terminal-body" data-log></div>
        <div class="terminal-input-row">
          <span class="term-prompt">PS&gt;</span>
          <input class="terminal-input" type="text" spellcheck="false" autocomplete="off" placeholder="type a command and press Enter" />
        </div>
        <div class="term-hint">Try: <code class="inline">Get-Date</code> · <code class="inline">Get-Host</code> · <code class="inline">clear</code></div>
      </div>

      <div class="quiz" data-answer="1">
        <div class="quiz-q">What is the biggest difference between PowerShell and older shells like cmd or Bash?</div>
        <button class="quiz-opt">PowerShell only works on Windows</button>
        <button class="quiz-opt">Commands pass structured objects, not just plain text</button>
        <button class="quiz-opt">PowerShell cannot run scripts</button>
        <button class="quiz-opt">It has no command pipeline</button>
        <div class="quiz-feedback"></div>
      </div>
    `
  },

  /* ---------------------------------------------------------------- */
  {
    id: "cmdlets",
    nav: "Cmdlets & Verb-Noun",
    title: "Cmdlets and the Verb-Noun Pattern",
    tag: "Fundamentals",
    html: `
      <p>A <strong>cmdlet</strong> (pronounced "command-let") is a built-in PowerShell command. Almost every cmdlet follows one predictable naming pattern:</p>

      <div class="code-block" data-lang="text">
        <pre><code><span class="tok-cmd">Verb</span><span class="tok-op">-</span><span class="tok-param">Noun</span></code></pre>
      </div>

      <p>The <strong>verb</strong> says what you're doing; the <strong>noun</strong> says what you're doing it to. Once you learn a few verbs, you can guess commands you've never seen:</p>

      <ul>
        <li><code class="inline">Get-Process</code> — get running processes</li>
        <li><code class="inline">Stop-Service</code> — stop a service</li>
        <li><code class="inline">New-Item</code> — create a file or folder</li>
        <li><code class="inline">Remove-Item</code> — delete something</li>
        <li><code class="inline">Set-Location</code> — change directory (like <code class="inline">cd</code>)</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">Approved verbs</div>
        <p>Microsoft maintains a list of "approved verbs" so commands stay consistent. <code class="inline">Get</code>, <code class="inline">Set</code>, <code class="inline">New</code>, <code class="inline">Remove</code>, <code class="inline">Start</code>, and <code class="inline">Stop</code> cover most of what you'll do. Run <code class="inline">Get-Verb</code> to see them all.</p>
      </div>

      <h2>Aliases: shortcuts you already know</h2>
      <p>Many cmdlets have short <strong>aliases</strong>, often matching commands from Bash or cmd, so your muscle memory still works:</p>

      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-cmd">gci</span>   <span class="tok-comment"># alias for Get-ChildItem (list files)</span>
<span class="tok-cmd">ls</span>    <span class="tok-comment"># also Get-ChildItem</span>
<span class="tok-cmd">cd</span>    <span class="tok-comment"># alias for Set-Location</span>
<span class="tok-cmd">cat</span>   <span class="tok-comment"># alias for Get-Content</span>
<span class="tok-cmd">cls</span>   <span class="tok-comment"># alias for Clear-Host</span></code></pre>
      </div>

      <div class="callout warn">
        <div class="callout-title">Heads up</div>
        <p>Aliases are great for typing quickly, but in <em>scripts</em> you should use the full cmdlet names. They're clearer to read and won't surprise someone on a different system.</p>
      </div>

      <h2>Practice</h2>
      <p>Try <code class="inline">Get-Verb</code> and <code class="inline">Get-Process</code> below.</p>

      <div class="terminal" data-sim="true">
        <div class="terminal-head"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span style="margin-left:8px">practice terminal</span></div>
        <div class="terminal-body" data-log></div>
        <div class="terminal-input-row">
          <span class="term-prompt">PS&gt;</span>
          <input class="terminal-input" type="text" spellcheck="false" autocomplete="off" placeholder="type a command and press Enter" />
        </div>
        <div class="term-hint">Try: <code class="inline">Get-Verb</code> · <code class="inline">Get-Process</code> · <code class="inline">Get-Alias ls</code></div>
      </div>

      <div class="quiz" data-answer="2">
        <div class="quiz-q">You want to create a new folder. Based on the Verb-Noun pattern, which cmdlet is most likely correct?</div>
        <button class="quiz-opt">Make-Folder</button>
        <button class="quiz-opt">Folder-Create</button>
        <button class="quiz-opt">New-Item</button>
        <button class="quiz-opt">Create-Directory</button>
        <div class="quiz-feedback"></div>
      </div>
    `
  },

  /* ---------------------------------------------------------------- */
  {
    id: "help",
    nav: "Getting Help",
    title: "Discovering Commands & Getting Help",
    tag: "Fundamentals",
    html: `
      <p>You will never memorize every cmdlet — and you don't need to. PowerShell has a superb built-in help system. These three commands are your best friends:</p>

      <h2>1. Get-Help — read the manual</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-cmd">Get-Help</span> <span class="tok-cmd">Get-Process</span>              <span class="tok-comment"># overview</span>
<span class="tok-cmd">Get-Help</span> <span class="tok-cmd">Get-Process</span> <span class="tok-param">-Examples</span>    <span class="tok-comment"># just show examples (super useful!)</span>
<span class="tok-cmd">Get-Help</span> <span class="tok-cmd">Get-Process</span> <span class="tok-param">-Full</span>        <span class="tok-comment"># everything</span>
<span class="tok-cmd">Get-Help</span> <span class="tok-cmd">Get-Process</span> <span class="tok-param">-Online</span>      <span class="tok-comment"># open the docs in your browser</span></code></pre>
      </div>

      <div class="callout tip">
        <div class="callout-title">Pro move</div>
        <p>When you meet a new command, run <code class="inline">Get-Help &lt;command&gt; -Examples</code> first. Real examples teach faster than parameter lists.</p>
      </div>

      <h2>2. Get-Command — find the right cmdlet</h2>
      <p>Not sure what a command is called? Search by wildcard:</p>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-comment"># Find every command with "service" in the name</span>
<span class="tok-cmd">Get-Command</span> <span class="tok-param">-Name</span> <span class="tok-str">*service*</span>

<span class="tok-comment"># Find every command that uses the "Restart" verb</span>
<span class="tok-cmd">Get-Command</span> <span class="tok-param">-Verb</span> Restart</code></pre>
      </div>

      <h2>3. Get-Member — inspect the object</h2>
      <p>Since everything is an object, <code class="inline">Get-Member</code> shows you what <em>properties</em> and <em>methods</em> an object has. This is how you discover what data you can pull out:</p>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-cmd">Get-Process</span> <span class="tok-op">|</span> <span class="tok-cmd">Get-Member</span>

<span class="tok-comment"># Output (trimmed):</span>
<span class="tok-out">   Name        MemberType   Definition</span>
<span class="tok-out">   ----        ----------   ----------</span>
<span class="tok-out">   Id          Property     int Id {get;}</span>
<span class="tok-out">   Name        Property     string Name {get;}</span>
<span class="tok-out">   CPU         Property     double CPU {get;}</span>
<span class="tok-out">   Kill        Method       void Kill()</span></code></pre>
      </div>

      <p>Now you know a process has <code class="inline">.Id</code>, <code class="inline">.Name</code>, and <code class="inline">.CPU</code> — so you can filter and sort on them.</p>

      <div class="terminal" data-sim="true">
        <div class="terminal-head"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span style="margin-left:8px">practice terminal</span></div>
        <div class="terminal-body" data-log></div>
        <div class="terminal-input-row">
          <span class="term-prompt">PS&gt;</span>
          <input class="terminal-input" type="text" spellcheck="false" autocomplete="off" placeholder="type a command and press Enter" />
        </div>
        <div class="term-hint">Try: <code class="inline">Get-Command -Verb Get</code> · <code class="inline">Get-Help Get-Process</code></div>
      </div>

      <div class="quiz" data-answer="1">
        <div class="quiz-q">You have a process object and want to know which properties you can read from it. Which command do you use?</div>
        <button class="quiz-opt">Get-Help</button>
        <button class="quiz-opt">Get-Member</button>
        <button class="quiz-opt">Get-Command</button>
        <button class="quiz-opt">Get-Property</button>
        <div class="quiz-feedback"></div>
      </div>
    `
  },

  /* ---------------------------------------------------------------- */
  {
    id: "pipeline",
    nav: "The Pipeline",
    title: "The Pipeline: Chaining Commands",
    tag: "Core skill",
    html: `
      <p>The <strong>pipeline</strong> is the heart of PowerShell. The pipe character <code class="inline">|</code> takes the objects that come <em>out</em> of one command and feeds them <em>into</em> the next. You build up a result step by step, left to right.</p>

      <h2>Three workhorse cmdlets</h2>

      <h3>Where-Object — filter (keep some, drop the rest)</h3>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-comment"># Keep only processes using more than 100 MB of memory</span>
<span class="tok-cmd">Get-Process</span> <span class="tok-op">|</span> <span class="tok-cmd">Where-Object</span> <span class="tok-var">$_</span>.WorkingSet <span class="tok-op">-gt</span> <span class="tok-num">100MB</span></code></pre>
      </div>
      <p><code class="inline">$_</code> is a placeholder meaning "the current object flowing through the pipeline." You'll see it constantly.</p>

      <h3>Sort-Object — order the results</h3>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-cmd">Get-Process</span> <span class="tok-op">|</span> <span class="tok-cmd">Sort-Object</span> CPU <span class="tok-param">-Descending</span></code></pre>
      </div>

      <h3>Select-Object — pick columns / limit rows</h3>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-comment"># Top 5 CPU-hungry processes, showing just Name and CPU</span>
<span class="tok-cmd">Get-Process</span> <span class="tok-op">|</span> <span class="tok-cmd">Sort-Object</span> CPU <span class="tok-param">-Descending</span> <span class="tok-op">|</span> <span class="tok-cmd">Select-Object</span> <span class="tok-param">-First</span> <span class="tok-num">5</span> Name, CPU</code></pre>
      </div>

      <div class="callout tip">
        <div class="callout-title">Read it like a sentence</div>
        <p>"Get processes, <em>then</em> sort by CPU descending, <em>then</em> select the first 5." Each <code class="inline">|</code> is a "then." This is the mental model that unlocks PowerShell.</p>
      </div>

      <h2>Comparison operators</h2>
      <p>PowerShell uses word-style operators, not symbols like <code class="inline">&gt;</code> (that's reserved for redirection):</p>
      <ul>
        <li><code class="inline">-eq</code> equal · <code class="inline">-ne</code> not equal</li>
        <li><code class="inline">-gt</code> greater · <code class="inline">-lt</code> less · <code class="inline">-ge</code> / <code class="inline">-le</code> greater/less-or-equal</li>
        <li><code class="inline">-like</code> wildcard match · <code class="inline">-match</code> regex match</li>
        <li><code class="inline">-contains</code> / <code class="inline">-in</code> membership</li>
      </ul>

      <div class="terminal" data-sim="true">
        <div class="terminal-head"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span style="margin-left:8px">practice terminal</span></div>
        <div class="terminal-body" data-log></div>
        <div class="terminal-input-row">
          <span class="term-prompt">PS&gt;</span>
          <input class="terminal-input" type="text" spellcheck="false" autocomplete="off" placeholder="type a command and press Enter" />
        </div>
        <div class="term-hint">Try: <code class="inline">Get-Process | Sort-Object CPU -Descending</code></div>
      </div>

      <div class="quiz" data-answer="2">
        <div class="quiz-q">In <code class="inline">Get-Service | Where-Object $_.Status -eq 'Running'</code>, what does <code class="inline">$_</code> represent?</div>
        <button class="quiz-opt">A syntax error</button>
        <button class="quiz-opt">The name of the script file</button>
        <button class="quiz-opt">The current object flowing through the pipeline</button>
        <button class="quiz-opt">A global counter variable</button>
        <div class="quiz-feedback"></div>
      </div>
    `
  },

  /* ---------------------------------------------------------------- */
  {
    id: "variables",
    nav: "Variables & Data Types",
    title: "Variables, Strings & Data Types",
    tag: "Core skill",
    html: `
      <p>Variables in PowerShell start with a <code class="inline">$</code>. You don't have to declare a type — PowerShell figures it out.</p>

      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-var">$name</span> <span class="tok-op">=</span> <span class="tok-str">"Ada"</span>
<span class="tok-var">$age</span> <span class="tok-op">=</span> <span class="tok-num">42</span>
<span class="tok-var">$isAdmin</span> <span class="tok-op">=</span> <span class="tok-var">$true</span>
<span class="tok-var">$files</span> <span class="tok-op">=</span> <span class="tok-cmd">Get-ChildItem</span>   <span class="tok-comment"># store command output in a variable</span></code></pre>
      </div>

      <h2>Strings and interpolation</h2>
      <p>Double-quoted strings expand variables inside them; single-quoted strings are literal.</p>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-var">$name</span> <span class="tok-op">=</span> <span class="tok-str">"Ada"</span>
<span class="tok-str">"Hello, </span><span class="tok-var">$name</span><span class="tok-str">!"</span>       <span class="tok-comment"># -> Hello, Ada!</span>
<span class="tok-str">'Hello, </span><span class="tok-var">$name</span><span class="tok-str">!'</span>       <span class="tok-comment"># -> Hello, $name!  (literal)</span>

<span class="tok-comment"># For expressions, wrap in $( )</span>
<span class="tok-str">"Next year you'll be </span><span class="tok-var">$(</span><span class="tok-var">$age</span> <span class="tok-op">+</span> <span class="tok-num">1</span><span class="tok-var">)</span><span class="tok-str">"</span></code></pre>
      </div>

      <div class="callout tip">
        <div class="callout-title">Remember</div>
        <p>Double quotes = "expand my variables." Single quotes = "leave it exactly as I typed it." When in doubt for plain text, single quotes are safer.</p>
      </div>

      <h2>Arrays</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-var">$fruit</span> <span class="tok-op">=</span> <span class="tok-str">"apple"</span>, <span class="tok-str">"pear"</span>, <span class="tok-str">"plum"</span>
<span class="tok-var">$fruit</span>[<span class="tok-num">0</span>]           <span class="tok-comment"># -> apple  (zero-based)</span>
<span class="tok-var">$fruit</span>.Count          <span class="tok-comment"># -> 3</span>
<span class="tok-var">$fruit</span> <span class="tok-op">+=</span> <span class="tok-str">"kiwi"</span>      <span class="tok-comment"># add an item</span></code></pre>
      </div>

      <h2>Hashtables (key/value)</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-var">$user</span> <span class="tok-op">=</span> <span class="tok-op">@{</span> Name <span class="tok-op">=</span> <span class="tok-str">"Ada"</span>; Role <span class="tok-op">=</span> <span class="tok-str">"Admin"</span> <span class="tok-op">}</span>
<span class="tok-var">$user</span>.Name             <span class="tok-comment"># -> Ada</span>
<span class="tok-var">$user</span>[<span class="tok-str">"Role"</span>]         <span class="tok-comment"># -> Admin</span></code></pre>
      </div>

      <div class="callout tip">
        <div class="callout-title">Discover a variable's type</div>
        <p>Every variable is an object too. Use <code class="inline">$x.GetType().Name</code> to see what it is, and <code class="inline">$x | Get-Member</code> to see what it can do.</p>
      </div>

      <div class="terminal" data-sim="true">
        <div class="terminal-head"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span style="margin-left:8px">practice terminal</span></div>
        <div class="terminal-body" data-log></div>
        <div class="terminal-input-row">
          <span class="term-prompt">PS&gt;</span>
          <input class="terminal-input" type="text" spellcheck="false" autocomplete="off" placeholder="type a command and press Enter" />
        </div>
        <div class="term-hint">Try: <code class="inline">$name = "Ada"</code> then <code class="inline">"Hi $name"</code></div>
      </div>

      <div class="quiz" data-answer="1">
        <div class="quiz-q">What does <code class="inline">'Total: $total'</code> (single quotes) print if <code class="inline">$total</code> is 50?</div>
        <button class="quiz-opt">Total: 50</button>
        <button class="quiz-opt">Total: $total</button>
        <button class="quiz-opt">An error</button>
        <button class="quiz-opt">Total: 0</button>
        <div class="quiz-feedback"></div>
      </div>
    `
  },

  /* ---------------------------------------------------------------- */
  {
    id: "flow",
    nav: "Loops & Conditionals",
    title: "Logic: Conditionals & Loops",
    tag: "Scripting",
    html: `
      <p>Now we start writing real logic. PowerShell's control flow will feel familiar if you've seen any C-style language.</p>

      <h2>if / elseif / else</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-var">$score</span> <span class="tok-op">=</span> <span class="tok-num">82</span>

<span class="tok-cmd">if</span> (<span class="tok-var">$score</span> <span class="tok-op">-ge</span> <span class="tok-num">90</span>) {
    <span class="tok-str">"Grade: A"</span>
} <span class="tok-cmd">elseif</span> (<span class="tok-var">$score</span> <span class="tok-op">-ge</span> <span class="tok-num">80</span>) {
    <span class="tok-str">"Grade: B"</span>
} <span class="tok-cmd">else</span> {
    <span class="tok-str">"Keep practicing"</span>
}</code></pre>
      </div>
      <p>Note the word operators from the pipeline lesson (<code class="inline">-ge</code>, <code class="inline">-eq</code>) show up here too.</p>

      <h2>foreach — do something for each item</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-var">$servers</span> <span class="tok-op">=</span> <span class="tok-str">"web01"</span>, <span class="tok-str">"web02"</span>, <span class="tok-str">"db01"</span>

<span class="tok-cmd">foreach</span> (<span class="tok-var">$s</span> <span class="tok-cmd">in</span> <span class="tok-var">$servers</span>) {
    <span class="tok-str">"Pinging </span><span class="tok-var">$s</span><span class="tok-str">..."</span>
}</code></pre>
      </div>

      <div class="callout tip">
        <div class="callout-title">Two flavors of foreach</div>
        <p>There's the <code class="inline">foreach</code> <em>statement</em> (above) and the <code class="inline">ForEach-Object</code> <em>cmdlet</em> used in a pipeline: <code class="inline">$servers | ForEach-Object { "Ping $_" }</code>. Same idea, different context.</p>
      </div>

      <h2>while and for</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-comment"># while: repeat until a condition is false</span>
<span class="tok-var">$i</span> <span class="tok-op">=</span> <span class="tok-num">1</span>
<span class="tok-cmd">while</span> (<span class="tok-var">$i</span> <span class="tok-op">-le</span> <span class="tok-num">3</span>) {
    <span class="tok-str">"Attempt </span><span class="tok-var">$i</span><span class="tok-str">"</span>
    <span class="tok-var">$i</span><span class="tok-op">++</span>
}

<span class="tok-comment"># for: classic counter loop</span>
<span class="tok-cmd">for</span> (<span class="tok-var">$n</span> <span class="tok-op">=</span> <span class="tok-num">0</span>; <span class="tok-var">$n</span> <span class="tok-op">-lt</span> <span class="tok-num">3</span>; <span class="tok-var">$n</span><span class="tok-op">++</span>) {
    <span class="tok-str">"n = </span><span class="tok-var">$n</span><span class="tok-str">"</span>
}</code></pre>
      </div>

      <div class="callout warn">
        <div class="callout-title">Common trap</div>
        <p>Don't use <code class="inline">=</code> when you mean "is equal to." Assignment is <code class="inline">=</code>; comparison is <code class="inline">-eq</code>. <code class="inline">if ($x = 5)</code> assigns 5 to <code class="inline">$x</code> — probably not what you wanted!</p>
      </div>

      <div class="quiz" data-answer="2">
        <div class="quiz-q">Which condition correctly checks whether <code class="inline">$status</code> equals the text "Running"?</div>
        <button class="quiz-opt">if ($status = "Running")</button>
        <button class="quiz-opt">if ($status == "Running")</button>
        <button class="quiz-opt">if ($status -eq "Running")</button>
        <button class="quiz-opt">if ($status .equals "Running")</button>
        <div class="quiz-feedback"></div>
      </div>
    `
  },

  /* ---------------------------------------------------------------- */
  {
    id: "functions",
    nav: "Functions & Scripts",
    title: "Functions, Parameters & Scripts",
    tag: "Scripting",
    html: `
      <p>When you find yourself typing the same thing twice, wrap it in a <strong>function</strong>. Functions make your code reusable and readable.</p>

      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-cmd">function</span> <span class="tok-cmd">Get-Greeting</span> {
    <span class="tok-cmd">param</span>(
        [<span class="tok-param">string</span>]<span class="tok-var">$Name</span> <span class="tok-op">=</span> <span class="tok-str">"friend"</span>
    )
    <span class="tok-str">"Hello, </span><span class="tok-var">$Name</span><span class="tok-str">! Welcome to PowerShell."</span>
}

<span class="tok-cmd">Get-Greeting</span> <span class="tok-param">-Name</span> <span class="tok-str">"Ada"</span>    <span class="tok-comment"># -> Hello, Ada! Welcome to PowerShell.</span>
<span class="tok-cmd">Get-Greeting</span>                <span class="tok-comment"># -> Hello, friend! ... (uses the default)</span></code></pre>
      </div>

      <div class="callout tip">
        <div class="callout-title">Name it Verb-Noun</div>
        <p>Give your functions the same <code class="inline">Verb-Noun</code> names as built-in cmdlets (like <code class="inline">Get-Greeting</code>). It makes them feel native and discoverable.</p>
      </div>

      <h2>Parameters with types and validation</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-cmd">function</span> <span class="tok-cmd">New-Report</span> {
    <span class="tok-cmd">param(</span>
        [<span class="tok-param">Parameter</span>(<span class="tok-param">Mandatory</span>)] [<span class="tok-param">string</span>]<span class="tok-var">$Title</span>,
        [<span class="tok-param">int</span>]<span class="tok-var">$Count</span> <span class="tok-op">=</span> <span class="tok-num">0</span>,
        [<span class="tok-param">switch</span>]<span class="tok-var">$Verbose</span>
    <span class="tok-cmd">)</span>
    <span class="tok-str">"Report: </span><span class="tok-var">$Title</span><span class="tok-str"> (</span><span class="tok-var">$Count</span><span class="tok-str"> items)"</span>
    <span class="tok-cmd">if</span> (<span class="tok-var">$Verbose</span>) { <span class="tok-str">"...extra detail..."</span> }
}</code></pre>
      </div>
      <ul>
        <li><code class="inline">[Parameter(Mandatory)]</code> — PowerShell will prompt if it's missing.</li>
        <li><code class="inline">[int]</code>, <code class="inline">[string]</code> — enforce the type.</li>
        <li><code class="inline">[switch]</code> — an on/off flag, used as <code class="inline">-Verbose</code>.</li>
      </ul>

      <h2>return values</h2>
      <p>Here's a PowerShell surprise: <strong>any value your function emits becomes output</strong> — you often don't need <code class="inline">return</code> at all. A bare expression on its own line is returned.</p>

      <h2>Saving scripts</h2>
      <p>Put your code in a <code class="inline">.ps1</code> file and run it:</p>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-comment"># save as hello.ps1, then run:</span>
.\hello.ps1</code></pre>
      </div>

      <div class="callout warn">
        <div class="callout-title">Execution policy</div>
        <p>On Windows, scripts may be blocked by default. If you see an execution-policy error, run PowerShell as admin and set a safer-but-usable policy: <code class="inline">Set-ExecutionPolicy RemoteSigned -Scope CurrentUser</code>. We cover this in the last lesson.</p>
      </div>

      <div class="quiz" data-answer="0">
        <div class="quiz-q">In a param block, what does <code class="inline">[switch]$Force</code> create?</div>
        <button class="quiz-opt">An on/off flag you pass as -Force</button>
        <button class="quiz-opt">A required text parameter</button>
        <button class="quiz-opt">A number parameter defaulting to 1</button>
        <button class="quiz-opt">A loop that runs forever</button>
        <div class="quiz-feedback"></div>
      </div>
    `
  },

  /* ---------------------------------------------------------------- */
  {
    id: "files",
    nav: "Working with Files",
    title: "Files, Folders & the Filesystem",
    tag: "Practical",
    html: `
      <p>Managing files is probably why you're here. PowerShell treats the filesystem as a "drive" you navigate and manipulate with cmdlets.</p>

      <h2>Navigating & listing</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-cmd">Get-Location</span>                       <span class="tok-comment"># where am I? (alias: pwd)</span>
<span class="tok-cmd">Set-Location</span> C:\\Projects            <span class="tok-comment"># cd into a folder</span>
<span class="tok-cmd">Get-ChildItem</span>                      <span class="tok-comment"># list contents (alias: ls, dir, gci)</span>
<span class="tok-cmd">Get-ChildItem</span> <span class="tok-param">-Recurse</span> <span class="tok-param">-Filter</span> <span class="tok-str">*.log</span>  <span class="tok-comment"># find all .log files below here</span></code></pre>
      </div>

      <h2>Creating, copying, moving, deleting</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-cmd">New-Item</span> notes.txt <span class="tok-param">-ItemType</span> File
<span class="tok-cmd">New-Item</span> logs <span class="tok-param">-ItemType</span> Directory
<span class="tok-cmd">Copy-Item</span> notes.txt notes-backup.txt
<span class="tok-cmd">Move-Item</span> notes.txt .\\logs\\
<span class="tok-cmd">Rename-Item</span> old.txt new.txt
<span class="tok-cmd">Remove-Item</span> notes-backup.txt</code></pre>
      </div>

      <div class="callout warn">
        <div class="callout-title">Deleting is forever</div>
        <p><code class="inline">Remove-Item</code> does not use the Recycle Bin. Before deleting with wildcards or <code class="inline">-Recurse</code>, add <code class="inline">-WhatIf</code> to preview what <em>would</em> be deleted without doing it: <code class="inline">Remove-Item *.tmp -WhatIf</code>.</p>
      </div>

      <h2>Reading & writing content</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-cmd">Get-Content</span> notes.txt                 <span class="tok-comment"># read a file (alias: cat)</span>
<span class="tok-str">"First line"</span> <span class="tok-op">|</span> <span class="tok-cmd">Set-Content</span> notes.txt  <span class="tok-comment"># write (overwrite)</span>
<span class="tok-str">"Another line"</span> <span class="tok-op">|</span> <span class="tok-cmd">Add-Content</span> notes.txt <span class="tok-comment"># append</span>

<span class="tok-comment"># Count lines in a file</span>
(<span class="tok-cmd">Get-Content</span> notes.txt).Count</code></pre>
      </div>

      <div class="callout tip">
        <div class="callout-title">Structured data for free</div>
        <p>PowerShell reads and writes CSV and JSON natively: <code class="inline">Import-Csv</code>, <code class="inline">ConvertTo-Json</code>, <code class="inline">ConvertFrom-Json</code>. Combined with the pipeline, this makes data wrangling remarkably easy.</p>
      </div>

      <h2>A real one-liner</h2>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-comment"># The 3 largest files under the current folder</span>
<span class="tok-cmd">Get-ChildItem</span> <span class="tok-param">-Recurse</span> <span class="tok-param">-File</span> <span class="tok-op">|</span> <span class="tok-cmd">Sort-Object</span> Length <span class="tok-param">-Descending</span> <span class="tok-op">|</span> <span class="tok-cmd">Select-Object</span> <span class="tok-param">-First</span> <span class="tok-num">3</span> Name, Length</code></pre>
      </div>
      <p>Look how everything you've learned combines: list → sort → select. That's the PowerShell way.</p>

      <div class="terminal" data-sim="true">
        <div class="terminal-head"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span style="margin-left:8px">practice terminal</span></div>
        <div class="terminal-body" data-log></div>
        <div class="terminal-input-row">
          <span class="term-prompt">PS&gt;</span>
          <input class="terminal-input" type="text" spellcheck="false" autocomplete="off" placeholder="type a command and press Enter" />
        </div>
        <div class="term-hint">Try: <code class="inline">Get-ChildItem</code> · <code class="inline">Get-Location</code> · <code class="inline">Get-Content notes.txt</code></div>
      </div>

      <div class="quiz" data-answer="1">
        <div class="quiz-q">You want to see what a risky <code class="inline">Remove-Item</code> would delete, without actually deleting. Which parameter do you add?</div>
        <button class="quiz-opt">-Force</button>
        <button class="quiz-opt">-WhatIf</button>
        <button class="quiz-opt">-Recurse</button>
        <button class="quiz-opt">-Preview</button>
        <div class="quiz-feedback"></div>
      </div>
    `
  },

  /* ---------------------------------------------------------------- */
  {
    id: "next",
    nav: "Real Scripts & Next Steps",
    title: "Putting It Together & Where to Go Next",
    tag: "Wrap-up",
    html: `
      <p>You've got the fundamentals. Let's tie them into a small, realistic script and point you toward what to learn next.</p>

      <h2>A tiny but real script</h2>
      <p>This cleans up old log files and reports what it did — using variables, a pipeline, a loop, and a function:</p>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-comment"># cleanup-logs.ps1 — delete .log files older than 7 days</span>
<span class="tok-cmd">function</span> <span class="tok-cmd">Remove-OldLogs</span> {
    <span class="tok-cmd">param(</span>
        [<span class="tok-param">string</span>]<span class="tok-var">$Path</span> <span class="tok-op">=</span> <span class="tok-str">"."</span>,
        [<span class="tok-param">int</span>]<span class="tok-var">$Days</span> <span class="tok-op">=</span> <span class="tok-num">7</span>
    <span class="tok-cmd">)</span>
    <span class="tok-var">$cutoff</span> <span class="tok-op">=</span> (<span class="tok-cmd">Get-Date</span>).AddDays(<span class="tok-op">-</span><span class="tok-var">$Days</span>)

    <span class="tok-var">$old</span> <span class="tok-op">=</span> <span class="tok-cmd">Get-ChildItem</span> <span class="tok-var">$Path</span> <span class="tok-param">-Filter</span> <span class="tok-str">*.log</span> <span class="tok-param">-File</span> <span class="tok-op">|</span>
             <span class="tok-cmd">Where-Object</span> <span class="tok-var">$_</span>.LastWriteTime <span class="tok-op">-lt</span> <span class="tok-var">$cutoff</span>

    <span class="tok-cmd">foreach</span> (<span class="tok-var">$file</span> <span class="tok-cmd">in</span> <span class="tok-var">$old</span>) {
        <span class="tok-cmd">Remove-Item</span> <span class="tok-var">$file</span>.FullName <span class="tok-param">-WhatIf</span>   <span class="tok-comment"># remove -WhatIf when you trust it</span>
        <span class="tok-str">"Removed </span><span class="tok-var">$(</span><span class="tok-var">$file</span>.Name<span class="tok-var">)</span><span class="tok-str">"</span>
    }

    <span class="tok-str">"Done. </span><span class="tok-var">$(</span><span class="tok-var">$old</span>.Count<span class="tok-var">)</span><span class="tok-str"> file(s) matched."</span>
}

<span class="tok-cmd">Remove-OldLogs</span> <span class="tok-param">-Path</span> <span class="tok-str">"C:\\Logs"</span> <span class="tok-param">-Days</span> <span class="tok-num">30</span></code></pre>
      </div>
      <p>Every piece of this came from earlier lessons. That's the whole game — small, composable commands stitched together.</p>

      <h2>Execution policy (Windows)</h2>
      <p>The one bit of setup that trips up beginners. To allow your own local scripts to run while still blocking unsigned scripts from the internet:</p>
      <div class="code-block" data-lang="powershell">
        <pre><code><span class="tok-cmd">Get-ExecutionPolicy</span>                              <span class="tok-comment"># check current setting</span>
<span class="tok-cmd">Set-ExecutionPolicy</span> RemoteSigned <span class="tok-param">-Scope</span> CurrentUser  <span class="tok-comment"># a sensible default</span></code></pre>
      </div>

      <h2>Habits that make you good, fast</h2>
      <ul>
        <li><strong>Tab completion:</strong> start typing a cmdlet or parameter and press <kbd>Tab</kbd>. Huge time-saver.</li>
        <li><strong>Pipe to <code class="inline">Get-Member</code>:</strong> whenever output confuses you, ask the object what it is.</li>
        <li><strong>Use <code class="inline">-WhatIf</code> first</strong> on anything destructive.</li>
        <li><strong>Read <code class="inline">-Examples</code></strong> before reaching for the web.</li>
      </ul>

      <h2>Where to go next</h2>
      <ul>
        <li><a href="https://learn.microsoft.com/powershell/" target="_blank" rel="noopener">Microsoft Learn — PowerShell docs</a> (official, excellent)</li>
        <li>Explore modules: <code class="inline">Get-Module -ListAvailable</code>, and the <a href="https://www.powershellgallery.com/" target="_blank" rel="noopener">PowerShell Gallery</a> for community modules</li>
        <li>Learn <strong>PSStyle & formatting</strong>, <strong>error handling</strong> (<code class="inline">try/catch</code>), and <strong>remoting</strong> (<code class="inline">Invoke-Command</code>) as your next three topics</li>
        <li>Automate one boring thing you do every week. That's the fastest way to get fluent.</li>
      </ul>

      <div class="callout tip">
        <div class="callout-title">You made it 🎉</div>
        <p>You now understand cmdlets, the pipeline, variables, logic, functions, and file operations — the core of practical PowerShell. Mark this lesson complete and go automate something.</p>
      </div>

      <div class="quiz" data-answer="2">
        <div class="quiz-q">What's the recommended way to safely test a destructive command before committing to it?</div>
        <button class="quiz-opt">Run it and hope</button>
        <button class="quiz-opt">Disable the execution policy</button>
        <button class="quiz-opt">Add -WhatIf to preview the effect</button>
        <button class="quiz-opt">Delete the file manually first</button>
        <div class="quiz-feedback"></div>
      </div>
    `
  }
];
