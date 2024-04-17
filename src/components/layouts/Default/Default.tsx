import { FC, ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Header } from 'components/elements';

const Default: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Container
        as="main"
        minH="70vh"
        maxW="container.xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={100}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Default;
