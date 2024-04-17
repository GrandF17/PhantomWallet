// topuchable and mobile devices
import { isAndroid, isIPad13, isIPhone13, isWinPhone, isMobileSafari, isTablet } from 'react-device-detect';

// ===========================
// === mobile device check ===
// ===========================

// INTERNAL FUNC:
function isTouchDevice() {
  if (typeof window === 'undefined') {
    return false;
  }
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  function mq(query: any) {
    return typeof window !== 'undefined' && window.matchMedia(query).matches;
  }
  // @ts-ignore
  if ('ontouchstart' in window || window?.DocumentTouch) {
    return true;
  }

  // include the 'heartz' - https://git.io/vznFH
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

// EXTERNAL FUNC:
export function useIsTouchDevice() {
  return isAndroid || isIPad13 || isIPhone13 || isWinPhone || isMobileSafari || isTablet || isTouchDevice();
}
