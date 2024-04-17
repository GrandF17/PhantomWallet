import styled from 'styled-components';

import { BLACK, GRAY } from 'utils/styles/colors';

import { DefaultBtn } from 'components/elements';
import Log from './Log';
import { useWallet } from 'components/layouts/Wallet';
import { Box, Flex, VStack } from '@chakra-ui/react';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    margin-right: 10px;
  }
`;

const Logs = () => {
  const { logs, address, clearLogs } = useWallet();

  return (
    <VStack
      bg={BLACK}
      width={'60vh'}
      maxH={'50vh'}
      alignItems={'flex-start'}
      fontFamily={'monospace'}
      overflow={'auto'}
    >
      {logs && logs.length > 0 ? (
        <>
          {logs.map((log, i) => (
            <Log key={`${log.status}-${log.method}-${i}`} {...log} />
          ))}
          <Flex justify={'center'} width={'100%'}>
            <DefaultBtn buttonStyles={{ top: '20px', right: '20px', width: '100px' }} onClick={clearLogs}>
              Clear Logs
            </DefaultBtn>
          </Flex>
        </>
      ) : (
        <Row>
          <span>{'>'}</span>
          <Box color={GRAY}>
            {address ? (
              // connected
              <>
                Click a button and watch magic happen...{' '}
                <span role="img" aria-label="Sparkles Emoji">
                  ✨
                </span>
              </>
            ) : (
              <>
                Welcome to the SolaGame sandbox. Connect to your Phantom wallet and play around...{' '}
                <span role="img" aria-label="Ghost Emoji">
                  👻
                </span>
              </>
            )}
          </Box>
        </Row>
      )}
    </VStack>
  );
};

export default Logs;
