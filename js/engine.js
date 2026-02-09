/**
 * Challenge engine for PyLens.
 * Handles challenge presentation, answer checking, and scoring.
 */
const Engine = (() => {
    const STREAK_MULTIPLIERS = [1, 1.5, 2, 2.5, 3];

    /**
     * Get all challenges for a given mode and tier.
     */
    function getChallenges(mode, tier) {
        if (mode === 'lens') return window.LENS_CHALLENGES || [];
        const key = `TIER${tier}_${mode.toUpperCase()}`;
        return window[key] || [];
    }

    /**
     * Get all challenge IDs for a mode and tier.
     */
    function getChallengeIds(mode, tier) {
        return getChallenges(mode, tier).map(c => c.id);
    }

    /**
     * Get a specific challenge by id from any pool.
     */
    function getChallenge(id) {
        const pools = [
            window.TIER1_TRACE, window.TIER1_DEBUG,
            window.TIER2_TRACE, window.TIER2_DEBUG,
            window.TIER3_TRACE, window.TIER3_DEBUG,
            window.TIER4_TRACE, window.TIER4_DEBUG,
            window.LENS_CHALLENGES
        ];
        for (const pool of pools) {
            if (!pool) continue;
            const found = pool.find(c => c.id === id);
            if (found) return found;
        }
        return null;
    }

    /**
     * Get the next uncompleted challenge in a mode/tier, or the first one if all completed.
     */
    function getNextChallenge(mode, tier) {
        const challenges = getChallenges(mode, tier);
        // Find first uncompleted
        for (const c of challenges) {
            if (!Storage.isCompleted(c.id)) return c;
        }
        // All completed — return first for replay
        return challenges[0] || null;
    }

    /**
     * Get challenge index within its pool.
     */
    function getChallengeIndex(challenge, mode, tier) {
        const challenges = getChallenges(mode, tier);
        return challenges.findIndex(c => c.id === challenge.id);
    }

    /**
     * Determine the effective mode for a challenge.
     * Lens challenges can be either trace or debug depending on isCorrect.
     */
    function getEffectiveMode(challenge) {
        if (challenge.mode === 'both' || challenge.isCorrect !== undefined) {
            return 'lens';
        }
        if (challenge.bugLine !== undefined && challenge.bugLine !== null) {
            return 'debug';
        }
        return 'trace';
    }

    /**
     * Check a trace answer.
     * Returns { correct, score, correctAnswer }
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
     * Returns { correct, partial, score, correctLine, correctChoice }
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
     * Check a lens classification.
     * Returns { classificationCorrect }
     */
    function checkLensClassification(challenge, userSaidCorrect) {
        return {
            classificationCorrect: userSaidCorrect === challenge.isCorrect
        };
    }

    /**
     * Check full lens answer (classification + answer).
     * Returns { correct, partial, score, ... }
     */
    function checkLens(challenge, userSaidCorrect, answer) {
        const classOk = userSaidCorrect === challenge.isCorrect;

        if (!classOk) {
            return {
                correct: false,
                partial: false,
                score: 0,
                classificationCorrect: false,
                details: challenge.isCorrect
                    ? { type: 'trace', correctAnswer: challenge.correctOutput }
                    : { type: 'debug', correctLine: challenge.bugLine, correctChoice: challenge.correctBugChoice }
            };
        }

        // Classification correct — now check the actual answer
        if (challenge.isCorrect) {
            const traceResult = checkTrace(challenge, answer);
            return {
                correct: traceResult.correct,
                partial: !traceResult.correct,
                score: traceResult.correct ? 100 : 25,
                classificationCorrect: true,
                details: { type: 'trace', ...traceResult }
            };
        } else {
            const debugResult = checkDebug(challenge, answer.line, answer.choiceIndex);
            return {
                correct: debugResult.correct,
                partial: debugResult.partial || (!debugResult.correct),
                score: debugResult.correct ? 100 : (debugResult.partial ? 50 : 25),
                classificationCorrect: true,
                details: { type: 'debug', ...debugResult }
            };
        }
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
     * Get available tiers for a mode.
     */
    function getAvailableTiers(mode) {
        const tiers = [
            { tier: 1, name: 'Foundations', description: 'Basic types, operations, and control flow', unlockKey: null },
            { tier: 2, name: 'Intermediate', description: 'Mutability, closures, comprehensions, and gotchas', unlockKey: 'tier2' },
            { tier: 3, name: 'Advanced', description: 'Exceptions, decorators, generators, and classes', unlockKey: 'tier3' },
            { tier: 4, name: 'Expert', description: 'Descriptors, metaclasses, async, and deep cuts', unlockKey: 'tier4' }
        ];

        return tiers.map(t => {
            const challenges = getChallenges(mode, t.tier);
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
        }).filter(t => t.available);
    }

    /**
     * Check and update unlock state based on current progress.
     * Returns array of newly unlocked keys.
     */
    function checkUnlocks() {
        const newUnlocks = [];

        // Tier 2 unlocks when 10+ tier 1 challenges completed (across trace+debug)
        if (!Storage.isUnlocked('tier2')) {
            const t1Trace = Storage.getCompletedCount(getChallengeIds('trace', 1));
            const t1Debug = Storage.getCompletedCount(getChallengeIds('debug', 1));
            if (t1Trace + t1Debug >= 10) {
                Storage.setUnlock('tier2', true);
                newUnlocks.push('tier2');
            }
        }

        // Tier 3 unlocks when 10+ tier 2 challenges completed
        if (!Storage.isUnlocked('tier3')) {
            const t2Trace = Storage.getCompletedCount(getChallengeIds('trace', 2));
            const t2Debug = Storage.getCompletedCount(getChallengeIds('debug', 2));
            if (t2Trace + t2Debug >= 10) {
                Storage.setUnlock('tier3', true);
                newUnlocks.push('tier3');
            }
        }

        // Tier 4 unlocks when 10+ tier 3 challenges completed
        if (!Storage.isUnlocked('tier4')) {
            const t3Trace = Storage.getCompletedCount(getChallengeIds('trace', 3));
            const t3Debug = Storage.getCompletedCount(getChallengeIds('debug', 3));
            if (t3Trace + t3Debug >= 10) {
                Storage.setUnlock('tier4', true);
                newUnlocks.push('tier4');
            }
        }

        // Lens unlocks when tier 1 is fully completed in both modes
        if (!Storage.isUnlocked('lens')) {
            const t1TraceIds = getChallengeIds('trace', 1);
            const t1DebugIds = getChallengeIds('debug', 1);
            const traceComplete = Storage.getCompletedCount(t1TraceIds) >= Math.min(10, t1TraceIds.length);
            const debugComplete = Storage.getCompletedCount(t1DebugIds) >= Math.min(10, t1DebugIds.length);
            if (traceComplete && debugComplete) {
                Storage.setUnlock('lens', true);
                newUnlocks.push('lens');
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
        checkLensClassification,
        checkLens,
        applyStreakBonus,
        getAvailableTiers,
        checkUnlocks
    };
})();
