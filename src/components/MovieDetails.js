import { Box, Image, Text, Flex, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=80e7807a&i=${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex direction="column" align="center">
      <Box maxW="800px" bg="white" p="6" shadow="md" rounded="md">
        <Image src={movie.Poster} alt={movie.Title} rounded="md" mb="6" />
        <VStack spacing="4" align="flex-start">
          <Text fontSize="2xl" fontWeight="bold">{movie.Title}</Text>
          <Text><strong>Year:</strong> {movie.Year}</Text>
          <Text><strong>Genre:</strong> {movie.Genre}</Text>
          <Text><strong>Director:</strong> {movie.Director}</Text>
          <Text><strong>Plot:</strong> {movie.Plot}</Text>
          <Text><strong>IMDb Rating:</strong> {movie.imdbRating}</Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default MovieDetails;
