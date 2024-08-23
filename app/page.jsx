import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button, SimpleGrid } from '@chakra-ui/react';
import { baseUrl, fetchApi } from "../utils/FetchApi";
import Property from "../Components/property";

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m={10} width="100%">
    <Box textAlign="center">
      <Image src={imageUrl} width={700} height={400} alt="banner" />
    </Box>
    <Box p="5" textAlign="center">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="medium">{title1}<br />{title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">{desc1}<br/>{desc2}</Text>
      <Button fontSize="xl" bg="blue.300" color="white">
        <Link href={linkName}>
          {buttonText}
        </Link>
      </Button>
    </Box>
  </Flex>
);

export default async function Home() {
  try {
    // Fetch data on the server
    const responseForSale = await fetchApi(`/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=8`);
    const responseForRent = await fetchApi(`/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=8`);

    // Initialize properties with empty array if data is missing
    const propertyForSale = responseForSale?.hits || [];
    const propertyForRent = responseForRent?.hits || [];

    return (
      <Box>
        <Banner
          purpose="RENT A HOME"
          title1="Rental Homes For"
          title2="Everyone"
          desc1="Explore Homes, Plots, Lands"
          desc2="and more"
          buttonText="Explore Renting"
          linkName="/search?purpose=for-rent"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl:4 }} spacing={10} p={5}>
          {propertyForRent.length > 0 ? (
            propertyForRent.map((property) => <Property property={property} key={property.id} />)
          ) : (
            <Text>No properties available for rent.</Text>
          )}
        </SimpleGrid>

        <Banner
          purpose="BUY A HOME"
          title1="Find, Buy & Own Your"
          title2="Dream Home"
          desc1="Explore Homes, Plots, Lands,"
          desc2="or more to Buy"
          buttonText="Explore Buying"
          linkName="/search?purpose=for-sale"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl:4 }} spacing={10} p={5}>
          {propertyForSale.length > 0 ? (
            propertyForSale.map((property) => <Property property={property} key={property.id} />)
          ) : (
            <Text>No properties available for sale.</Text>
          )}
        </SimpleGrid>
      </Box>
    );
  } catch (error) {
    console.error('Error fetching properties:', error);
    return <Text>Error fetching properties.</Text>;
  }
}
