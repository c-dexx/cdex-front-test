import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Flex h="100vh">
          <Sidebar />
          <Box
            as="main"
            ml="250px"  // This makes sure the content does not overlap the sidebar
            w="full"
            p="6"
            bg="gray.50"
          >
            <Routes>
              <Route path="/" element={<MovieSearch />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
