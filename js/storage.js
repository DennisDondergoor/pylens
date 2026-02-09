/**
 * Storage manager for PyLens.
 * Handles localStorage persistence for progress, unlocks, stats, and history.
 */
const Storage = (() => {
    const KEYS = {
        progress: 'pylens_progress',
        unlocks: 'pylens_unlocks',
        stats: 'pylens_stats',
        history: 'pylens_history'
    };

    const MAX_HISTORY = 50;

    function _get(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    }

    function _set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Storage full — silently fail
        }
    }

    // === Progress (per challenge) ===

    function getProgress() {
        return _get(KEYS.progress, {});
    }

    function getChallengeProgress(challengeId) {
        const all = getProgress();
        return all[challengeId] || null;
    }

    function saveChallengeResult(challengeId, score, timeMs) {
        const all = getProgress();
        const prev = all[challengeId] || { bestScore: 0, attempts: 0, bestTime: Infinity };
        all[challengeId] = {
            bestScore: Math.max(prev.bestScore, score),
            attempts: prev.attempts + 1,
            lastAttempt: Date.now(),
            bestTime: Math.min(prev.bestTime === Infinity ? timeMs : prev.bestTime, timeMs)
        };
        _set(KEYS.progress, all);
    }

    function getCompletedCount(challengeIds) {
        const all = getProgress();
        return challengeIds.filter(id => all[id] && all[id].bestScore > 0).length;
    }

    function isCompleted(challengeId) {
        const p = getChallengeProgress(challengeId);
        return p !== null && p.bestScore > 0;
    }

    // === Unlocks ===

    function getUnlocks() {
        return _get(KEYS.unlocks, {
            tier2: false,
            tier3: false,
            tier4: false,
            tier5: false,
            tier6: false,
            tier7: false,
            tier8: false
        });
    }

    function setUnlock(key, value) {
        const unlocks = getUnlocks();
        unlocks[key] = value;
        _set(KEYS.unlocks, unlocks);
    }

    function isUnlocked(key) {
        return getUnlocks()[key] === true;
    }

    // === Stats ===

    function getStats() {
        return _get(KEYS.stats, {
            totalCompleted: 0,
            currentStreak: 0,
            bestStreak: 0,
            tagMastery: {}
        });
    }

    function updateStats(tags, wasCorrect) {
        const stats = getStats();

        if (wasCorrect) {
            stats.currentStreak++;
            stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
        } else {
            stats.currentStreak = 0;
        }

        stats.totalCompleted++;

        for (const tag of tags) {
            if (!stats.tagMastery[tag]) {
                stats.tagMastery[tag] = { correct: 0, total: 0 };
            }
            stats.tagMastery[tag].total++;
            if (wasCorrect) {
                stats.tagMastery[tag].correct++;
            }
        }

        _set(KEYS.stats, stats);
        return stats;
    }

    function getCurrentStreak() {
        return getStats().currentStreak;
    }

    // === History ===

    function getHistory() {
        return _get(KEYS.history, []);
    }

    function addToHistory(entry) {
        const history = getHistory();
        history.unshift({
            ...entry,
            date: Date.now()
        });
        if (history.length > MAX_HISTORY) {
            history.length = MAX_HISTORY;
        }
        _set(KEYS.history, history);
    }

    // === Utilities ===

    function clearAll() {
        Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    }

    return {
        getProgress,
        getChallengeProgress,
        saveChallengeResult,
        getCompletedCount,
        isCompleted,
        getUnlocks,
        setUnlock,
        isUnlocked,
        getStats,
        updateStats,
        getCurrentStreak,
        getHistory,
        addToHistory,
        clearAll
    };
})();
