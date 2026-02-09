/**
 * Main application controller for PyLens.
 * Handles view routing, navigation, and user interactions.
 */
const App = (() => {
    // State
    let currentMode = null;      // 'trace' | 'debug'
    let currentLevel = null;     // 1-8
    let currentChallenge = null; // challenge object
    let challengeStartTime = null;
    let selectedLine = null;     // for debug mode

    // View references
    const views = {};
    const VIEWS = ['home', 'levels', 'challenge', 'result', 'stats'];

    function init() {
        // Cache view elements
        VIEWS.forEach(v => views[v] = document.getElementById(`view-${v}`));

        // Bind navigation
        document.getElementById('btn-back').addEventListener('click', handleBack);
        document.getElementById('btn-stats').addEventListener('click', () => showView('stats'));
        document.getElementById('btn-stats-home').addEventListener('click', () => showView('home'));
        document.getElementById('btn-clear-progress').addEventListener('click', () => {
            document.getElementById('modal-clear').classList.remove('hidden');
        });
        document.getElementById('btn-clear-cancel').addEventListener('click', () => {
            document.getElementById('modal-clear').classList.add('hidden');
        });
        document.getElementById('btn-clear-confirm').addEventListener('click', () => {
            Storage.clearAll();
            document.getElementById('modal-clear').classList.add('hidden');
            Stats.render();
            Stats.renderHomeProgress();
            showView('home');
        });
        document.getElementById('btn-next').addEventListener('click', handleNext);
        document.getElementById('btn-back-to-levels').addEventListener('click', () => {
            showLevels(currentMode);
        });

        // Mode card clicks
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.dataset.mode;
                currentMode = mode;
                showLevels(mode);
            });
        });

        // Code line clicks (for debug mode)
        document.getElementById('code-display').addEventListener('click', (e) => {
            const line = e.target.closest('.code-line.selectable');
            if (!line) return;
            handleLineSelect(parseInt(line.dataset.line));
        });

        // Escape key = back/dismiss
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Dismiss modal first if open
                const modal = document.getElementById('modal-clear');
                if (!modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                    return;
                }
                handleBack();
            }
        });

        // Initial render
        Stats.renderHomeProgress();
        showView('home');
    }

    // === View Management ===

    function showView(name) {
        VIEWS.forEach(v => views[v].classList.remove('active'));
        views[name].classList.add('active');

        const backBtn = document.getElementById('btn-back');
        const streakDisplay = document.getElementById('streak-display');

        if (name === 'home') {
            backBtn.style.display = 'none';
            streakDisplay.style.display = 'none';
            Stats.renderHomeProgress();
        } else if (name === 'stats') {
            backBtn.style.display = 'flex';
            streakDisplay.style.display = 'none';
            Stats.render();
        } else if (name === 'challenge') {
            backBtn.style.display = 'flex';
            const streak = Storage.getCurrentStreak();
            if (streak > 0) {
                streakDisplay.style.display = 'flex';
                document.getElementById('streak-count').textContent = streak;
            } else {
                streakDisplay.style.display = 'none';
            }
        } else {
            backBtn.style.display = 'flex';
        }
    }

    function handleBack() {
        if (views.result.classList.contains('active')) {
            showLevels(currentMode);
        } else if (views.challenge.classList.contains('active')) {
            showLevels(currentMode);
        } else if (views.levels.classList.contains('active')) {
            showView('home');
        } else if (views.stats.classList.contains('active')) {
            showView('home');
        } else {
            showView('home');
        }
    }

    // === Level Selection ===

    function showLevels(mode) {
        currentMode = mode;
        const title = mode === 'trace' ? 'Trace — Select Level' : 'Debug — Select Level';
        document.getElementById('levels-title').textContent = title;

        const levels = Engine.getAvailableLevels(mode);
        const grid = document.getElementById('level-grid');

        grid.innerHTML = levels.map(t => {
            const pct = t.total > 0 ? Math.round((t.completed / t.total) * 100) : 0;
            const comingSoon = !t.available;
            const locked = !t.unlocked || comingSoon;
            const levelColor = `var(--level${t.level})`;

            let badge = '';
            if (comingSoon) {
                badge = '<span class="level-lock-icon coming-soon-badge">Coming Soon</span>';
            } else if (locked) {
                badge = '<span class="level-lock-icon"><svg width="20" height="20" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>';
            }

            return `<div class="level-card ${locked ? 'locked' : ''} ${comingSoon ? 'coming-soon' : ''}" data-level="${t.level}">
                <div class="level-badge">${t.level}</div>
                <div class="level-info">
                    <h3>${t.name}</h3>
                    <p>${t.description}</p>
                    ${comingSoon ? '' : `<div class="level-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${pct}%; background: ${levelColor};"></div>
                        </div>
                        <span class="progress-label">${t.completed} / ${t.total}</span>
                    </div>`}
                </div>
                ${badge}
            </div>`;
        }).join('');

        // Bind level clicks
        grid.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('locked')) return;
                currentLevel = parseInt(card.dataset.level);
                startNextChallenge();
            });
        });

        showView('levels');
    }

    // === Challenge ===

    function startNextChallenge() {
        const challenge = Engine.getNextChallenge(currentMode, currentLevel);
        if (!challenge) return;
        presentChallenge(challenge);
    }

    function presentChallenge(challenge) {
        currentChallenge = challenge;
        challengeStartTime = Date.now();
        selectedLine = null;

        // Header
        const levelNum = challenge.level || currentLevel;
        const tag = document.getElementById('challenge-tag');
        tag.textContent = `Level ${levelNum} — ${currentMode === 'trace' ? 'Trace' : 'Debug'}`;
        tag.className = 'challenge-tag';
        if (levelNum > 1) tag.classList.add(`level-${levelNum}`);

        // Counter
        const challenges = Engine.getChallenges(currentMode, currentLevel);
        const idx = Engine.getChallengeIndex(challenge, currentMode, currentLevel);
        document.getElementById('challenge-counter').textContent = `${idx + 1} / ${challenges.length}`;

        // Title
        document.getElementById('challenge-title').textContent = challenge.title;

        // Code display
        const isDebugMode = currentMode === 'debug';
        const codeHtml = PySyntax.highlight(challenge.code, { selectable: isDebugMode });
        document.getElementById('code-display').innerHTML = codeHtml;

        // Hide all answer sections
        document.getElementById('trace-answer').style.display = 'none';
        document.getElementById('debug-answer').style.display = 'none';

        // Show appropriate answer section
        if (currentMode === 'trace') {
            showTraceChoices(challenge);
        } else if (currentMode === 'debug') {
            // Debug: first select a line, then show choices
            document.getElementById('debug-answer').style.display = 'block';
            document.getElementById('debug-choices').innerHTML =
                '<p style="color: var(--text-muted); font-size: 0.85rem;">Click on the line that contains the bug.</p>';
        }

        showView('challenge');
    }

    function showTraceChoices(challenge) {
        const container = document.getElementById('trace-choices');
        const shuffled = shuffleArray(challenge.outputChoices);
        container.innerHTML = shuffled.map((choice, i) => {
            return `<button class="choice-btn trace-choice" data-index="${i}" data-value="${escapeAttr(choice)}">${escapeHtml(choice)}</button>`;
        }).join('');

        container.querySelectorAll('.trace-choice').forEach(btn => {
            btn.addEventListener('click', () => handleTraceAnswer(btn.dataset.value));
        });

        document.getElementById('trace-answer').style.display = 'block';
    }

    function showDebugChoices(challenge) {
        const container = document.getElementById('debug-choices');
        // Shuffle choices but track original indices
        const indexed = challenge.bugChoices.map((choice, i) => ({ choice, originalIndex: i }));
        const shuffled = shuffleArray(indexed);
        container.innerHTML = shuffled.map((item, i) => {
            return `<button class="choice-btn debug-choice" data-index="${item.originalIndex}">${escapeHtml(item.choice)}</button>`;
        }).join('');

        container.querySelectorAll('.debug-choice').forEach(btn => {
            btn.addEventListener('click', () => handleDebugAnswer(parseInt(btn.dataset.index)));
        });
    }

    // === Answer Handlers ===

    function handleTraceAnswer(selectedOutput) {
        const result = Engine.checkTrace(currentChallenge, selectedOutput);
        const timeMs = Date.now() - challengeStartTime;

        // Highlight correct/incorrect choices
        document.querySelectorAll('.trace-choice').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.value === currentChallenge.correctOutput) {
                btn.classList.add('correct');
            } else if (btn.dataset.value === selectedOutput && !result.correct) {
                btn.classList.add('incorrect');
            }
        });

        setTimeout(() => showResult(result, timeMs), 600);
    }

    function handleLineSelect(lineNum) {
        if (!currentChallenge) return;

        selectedLine = lineNum;

        // Update visual selection
        document.querySelectorAll('.code-line').forEach(el => {
            el.classList.remove('selected');
            if (parseInt(el.dataset.line) === lineNum) {
                el.classList.add('selected');
            }
        });

        // Show bug choices
        showDebugChoices(currentChallenge);
    }

    function handleDebugAnswer(choiceIndex) {
        if (selectedLine === null) return;

        const result = Engine.checkDebug(currentChallenge, selectedLine, choiceIndex);
        const timeMs = Date.now() - challengeStartTime;

        // Highlight correct/incorrect choices
        document.querySelectorAll('.debug-choice').forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.dataset.index) === currentChallenge.correctBugChoice) {
                btn.classList.add('correct');
            } else if (parseInt(btn.dataset.index) === choiceIndex && !result.correct) {
                btn.classList.add('incorrect');
            }
        });

        // Highlight correct line
        document.querySelectorAll('.code-line').forEach(el => {
            if (parseInt(el.dataset.line) === currentChallenge.bugLine) {
                el.classList.add('selected');
            }
        });

        setTimeout(() => showResult(result, timeMs), 600);
    }

    // === Results ===

    function showResult(result, timeMs) {
        const wasCorrect = result.correct;
        const wasPartial = result.partial;

        // Update stats
        const stats = Storage.updateStats(currentChallenge.tags, wasCorrect);
        const streak = wasCorrect ? stats.currentStreak : 0;

        // Calculate final score with streak bonus
        const finalScore = wasCorrect ? Engine.applyStreakBonus(result.score, streak - 1) : result.score;

        // Save progress
        Storage.saveChallengeResult(currentChallenge.id, finalScore, timeMs);

        // Save to history
        Storage.addToHistory({
            challengeId: currentChallenge.id,
            title: currentChallenge.title,
            mode: currentMode,
            score: finalScore,
            time: timeMs
        });

        // Check for new unlocks
        Engine.checkUnlocks();

        // Banner
        const banner = document.getElementById('result-banner');
        banner.className = 'result-banner';
        const icon = document.getElementById('result-icon');
        const text = document.getElementById('result-text');

        if (wasCorrect) {
            banner.classList.add('correct');
            icon.textContent = '\u2713';
            text.textContent = 'Correct!';
        } else if (wasPartial) {
            banner.classList.add('partial');
            icon.textContent = '\u2248';
            text.textContent = 'Partially Correct';
        } else {
            banner.classList.add('incorrect');
            icon.textContent = '\u2717';
            text.textContent = 'Incorrect';
        }

        // Score
        document.getElementById('result-score').textContent = finalScore;

        // Streak
        const streakEl = document.getElementById('result-streak');
        if (wasCorrect && streak > 1) {
            streakEl.style.display = 'flex';
            document.getElementById('result-streak-count').textContent = streak;
        } else {
            streakEl.style.display = 'none';
        }

        // Correct answer display
        const correctBox = document.getElementById('correct-answer-box');
        const correctDisplay = document.getElementById('correct-answer-display');
        if (!wasCorrect) {
            correctBox.style.display = 'block';
            if (currentMode === 'trace') {
                correctDisplay.textContent = `Output: ${currentChallenge.correctOutput}`;
            } else {
                const bugDesc = currentChallenge.bugChoices[currentChallenge.correctBugChoice];
                correctDisplay.textContent = `Line ${currentChallenge.bugLine}: ${bugDesc}`;
            }
        } else {
            correctBox.style.display = 'none';
        }

        // Explanation
        document.getElementById('explanation-text').textContent = currentChallenge.explanation;

        // Concept link
        const link = document.getElementById('concept-link');
        if (currentChallenge.conceptLink) {
            link.href = currentChallenge.conceptLink;
            link.style.display = 'inline-block';
        } else {
            link.style.display = 'none';
        }

        showView('result');
    }

    function handleNext() {
        const challenges = Engine.getChallenges(currentMode, currentLevel);
        const currentIdx = Engine.getChallengeIndex(currentChallenge, currentMode, currentLevel);

        if (currentIdx < challenges.length - 1) {
            // Go to next challenge in sequence
            presentChallenge(challenges[currentIdx + 1]);
        } else {
            // End of level/mode — go back
            showLevels(currentMode);
        }
    }

    // === Utilities ===

    function shuffleArray(arr) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function escapeAttr(text) {
        return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { init };
})();
