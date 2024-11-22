import { Box, Button, Image, Text, VStack, Badge} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const MovieGacha = () => {
  const [movie, setMovie] = useState(null);

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
    <Box 
    textAlign="center"
    bgColor={"#170B2E"}
    minH="100vh"
    overflow={'hidden'}>
      <VStack spacing="4" mt="36">
        <Button bgColor={"#477023"} onClick={getRandomMovie} color={"white"}
        _hover={{
          bgColor: "#23703D", // Keeps the same background color
          color: "#FFFFFF",   // Keeps the same text color
        }}>
          Get Random Movie
        </Button>

        {movie && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            mt={"60px"}
          >
            <Image 
              src={movie.Poster}
              alt={movie.Title}
              rounded="md"
              mb="6"
              width="400px" // Fixed width
              height="550px" // Fixed height
              objectFit="cover" // Ensures the image is scaled and cropped properly
              />
            <Text fontSize="48px" fontWeight="800" textColor="white" mb={"6"}>{movie.Title} <span style={{opacity: 0.5, marginLeft:"16px"}}>{movie.Year}</span></Text>
            <Box display="flex" alignItems="center" mb="6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32px" 
                height="32px" 
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
              <Text fontWeight="800" fontSize="32px" textColor={"white"}>
                {movie.imdbRating || "N/A"} / 10
              </Text>
            </Box>
            <Box display="flex" gap="2" flexWrap="wrap" mb="6">
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
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default MovieGacha;
