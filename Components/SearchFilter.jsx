"use client";  // Mark this as a client component

import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+
import { MdCancel } from 'react-icons/md';

import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/FetchApi'; // Adjusted path

export default function SearchFilters() {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState([]);
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to handle search and filter application
  const searchProperties = (filterValues) => {
    const path = '/search'; // Set a valid path here
    const query = { ...router.query }; // Create a copy to avoid mutation

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    // Convert query object to URL query string
    const queryString = new URLSearchParams(query).toString();
    const url = `${path}?${queryString}`;

    // Navigate to the constructed URL
    router.push(url);
  };

  // Fetch location data based on search term with debounce
  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await fetchApi(`/auto-complete?query=${searchTerm}`);
          setLocationData(data?.hits || []);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setLocationData([]);
        }
        setLoading(false);
      };

      // Debounce the API call
      const handler = setTimeout(() => {
        fetchData();
      }, 300); // Adjust the debounce delay as needed

      return () => clearTimeout(handler); // Cleanup the timeout on unmount or change
    } else {
      setLocationData([]);
    }
  }, [searchTerm]);

  return (
    <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
            placeholder={filter.placeholder}
            w='fit-content'
            p='2'
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      <Flex flexDir='column'>
        <Button
          onClick={() => setShowLocations(!showLocations)}
          border='1px'
          borderColor='gray.200'
          marginTop='2'
        >
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir='column' pos='relative' paddingTop='2'>
            <Input
              placeholder='Type Here'
              value={searchTerm}
              w='300px'
              focusBorderColor='gray.300'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && (
              <Icon
                as={MdCancel}
                pos='absolute'
                cursor='pointer'
                right='5'
                top='5'
                zIndex='100'
                onClick={() => setSearchTerm('')}
              />
            )}
            {loading && <Spinner margin='auto' marginTop='3' />}
            {showLocations && (
              <Box height='300px' overflow='auto'>
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({ locationExternalIDs: location.externalID });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text
                      cursor='pointer'
                      bg='gray.200'
                      p='2'
                      borderBottom='1px'
                      borderColor='gray.100'
                    >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
                    <Text fontSize='xl' marginTop='3'>
                      No Result Found.
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
