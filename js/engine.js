/**
 * Challenge engine for PyLens.
 * Handles challenge presentation, answer checking, and scoring.
 */
const Engine = (() => {
    const STREAK_MULTIPLIERS = [1, 1.5, 2, 2.5, 3];

    const LEVELS = [
        { level: 1, name: 'Absolute Basics', description: 'Print, arithmetic, strings, booleans, type()', unlockKey: null },
        { level: 2, name: 'Collections', description: 'Lists, dicts, tuples, slicing, indexing, membership', unlockKey: 'level2' },
        { level: 3, name: 'Functions & Control Flow', description: 'Functions, arguments, return values, loops, range', unlockKey: 'level3' },
        { level: 4, name: 'Methods & Comprehensions', description: 'String/list/dict methods, comprehensions, sorting, unpacking', unlockKey: 'level4' },
        { level: 5, name: 'Scope & Mutability', description: 'Closures, LEGB, mutable defaults, aliasing, shallow copy', unlockKey: 'level5' },
        { level: 6, name: 'Object-Oriented Python', description: 'Classes, inheritance, super(), special methods', unlockKey: 'level6' },
        { level: 7, name: 'Iterators & Error Handling', description: 'Generators, yield, try/except/finally, decorators', unlockKey: 'level7' },
        { level: 8, name: 'Advanced Python', description: 'Metaclasses, descriptors, async, functools deep cuts', unlockKey: 'level8' }
    ];

    /**
     * Get all challenges for a given mode and level.
     */
    function getChallenges(mode, level) {
        const key = `LEVEL${level}_${mode.toUpperCase()}`;
        return window[key] || [];
    }

    /**
     * Get all challenge IDs for a mode and level.
     */
    function getChallengeIds(mode, level) {
        return getChallenges(mode, level).map(c => c.id);
    }

    /**
     * Get a specific challenge by id from any pool.
     */
    function getChallenge(id) {
        for (let t = 1; t <= 8; t++) {
            for (const mode of ['TRACE', 'DEBUG']) {
                const pool = window[`LEVEL${t}_${mode}`];
                if (!pool) continue;
                const found = pool.find(c => c.id === id);
                if (found) return found;
            }
        }
        return null;
    }

    /**
     * Get the next uncompleted challenge in a mode/level, or the first one if all completed.
     */
    function getNextChallenge(mode, level) {
        const challenges = getChallenges(mode, level);
        for (const c of challenges) {
            if (!Storage.isCompleted(c.id)) return c;
        }
        return challenges[0] || null;
    }

    /**
     * Get challenge index within its pool.
     */
    function getChallengeIndex(challenge, mode, level) {
        const challenges = getChallenges(mode, level);
        return challenges.findIndex(c => c.id === challenge.id);
    }

    /**
     * Determine the effective mode for a challenge.
     */
    function getEffectiveMode(challenge) {
        if (challenge.bugLine !== undefined && challenge.bugLine !== null) {
            return 'debug';
        }
        return 'trace';
    }

    /**
     * Check a trace answer.
     */
    function checkTrace(challenge, selectedChoice) {
        const correct = selectedChoice === challenge.correctOutput;
        return {
            correct,
            score: correct ? 100 : 0,
            correctAnswer: challenge.correctOutput
        };
    }

    /**
     * Check a debug answer.
     */
    function checkDebug(challenge, selectedLine, selectedChoiceIndex) {
        const lineCorrect = selectedLine === challenge.bugLine;
        const choiceCorrect = selectedChoiceIndex === challenge.correctBugChoice;

        let score = 0;
        let correct = false;
        let partial = false;

        if (lineCorrect && choiceCorrect) {
            score = 100;
            correct = true;
        } else if (lineCorrect) {
            score = 50;
            partial = true;
        }

        return {
            correct,
            partial,
            score,
            correctLine: challenge.bugLine,
            correctChoice: challenge.correctBugChoice,
            correctDescription: challenge.bugChoices[challenge.correctBugChoice]
        };
    }

    /**
     * Apply streak bonus to a score.
     */
    function applyStreakBonus(baseScore, streak) {
        const idx = Math.min(streak, STREAK_MULTIPLIERS.length - 1);
        const multiplier = STREAK_MULTIPLIERS[idx];
        return Math.round(baseScore * multiplier);
    }

    /**
     * Get available levels for a mode.
     */
    function getAvailableLevels(mode) {
        return LEVELS.map(t => {
            const challenges = getChallenges(mode, t.level);
            const ids = challenges.map(c => c.id);
            const completed = Storage.getCompletedCount(ids);
            const unlocked = t.unlockKey === null || Storage.isUnlocked(t.unlockKey);

            return {
                ...t,
                total: challenges.length,
                completed,
                unlocked,
                available: challenges.length > 0
            };
        });
    }

    /**
     * Check and update unlock state based on current progress.
     * Each level unlocks when 10+ challenges completed in the previous level.
     */
    function checkUnlocks() {
        const newUnlocks = [];

        // Levels 2-8: unlock when 10+ challenges completed in previous level
        for (let t = 2; t <= 8; t++) {
            const key = `level${t}`;
            if (!Storage.isUnlocked(key)) {
                const prevTrace = Storage.getCompletedCount(getChallengeIds('trace', t - 1));
                const prevDebug = Storage.getCompletedCount(getChallengeIds('debug', t - 1));
                if (prevTrace + prevDebug >= 10) {
                    Storage.setUnlock(key, true);
                    newUnlocks.push(key);
                }
            }
        }

        return newUnlocks;
    }

    return {
        getChallenges,
        getChallengeIds,
        getChallenge,
        getNextChallenge,
        getChallengeIndex,
        getEffectiveMode,
        checkTrace,
        checkDebug,
        applyStreakBonus,
        getAvailableLevels,
        checkUnlocks
    };
})();
