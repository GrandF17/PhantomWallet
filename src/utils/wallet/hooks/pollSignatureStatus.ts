import { Connection } from '@solana/web3.js';

import { TLog } from 'utils/wallet/types/types';

/**
 * @param POLLING_INTERVAL equals 1 second ~ 1000 miliseconds
 */
const POLLING_INTERVAL = 1000;
const MAX_POLLS = 30;

/**
 * Polls for transaction signature statuses
 * @param   {String}     signature  a transaction signature
 * @param   {Connection} connection an RPC connection
 * @returns {TLog[]} array of logs to push them to global store
 */
const pollSignatureStatus = async (signature: string, connection: Connection): Promise<TLog[]> => {
  let count = 0;
  const logs: TLog[] = [];

  await new Promise((resolve) => {
    const interval = setInterval(async () => {
      // Failed to confirm transaction in time
      if (count === MAX_POLLS) {
        clearInterval(interval);
        logs.push({
          status: 'error',
          method: 'signAndSendTransaction',
          message: `Transaction: ${signature}`,
          messageTwo: `Failed to confirm transaction within ${MAX_POLLS} seconds. The transaction may or may not have succeeded.`,
        });
        resolve(logs);
      }

      const { value } = await connection.getSignatureStatus(signature);
      const confirmationStatus = value?.confirmationStatus;

      if (confirmationStatus) {
        const hasReachedSufficientCommitment = confirmationStatus === 'confirmed' || confirmationStatus === 'finalized';

        logs.push({
          status: hasReachedSufficientCommitment ? 'success' : 'info',
          method: 'signAndSendTransaction',
          message: `Transaction: ${signature}`,
          messageTwo: `Status: ${confirmationStatus.charAt(0).toUpperCase() + confirmationStatus.slice(1)}`,
        });

        if (hasReachedSufficientCommitment) {
          clearInterval(interval);
          resolve(logs);
        }
      } else {
        logs.push({
          status: 'info',
          method: 'signAndSendTransaction',
          message: `Transaction: ${signature}`,
          messageTwo: 'Status: Waiting on confirmation...',
        });
      }

      count++;
    }, POLLING_INTERVAL);
  });

  return logs;
};

export default pollSignatureStatus;
