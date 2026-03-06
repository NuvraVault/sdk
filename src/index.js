/**
 * Nuvra Vault SDK
 * Financial infrastructure for autonomous AI agents.
 * https://nuvra.xyz
 */

const BASE_URL = 'https://nuvra.xyz/api/v1';

class NuvraClient {
    /**
     * @param {string} apiKey - Your bearer API key (nvr_...)
     */
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async _request(method, path, body) {
        const headers = { 'Content-Type': 'application/json' };
        if (this.apiKey) headers['Authorization'] = `Bearer ${this.apiKey}`;

        const res = await fetch(`${BASE_URL}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw Object.assign(new Error(data.error || 'Request failed'), { status: res.status, data });
        return data;
    }

    // ─── Auth ────────────────────────────────────────────────────────────────

    /**
     * Register a new agent identity.
     * @param {{ name: string, description?: string }} opts
     * @returns {{ agent_id: string, api_key: string }}
     */
    static async register({ name, description = '' } = {}) {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
        return data;
    }

    /**
     * Validate an API key without making an authenticated request.
     * @param {string} apiKey
     * @returns {{ valid: boolean, agent_id: string }}
     */
    static async validate(apiKey) {
        const res = await fetch(`${BASE_URL}/auth/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ api_key: apiKey }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Validation failed');
        return data;
    }

    // ─── Ledger ──────────────────────────────────────────────────────────────

    /**
     * Get current CRV balance.
     * @returns {{ balance: number, currency: string }}
     */
    async getBalance() {
        return this._request('GET', '/ledger/balance');
    }

    // ─── Transactions ────────────────────────────────────────────────────────

    /**
     * Send CRV to another agent.
     * @param {{ to: string, amount: number, memo?: string }} opts
     * @returns {{ transaction_id: string, status: string }}
     */
    async send({ to, amount, memo = '' } = {}) {
        return this._request('POST', '/transactions', { to, amount, memo });
    }

    /**
     * List transaction history.
     * @param {{ status?: string, limit?: number, offset?: number }} opts
     * @returns {{ transactions: Array, total: number }}
     */
    async listTransactions({ status = 'settled', limit = 50, offset = 0 } = {}) {
        return this._request('GET', `/transactions?status=${status}&limit=${limit}&offset=${offset}`);
    }

    /**
     * Get a single transaction by ID.
     * @param {string} txId
     * @returns {object}
     */
    async getTransaction(txId) {
        return this._request('GET', `/transactions/${txId}`);
    }

    // ─── Agents ──────────────────────────────────────────────────────────────

    /**
     * Get your own agent profile.
     * @returns {object}
     */
    async me() {
        return this._request('GET', '/agents/me');
    }

    /**
     * Update your agent profile.
     * @param {{ name?: string, description?: string, webhook_url?: string }} opts
     * @returns {object}
     */
    async updateMe(opts = {}) {
        return this._request('PATCH', '/agents/me', opts);
    }

    /**
     * Look up any agent's public profile by ID. No auth required.
     * @param {string} agentId
     * @returns {object}
     */
    static async lookupAgent(agentId) {
        const res = await fetch(`${BASE_URL}/agents/${agentId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Agent not found');
        return data;
    }
}

module.exports = { NuvraClient };
