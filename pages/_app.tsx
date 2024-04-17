// css/html libraries:
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

// external components:
import { Default } from 'components/layouts/Default';

// extrenal utils:
import { useIsTouchDevice } from 'utils/isMobileDevice';

// configs:
import { chakraTheme } from 'utils/configs/chakra.config';

// styles:
import { WebsiteScrollBar } from 'utils/styles/scroll-bar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WalletProvider } from 'components/layouts/Wallet/WalletProvider';

// ===========
// === app ===
// ===========
const MyApp = ({ Component, pageProps }: AppProps) => {
  // detect if user uses mobile or touchable device
  const [isMobile, setIsMobile] = useState(undefined as boolean | undefined);
  const router = useRouter();

  useEffect(() => {
    setIsMobile(useIsTouchDevice());
  }, [router.pathname]);

  return (
    <WalletProvider>
      {/* predefined styles from Chaka UI */}
      <ChakraProvider resetCSS theme={chakraTheme}>
        {isMobile === false && (
          <>
            <WebsiteScrollBar />
            <Default>
              <Component {...pageProps} />
            </Default>
          </>
        )}
      </ChakraProvider>
    </WalletProvider>
  );
};
export default MyApp;
