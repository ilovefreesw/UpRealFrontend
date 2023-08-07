import {
  Box,
  Flex,
  HStack,
  Text,
  Image,
  Center,
  Heading,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { TextProps } from "recharts";

const PropertyCarousel = ({ slides }: any) => {
  const arrowStyles = {
    cursor: "pointer",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  return (
    <Flex
      w="full"
      h="100%"
      maxW="45vw"
      borderRadius="lg"
      p={10}
      alignItems="center"
      justifyContent="center"
    >
      <VStack w="full" overflow="hidden" pos="relative">
        <Heading fontSize="18pt">Liked Properties</Heading>
        <Flex w="full" overflow="hidden" pos="relative">
          <Flex h="350px" w="full" {...carouselStyle}>
            {slides.map((slide, sid) => (
              <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
                <Text
                  color="white"
                  fontSize="xs"
                  p="8px 12px"
                  pos="absolute"
                  top="0"
                >
                  {sid + 1} / {slidesCount}
                </Text>
                <Center h="100%">{slide}</Center>
              </Box>
            ))}
          </Flex>
          <Text
            {...(arrowStyles as any)}
            left="0"
            onClick={prevSlide}
            position="absolute"
          >
            &#10094;
          </Text>
          <Text
            {...(arrowStyles as any)}
            right="0"
            onClick={nextSlide}
            position="absolute"
          >
            &#10095;
          </Text>
          <HStack justify="center" pos="absolute" bottom="8px" w="full">
            {Array.from({
              length: slidesCount,
            }).map((_, slide) => (
              <Box
                key={`dots-${slide}`}
                cursor="pointer"
                boxSize={["7px", null, "15px"]}
                m="0 2px"
                bg={
                  currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"
                }
                rounded="50%"
                display="inline-block"
                transition="background-color 0.6s ease"
                _hover={{
                  bg: "blackAlpha.200",
                }}
                onClick={() => setSlide(slide)}
              ></Box>
            ))}
          </HStack>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default PropertyCarousel;
