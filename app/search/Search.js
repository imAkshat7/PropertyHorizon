// app/search/Search.js
"use client";

import { useState } from 'react';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../../components/SearchFilter'; // Ensure the correct path
import Property from '../../components/Property'; // Ensure the correct path

export default function Search({ properties, purpose }) {
  const [searchFilters, setSearchFilters] = useState(false);

  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
      >
        <Text>Search Property By Filters</Text>
        <Icon pl='2' w='7' as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {purpose || 'All'}
      </Text>
      <Flex flexWrap='wrap'>
        {properties.length > 0 ? (
          properties.map((property) => (
            <Property property={property} key={property.id} />
          ))
        ) : (
          <Text>No properties available.</Text>
        )}
      </Flex>
      {properties.length === 0 && (
        <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
          <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
        </Flex>
      )}
    </Box>
  );
}
