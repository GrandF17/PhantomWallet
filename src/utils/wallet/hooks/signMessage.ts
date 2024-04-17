import { PhantomProvider } from 'utils/wallet/types/types';
import { PublicKey } from '@solana/web3.js';

/**
 * Signs a message
 * @param   {PhantomProvider} provider a Phantom Provider
 * @param   {String}          message  a message to sign
 * @returns {Any}                      TODO(get type)
 */
const signMessage = async (
  provider: PhantomProvider,
  message: string,
): Promise<{ publicKey: PublicKey; signature: Uint8Array }> => {
  try {
    const encodedMessage = new TextEncoder().encode(message);
    const { publicKey, signature } = await provider.signMessage(encodedMessage, 'utf8');
    return { publicKey, signature };
  } catch (error: any) {
    console.warn(error);
    throw new Error(error.message);
  }
};

export default signMessage;
