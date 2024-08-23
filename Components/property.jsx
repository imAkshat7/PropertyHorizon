import Link from "next/link";
import Image from "next/image";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from "millify";
import defaultImage from "../Assets/Image/house.jpg";

const Property = ({ property: { coverPhoto, price, rentFrequency, rooms, baths, area, agency, isVerified, externalID, title } }) => (
  <Link href={`/property/${externalID}`} passHref>
    <Flex flexWrap="wrap" w="420px" p="5" paddingTop="0" justifyContent="flex-start" cursor="pointer">
      <Box>
        <Image 
          src={coverPhoto ? coverPhoto.url : defaultImage} 
          width={400} 
          height={250} 
          alt="house" 
        />
      </Box>

      <Box w="full" p="5">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Box paddingRight="3" color="black.400">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg" color="black"> {/* Changed textColor to color */}
            AED {millify(price)}{rentFrequency && `/${rentFrequency}`}
          </Text>
        </Flex>

        <Box>
          <Avatar size="sm" src={agency?.logo?.url} />
        </Box>
        <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
        </Flex>

        <Text fontSize="lg">
          {title.length > 30 ? `${title.substring(0, 30)}...` : title}
        </Text>
      </Box>
    </Flex>
  </Link>
);

export default Property;
