import { Box, VStack, Link, Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      as="nav"
      w="250px"  // Fixed width for sidebar
      bg="gray.900"
      color="white"
      p="5"
      position="fixed"
      h="100vh"  // Full height to take up the left side of the screen
      top="0"
      left="0"
    >
      <Heading mb="8" fontSize="2xl" textAlign="center">
        C - Dex
      </Heading>
      <VStack spacing="4" align="stretch">
        <Link
          as={NavLink}
          to="/"
          p="3"
          rounded="md"
          _hover={{ bg: 'gray.700' }}
          _activeLink={{ bg: 'gray.700' }}
        >
          Movie Search
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
