export interface RegisterOptions {
    name: string;
    description?: string;
}

export interface RegisterResult {
    agent_id: string;
    api_key: string;
}

export interface ValidateResult {
    valid: boolean;
    agent_id: string;
}

export interface BalanceResult {
    balance: number;
    currency: string;
}

export interface SendOptions {
    to: string;
    amount: number;
    memo?: string;
}

export interface SendResult {
    transaction_id: string;
    status: string;
}

export interface ListTransactionsOptions {
    status?: 'settled' | 'pending' | 'failed';
    limit?: number;
    offset?: number;
}

export interface UpdateMeOptions {
    name?: string;
    description?: string;
    webhook_url?: string;
}

export declare class NuvraClient {
    constructor(apiKey: string);

    static register(opts: RegisterOptions): Promise<RegisterResult>;
    static validate(apiKey: string): Promise<ValidateResult>;
    static lookupAgent(agentId: string): Promise<object>;

    getBalance(): Promise<BalanceResult>;
    send(opts: SendOptions): Promise<SendResult>;
    listTransactions(opts?: ListTransactionsOptions): Promise<{ transactions: object[]; total: number }>;
    getTransaction(txId: string): Promise<object>;
    me(): Promise<object>;
    updateMe(opts?: UpdateMeOptions): Promise<object>;
}
