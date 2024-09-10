import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Box, Heading, Text, Spinner, Alert, AlertIcon, Flex, Button } from '@chakra-ui/react';

// Function to fetch news articles
const fetchNews = async (page) => {
  try {
    const apiKey = '38aafd1508924ed8bddda88f4f8a9d3b'; // Your API key
    const { data } = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        apiKey,
        page,
        pageSize: 5, // Number of articles per page
        country: 'in' // You can change this to your desired country
      }
    });
    return data;
  } catch (error) {
    throw new Error("Unable to fetch News");
  }
};

const Home = () => {
  const { id } = useParams(); // Getting the page number from URL
  const navigate = useNavigate();
  
  // Convert id to integer, default to 1 if undefined
  const currentPage = parseInt(id || '1', 10);

  const { data, isLoading, error } = useQuery({
    queryKey: ['news', currentPage],
    queryFn: () => fetchNews(currentPage),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <Box textAlign="center" p={4}>
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
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
      <Heading mb={4}>Latest News - Page {currentPage}</Heading>
      <Flex justify='space-between' mb='4'>
        <Button
          colorScheme="red"
          onClick={() => navigate(`/home/${currentPage - 1}`)}
          isDisabled={currentPage <= 1}
        >
          Prev
        </Button>
        <Button
          colorScheme="green"
          onClick={() => navigate(`/home/${currentPage + 1}`)}
          isDisabled={!data.articles.length || data.totalResults <= currentPage * 5}
        >
          Next
        </Button>
      </Flex>
      <Box>
        {data.articles.map((article, index) => (
          <Box key={index} borderWidth="1px" borderRadius="md" p={4} mb={4}>
            <Heading size="md" mb={2}>{article.title}</Heading>
            <Text>{article.description}</Text>
            <Text mt={2} color="blue.500" as="a" href={article.url} target="_blank">Read more</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
