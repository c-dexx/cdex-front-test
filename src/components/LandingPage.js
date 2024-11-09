import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Box
      bgGradient="linear(to-r, gray.700, gray.900)"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
    >
      <Box>
        <Heading fontSize="9xl" mb="4" mt={'-16'} fontWeight={'extrabold'}>Welcome to C-dex</Heading>
        <Text fontSize="xl" mb="8">Explore movies, read reviews, and rate your favorites.</Text>
        <Button as={Link} to="/movies" size="lg" colorScheme='blue'>
          Explore Movies
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
