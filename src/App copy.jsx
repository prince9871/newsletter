import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, Heading, Box, Text } from '@chakra-ui/react';
import Home from './Home/Home';
import Post from './Post/Post';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const About = () => (
  <Box p={4}>
    <Heading>About Page</Heading>
    <Text mt={2}>This is the About Page!</Text>
  </Box>
);

function App() {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Box p={4}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/home/:id" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
        </Router>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
