import { Box, HStack, Link, Spacer, Text} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import ProfileIcon from '../asset/account.svg';
import SearchIcon from '../asset/search.svg'

const Navbar = () => {
  return (
    <Box 
      as="aside" 
      w="100vw" 
      bg="rgba(0, 0, 0, 0.3)"  // Changed to a darker semi-transparent background
      position="absolute"
      top="0"
      left="0"
      color="white" 
      p="8" 
      h="fit-content" 
      px={"28"}
      zIndex="1000"
    >
      <HStack spacing="18" fontSize="xl">
        <Text fontSize="3xl" fontWeight="extrabold">C-DEX</Text>
        <Spacer />
        <HStack spacing="32">
          <Link as={NavLink} to="/" fontWeight="bold">Home</Link>
          <Link as={NavLink} to="/movies" fontWeight="bold">Movies</Link>
          <Link as={NavLink} to="/gacha" fontWeight="bold">Random</Link>
        </HStack>
        <Spacer />
        <HStack spacing="16">
          <img src={SearchIcon} alt="Search Icon" width="40" height="40" />
          <Link as={NavLink} to="/login" fontWeight="bold">
            <img src={ProfileIcon} alt="Profile Icon" width="40" height="40" />
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navbar;