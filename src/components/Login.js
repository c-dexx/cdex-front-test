import { Box, Button, Input, Text, Heading } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import AuthContext from './AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('masukindisini.com/login', {
        email,
        password,
      });
      login(response.data.token); // Assuming the API returns a token
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box
      bgGradient="linear(to-r, gray.700, gray.900)"
      minH="100vh"
      overflow={'hidden'}>
      <Box maxW="sm" mx="auto" p="8" bg="gray.50" shadow="md" rounded="md" mt="72">
        <Heading as="h1" mb="6">Login</Heading>
        {error && <Text color="red.500" mb="4">{error}</Text>}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="4"
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="4"
        />
        <Button onClick={handleSubmit} colorScheme="blue" width="full">Login</Button>
      </Box>
    </Box>
  );
};

export default Login;