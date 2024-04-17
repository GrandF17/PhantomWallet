import { Logs, Sidebar, NoProvider } from 'components/elements';

import { useWallet } from 'components/layouts/Wallet';
import { HStack } from '@chakra-ui/react';

const StatelessApp = () => {
  return (
    <HStack alignItems={'flex-start'} spacing={'20px'}>
      <Sidebar />
      <Logs />
    </HStack>
  );
};

const Home = () => {
  const { provider } = useWallet();

  if (!provider) {
    return <NoProvider />;
  }

  return <StatelessApp />;
};

export default Home;
