import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Alert, AlertIcon, Flex, Button, Image, Input, Skeleton, SkeletonText } from '@chakra-ui/react';

// Function to fetch news articles from GNews API
const fetchNews = async (page, query) => {
  try {
    const apiKey = '654b8cdeff27a5b7f670ffb3668e2686'; // Your API key
    const category = 'general'; // You can change this to your desired category
    const url = `https://gnews.io/api/v4/top-headlines?&lang=en&country=in&max=10&apikey=${apiKey}&page=${page}&q=${query}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error("Unable to fetch news");
  }
};

const Home = () => {
  const { id } = useParams(); // Getting the page number from URL
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [activeQuery, setActiveQuery] = useState(''); // State for active search query

  const currentPage = parseInt(id || '1', 10);

  // Extract query from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
      setActiveQuery(q);
    }
  }, [location.search]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['news', currentPage, activeQuery],
    queryFn: () => fetchNews(currentPage, activeQuery),
    keepPreviousData: true,
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    setActiveQuery(searchQuery); // Set the active query
    navigate(`/home/1?q=${searchQuery}`); // Navigate to the first page with the search query
    refetch(); // Refetch data with new query
  };

  if (isLoading) {
    return (
      <Box p={4}>
        <Skeleton height="40px" mb={4} />
        <SkeletonText mt="4" noOfLines={6} spacing="4" />
        <Skeleton height="200px" mb={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert status="error">
          <AlertIcon />
          Error: {error.message}
        </Alert>
      </Box>
    );
  }

  if (!data || data.articles.length === 0) {
    return (
      <Box textAlign="center" p={4}>
        <Text mt={4}>No news articles available for this page.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      {/* Search Input Box */}
      <form onSubmit={handleSearchSubmit}>
        <Flex mb={4}>
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={handleSearchChange}
            mr={2}
          />
          <Button type="submit" colorScheme="blue">Search</Button>
        </Flex>
      </form>

      {/* News Articles */}
      <Box>
        {data.articles.map((article, index) => (
          <Flex key={index} borderWidth="1px" borderRadius="md" p={4} mb={4} direction={{ base: 'column', md: 'row' }}>
            {article.image && (
              <Image 
                src={article.image} 
                alt={article.title} 
                borderRadius="md" 
                mb={{ base: 3, md: 0 }} 
                mr={{ md: 4 }}
                boxSize={{ base: '100%', md: '150px' }} 
                objectFit="cover" 
              />
            )}
            <Box flex="1">
              <Heading size="md" mb={2}>{article.title}</Heading>
              <Text mb={2}>{article.description}</Text>
              <Text color="blue.500" as="a" href={article.url} target="_blank">Read more</Text>
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
