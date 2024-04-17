import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';

const Variable: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => {
  return (
    <>
      <Head>
        <title>{`SolaGame | ${pageName}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box>{children}</Box>
    </>
  );
};

export default Variable;
