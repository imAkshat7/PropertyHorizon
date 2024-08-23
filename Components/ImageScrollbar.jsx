"use client";

import { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize='2xl'
        cursor='pointer'
      />
    </Flex>
  );
}

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginLeft='1'>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize='2xl'
        cursor='pointer'
      />
    </Flex>
  );
}

const ImageScrollbar = ({ data }) => {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
    >
      {data.map((item) => (
        <Box
          key={item.id}
          width='910px'
          overflow='hidden'
          p='1'
          style={{ display: 'inline-block', position: 'relative' }}
        >
          <Image
            src={item.url}
            alt={`Image ${item.id}`}
            fill
            style={{ objectFit: 'cover' }}  // Ensures the image covers the container
            placeholder="blur"
            blurDataURL={item.url}
          />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default ImageScrollbar;
