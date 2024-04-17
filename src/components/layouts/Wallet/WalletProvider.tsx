import { Connection, PublicKey } from '@solana/web3.js';
import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { SOLANA, endpointsMap } from 'utils/chains';
import {
  createTransferTransaction,
  getProvider,
  pollSignatureStatus,
  signAllTransactions,
  signAndSendTransaction,
  signMessage,
  signTransaction,
} from 'utils/wallet/hooks';
import { ConnectedMethods, PhantomProvider, TLog } from 'utils/wallet/types/types';
import { sign } from 'tweetnacl';

const WalletContext = createContext<{
  provider: PhantomProvider | undefined;
  address: PublicKey | undefined;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  logs: TLog[];
  clearLogs: () => void;
  methods: ConnectedMethods[];
}>({
  provider: undefined,
  address: undefined,
  isConnected: false,
  connect: () => Promise.resolve(),
  disconnect: () => Promise.resolve(),
  logs: [],
  clearLogs: () => {
    console.error('Not defined clearLogs method!');
  },
  methods: [],
});

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [provider] = useState(getProvider());
  const [connection] = useState(new Connection(endpointsMap[SOLANA.DEVNET]));
  const [address, setAddress] = useState<PublicKey | undefined>(undefined);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [logs, setLogs] = useState<TLog[]>([]);

  useEffect(() => {
    if (address) {
      /**
       * attempt to eagerly connect
       */
      provider?.connect({ onlyIfTrusted: true }).catch(() => {
        // fail silently
      });
    }
  }, [address]);

  const clearLogs = () => {
    setLogs([]);
  };

  // TODO: make this look a little bit better!
  const createLog = (newLog: TLog) => {
    setLogs(() => {
      const latestLog = logs.length > 0 ? logs[logs.length - 1] : undefined;
      if (latestLog !== newLog) {
        return [...logs, newLog];
      }
      return logs;
    });
  };

  const genMessage = () => {
    return `To avoid digital dognappers, sign below to authenticate with CryptoCorgis. 
    Current date: ${new Date().toISOString()}`;
  };

  // === ==========
  // === listeners:
  /**
   * listen if user wants to connect by himself
   */
  provider?.on('connect', (publicKey: PublicKey) => {
    setIsConnected(true);
    createLog({
      status: 'success',
      method: 'connect',
      message: `Connected to account ${publicKey.toBase58()}`,
    });
  });

  /**
   * listen if user wants to disconnect
   */
  provider?.on('disconnect', () => {
    setIsConnected(false);
    createLog({
      status: 'warning',
      method: 'disconnect',
      message: '👋',
    });
  });

  /**
   * listen if user changed account
   */
  provider?.on('accountChanged', (publicKey: PublicKey | undefined) => {
    if (publicKey) {
      createLog({
        status: 'info',
        method: 'accountChanged',
        message: `Switched to account ${publicKey.toBase58()}`,
      });
    } else {
      /**
       * In this case dApps could...
       *
       * 1. Not do anything
       * 2. Only re-connect to the new account if it is trusted
       *
       * ```
       * provider.connect({ onlyIfTrusted: true }).catch((err) => {
       *  // fail silently
       * });
       * ```
       *
       * 3. Always attempt to reconnect
       */

      createLog({
        status: 'info',
        method: 'accountChanged',
        message: 'Attempting to switch accounts.',
      });

      provider?.connect().catch((error) => {
        createLog({
          status: 'error',
          method: 'accountChanged',
          message: `Failed to re-connect: ${error.message}`,
        });
      });
    }
  });

  // === ======
  // === hooks:

  const handleSignAndSendTransaction = async () => {
    if (!provider) {
      return;
    }

    try {
      const transaction = await createTransferTransaction(provider.publicKey!, connection!);
      createLog({
        status: 'info',
        method: 'signAndSendTransaction',
        message: `Requesting signature for: ${JSON.stringify(transaction)}`,
      });

      const signature = await signAndSendTransaction(provider, transaction);
      createLog({
        status: 'info',
        method: 'signAndSendTransaction',
        message: `Signed and submitted transaction ${signature}.`,
      });

      const _logs = await pollSignatureStatus(signature, connection!);
      _logs.map((log) => createLog(log));
    } catch (error: any) {
      createLog({
        status: 'error',
        method: 'signAndSendTransaction',
        message: error.message,
      });
    }
  };

  const handleSignTransaction = async () => {
    if (!provider) {
      return;
    }

    try {
      const transaction = await createTransferTransaction(provider.publicKey!, connection!);
      createLog({
        status: 'info',
        method: 'signTransaction',
        message: `Requesting signature for:\n
        Fee payer: ${transaction.feePayer}
        ProgramIds: ${JSON.stringify(transaction.compileMessage().programIds())}`,
      });

      const signedTransaction = await signTransaction(provider, transaction);
      createLog({
        status: 'success',
        method: 'signTransaction',
        message: `Transaction signed!\n
        Recent block hash: ${signedTransaction.recentBlockhash}\n`,
      });
    } catch (error: any) {
      createLog({
        status: 'error',
        method: 'signTransaction',
        message: error.message,
      });
    }
  };

  // TODO:
  const handleSignAllTransactions = async () => {
    if (!provider) {
      return;
    }

    try {
      const transactions = [
        await createTransferTransaction(provider.publicKey!, connection!),
        await createTransferTransaction(provider.publicKey!, connection!),
      ];
      createLog({
        status: 'info',
        method: 'signAllTransactions',
        message: `Requesting signature for: ${JSON.stringify(transactions)}`,
      });

      const signedTransactions = await signAllTransactions(provider!, transactions[0], transactions[1]);
      createLog({
        status: 'success',
        method: 'signAllTransactions',
        message: `Transactions signed: ${JSON.stringify(signedTransactions)}`,
      });
    } catch (error: any) {
      createLog({
        status: 'error',
        method: 'signAllTransactions',
        message: error.message,
      });
    }
  };

  const handleSignMessage = async () => {
    if (!provider) {
      return false;
    }

    try {
      const message = genMessage();
      const { publicKey, signature } = await signMessage(provider, message);
      const verified = sign.detached.verify(new TextEncoder().encode(message), signature, publicKey.toBytes());

      createLog({
        status: verified ? 'success' : 'error',
        method: 'signMessage',
        message: `Message signed: ${verified}!`,
      });
      return verified;
    } catch (error: any) {
      createLog({
        status: 'error',
        method: 'signMessage',
        message: error.message,
      });
      return false;
    }
  };

  const handleConnect = async () => {
    if (!provider) {
      return;
    }

    try {
      const connectOpt = await provider.connect();
      const signed = await handleSignMessage();

      if (!signed) {
        setAddress(undefined);
        handleDisconnect();
      }

      setAddress(connectOpt.publicKey);
      setIsConnected(true);
    } catch (error: any) {
      createLog({
        status: 'error',
        method: 'connect',
        message: error.message,
      });
    }
  };

  const handleDisconnect = async () => {
    if (!provider) {
      return;
    }

    try {
      await provider.disconnect();
      setAddress(undefined);
      setIsConnected(false);
    } catch (error: any) {
      createLog({
        status: 'error',
        method: 'disconnect',
        message: error.message,
      });
    }
  };

  const [methods] = useState<ConnectedMethods[]>([
    {
      name: 'Sign and Send Transaction',
      onClick: handleSignAndSendTransaction,
    },
    {
      name: 'Sign Transaction',
      onClick: handleSignTransaction,
    },
    {
      name: 'Sign All Transactions',
      onClick: handleSignAllTransactions,
    },
  ]);

  return (
    <WalletContext.Provider
      value={{
        provider,
        address,
        isConnected,
        connect: handleConnect,
        disconnect: handleDisconnect,
        logs,
        clearLogs,
        methods,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
