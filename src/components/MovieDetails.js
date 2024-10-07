import { Box, Image, Text, VStack, HStack, Button, Textarea, Input } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthContext';

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=80e7807a&i=${id}`);
      setMovie(response.data);
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddReview = () => {
    if (!user) {
      alert("You must be logged in to leave a review.");
      return;
    }
    const review = {
      text: newReview,
      rating: rating,
      author: user.email,
    };
    setReviews([...reviews, review]);
    setNewReview("");
    setRating("");
  };

  if (!movie) return <Text>Loading...</Text>;

  return (
    <Box p="6">
      <Image src={movie.Poster} alt={movie.Title} rounded="md" mb="6" />
      <Text fontSize="2xl" fontWeight="bold">{movie.Title}</Text>
      <Text mb="4"><strong>Plot:</strong> {movie.Plot}</Text>

      <VStack spacing="4" align="flex-start">
        <Text fontSize="lg" fontWeight="bold">Leave a Review</Text>
        <Input
          placeholder="Rating (out of 5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <Textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddReview}>Submit Review</Button>
      </VStack>

      <VStack mt="8" spacing="6">
        {reviews.map((review, index) => (
          <Box key={index} p="4" shadow="md" rounded="md" bg="gray.100">
            <HStack>
              <Text><strong>Rating:</strong> {review.rating}/5</Text>
              <Text ml="auto"><strong>Author:</strong> {review.author}</Text>
            </HStack>
            <Text mt="2">{review.text}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default MovieDetails;
