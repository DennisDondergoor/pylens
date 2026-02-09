# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

```bash
# Serve locally
python3 -m http.server 8000
# Open http://localhost:8000
```

No build step, no package manager, no tests. Static site served directly from root.

## Architecture

Single-page app with view toggling (add/remove `active` class on `<section>` elements). All source is vanilla JS with no dependencies.

- **index.html** — All views: home, tier select, challenge, result, stats. Includes a confirmation modal for clearing progress.
- **js/app.js** — Main controller (~570 lines). IIFE module handling view routing, navigation, challenge flow, and all user interactions. Manages transient state (currentMode, currentTier, currentChallenge, selectedLine, lensClassification).
- **js/engine.js** — Challenge logic: retrieval, answer checking for all three modes, scoring with streak multipliers, tier availability, and unlock progression checks.
- **js/storage.js** — localStorage wrapper with four keys: `pylens_progress` (per-challenge scores), `pylens_unlocks` (tier/lens booleans), `pylens_stats` (streaks, tag mastery), `pylens_history` (last 50 sessions).
- **js/stats.js** — Renders stats view and home screen progress bars. Reads from Storage, writes HTML.
- **js/syntax.js** — Regex-based Python syntax highlighter. Handles keywords, strings, f-strings, comments, numbers, builtins, decorators. Returns HTML with line numbers and optional `selectable` class for debug mode.
- **js/challenges/** — Challenge data files. Each defines a `window.TIER{N}_{MODE}` array (e.g., `window.TIER1_TRACE`). Lens challenges use `window.LENS_CHALLENGES`.
- **css/style.css** — All styles. Uses CSS custom properties matching typefit's design system: `#000` bg, `#111` cards, `#333` borders, `#4a9eff` accent, Source Code Pro font, 2px solid borders, 8px radius.

### Module loading order (matters)

```
syntax.js → challenge data files → storage.js → engine.js → stats.js → app.js
```

Engine reads challenge data from `window.*` globals. App initializes on DOMContentLoaded.

### Three modes and their flows

**Trace:** See code → pick output from 4 choices → `Engine.checkTrace()` → result. Score: 100 or 0.

**Debug:** See code → click buggy line → pick bug description from 4 choices → `Engine.checkDebug()` → result. Score: 100 (both right), 50 (line right, choice wrong), 0.

**Lens:** See code → classify as "correct" or "buggy" → if classification wrong, immediate 0. If right, proceed to trace or debug proof stage → `Engine.checkLens()`. Score: 100 (all right), 25 (classification right, proof wrong), 0.

### Progression system

Tier 1 always unlocked. Tier N+1 unlocks when 10+ challenges completed in tier N (trace + debug combined). Lens mode unlocks when 10+ Tier 1 trace AND 10+ Tier 1 debug completed. Unlocks checked via `Engine.checkUnlocks()` after every challenge result.

### Challenge data format

Trace challenges need: `id`, `tier`, `tags`, `title`, `code`, `correctOutput`, `outputChoices` (4 items, one matching correctOutput), `explanation`, `conceptLink`.

Debug challenges need: `id`, `tier`, `tags`, `title`, `code`, `bugLine` (1-indexed), `bugDescription`, `bugChoices` (4 items), `correctBugChoice` (index), `fixedCode`, `explanation`, `conceptLink`.

Lens challenges need: `isCorrect` boolean, then either trace fields (if correct) or debug fields (if buggy), plus null for unused fields.

### Naming conventions

- Challenge IDs: `t{tier}{mode_initial}-{slug}` (e.g., `t1t-int-division`, `t2d-shallow-copy`, `lens-or-default-falsy`)
- View sections: `id="view-{name}"`
- Buttons: `id="btn-{action}"`
- Tags: lowercase with hyphens

## Commit Style

Short imperative subject, blank line, explanation of why. End with:
```
Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```
