import styled from 'styled-components';

import { GRAY, REACT_GRAY, PURPLE, WHITE, DARK_GRAY } from 'utils/styles/colors';

import { hexToRGB } from 'utils/wallet/hooks';

import { DefaultBtn } from 'components/elements';
import { useWallet } from 'components/layouts/Wallet';
import { Box, VStack } from '@chakra-ui/react';

// =============================================================================
// Styled Components
// =============================================================================

const Link = styled.a.attrs({
  href: 'https://phantom.app/',
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-decoration: none;
  margin-bottom: 30px;
  padding: 5px;
  &:focus-visible {
    outline: 2px solid ${hexToRGB(GRAY, 0.5)};
    border-radius: 6px;
  }
`;

const Subtitle = styled.h5`
  color: ${GRAY};
  font-weight: 400;
`;

const Pre = styled.pre`
  margin-bottom: 5px;
`;

const Badge = styled.div`
  margin: 0;
  padding: 10px;
  width: 100%;
  color: ${PURPLE};
  background-color: ${hexToRGB(PURPLE, 0.2)};
  font-size: 14px;
  border-radius: 6px;
  @media (max-width: 400px) {
    width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 320px) {
    width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ::selection {
    color: ${WHITE};
    background-color: ${hexToRGB(PURPLE, 0.5)};
  }
  ::-moz-selection {
    color: ${WHITE};
    background-color: ${hexToRGB(PURPLE, 0.5)};
  }
`;

const Divider = styled.div`
  border: 1px solid ${DARK_GRAY};
  height: 1px;
  margin: 20px 0;
`;

// =============================================================================
// Main Component
// =============================================================================

const Sidebar = () => {
  const { address, isConnected, methods, connect } = useWallet();

  return (
    <Box p={'20px'} bg={REACT_GRAY} w={'50vh'} minH={'20vh'} borderRadius={'20'}>
      <VStack>
        <Link>
          <img src="/Phantom-Logo-Purple.svg" alt="Phantom Wallet" width="200" />
          <Subtitle>CodeSandbox</Subtitle>
        </Link>
        {isConnected && address ? (
          <>
            <Box>
              <Pre>Connected as</Pre>
              <Badge>{address?.toBase58()}</Badge>
              <Divider />
            </Box>
            {methods.map((method, i) => (
              <DefaultBtn key={`${method.name}-${i}`} onClick={method.onClick}>
                {method.name}
              </DefaultBtn>
            ))}
          </>
        ) : (
          <DefaultBtn onClick={async () => connect?.()}>Connect to Phantom</DefaultBtn>
        )}
      </VStack>
    </Box>
  );
};

export default Sidebar;
