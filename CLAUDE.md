# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

```bash
# Serve locally
python3 -m http.server 8001 -d /Users/dennis/projects/pylens
# Open http://localhost:8001
```

No build step, no package manager, no tests. Static site served directly from root.

## Architecture

Single-page app with view toggling (add/remove `active` class on `<section>` elements). All source is vanilla JS with no dependencies.

- **index.html** — All views: home, level select, challenge, result, stats. Includes a confirmation modal for clearing progress.
- **js/app.js** — Main controller. IIFE module handling view routing, navigation, challenge flow, and all user interactions. Manages transient state (currentMode, currentLevel, currentChallenge, selectedLine). Shuffles answer choices at display time using Fisher-Yates.
- **js/engine.js** — Challenge logic: retrieval, answer checking for both modes, scoring with streak multipliers, level availability (8 levels), and unlock progression checks.
- **js/storage.js** — localStorage wrapper with four keys: `pylens_progress` (per-challenge scores), `pylens_unlocks` (level booleans), `pylens_stats` (streaks, tag mastery), `pylens_history` (last 50 sessions).
- **js/stats.js** — Renders stats view and home screen progress bars. Reads from Storage, writes HTML.
- **js/syntax.js** — Regex-based Python syntax highlighter. Handles keywords, strings, f-strings, comments, numbers, builtins, decorators. Returns HTML with line numbers and optional `selectable` class for debug mode.
- **js/challenges/** — Challenge data files. Each defines a `window.LEVEL{N}_{MODE}` array (e.g., `window.LEVEL1_TRACE`). Levels 1-4 have 25 challenges each. Levels 5-8 are empty (Coming Soon).
- **css/style.css** — All styles. Uses CSS custom properties: `#000` bg, `#111` cards, `#333` borders, `#4a9eff` accent, Source Code Pro font, 2px solid borders, 8px radius.

### Module loading order (matters)

```
syntax.js → challenge data files → storage.js → engine.js → stats.js → app.js
```

Engine reads challenge data from `window.*` globals. App initializes on DOMContentLoaded.

### Two modes and their flows

**Trace:** See code → pick output from 4 shuffled choices → `Engine.checkTrace()` → result. Score: 100 or 0.

**Debug:** See code → click buggy line → pick bug description from 4 shuffled choices → `Engine.checkDebug()` → result. Score: 100 (both right), 50 (line right, choice wrong), 0.

### Progression system

Level 1 always unlocked. Level N+1 unlocks when 10+ challenges completed in level N (trace + debug combined). Unlocks checked via `Engine.checkUnlocks()` after every challenge result. Levels 5-8 show as "Coming Soon" when they have no challenges.

### Challenge data format

Trace challenges need: `id`, `level`, `tags`, `title`, `code`, `correctOutput`, `outputChoices` (4 items, one matching correctOutput), `explanation`, `conceptLink`.

Debug challenges need: `id`, `level`, `tags`, `title`, `code`, `bugLine` (1-indexed), `bugDescription`, `bugChoices` (4 items), `correctBugChoice` (index), `fixedCode`, `explanation`, `conceptLink`.

### Naming conventions

- Challenge IDs: `t{level}{mode_initial}-{slug}` (e.g., `t1t-int-division`, `t2d-shallow-copy`)
- View sections: `id="view-{name}"`
- Buttons: `id="btn-{action}"`
- Tags: lowercase with hyphens

## Commit Style

Short imperative subject, blank line, explanation of why. End with:
```
Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```
