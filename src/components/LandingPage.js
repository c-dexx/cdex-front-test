import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Box
      bgGradient="linear(to-r, teal.400, blue.500, purple.600)"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
    >
      <Box>
        <Heading fontSize="5xl" mb="6">Welcome to c-dex</Heading>
        <Text fontSize="xl" mb="6">Explore movies, read reviews, and rate your favorites.</Text>
        <Button as={Link} to="/movies" size="lg" colorScheme="yellow">
          Explore Movies
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
