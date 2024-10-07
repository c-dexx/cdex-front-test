import { Box, Input, Button, SimpleGrid, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=80e7807a&s=${query}`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching movies', error);
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" mb="4" fontWeight="bold">Search Movies</Text>
      <Box mb="6">
        <Input
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          w="300px"
          mr="4"
        />
        <Button onClick={handleSearch} colorScheme="blue">
          Search
        </Button>
      </Box>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="6">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
            <Box
              bg="white"
              shadow="md"
              rounded="md"
              p="4"
              _hover={{ transform: 'scale(1.05)', transition: '0.2s' }}
            >
              <Image src={movie.Poster} alt={movie.Title} rounded="md" mb="3" />
              <Text fontSize="xl" fontWeight="bold">{movie.Title}</Text>
              <Text>{movie.Year}</Text>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MovieSearch;
