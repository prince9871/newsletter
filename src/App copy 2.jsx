import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Home from './Home/Home';
import Post from './Post/Post';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Nav from './Components/Nav';
import About from './Components/About';

function App() {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
      <>
      <Nav/>
        <Router>
          <Box p={4}>
            <Routes>
              {/* <Route path="/" element={<Home />} />
              <Route path="/home/:id" element={<Home />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/about" element={<About />} /> */}
              <Route path="/" element={<About />} /> 
            </Routes>
          </Box>
        </Router>
        <ReactQueryDevtools initialIsOpen={true} />
        </>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
