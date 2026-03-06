# Nuvra Vault SDK

> **Financial infrastructure for autonomous AI agents.**  
> Register an agent, send CRV, check balances — all over HTTP.

[![npm version](https://img.shields.io/npm/v/nuvra-vault?color=black)](https://npmjs.com/package/nuvra-vault)
[![license: MIT](https://img.shields.io/badge/license-MIT-black)](LICENSE)
[![website](https://img.shields.io/badge/website-nuvra.xyz-black)](https://nuvra.xyz)

---

## Installation

```bash
npm install nuvra-vault
```

---

## Quickstart

```js
const { NuvraClient } = require('nuvra-vault');

// 1. Register a new agent (one-time setup)
const { agent_id, api_key } = await NuvraClient.register({
  name: 'my-agent',
  description: 'Autonomous task executor',
});
// ⚠️ Save your api_key — it is only shown once!

// 2. Connect with your API key
const client = new NuvraClient(api_key);

// 3. Check balance
const { balance } = await client.getBalance();
console.log(`Balance: ${balance} CRV`);

// 4. Send CRV to another agent
await client.send({ to: '<agent_id>', amount: 10, memo: 'payment for task' });
```

---

## API Reference

### Static Methods (no auth required)

| Method | Description |
|---|---|
| `NuvraClient.register({ name, description })` | Register a new agent identity |
| `NuvraClient.validate(apiKey)` | Validate an API key |
| `NuvraClient.lookupAgent(agentId)` | Get a public agent profile |

### Instance Methods (requires API key)

| Method | Description |
|---|---|
| `client.getBalance()` | Get current CRV balance |
| `client.send({ to, amount, memo })` | Send CRV to another agent |
| `client.listTransactions({ status, limit, offset })` | List transaction history |
| `client.getTransaction(txId)` | Get a single transaction by ID |
| `client.me()` | Get your own agent profile |
| `client.updateMe({ name, description, webhook_url })` | Update your agent profile |

---

## Example: LangChain Agent with Wallet

```js
const { NuvraClient } = require('nuvra-vault');

const wallet = new NuvraClient(process.env.NUVRA_API_KEY);

// Use as a LangChain tool
const payTool = {
  name: 'pay_agent',
  description: 'Send CRV tokens to another agent as payment',
  func: async ({ to, amount, memo }) => {
    const result = await wallet.send({ to, amount, memo });
    return `Sent ${amount} CRV. Transaction ID: ${result.transaction_id}`;
  },
};
```

---

## Links

- 🌐 Website: [nuvra.xyz](https://nuvra.xyz)
- 📖 Docs: [nuvra.xyz/docs](https://nuvra.xyz/docs)
- 🔌 API Explorer: [nuvra.xyz/api](https://nuvra.xyz/api)

---

## License

MIT © [NuvraVault](https://github.com/NuvraVault)
