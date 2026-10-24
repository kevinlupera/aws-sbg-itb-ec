<template>
  <NuxtPage />
</template>

<style>
/* Design tokens copied from the QA-agents demo (Paraguay 2026): neutral light theme with a dark variant. */
:root {
  --bg: #f8fafc;
  --panel: #ffffff;
  --panel-2: #f1f5f9;
  --line: #e2e8f0;
  --line-soft: #eef2f6;
  --console: #ffffff;
  --console-line: #e2e8f0;
  --fg: #0f172a;
  --muted: #475569;
  --muted-dim: #64748b;
  --ok: #15803d;
  --ok-dim: rgba(21, 128, 61, 0.1);
  --danger: #b91c1c;
  --danger-dim: rgba(185, 28, 28, 0.08);
  --accent: #4f46e5;
  --accent-dim: rgba(79, 70, 229, 0.1);
  --on-solid: #ffffff;
  --shadow: 0 1px 2px rgba(15, 23, 42, 0.06);

  --font-display: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0b1120;
    --panel: #111827;
    --panel-2: #1a2333;
    --line: #273244;
    --line-soft: #1f2937;
    --console: #111827;
    --console-line: #273244;
    --fg: #e5e7eb;
    --muted: #a3acba;
    --muted-dim: #8b95a5;
    --ok: #4ade80;
    --ok-dim: rgba(74, 222, 128, 0.12);
    --danger: #f87171;
    --danger-dim: rgba(248, 113, 113, 0.12);
    --accent: #818cf8;
    --accent-dim: rgba(129, 140, 248, 0.14);
    --on-solid: #0b1120;
    --shadow: none;
  }
}
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; background: var(--bg); }
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}
a { color: inherit; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

button {
  font-family: var(--font-body);
  font-size: 0.95rem;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--on-solid);
  font-weight: 600;
  transition: filter 0.12s ease;
}
button:hover:not(:disabled) { filter: brightness(1.08); }
button.ghost { background: transparent; color: var(--fg); border-color: var(--line); }
button.ghost[aria-pressed="true"] { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }
input[type="range"] { accent-color: var(--accent); width: 100%; }
</style>
