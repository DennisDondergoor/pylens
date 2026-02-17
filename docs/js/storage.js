/**
 * Storage manager for PyLens.
 * Handles localStorage persistence for progress, stats, and history.
 */
const Storage = (() => {
    const KEYS = {
        progress: 'pylens_progress',
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
        } catch (e) {
            console.warn('localStorage write failed:', e);
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
        const prev = all[challengeId] || { bestScore: 0, attempts: 0, bestTime: null };
        all[challengeId] = {
            bestScore: Math.max(prev.bestScore, score),
            attempts: prev.attempts + 1,
            lastAttempt: Date.now(),
            bestTime: prev.bestTime === null ? timeMs : Math.min(prev.bestTime, timeMs)
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

    // === Stats ===

    function getStats() {
        return _get(KEYS.stats, {
            totalCompleted: 0
        });
    }

    function updateStats(tags, wasCorrect) {
        const stats = getStats();

        if (wasCorrect) {
            stats.totalCompleted++;
        }

        _set(KEYS.stats, stats);
        return stats;
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
        getStats,
        updateStats,
        getHistory,
        addToHistory,
        clearAll
    };
})();
