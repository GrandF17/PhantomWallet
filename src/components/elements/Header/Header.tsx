/**
 * @DEV: If the sandbox is throwing dependency errors, chances are you need to clear your browser history.
 * This will trigger a re-install of the dependencies in the sandbox – which should fix things right up.
 * Alternatively, you can fork this sandbox to refresh the dependencies manually.
 */
import { Box, Container, Flex, HStack } from '@chakra-ui/react';
import { ConnectBtn, Settings } from 'components/elements';
import NoSSR from 'react-no-ssr';

const Header = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Container maxW="container.xl" p={'10px'}>
        <Flex align="center" justify="flex-end">
          <Flex flexDirection={'row'}>
            <HStack display={'flex'} justify={'space-between'} gap={'10px'}>
              <NoSSR>
                <ConnectBtn />
              </NoSSR>
              <Settings />
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
