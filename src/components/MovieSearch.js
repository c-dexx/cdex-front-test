import { Box, Input, Button, SimpleGrid, Image, Text , Flex} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FilterSortBar from './FilterSortBar';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    sortBy: '',
    rating: '',
  });

  const fetchMovieDetails = async (movie) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=80e7807a&i=${movie.imdbID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details', error);
      return null;
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=80e7807a&s=${query}`);
      let fetchedMovies = response.data.Search || [];

      // Fetch detailed movie data for genre and rating filtering
      fetchedMovies = await Promise.all(
        fetchedMovies.map(async (movie) => {
          const details = await fetchMovieDetails(movie);
          return details;
        })
      );

      // Apply genre filter
      if (filters.genre) {
        fetchedMovies = fetchedMovies.filter(movie => movie.Genre?.toLowerCase().includes(filters.genre.toLowerCase()));
      }

      // Apply rating filter
      if (filters.rating) {
        fetchedMovies = fetchedMovies.filter(movie => parseFloat(movie.imdbRating) >= parseFloat(filters.rating));
      }

      // Apply sorting
      if (filters.sortBy === 'title') {
        fetchedMovies = fetchedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
      } else if (filters.sortBy === 'year') {
        fetchedMovies = fetchedMovies.sort((a, b) => b.Year - a.Year);
      } else if (filters.sortBy === 'rating') {
        fetchedMovies = fetchedMovies.sort((a, b) => b.imdbRating - a.imdbRating);
      }

      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error fetching movies', error);
    }
  };

  return (
    <Box 
      bgGradient="linear(to-r, gray.700, gray.900)"
      minH="100vh"
      overflow={'hidden'}>
    <Flex justifyContent="center" alignItems="center" mt="36">
      <Input
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        w="300px"
        fontSize='lg'
        bg={'white'}
      />
      <Button onClick={handleSearch} colorScheme="blue" ml="4">
        Search
      </Button>
    </Flex>
  
    <FilterSortBar filters={filters} setFilters={setFilters} handleSearch={handleSearch} />
  
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="6" mt="8">
      {movies.map((movie) => (
        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
          <Box bg='whiteAlpha.900' shadow="md" p="4" rounded="md" fontSize='lg'>
            <Image src={movie.Poster} alt={movie.Title} rounded="md" />
            <Text fontWeight="bold" mt="2">{movie.Title}</Text>
            <Text>{movie.Year}</Text>
            <Text>Genre: {movie.Genre}</Text>
            <Text>IMDb Rating: {movie.imdbRating}</Text>  {/* Show movie rating */}
          </Box>
        </Link>
      ))}
    </SimpleGrid>
  </Box>
  );
};

export default MovieSearch;
