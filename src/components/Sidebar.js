import { Box, VStack, Link, HStack, Center } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box as="aside" w="100vw" bg="gray.800" color="white" p="8" h="fit">
      <HStack spacing="100" justifyContent="center" fontSize={'xl'}>
        <Link as={NavLink} to="/" exact="true" fontWeight={'bold'}>Home</Link>
        <Link as={NavLink} to="/movies" fontWeight={'bold'}>Movies</Link>
        <Link as={NavLink} to="/gacha" fontWeight={'bold'}>Random</Link>  {/* New link for Gacha */}
        <Link as={NavLink} to="/login" fontWeight={'bold'}>Login</Link>
        <Link as={NavLink} to="/signup" fontWeight={'bold'}>Signup</Link>
      </HStack>
    </Box>
  );
};

export default Sidebar;
