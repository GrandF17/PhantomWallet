export enum SOLANA {
  MAINNET = 'MAINNET',
  DEVNET = 'DEVNET',
  TESTNET = 'TESTNET',
}

export const endpointsMap: Record<SOLANA, string> = {
  [SOLANA.MAINNET]: 'https://api.mainnet-beta.solana.com',
  [SOLANA.DEVNET]: 'https://api.devnet.solana.com',
  [SOLANA.TESTNET]: 'https://api.testnet.solana.com',
};

export const DEFAULT_RPC = endpointsMap[SOLANA.DEVNET];
