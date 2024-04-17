/**
 * @DEV: If the sandbox is throwing dependency errors, chances are you need to clear your browser history.
 * This will trigger a re-install of the dependencies in the sandbox – which should fix things right up.
 * Alternatively, you can fork this sandbox to refresh the dependencies manually.
 */
import { Button } from '@chakra-ui/react';
import { useWallet } from 'components/layouts/Wallet';
import React, { useEffect } from 'react';

const ConnectBtn = () => {
  const { isConnected, connect, disconnect } = useWallet();

  useEffect(() => {
    console.log('isConnected: ', isConnected);
  }, [isConnected]);

  return (
    <>
      {isConnected ? (
        <Button
          bg={'#62D5B2'}
          color={'#20274B'}
          _hover={{
            color: 'white',
          }}
          onClick={disconnect}
        >
          Disconnect
        </Button>
      ) : (
        <Button
          bg={'#62D5B2'}
          color={'#20274B'}
          _hover={{
            color: 'white',
          }}
          onClick={connect}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default ConnectBtn;
