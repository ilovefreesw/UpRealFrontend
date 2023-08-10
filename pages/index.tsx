import Link from "next/link";
import { useEffect, useState } from "react";
import HeroSection from "../sections/HeroSection";
import {
  Box,
  Grid,
  Heading,
  Spinner,
  VStack,
  Text,
  Center,
  GridItem,
  HStack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useBreakpointValue,
} from "@chakra-ui/react";
import isLoggedIn from "../utils/isLoggedIn";
import Layout from "../components/Layout";
import PropertyCarousel from "../components/PropertyCarousel";
import PropertyCard from "../components/PropertyCard";
import axios from "axios";
import Profile from "../components/Profile";

const IndexPage = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [propInfo, setPropInfo] = useState([]);
  const [profileList, setProfileList] = useState(null);
  const layout = useBreakpointValue({ base: false, lg: true });

  https: useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");

    isLoggedIn().then((response) => {
      setLoggedIn(response);
      setLoading(false);
    });

    axios
      .get("https://seashell-app-dxi4j.ondigitalocean.app/getProfileList", {
        withCredentials: true,
      })
      .then((response) => {
        if (!response.data.error) {
          setProfileList({ profile_list: response.data.profiles });
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://seashell-app-dxi4j.ondigitalocean.app/getLikedProperties", {
        withCredentials: true,
      })
      .then((response) => {
        if (
          response.status == 200 &&
          !response.data.error &&
          response.data.props.length > 0
        ) {
          setPropInfo(response.data.props);
        }
      });
  }, []);

  return (
    <Box>
      {!loggedIn ? (
        <HeroSection />
      ) : loading ? (
        <Spinner />
      ) : (
        <Layout bgColor="#23272a" overflow="hidden">
          <VStack spacing={5} ml="7vw" mt="15vh" alignItems="start">
            <VStack
              spacing={5}
              alignItems="start"
              bgColor="gray.700"
              padding="2rem"
              borderRadius="lg"
            >
              <Heading>
                Hey {localStorage.getItem("fullName").split(" ")[0]},
              </Heading>
              <Heading fontSize="15pt">
                Welcome to your UpReal Dashboard!
              </Heading>
            </VStack>
          </VStack>

          {layout ? (
            <VStack w="100%" alignItems="start" ml="7vw" mt="3vh">
              {profileList && profileList.profile_list
                ? profileList.profile_list.map((item, i) => {
                    return (
                      <HStack
                        justifyContent="space-evenly"
                        w="90%"
                        bg="blackAlpha.500"
                        borderRadius="lg"
                        position="relative"
                      >
                        <Heading position="absolute" left="10" top="10">
                          {item.profile_name.value}
                        </Heading>
                        <HStack w="100%" justifyContent="space-evenly" mt="5vh">
                          <Profile profile_attr={item} key={i}></Profile>
                          <StatGroup>
                            <VStack alignItems="start">
                              <Stat>
                                <StatLabel fontSize="18pt" color="gray.600">
                                  # Searches
                                </StatLabel>
                                <StatNumber fontSize="24pt">345,670</StatNumber>
                              </Stat>

                              <Stat>
                                <StatLabel fontSize="18pt" color="gray.600">
                                  # Likes (All Time)
                                </StatLabel>
                                <StatNumber fontSize="24pt">45</StatNumber>
                              </Stat>
                            </VStack>
                          </StatGroup>
                          <Box h="100%">
                            <PropertyCarousel
                              slides={propInfo.map((val, idx) => {
                                if (val.profile != item.profile_name.value) {
                                  return;
                                }

                                return (
                                  <PropertyCard
                                    profileFit={
                                      val["Fit Score"] ? val["Fit Score"] : -1
                                    }
                                    imageUrl={val.imageUrl}
                                    imageAlt="property image"
                                    apiInfo={JSON.parse(val.apiInfo)}
                                    baths={val.baths}
                                    beds={val.beds}
                                    city={val.city}
                                    formattedPrice={val.formattedPrice}
                                    index={idx}
                                    propId={"0"}
                                    title={val.title}
                                    type={val.type}
                                    key={idx}
                                    small
                                    selectedProfile={val.profile}
                                  />
                                );
                              })}
                            />
                          </Box>
                        </HStack>
                      </HStack>
                    );
                  })
                : null}
            </VStack>
          ) : null}
        </Layout>
      )}
    </Box>
  );
};

export default IndexPage;
