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
        document.getElementById('stat-best-streak').textContent = stats.bestStreak;

        // Average score from history
        let avgScore = 0;
        if (history.length > 0) {
            const sum = history.reduce((acc, h) => acc + (h.score || 0), 0);
            avgScore = Math.round(sum / history.length);
        }
        document.getElementById('stat-avg-score').textContent = avgScore;

        // Tag mastery
        renderTagMastery(stats.tagMastery);

        // Recent activity
        renderRecentActivity(history);
    }

    function renderTagMastery(tagMastery) {
        const grid = document.getElementById('tag-mastery-grid');
        const tags = Object.keys(tagMastery).sort();

        if (tags.length === 0) {
            grid.innerHTML = '<div class="empty-state">Complete some challenges to see your tag mastery.</div>';
            return;
        }

        grid.innerHTML = tags.map(tag => {
            const data = tagMastery[tag];
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            const color = pct >= 80 ? 'var(--accent-green)' : pct >= 50 ? 'var(--accent-orange)' : 'var(--accent-red)';

            return `<div class="tag-mastery-item">
                <div class="tag-mastery-name">${escapeHtml(tag)}</div>
                <div class="tag-mastery-bar">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${pct}%; background: ${color};"></div>
                    </div>
                    <span class="tag-mastery-pct">${pct}%</span>
                </div>
            </div>`;
        }).join('');
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
        const traceIds = [
            ...Engine.getChallengeIds('trace', 1),
            ...Engine.getChallengeIds('trace', 2),
            ...Engine.getChallengeIds('trace', 3),
            ...Engine.getChallengeIds('trace', 4)
        ];
        const traceCompleted = Storage.getCompletedCount(traceIds);
        updateProgressBar('trace-progress', 'trace-progress-label', traceCompleted, traceIds.length);

        // Debug progress
        const debugIds = [
            ...Engine.getChallengeIds('debug', 1),
            ...Engine.getChallengeIds('debug', 2),
            ...Engine.getChallengeIds('debug', 3),
            ...Engine.getChallengeIds('debug', 4)
        ];
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
