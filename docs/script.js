document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-btn');
    const testApiBtn = document.getElementById('test-api-btn');
    const statusBadge = document.getElementById('status-badge');
    const healthStatus = document.getElementById('health-status');
    const healthUptime = document.getElementById('health-uptime');
    const healthEnv = document.getElementById('health-env');
    const apiOutput = document.getElementById('api-output');
    const API_BASE_URL = 'http://localhost:3000';

    async function fetchHealth() {
        statusBadge.innerText = 'Loading...';
        statusBadge.className = 'badge loading';

        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            const data = await response.json();

            if (data.status === 'UP') {
                statusBadge.innerText = 'Online';
                statusBadge.className = 'badge success';
                healthStatus.innerText = 'UP';
                healthStatus.style.color = '#4ade80';
            } else {
                statusBadge.innerText = 'Issue';
                statusBadge.className = 'badge error';
                healthStatus.innerText = data.status || 'DOWN';
                healthStatus.style.color = '#f87171';
            }

            healthUptime.innerText = formatUptime(data.uptime);
            healthEnv.innerText = data.environment || 'N/A';

        } catch (error) {
            console.error('Error fetching health:', error);
            statusBadge.innerText = 'Offline';
            statusBadge.className = 'badge error';
            healthStatus.innerText = 'Error';
            healthStatus.style.color = '#f87171';
            healthUptime.innerText = 'N/A';
            healthEnv.innerText = 'N/A';
        }
    }

    async function testApi() {
        apiOutput.innerText = 'Testing...';
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/status`);
            const data = await response.json();
            apiOutput.innerText = JSON.stringify(data, null, 2);
        } catch (error) {
            apiOutput.innerText = 'Error: ' + error.message;
        }
    }

    function formatUptime(seconds) {
        if (!seconds) return '0s';
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h}h ${m}m ${s}s`;
    }

    refreshBtn.addEventListener('click', fetchHealth);
    testApiBtn.addEventListener('click', testApi);

    // Initial fetch
    fetchHealth();
});
