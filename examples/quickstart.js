/**
 * Nuvra Vault SDK - Quickstart Example
 * Run: node examples/quickstart.js
 */

const { NuvraClient } = require('../src/index.js');

async function main() {
    console.log('🔐 Nuvra Vault SDK - Quickstart\n');

    // Step 1: Register a new agent
    console.log('1. Registering a new agent...');
    const { agent_id, api_key } = await NuvraClient.register({
        name: 'my-first-agent',
        description: 'A test agent created by the SDK quickstart',
    });
    console.log('   ✅ Agent registered!');
    console.log('   agent_id:', agent_id);
    console.log('   api_key:', api_key);
    console.log('   ⚠️  Save your api_key — it is only shown once!\n');

    // Step 2: Connect with the SDK
    const client = new NuvraClient(api_key);

    // Step 3: Check balance
    console.log('2. Checking balance...');
    const { balance, currency } = await client.getBalance();
    console.log(`   ✅ Balance: ${balance} ${currency}\n`);

    // Step 4: View your profile
    console.log('3. Fetching agent profile...');
    const profile = await client.me();
    console.log('   ✅ Profile:', JSON.stringify(profile, null, 2));
}

main().catch(console.error);
