import { Box, Button, Input, Text, Heading } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import AuthContext from './AuthContext';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = () => {
    login(email); // Simulate signup and login
  };

  return (
  <Box
  bgGradient="linear(to-r, gray.700, gray.900)"
  minH="100vh"
  overflow={'hidden'}
  >
    <Box maxW="sm" mx="auto" p="8"  bg="gray.50" shadow="md" rounded="md" mt="72">
      <Heading as="h1" mb="6">Sign Up</Heading>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb="4"
      />
      <Input
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        mb="6"
      />
      <Button colorScheme="blue" w="full" onClick={handleSubmit}>
        Sign Up
      </Button>
      <Text mt="4" textAlign="center">
        Already have an account? <Link to="/login">Login</Link>
      </Text>
    </Box>
  </Box>
  );
};

export default Signup;
