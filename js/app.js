/* PowerShell Path — app logic: navigation, progress, quizzes, mock terminal. */
(function () {
  "use strict";

  const STORAGE_KEY = "psPathProgress";
  const view = document.getElementById("lessonView");
  const nav = document.getElementById("lessonNav");
  const progressBar = document.getElementById("progressBar");
  const progressPct = document.getElementById("progressPct");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const completeBtn = document.getElementById("completeBtn");
  const resetBtn = document.getElementById("resetProgress");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");

  let current = 0;

  /* ---------- progress persistence ---------- */
  function loadDone() {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch (e) {
      return new Set();
    }
  }
  function saveDone(set) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  }
  let done = loadDone();

  /* ---------- build sidebar ---------- */
  function buildNav() {
    nav.innerHTML = "";
    LESSONS.forEach((lesson, i) => {
      const btn = document.createElement("button");
      btn.className = "nav-item";
      btn.innerHTML =
        '<span class="nav-num">' +
        String(i + 1).padStart(2, "0") +
        "</span>" +
        '<span class="nav-label">' +
        lesson.nav +
        "</span>" +
        '<span class="nav-check">✓</span>';
      btn.addEventListener("click", () => go(i));
      nav.appendChild(btn);
    });
  }

  function refreshNavState() {
    [...nav.children].forEach((btn, i) => {
      btn.classList.toggle("active", i === current);
      btn.classList.toggle("done", done.has(LESSONS[i].id));
    });
  }

  function refreshProgress() {
    const pct = Math.round((done.size / LESSONS.length) * 100);
    progressBar.style.width = pct + "%";
    progressPct.textContent = pct + "%";
  }

  /* ---------- render a lesson ---------- */
  function go(index) {
    current = Math.max(0, Math.min(LESSONS.length - 1, index));
    const lesson = LESSONS[current];
    view.innerHTML =
      '<span class="lesson-tag">' +
      lesson.tag +
      "</span>" +
      "<h1>" +
      lesson.title +
      "</h1>" +
      lesson.html;

    window.scrollTo({ top: 0, behavior: "smooth" });
    location.hash = lesson.id;

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === LESSONS.length - 1;
    updateCompleteBtn();
    refreshNavState();

    wireCopyButtons();
    wireQuizzes();
    wireTerminals();

    sidebar.classList.remove("open");
  }

  function updateCompleteBtn() {
    const isDone = done.has(LESSONS[current].id);
    completeBtn.classList.toggle("done", isDone);
    completeBtn.textContent = isDone ? "Completed ✓" : "Mark complete ✓";
  }

  /* ---------- copy buttons on code blocks ---------- */
  function wireCopyButtons() {
    view.querySelectorAll(".code-block").forEach((block) => {
      if (block.querySelector(".code-head")) return;
      const pre = block.querySelector("pre");
      const lang = block.getAttribute("data-lang") || "code";
      const head = document.createElement("div");
      head.className = "code-head";
      head.innerHTML =
        '<span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>' +
        '<span class="code-title">' +
        lang +
        "</span>" +
        '<button class="copy-btn">Copy</button>';
      block.insertBefore(head, pre);
      const btn = head.querySelector(".copy-btn");
      btn.addEventListener("click", () => {
        const text = pre.innerText;
        navigator.clipboard.writeText(text).then(
          () => {
            btn.textContent = "Copied!";
            setTimeout(() => (btn.textContent = "Copy"), 1400);
          },
          () => {
            btn.textContent = "Copy failed";
            setTimeout(() => (btn.textContent = "Copy"), 1400);
          }
        );
      });
    });
  }

  /* ---------- quizzes ---------- */
  function wireQuizzes() {
    view.querySelectorAll(".quiz").forEach((quiz) => {
      const answer = parseInt(quiz.getAttribute("data-answer"), 10);
      const opts = [...quiz.querySelectorAll(".quiz-opt")];
      const feedback = quiz.querySelector(".quiz-feedback");
      opts.forEach((opt, i) => {
        opt.addEventListener("click", () => {
          opts.forEach((o) => (o.disabled = true));
          if (i === answer) {
            opt.classList.add("correct");
            feedback.textContent = "Correct! Nicely done.";
            feedback.className = "quiz-feedback ok";
          } else {
            opt.classList.add("wrong");
            opts[answer].classList.add("correct");
            feedback.textContent =
              "Not quite — the highlighted option is correct. Re-read the section above.";
            feedback.className = "quiz-feedback no";
          }
        });
      });
    });
  }

  /* ---------- mock terminal ---------- */
  function wireTerminals() {
    view.querySelectorAll('.terminal[data-sim="true"]').forEach((term) => {
      const log = term.querySelector("[data-log]");
      const input = term.querySelector(".terminal-input");
      const history = [];
      let hIdx = -1;

      function print(text, cls) {
        const line = document.createElement("div");
        line.className = "terminal-line " + (cls || "term-out");
        line.textContent = text;
        log.appendChild(line);
      }

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const cmd = input.value.trim();
          if (!cmd) return;
          history.push(cmd);
          hIdx = history.length;
          print("PS> " + cmd, "term-prompt");
          runFakeCommand(cmd, print);
          input.value = "";
          log.parentElement.scrollTop = log.parentElement.scrollHeight;
          log.scrollIntoView({ block: "nearest" });
        } else if (e.key === "ArrowUp") {
          if (hIdx > 0) {
            hIdx--;
            input.value = history[hIdx];
          }
          e.preventDefault();
        } else if (e.key === "ArrowDown") {
          if (hIdx < history.length - 1) {
            hIdx++;
            input.value = history[hIdx];
          } else {
            hIdx = history.length;
            input.value = "";
          }
          e.preventDefault();
        }
      });
    });
  }

  /* A small, safe simulator that recognizes common intro commands. */
  function runFakeCommand(raw, print) {
    const cmd = raw.trim();
    const lower = cmd.toLowerCase();

    // clear
    if (lower === "clear" || lower === "cls" || lower === "clear-host") {
      const log = document.activeElement
        .closest(".terminal")
        .querySelector("[data-log]");
      log.innerHTML = "";
      return;
    }

    // assignment like  $name = "Ada"
    const assign = cmd.match(/^\$(\w+)\s*=\s*(.+)$/);
    if (assign) {
      fakeVars[assign[1]] = stripQuotes(assign[2].trim());
      return; // assignment produces no output
    }

    // string interpolation echo:  "Hi $name"
    const dq = cmd.match(/^"(.*)"$/);
    if (dq) {
      print(interpolate(dq[1]), "term-out");
      return;
    }
    const sq = cmd.match(/^'(.*)'$/);
    if (sq) {
      print(sq[1], "term-out");
      return;
    }

    // bare variable:  $name
    const bareVar = cmd.match(/^\$(\w+)$/);
    if (bareVar) {
      const v = fakeVars[bareVar[1]];
      print(v === undefined ? "" : v, "term-out");
      return;
    }

    const first = lower.split(/\s+/)[0];
    switch (first) {
      case "get-date":
        print(new Date().toString(), "term-out");
        return;
      case "get-host":
        print("Name             : PowerShell Path (simulated)", "term-out");
        print("Version          : 7.4.0", "term-out");
        print("InstanceId       : 00000000-0000-0000-0000-000000000000", "term-out");
        return;
      case "get-location":
      case "pwd":
        print("Path", "term-out");
        print("----", "term-out");
        print("C:\\Users\\you\\Projects", "term-out");
        return;
      case "get-verb":
        print("Verb        Group", "term-out");
        print("----        -----", "term-out");
        ["Get  Common", "Set  Common", "New  Common", "Remove  Common", "Start  Lifecycle", "Stop  Lifecycle"].forEach(
          (l) => print("  " + l.replace(/\s{2,}/, "         "), "term-out")
        );
        return;
      case "get-process":
        printTable(
          ["Id", "Name", "CPU(s)"],
          [
            ["1420", "pwsh", "3.14"],
            ["880", "chrome", "42.7"],
            ["512", "explorer", "8.02"],
            ["77", "Code", "19.5"]
          ],
          print
        );
        return;
      case "get-service":
        printTable(
          ["Status", "Name", "DisplayName"],
          [
            ["Running", "Spooler", "Print Spooler"],
            ["Stopped", "wuauserv", "Windows Update"],
            ["Running", "Dhcp", "DHCP Client"]
          ],
          print
        );
        return;
      case "get-childitem":
      case "ls":
      case "dir":
      case "gci":
        printTable(
          ["Mode", "Length", "Name"],
          [
            ["-a---", "1024", "notes.txt"],
            ["-a---", "20480", "report.csv"],
            ["d----", "", "logs"],
            ["-a---", "5242880", "backup.zip"]
          ],
          print
        );
        return;
      case "get-content":
      case "cat":
        print("First line", "term-out");
        print("Another line", "term-out");
        return;
      case "get-command":
        print("CommandType   Name              Source", "term-out");
        print("-----------   ----              ------", "term-out");
        print("Cmdlet        Get-Process       Microsoft.PowerShell.Management", "term-out");
        print("Cmdlet        Get-Service       Microsoft.PowerShell.Management", "term-out");
        return;
      case "get-help":
        print("NAME    " + (cmd.split(/\s+/)[1] || "Get-Help"), "term-out");
        print("SYNOPSIS", "term-out");
        print("    (simulated) Use -Examples for real examples on your machine.", "term-out");
        return;
      case "get-alias":
        print("CommandType   Name          Definition", "term-out");
        print("Alias         ls -> Get-ChildItem", "term-out");
        return;
    }

    if (lower.startsWith("get-verb")) return;

    print(
      "This is a simulated terminal that knows a handful of intro commands. " +
        'Try: Get-Date, Get-Process, Get-ChildItem, Get-Verb, or set a variable like $x = "hi".',
      "term-err"
    );
  }

  const fakeVars = {};
  function stripQuotes(s) {
    const m = s.match(/^["'](.*)["']$/);
    return m ? m[1] : s;
  }
  function interpolate(s) {
    return s.replace(/\$(\w+)/g, (m, name) =>
      fakeVars[name] !== undefined ? fakeVars[name] : m
    );
  }
  function printTable(headers, rows, print) {
    const widths = headers.map((h, i) =>
      Math.max(h.length, ...rows.map((r) => String(r[i]).length))
    );
    const fmt = (cells) =>
      cells.map((c, i) => String(c).padEnd(widths[i] + 2)).join("");
    print(fmt(headers), "term-out");
    print(fmt(headers.map((h) => "-".repeat(h.length))), "term-out");
    rows.forEach((r) => print(fmt(r), "term-out"));
  }

  /* ---------- controls ---------- */
  prevBtn.addEventListener("click", () => go(current - 1));
  nextBtn.addEventListener("click", () => go(current + 1));
  completeBtn.addEventListener("click", () => {
    const id = LESSONS[current].id;
    if (done.has(id)) done.delete(id);
    else done.add(id);
    saveDone(done);
    updateCompleteBtn();
    refreshNavState();
    refreshProgress();
  });
  resetBtn.addEventListener("click", () => {
    if (confirm("Reset all lesson progress?")) {
      done = new Set();
      saveDone(done);
      refreshNavState();
      refreshProgress();
      updateCompleteBtn();
    }
  });
  menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));

  /* ---------- boot ---------- */
  buildNav();
  refreshProgress();
  const startId = location.hash.replace("#", "");
  const startIdx = LESSONS.findIndex((l) => l.id === startId);
  go(startIdx >= 0 ? startIdx : 0);
})();
