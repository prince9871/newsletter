import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Box, Heading, Text, Spinner, Alert, AlertIcon, Button } from '@chakra-ui/react';

// Function to fetch a single post
const fetchPost = async (id) => {
  try {
    const { data } = await axios.get(`https://gorest.co.in/public/v1/posts/${id}`);
    return data;
  } catch (error) {
    throw new Error("Unable to fetch Post");
  }
};

const Post = () => {
  const { id } = useParams(); // Getting the post ID from URL
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
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

  if (!data) {
    return (
      <Box textAlign="center" p={4}>
        <Text mt={4}>No post found.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={4}>{data.title}</Heading>
      <Text>{data.body}</Text>
      <Button colorScheme="blue" onClick={() => navigate('/')}>Back to Home</Button>
    </Box>
  );
};

export default Post;
