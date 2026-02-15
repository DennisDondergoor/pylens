/**
 * Main application controller for PyLens.
 * Handles view routing, navigation, and user interactions.
 */
const App = (() => {
    // State
    let currentMode = null;      // 'trace' | 'debug'
    let currentTier = null;      // 1-8
    let currentChallenge = null; // challenge object
    let challengeStartTime = null;
    let selectedLine = null;     // for debug mode
    let firebaseSync = null;
    let _suppressSync = false;

    // View references
    const views = {};
    const VIEWS = ['home', 'tiers', 'challenge', 'result', 'stats'];

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
        document.getElementById('btn-clear-confirm').addEventListener('click', async () => {
            if (firebaseSync && firebaseSync.syncTimeout) {
                clearTimeout(firebaseSync.syncTimeout);
                firebaseSync.syncTimeout = null;
                firebaseSync._pendingGetData = null;
            }
            Storage.clearAll();
            if (firebaseSync && firebaseSync.isSignedIn()) {
                await firebaseSync.deleteAllData();
            }
            document.getElementById('modal-clear').classList.add('hidden');
            Stats.render();
            Stats.renderHomeProgress();
            showView('home');
        });
        document.getElementById('btn-next').addEventListener('click', handleNext);
        document.getElementById('btn-back-to-tiers').addEventListener('click', () => {
            showTiers(currentMode);
        });
        document.getElementById('btn-prev-challenge').addEventListener('click', handlePrevChallenge);
        document.getElementById('btn-next-challenge').addEventListener('click', handleNextChallengeNav);

        // Mode card clicks
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.dataset.mode;
                currentMode = mode;
                showTiers(mode);
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

        // Auth button
        document.getElementById('btn-auth').addEventListener('click', () => {
            if (firebaseSync && firebaseSync.isSignedIn()) {
                firebaseSync.signOut();
            } else if (firebaseSync) {
                firebaseSync.signIn();
            }
        });

        // Flush pending sync on page unload
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden' && firebaseSync) {
                firebaseSync.flushPendingSync();
            }
        });
        window.addEventListener('beforeunload', () => {
            if (firebaseSync) firebaseSync.flushPendingSync();
        });

        initFirebase();

        // Initial render
        Stats.renderHomeProgress();
        showView('home');
    }

    // === View Management ===

    function showView(name) {
        VIEWS.forEach(v => views[v].classList.remove('active'));
        views[name].classList.add('active');

        const backBtn = document.getElementById('btn-back');

        if (name === 'home') {
            backBtn.style.display = 'none';
            Stats.renderHomeProgress();
        } else if (name === 'stats') {
            backBtn.style.display = 'flex';
            Stats.render();
        } else {
            backBtn.style.display = 'flex';
        }
    }

    function handleBack() {
        if (views.result.classList.contains('active')) {
            showTiers(currentMode);
        } else if (views.challenge.classList.contains('active')) {
            showTiers(currentMode);
        } else if (views.tiers.classList.contains('active')) {
            showView('home');
        } else if (views.stats.classList.contains('active')) {
            showView('home');
        } else {
            showView('home');
        }
    }

    // === Tier Selection ===

    function showTiers(mode) {
        currentMode = mode;
        const title = mode === 'trace' ? 'Trace — Select Level' : 'Debug — Select Level';
        document.getElementById('tiers-title').textContent = title;

        const tiers = Engine.getAvailableTiers(mode);
        const grid = document.getElementById('tier-grid');

        grid.innerHTML = tiers.map(t => {
            const pct = t.total > 0 ? Math.round((t.completed / t.total) * 100) : 0;
            const comingSoon = !t.available;

            let badge = '';
            if (comingSoon) {
                badge = '<span class="tier-lock-icon coming-soon-badge">Coming Soon</span>';
            }

            return `<div class="tier-card ${comingSoon ? 'coming-soon' : ''}" data-tier="${t.tier}">
                <div class="tier-badge">${t.tier}</div>
                <div class="tier-info">
                    <h3>${t.name}</h3>
                    <p>${t.description}</p>
                    ${comingSoon ? '' : `<div class="tier-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${pct}%;"></div>
                        </div>
                        <span class="progress-label">${t.completed} / ${t.total}</span>
                    </div>`}
                </div>
                ${badge}
            </div>`;
        }).join('');

        // Bind tier clicks
        grid.querySelectorAll('.tier-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('coming-soon')) return;
                currentTier = parseInt(card.dataset.tier);
                startNextChallenge();
            });
        });

        showView('tiers');
    }

    // === Challenge ===

    function startNextChallenge() {
        const challenge = Engine.getNextChallenge(currentMode, currentTier);
        if (!challenge) return;
        presentChallenge(challenge);
    }

    function presentChallenge(challenge) {
        currentChallenge = challenge;
        challengeStartTime = Date.now();
        selectedLine = null;

        // Check if challenge is already completed
        const isCompleted = Storage.isCompleted(challenge.id);

        // Header
        const tierNum = challenge.tier || currentTier;
        const tag = document.getElementById('challenge-tag');
        const modeText = currentMode === 'trace' ? 'Trace' : 'Debug';
        tag.textContent = isCompleted ? `✓ Level ${tierNum} — ${modeText}` : `Level ${tierNum} — ${modeText}`;
        tag.className = 'challenge-tag';
        if (tierNum > 1) tag.classList.add(`tier-${tierNum}`);
        if (isCompleted) tag.classList.add('completed');

        // Counter
        const challenges = Engine.getChallenges(currentMode, currentTier);
        const idx = Engine.getChallengeIndex(challenge, currentMode, currentTier);
        document.getElementById('challenge-counter').textContent = `${idx + 1} / ${challenges.length}`;

        // Title
        document.getElementById('challenge-title').textContent = challenge.title;

        // Code display
        const isDebugMode = currentMode === 'debug';
        const codeHtml = PySyntax.highlight(challenge.code, { selectable: isDebugMode && !isCompleted });
        document.getElementById('code-display').innerHTML = codeHtml;

        // Hide all answer sections initially
        document.getElementById('trace-answer').style.display = 'none';
        document.getElementById('debug-answer').style.display = 'none';

        // Show appropriate answer section
        if (isCompleted) {
            showCompletedState(challenge);
        } else if (currentMode === 'trace') {
            showTraceChoices(challenge);
        } else if (currentMode === 'debug') {
            // Debug: first select a line, then show choices
            document.getElementById('debug-answer').style.display = 'block';
            document.getElementById('debug-choices').innerHTML =
                '<p style="color: var(--text-color); font-size: 0.85rem;">Click on the line that contains the bug.</p>';
        }

        // Update navigation arrows
        updateNavigationButtons();

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

    function showCompletedState(challenge) {
        // Show the challenge in review mode with correct answer highlighted
        if (currentMode === 'trace') {
            // Show all choices with correct one highlighted
            const container = document.getElementById('trace-choices');
            container.innerHTML = challenge.outputChoices.map((choice, i) => {
                const isCorrect = choice === challenge.correctOutput;
                return `<button class="choice-btn trace-choice ${isCorrect ? 'correct' : ''}" disabled>${escapeHtml(choice)}</button>`;
            }).join('');
            document.getElementById('trace-answer').style.display = 'block';
        } else if (currentMode === 'debug') {
            // Highlight the correct line
            document.querySelectorAll('.code-line').forEach(el => {
                if (parseInt(el.dataset.line) === challenge.bugLine) {
                    el.classList.add('selected');
                }
            });

            // Show all bug choices with correct one highlighted
            const container = document.getElementById('debug-choices');
            container.innerHTML = challenge.bugChoices.map((choice, i) => {
                const isCorrect = i === challenge.correctBugChoice;
                return `<button class="choice-btn debug-choice ${isCorrect ? 'correct' : ''}" disabled>${escapeHtml(choice)}</button>`;
            }).join('');
            document.getElementById('debug-answer').style.display = 'block';
        }

        // Show explanation (reuse the result view explanation HTML)
        showCompletedExplanation(challenge);
    }

    function showCompletedExplanation(challenge) {
        // Create explanation section below the answer choices
        const answerSection = currentMode === 'trace'
            ? document.getElementById('trace-answer')
            : document.getElementById('debug-answer');

        const explanationHtml = `
            <div class="completed-explanation">
                <div class="explanation-box">
                    <h4>Explanation</h4>
                    <p>${escapeHtml(challenge.explanation)}</p>
                </div>
                ${challenge.conceptLink ? `
                    <div class="deepdive-card">
                        <div class="deepdive-header">
                            <span class="deepdive-icon">📖</span>
                            <span class="deepdive-label">Deep Dive</span>
                        </div>
                        <div class="deepdive-tags">
                            ${(challenge.tags || []).map(tag => `<span class="deepdive-tag">${tag}</span>`).join('')}
                        </div>
                        <a class="deepdive-link" href="${challenge.conceptLink}" target="_blank" rel="noopener">Read the Python docs →</a>
                    </div>
                ` : ''}
            </div>
        `;

        answerSection.insertAdjacentHTML('beforeend', explanationHtml);
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
        Storage.updateStats(currentChallenge.tags, wasCorrect);

        const finalScore = result.score;

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

        // Sync to cloud
        syncToCloud();

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

        // Deep dive card
        const deepdiveCard = document.getElementById('deepdive-card');
        if (currentChallenge.conceptLink) {
            document.getElementById('concept-link').href = currentChallenge.conceptLink;
            const tagsContainer = document.getElementById('deepdive-tags');
            tagsContainer.innerHTML = (currentChallenge.tags || [])
                .map(tag => `<span class="deepdive-tag">${tag}</span>`)
                .join('');
            deepdiveCard.style.display = 'block';
        } else {
            deepdiveCard.style.display = 'none';
        }

        showView('result');
    }

    function handleNext() {
        const challenges = Engine.getChallenges(currentMode, currentTier);
        const currentIdx = Engine.getChallengeIndex(currentChallenge, currentMode, currentTier);

        if (currentIdx < challenges.length - 1) {
            // Go to next challenge in sequence
            presentChallenge(challenges[currentIdx + 1]);
        } else {
            // End of tier/mode — go back
            showTiers(currentMode);
        }
    }

    function handlePrevChallenge() {
        const challenges = Engine.getChallenges(currentMode, currentTier);
        const currentIdx = Engine.getChallengeIndex(currentChallenge, currentMode, currentTier);

        if (currentIdx > 0) {
            presentChallenge(challenges[currentIdx - 1]);
        }
    }

    function handleNextChallengeNav() {
        const challenges = Engine.getChallenges(currentMode, currentTier);
        const currentIdx = Engine.getChallengeIndex(currentChallenge, currentMode, currentTier);

        if (currentIdx < challenges.length - 1) {
            presentChallenge(challenges[currentIdx + 1]);
        }
    }

    function updateNavigationButtons() {
        const challenges = Engine.getChallenges(currentMode, currentTier);
        const currentIdx = Engine.getChallengeIndex(currentChallenge, currentMode, currentTier);

        const prevBtn = document.getElementById('btn-prev-challenge');
        const nextBtn = document.getElementById('btn-next-challenge');

        // Find the furthest challenge the user can access
        // (first uncompleted challenge, or last challenge if all completed)
        let furthestIdx = challenges.length - 1;
        for (let i = 0; i < challenges.length; i++) {
            if (!Storage.isCompleted(challenges[i].id)) {
                furthestIdx = i;
                break;
            }
        }

        // Previous: Show if not at the start (can always go back)
        prevBtn.style.display = currentIdx > 0 ? 'flex' : 'none';

        // Next: Show if not past the furthest unlocked challenge
        nextBtn.style.display = currentIdx < furthestIdx ? 'flex' : 'none';
    }

    // === Firebase ===

    function initFirebase() {
        firebaseSync = new FirebaseSync();
        firebaseSync.onSyncResult = (ok) => {
            const statusEl = document.getElementById('sync-status');
            if (!ok) {
                statusEl.textContent = 'Sync failed';
                setTimeout(() => { statusEl.textContent = ''; }, 3000);
            }
        };
        firebaseSync.onAuthChange(async (user) => {
            const btn = document.getElementById('btn-auth');
            const statusEl = document.getElementById('sync-status');
            if (user) {
                btn.textContent = 'Sign out';
                btn.title = 'Sign out';
                statusEl.textContent = `Signed in as ${firebaseSync.getUserName()}`;
                await loadFromCloud();
                Stats.renderHomeProgress();
                if (views.stats && views.stats.classList.contains('active')) {
                    Stats.render();
                }
            } else {
                btn.textContent = 'Sign in';
                btn.title = 'Sign in';
                statusEl.textContent = '';
            }
        });
        firebaseSync.init();
    }

    function getAllData() {
        const progress = Storage.getProgress();
        // Sanitize Infinity values in progress
        for (const id in progress) {
            if (progress[id].bestTime === Infinity || !isFinite(progress[id].bestTime)) {
                progress[id].bestTime = null;
            }
        }
        return {
            progress,
            stats: Storage.getStats(),
            history: Storage.getHistory()
        };
    }

    function syncToCloud() {
        if (_suppressSync || !firebaseSync || !firebaseSync.isSignedIn()) return;
        firebaseSync.scheduleSave(() => getAllData());
    }

    async function loadFromCloud() {
        if (!firebaseSync || !firebaseSync.isSignedIn()) return;
        const cloud = await firebaseSync.loadFromCloud();
        if (!cloud) return;

        _suppressSync = true;
        try {
            // Merge progress: per-challenge max(bestScore), max(attempts), max(lastAttempt), min(bestTime)
            if (cloud.progress) {
                const local = Storage.getProgress();
                for (const id in cloud.progress) {
                    const c = cloud.progress[id];
                    const l = local[id] || { bestScore: 0, attempts: 0, lastAttempt: 0, bestTime: null };
                    const localBest = (l.bestTime === null || l.bestTime === Infinity) ? Infinity : l.bestTime;
                    const cloudBest = (c.bestTime === null || c.bestTime === undefined) ? Infinity : c.bestTime;
                    local[id] = {
                        bestScore: Math.max(l.bestScore || 0, c.bestScore || 0),
                        attempts: Math.max(l.attempts || 0, c.attempts || 0),
                        lastAttempt: Math.max(l.lastAttempt || 0, c.lastAttempt || 0),
                        bestTime: Math.min(localBest, cloudBest)
                    };
                    if (local[id].bestTime === Infinity) local[id].bestTime = null;
                }
                localStorage.setItem('pylens_progress', JSON.stringify(local));
            }

            // Merge stats: max of scalar fields, tag mastery max(correct, total) per tag
            if (cloud.stats) {
                const local = Storage.getStats();
                local.totalCompleted = Math.max(local.totalCompleted || 0, cloud.stats.totalCompleted || 0);
                if (cloud.stats.tagMastery) {
                    if (!local.tagMastery) local.tagMastery = {};
                    for (const tag in cloud.stats.tagMastery) {
                        const ct = cloud.stats.tagMastery[tag];
                        const lt = local.tagMastery[tag] || { correct: 0, total: 0 };
                        local.tagMastery[tag] = {
                            correct: Math.max(lt.correct || 0, ct.correct || 0),
                            total: Math.max(lt.total || 0, ct.total || 0)
                        };
                    }
                }
                localStorage.setItem('pylens_stats', JSON.stringify(local));
            }

            // Merge history: union by challengeId+date, sort newest first, keep 50
            if (cloud.history) {
                const local = Storage.getHistory();
                const seen = new Set();
                const all = [];
                for (const entry of [...local, ...cloud.history]) {
                    const key = `${entry.challengeId}|${entry.date}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        all.push(entry);
                    }
                }
                all.sort((a, b) => (b.date || 0) - (a.date || 0));
                if (all.length > 50) all.length = 50;
                localStorage.setItem('pylens_history', JSON.stringify(all));
            }
        } finally {
            _suppressSync = false;
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
