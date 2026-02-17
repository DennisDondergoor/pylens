/**
 * Stats display for PyLens.
 * Renders progress data into the stats view.
 */
const Stats = (() => {

    function render() {
        const stats = Storage.getStats();
        const history = Storage.getHistory();

        // Overview cards
        document.getElementById('stat-total').textContent = stats.totalCompleted;

        // Total score from history
        const totalScore = history.reduce((acc, h) => acc + (h.score || 0), 0);
        document.getElementById('stat-total-score').textContent = totalScore;

        // Recent activity
        renderRecentActivity(history);
    }


    function renderRecentActivity(history) {
        const container = document.getElementById('recent-activity');

        if (history.length === 0) {
            container.innerHTML = '<div class="empty-state">No activity yet. Start a challenge!</div>';
            return;
        }

        const recent = history.slice(0, 15);
        container.innerHTML = recent.map(entry => {
            const scoreClass = entry.score >= 80 ? 'good' : entry.score >= 40 ? 'ok' : 'bad';
            const modeClass = entry.mode || 'trace';
            const title = entry.title || entry.challengeId || 'Challenge';

            return `<div class="activity-item">
                <span class="activity-mode ${modeClass}">${modeClass}</span>
                <span class="activity-title">${escapeHtml(title)}</span>
                <span class="activity-score ${scoreClass}">${entry.score}pts</span>
            </div>`;
        }).join('');
    }

    /**
     * Update home screen progress bars.
     */
    function renderHomeProgress() {
        // Trace progress: all trace challenges across tiers
        const traceIds = [];
        for (let t = 1; t <= 8; t++) traceIds.push(...Engine.getChallengeIds('trace', t));
        const traceCompleted = Storage.getCompletedCount(traceIds);
        updateProgressBar('trace-progress', 'trace-progress-label', traceCompleted, traceIds.length);

        // Debug progress
        const debugIds = [];
        for (let t = 1; t <= 8; t++) debugIds.push(...Engine.getChallengeIds('debug', t));
        const debugCompleted = Storage.getCompletedCount(debugIds);
        updateProgressBar('debug-progress', 'debug-progress-label', debugCompleted, debugIds.length);
    }

    function updateProgressBar(barId, labelId, completed, total) {
        const bar = document.getElementById(barId);
        const label = document.getElementById(labelId);
        const pct = total > 0 ? (completed / total) * 100 : 0;
        bar.style.width = pct + '%';
        label.textContent = `${completed} / ${total}`;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    return { render, renderHomeProgress };
})();
