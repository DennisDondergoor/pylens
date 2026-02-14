# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

- **Firebase project**: `pylens-new`
- **Local dev**: `python3 -m http.server 8001 -d docs` → http://localhost:8001
- **Production**: https://dennisdondergoor.github.io/pylens/
- **Firestore path**: `users/{uid}/apps/pylens` (nested structure)
- **GitHub repo**: https://github.com/DennisDondergoor/pylens

## Development

```bash
# Serve locally
python3 -m http.server 8001 -d docs
# Open http://localhost:8001
```

No build step, no package manager, no tests. Static site served from the `docs/` directory (GitHub Pages).

## Architecture

Single-page app with view toggling (add/remove `active` class on `<section>` elements). All source is vanilla JS with no dependencies.

All source files live under `docs/`:

- **index.html** — All views: home, tier select, challenge, result, stats. Includes a confirmation modal for clearing progress.
- **js/app.js** — Main controller. IIFE module handling view routing, navigation, challenge flow, and all user interactions. Manages transient state (currentMode, currentTier, currentChallenge, selectedLine). Shuffles answer choices at display time using Fisher-Yates. Integrates Firebase cloud sync with merge-on-sign-in.
- **js/engine.js** — Challenge logic: retrieval, answer checking for both modes, scoring with streak multipliers, tier availability (8 tiers), and unlock progression checks.
- **js/storage.js** — localStorage wrapper with four keys: `pylens_progress` (per-challenge scores), `pylens_unlocks` (tier booleans), `pylens_stats` (streaks, tag mastery), `pylens_history` (last 50 sessions).
- **js/firebase.js** — `FirebaseSync` class (Firestore compat SDK v10, GitHub OAuth). Shared Firebase project (`typefit-abf48`), subcollection path `users/{uid}/apps/pylens`.
- **js/stats.js** — Renders stats view and home screen progress bars. Reads from Storage, writes HTML.
- **js/syntax.js** — Regex-based Python syntax highlighter. Handles keywords, strings, f-strings, comments, numbers, builtins, decorators. Returns HTML with line numbers and optional `selectable` class for debug mode.
- **js/challenges/** — Challenge data files. Each defines a `window.TIER{N}_{MODE}` array (e.g., `window.TIER1_TRACE`). Tiers 1-4 have 25 challenges each. Tiers 5-8 are empty (Coming Soon).
- **css/style.css** — All styles. Uses CSS custom properties: `#000` bg, `#111` cards, `#333` borders, `#4a9eff` accent, Source Code Pro font, 2px solid borders, 8px radius.

### Module loading order (matters)

```
Firebase SDK → syntax.js → challenge data files → firebase.js → storage.js → engine.js → stats.js → app.js
```

Engine reads challenge data from `window.*` globals. App initializes on DOMContentLoaded.

### Two modes and their flows

**Trace:** See code → pick output from 4 shuffled choices → `Engine.checkTrace()` → result. Score: 100 or 0.

**Debug:** See code → click buggy line → pick bug description from 4 shuffled choices → `Engine.checkDebug()` → result. Score: 100 (both right), 50 (line right, choice wrong), 0.

### Cloud Sync (Firebase)

- Single Firestore document per user at `users/{uid}/apps/pylens`, saved with `{ merge: true }`
- `scheduleSave()` debounces 2 seconds; pending save flushed on page unload via `visibilitychange` + `beforeunload`
- `_suppressSync` flag prevents cloud-loaded data from triggering a save cycle
- Merge strategy: progress per-challenge `max(bestScore, attempts, lastAttempt)` / `min(bestTime)`, unlocks union, stats max, history union by `challengeId+date` (keep 50)
- `Infinity` values (from `bestTime`) converted to `null` before sending to Firestore

### Progression system

Tier 1 always unlocked. Tier N+1 unlocks when 10+ challenges completed in tier N (trace + debug combined). Unlocks checked via `Engine.checkUnlocks()` after every challenge result. Tiers 5-8 show as "Coming Soon" when they have no challenges.

### Challenge data format

Trace challenges need: `id`, `tier`, `tags`, `title`, `code`, `correctOutput`, `outputChoices` (4 items, one matching correctOutput), `explanation`, `conceptLink`.

Debug challenges need: `id`, `tier`, `tags`, `title`, `code`, `bugLine` (1-indexed), `bugDescription`, `bugChoices` (4 items), `correctBugChoice` (index), `fixedCode`, `explanation`, `conceptLink`.

### Naming conventions

- Challenge IDs: `t{tier}{mode_initial}-{slug}` (e.g., `t1t-int-division`, `t2d-shallow-copy`)
- View sections: `id="view-{name}"`
- Buttons: `id="btn-{action}"`
- Tags: lowercase with hyphens

## Adding New Challenges

To add challenges to an existing tier:

1. Open the appropriate file in `docs/js/challenges/` (e.g., `tier1-trace.js`)
2. Add a new object to the `window.TIER{N}_{MODE}` array following the challenge data format above
3. Ensure `id` is unique and follows naming convention
4. Test locally by starting a new session in that tier/mode
5. Verify scoring, explanations, and concept links work correctly

To create a new tier (currently 5-8 are empty):

1. Create new files `tier{N}-trace.js` and `tier{N}-debug.js` in `docs/js/challenges/`
2. Define `window.TIER{N}_TRACE = [...]` and `window.TIER{N}_DEBUG = [...]` arrays
3. Add script tags to `index.html` in the correct loading order
4. The tier will automatically unlock when tier N-1 has 10+ completions

## Deployment

Deployed via GitHub Pages from the `docs/` folder. To deploy:

```bash
git add docs/
git commit -m "Update deployment"
git push origin main
```

Changes go live automatically within ~1 minute.

## Commit Style

Short imperative subject, blank line, explanation of why. End with:
```
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

(Adjust model name as appropriate: Claude Sonnet 4.5, Claude Opus 4.6, etc.)
