import { AddIcon, Icon } from "@chakra-ui/icons";
import {
  useColorModeValue,
  useDisclosure,
  chakra,
  Flex,
  VisuallyHidden,
  HStack,
  Button,
  IconButton,
  VStack,
  CloseButton,
  Box,
  Text,
  Center,
  Stack,
  useBreakpointValue,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { AiOutlineClockCircle, AiOutlineMenu } from "react-icons/ai";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";

const HeroSection = () => {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

  const splitVert = useBreakpointValue({ base: true, lg: false });

  return (
    <Layout bgColor="#23272a">
      {!splitVert ? (
        <Box mt="25vh" ml="15vw">
          <HStack spacing="10vw">
            <Stack spacing={5}>
              <Text fontSize={35} fontWeight="bold">
                Revolutionize
                <br /> investment strategies
                <br /> with cutting-edge ML
                <br /> and AI technology.
              </Text>
              <Text fontSize={20}>
                Automate property research,
                <br />
                empowering your business to make <br />
                data-driven decisions based on personalized <br />
                investment criteria.
              </Text>
              <Button bg="#850032" w="8rem" h="2rem">
                Learn more
              </Button>
            </Stack>
            <HStack spacing="5vw">
              <Box bg="white" w="20rem" h="21em" borderRadius={10}>
                <Center h="100%" w="100%">
                  <Text fontSize={45} fontWeight="bold" textColor="black">
                    50,000+
                    <br />
                    Properties
                    <br />
                    Sold
                    <br />
                    Annually
                  </Text>
                </Center>
              </Box>
              <Box bg="#850032" w="20rem" h="21em" borderRadius={10}>
                <Center h="100%" w="100%">
                  <Text fontSize={45} fontWeight="bold" textColor="white">
                    15%
                    <br />
                    Growth
                    <br />
                    In the last
                    <br />
                    Decade
                  </Text>
                </Center>
              </Box>
            </HStack>
          </HStack>
        </Box>
      ) : (
        <VStack
          mt="15vh"
          justifyContent="center"
          alignItems="center"
          spacing="10vw"
        >
          <Stack spacing={5}>
            <Text fontSize={35} fontWeight="bold">
              Revolutionize
              <br /> investment strategies
              <br /> with cutting-edge ML
              <br /> and AI technology.
            </Text>
            <Text fontSize={15}>
              Automate property research,
              <br />
              empowering your business to make <br />
              data-driven decisions based on personalized <br />
              investment criteria.
            </Text>
            <Button bg="#850032" w="8rem" h="2rem">
              Learn more
            </Button>
          </Stack>
          <VStack spacing="5vw" right="0" alignSelf="parent">
            <Box bg="white" w="22rem" h="22em" borderRadius={10}>
              <Center h="100%" w="100%">
                <Text fontSize={45} fontWeight="bold" textColor="black">
                  50,000+
                  <br />
                  Properties
                  <br />
                  Sold
                  <br />
                  Annually
                </Text>
              </Center>
            </Box>
            <Box bg="#850032" w="22rem" h="22em" borderRadius={10}>
              <Center h="100%" w="100%">
                <Text fontSize={45} fontWeight="bold" textColor="white">
                  15%
                  <br />
                  Growth
                  <br />
                  In the last
                  <br />
                  Decade
                </Text>
              </Center>
            </Box>
          </VStack>
        </VStack>
      )}
    </Layout>
  );
};

export default HeroSection;
