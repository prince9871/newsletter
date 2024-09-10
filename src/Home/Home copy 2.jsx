import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Box, Heading, Text, Spinner, Alert, AlertIcon, Flex, Button } from '@chakra-ui/react';

// Function to fetch posts with pagination
const fetchPosts = async (page) => {
  try {
    const { data } = await axios.get(`https://gorest.co.in/public/v1/posts?page=${page}`);
    return data;
  } catch (error) {
    throw new Error("Unable to fetch Posts");
  }
};

const Home = () => {
  const { id } = useParams(); // Getting the page number from URL
  const navigate = useNavigate();

  const currentPage = parseInt(id || '1', 10);

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
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

  if (!data || data.data.length === 0) {
    return (
      <Box textAlign="center" p={4}>
        <Text mt={4}>No posts available for this page.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Posts - Page {currentPage}</Heading>
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
          isDisabled={!data?.meta?.pagination?.links?.next}
        >
          Next
        </Button>
      </Flex>
      <Box>
        {data?.data?.map((post) => (
          <Box key={post.id} borderWidth="1px" borderRadius="md" p={4} mb={4}>
            <Heading size="md" mb={2}>{post.title}</Heading>
            <Text>{post.body}</Text>
            <Button colorScheme="blue" onClick={() => navigate(`/post/${post.id}`)}>View Post</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
