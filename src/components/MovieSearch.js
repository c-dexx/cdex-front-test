import { Box, Input, Button, SimpleGrid, Image, Text , Flex, Badge} from '@chakra-ui/react';
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

  const getGenreColor = (genre) => {
    switch (genre?.toLowerCase()) {
      case "action":
        return "#DB1B1F";
      case "comedy":
        return "#8EDD32";
      case "sci-fi":
        return "#9E3CD7";
      case "drama":
        return "#757575";
      case "horror":
        return "purple.600";
      case "romance":
        return "pink.400";
      default:
        return "gray.500";
    }
  };
  

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
      bgColor="#170B2E"
      minH="100vh"
      overflow={'hidden'}>
    <Flex justifyContent="center" alignItems="center" mt="36">
      <Input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        w="300px"
        fontSize='lg'
        bg={'#D9D9D9'}
      />
      <Button onClick={handleSearch} bgColor='#9E3CD7' color="#FFFFFF" ml="4" fontWeight="extrabold"
      _hover={{
        bgColor: "#5B1981", // Keeps the same background color
        color: "#FFFFFF",   // Keeps the same text color
      }}>
        Search
      </Button>

      <FilterSortBar filters={filters} setFilters={setFilters} handleSearch={handleSearch} />
    </Flex>
  
    <SimpleGrid 
      columns={{ sm: 1, md: 2, lg: 3 }} 
      gap="6" 
      mt="8"
      mb="32"
      maxW="1200px"
      mx="auto"
      px="4"
    >
    {movies.map((movie) => (
        <Box
          key={movie.imdbID}
          position="relative"
          w="100%"
          h="600px"
          bgImage={`url(${movie.Poster || "fallback-image.jpg"})`}
          bgSize="cover"
          bgPosition="center"
          rounded="lg"
          overflow="hidden"
          shadow="md"
          transition="transform 0.3s, box-shadow 0.3s"
          alignItems="center"
          _hover={{ transform: "scale(1.05)", shadow: "lg" }}
        >
          {/* Gradient Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bgGradient="linear(to-t, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2))"
          />
          {/* Movie Information */}
          <Box
            position="absolute"
            bottom="4"
            left="4"
            right="4"
            zIndex="1"
            color="white"
          >
            {/* Genre Badge */}
            <Box display="flex" gap="2" flexWrap="wrap">
              {movie.Genre?.split(",").map((genre) => (
                <Badge
                  key={genre.trim()}
                  rounded="full"
                  px="2"
                  py="1"
                  fontSize="xs"
                  bg={getGenreColor(genre.trim())}
                >
                  {genre.trim()}
                </Badge>
              ))}
            </Box>
            {/* IMDb Rating */}
            <Text fontWeight="bold" fontSize="3xl" mt="2">
              {movie.Title || "N/A"}
            </Text>

            <Box display="flex" alignItems="center" mt="2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                style={{ marginRight: '4px' }}
              >
                <g clipPath="url(#clip0_54_12)">
                  <path d="M11.5 12.5L12 11V10.5L13 11L11.2844 11.1386L12 10L13.5 11.5L11.5 11L11.9307 11.1386L11.5 12.5ZM5.825 20L8.15 12.4L2 8H9.6L12 0L14.4 8H22L15.85 12.4L18.175 20L12 15.3L5.825 20Z" fill="#37FF00"/>
                </g>
                <defs>
                  <clipPath id="clip0_54_12">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <Text fontWeight="bold" fontSize="xl">
                {movie.imdbRating || "N/A"}
              </Text>
            </Box>
          </Box>
          {/* Clickable Details Overlay */}
          <Box
            as={Link}
            to={`/movie/${movie.imdbID}`}
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            zIndex="2"
            _hover={{ cursor: "pointer" }}
          />
        </Box>
    ))}
    </SimpleGrid>

    <Text fontWeight="bold" fontSize="xl" textColor="white" textAlign="center" mb="16">
      Ⓒ - 2024 Cdex
    </Text>

    </Box>
  );
};

export default MovieSearch;
