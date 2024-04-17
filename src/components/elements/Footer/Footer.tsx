/**
 * @DEV: If the sandbox is throwing dependency errors, chances are you need to clear your browser history.
 * This will trigger a re-install of the dependencies in the sandbox – which should fix things right up.
 * Alternatively, you can fork this sandbox to refresh the dependencies manually.
 */
import { Box, HStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <HStack>
      <Box>Kek</Box>
      <Box>Lol</Box>
      <Box>Orbidol</Box>
    </HStack>
  );
};

export default Footer;
