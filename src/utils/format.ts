/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str?: string, n = 6): string => {
  if (str) {
    return `${str.slice(0, n + 2)}...${str.slice(str.length - n)}`;
  }
  return '';
};

const countLeadingZeros = (floatString: string): number => {
  let count = 0;
  for (let i = 0; i < floatString.length; i++) {
    if (floatString[i] === '0') {
      count++;
    } else if (floatString[i] === '.') {
      continue;
    } else {
      break;
    }
  }
  return count;
};

export const beautifyEtherStr = (str?: string, n = 2) => {
  if (str) {
    const [beforeDot, afterDot] = str.split('.');
    const firstNonZero = countLeadingZeros(str);

    return `${beforeDot !== 'NaN' ? beforeDot : 0}.${afterDot ? afterDot.slice(0, Math.max(firstNonZero, n)) : 0}`;
  }
  return '';
};
