import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// ==================
// === color mode ===
// ==================

const styles = {
  global: (props: Record<string, any>) => ({
    body: {
      bg: mode('light', 'aidex.bgDark')(props),
    },
  }),
};

const colors = {
  aidex: {
    yellow: '#FFF100',
    bgDark: '#000',
    layerOne: {
      light: 'rgba(237, 239, 241, 0.8)',
      dark: 'rgba(22, 22, 22, 0.8)',
    },
    layerTwo: {
      light: 'white',
      dark: 'rgba(15, 15, 15, 1)',
    },
    buttonOne: {},
    buttonTwo: {},
    selectOne: {},
    selectTwo: {},
  },
};

export const chakraTheme = extendTheme({
  styles,
  colors,
});
