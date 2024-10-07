import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const MovieGacha = () => {
  const [movie, setMovie] = useState(null);

  const getRandomMovie = async () => {
    try {
      const titles = ["Star Wars", "Inception", "Avengers", "Matrix", "Harry Potter"];  // Random titles for fun
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      const response = await axios.get(`http://www.omdbapi.com/?apikey=80e7807a&t=${randomTitle}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching random movie', error);
    }
  };

  return (
    <Box textAlign="center">
      <VStack spacing="4">
        <Button colorScheme="pink" onClick={getRandomMovie}>
          Get Random Movie
        </Button>

        {movie && (
          <Box bg="white" shadow="md" p="4" rounded="md" maxW="sm" mx="auto">
            <Image src={movie.Poster} alt={movie.Title} rounded="md" />
            <Text fontWeight="bold" mt="2">{movie.Title}</Text>
            <Text>{movie.Year}</Text>
            <Text mt="4"><strong>Plot:</strong> {movie.Plot}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default MovieGacha;
