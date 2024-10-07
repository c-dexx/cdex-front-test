import { Box, Button, Input, Text, Heading } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import AuthContext from './AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Placeholder if needed later
  const { login } = useContext(AuthContext);

  const handleSubmit = () => {
    login(email); // Simulate login by saving email
  };

  return (
    <Box maxW="sm" mx="auto" p="8" mt="10" bg="gray.50" shadow="md" rounded="md">
      <Heading as="h1" mb="6">Login</Heading>
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
        Login
      </Button>
      <Text mt="4" textAlign="center">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Text>
    </Box>
  );
};

export default Login;
