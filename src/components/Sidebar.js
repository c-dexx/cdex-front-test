import { Box, VStack, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box as="aside" w="250px" bg="gray.800" color="white" p="4" position="fixed" h="100vh">
      <VStack spacing="4" align="flex-start">
        <Link as={NavLink} to="/" exact="true">Home</Link>
        <Link as={NavLink} to="/movies">Movies</Link>
        <Link as={NavLink} to="/gacha">Gacha Movie</Link>  {/* New link for Gacha */}
        <Link as={NavLink} to="/login">Login</Link>
        <Link as={NavLink} to="/signup">Signup</Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
