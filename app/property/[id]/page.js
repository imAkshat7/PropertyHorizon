"use client";

import { Box, Text } from '@chakra-ui/react';
import { fetchApi, baseUrl } from '../../../utils/FetchApi';
import PropertyDetails from '../[id]/PropertyDetails'; // Adjust path as needed

const PropertyPage = async ({ params }) => {
  const { id } = params;

  // Fetch property details from the API
  const data = await fetchApi(`/properties/detail?externalID=${id}`);
  const { price, title, description, ...rest } = data;

  return (
    <Box p='4'>
      <PropertyDetails
        propertyDetails={{
          price,
          title,
          description,
          ...rest,
        }}
      />
    </Box>
  );
};

export default PropertyPage;
