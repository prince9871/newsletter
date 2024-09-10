import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Box, Heading, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

// Function to fetch a single news article
const fetchArticle = async (id) => {
  try {
    const apiKey = '38aafd1508924ed8bddda88f4f8a9d3b'; // Your API key
    const { data } = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        apiKey,
        q: id, // Searching by article ID or title
      }
    });
    return data;
  } catch (error) {
    throw new Error("Unable to fetch News");
  }
};

const Post = () => {
  const { id } = useParams(); // Getting the article ID from URL

  const { data, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id),
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
        <Text mt={4}>No article found.</Text>
      </Box>
    );
  }

  const article = data.articles[0];

  return (
    <Box p={4}>
      <Heading mb={4}>{article.title}</Heading>
      <Text mb={4}>{article.description}</Text>
      <Text>{article.content}</Text>
      <Text mt={4} color="blue.500" as="a" href={article.url} target="_blank">Read full article</Text>
    </Box>
  );
};

export default Post;
