import { useRouter, withRouter } from "next/router";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import format from "format-number";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";
import { BsCircleFill } from "react-icons/bs";
import NextLink from "next/link";

import {
  Center,
  VStack,
  Text,
  HStack,
  Grid,
  GridItem,
  Badge,
  Tooltip,
  Box,
  Icon,
  Image,
  Link,
  Tag,
  TagLabel,
  TagRightIcon,
  Flex,
  IconButton,
  Button,
  useBreakpointValue,
  useMediaQuery,
  Spinner,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import {
  AddIcon,
  ArrowBackIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
} from "@chakra-ui/icons";
import formatPropertyType from "../utils/formatPropertyType";
import axios from "axios";
import { parseCookies } from "../utils/parseCookies";
import { HalfStarContainer } from "../components/VariableStar";
import { SP } from "next/dist/shared/lib/utils";
import { evalColor } from "../utils/evalColor";

const MapPin = ({ onClick, hoverArr, index }: any) => {
  return (
    <Icon
      as={HiLocationMarker}
      onClick={() => {}}
      boxSize="4vh"
      color={hoverArr ? (hoverArr[index] ? "red.500" : "black") : "black"}
      //   _hover={{
      //     color: "gray.400",
      //     cursor: "pointer",
      //     zIndex: 99,
      //   }}
      zIndex={1}
      _hover={{
        color: "red.500",
      }}
    />
  );
};

const PropertyInfo = (props: any) => {
  const [propertyData, setPropertyData] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(true);
  const [defaultProps, setDefaultProps] = useState(null);
  const [flipScore, setFlipScore] = useState(null);
  const [rentScore, setRentScore] = useState(null);
  const router = useRouter();
  const [mobile] = useMediaQuery("(max-width: 500px)");

  const sm = useBreakpointValue({ md: true, lg: false, sm: true });

  useEffect(() => {
    if (propertyData || !props.router.query.data) {
      return;
    }

    const parsedData = JSON.parse(props.router.query.data);
    setPropertyData(parsedData);

    setDefaultProps({
      center: {
        lat: parsedData["location"]["coordinates"][0]["lat"],
        lng: parsedData["location"]["coordinates"][0]["lon"],
      },
      zoom: 12,
    });

    localStorage.setItem("propertyData", props.router.query.data);
  }, [props.router.query]);

  useEffect(() => {
    const propertyDataUparsed = localStorage.getItem("propertyData");

    if (!propertyDataUparsed) {
      return;
    }

    const propertyDataParsed = JSON.parse(propertyDataUparsed);

    setPropertyData(propertyDataParsed);

    setDefaultProps({
      center: {
        lat: propertyDataParsed["location"]["coordinates"][0]["lat"],
        lng: propertyDataParsed["location"]["coordinates"][0]["lon"],
      },
      zoom: 12,
    });
  }, []);

  useEffect(() => {
    if (!propertyData || rentScore != null || flipScore != null) {
      return;
    }

    const address1 = propertyData["location"]["line"];
    const address2 = `${propertyData["location"]["city"]}, ${propertyData["location"]["state_code"]}`;

    axios
      .get("https://backend.upreal.us/propertyInfo", {
        params: {
          address1,
          address2,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.error) {
          setFlipScore(-1);
          setRentScore(-1);
          return;
        }

        setFlipScore(response.data["Flip Score"]);
        setRentScore(response.data["Rent Score"]);
      });
  }, [propertyData]);

  return (
    <Layout bgColor="#23272a">
      {propertyData && defaultProps ? (
        <Center mt="15vh">
          <VStack h="100%" w="100%">
            <Grid
              templateColumns={
                !sm ? "0.6fr 1fr 1fr" : mobile ? "1fr" : "1fr 1fr"
              }
              templateRows="1fr"
              w="80%"
              bg="rgba(128, 203, 196, 0.1)"
              borderRadius="lg"
              p={3}
            >
              {!sm ? (
                <IconButton
                  aria-label="back"
                  maxW="100px"
                  icon={<ArrowBackIcon />}
                  onClick={() => router.push("/propertySearch")}
                />
              ) : null}

              <GridItem w="100%" h="100%" colSpan={1} rowSpan={1} gap={-1}>
                <HStack>
                  <VStack
                    justifyContent="space-between"
                    alignItems="start"
                    minW="200px"
                    maxW="200px"
                    spacing={6}
                  >
                    <Center>
                      <VStack alignItems="start" spacing={2}>
                        <Text fontSize="15pt" fontWeight="bold">
                          {format({ prefix: "$" })(
                            propertyData["current_estimate"]
                          )}
                        </Text>
                        <Text>{propertyData["location"]["line"]}.</Text>
                        <Tag>
                          <HStack>
                            <Icon
                              as={BsCircleFill}
                              boxSize="1vh"
                              color="lightgreen"
                            />
                            <Text>Active Listing</Text>
                          </HStack>
                        </Tag>
                      </VStack>
                    </Center>
                    <Center>
                      <VStack alignItems="start">
                        <Text fontSize="12pt">
                          {`${propertyData["location"]["city"]}, ${propertyData["location"]["state_code"]}`}
                          {", "}
                          {`${propertyData["location"]["zip_code"]}`}
                        </Text>
                        <HStack>
                          <Badge variant="outline" colorScheme="green">
                            {propertyData["property_description"]["beds"]} BEDS
                          </Badge>
                          <Badge variant="outline" colorScheme="green">
                            {propertyData["property_description"]["baths"]}{" "}
                            BATHS
                          </Badge>
                        </HStack>
                        <HStack>
                          <Badge variant="outline" colorScheme="green">
                            {propertyData["property_description"]["prop_sqft"]}{" "}
                            SQFT
                          </Badge>
                          {propertyData["listing_information"]["flags"][
                            "is_new_listing"
                          ] ? (
                            <Badge variant="solid" colorScheme="green">
                              New Listing
                            </Badge>
                          ) : null}
                        </HStack>
                      </VStack>
                    </Center>
                  </VStack>
                  <VStack
                    justifyContent="space-between"
                    spacing={6}
                    alignItems="start"
                    minW="200px"
                    maxW="200px"
                  >
                    <Center>
                      <VStack alignItems="start" spacing={-1}>
                        <Text as="span" color="gray.400" fontSize="12pt">
                          Lot Size
                        </Text>
                        <Text fontSize="20pt" fontWeight="bold">
                          {selectedUnit
                            ? format()(
                                propertyData["property_description"][
                                  "lot_sqft"
                                ],
                                {
                                  noUnits: true,
                                }
                              )
                            : (
                                propertyData["property_description"][
                                  "lot_sqft"
                                ] / 43560
                              ).toFixed(3)}
                        </Text>
                        <HStack>
                          <Text
                            onClick={() => setSelectedUnit(true)}
                            _hover={{ cursor: "pointer" }}
                            textDecoration={selectedUnit ? "underline" : "none"}
                          >
                            sq.ft.
                          </Text>
                          <Text
                            onClick={() => setSelectedUnit(false)}
                            _hover={{ cursor: "pointer" }}
                            textDecoration={
                              !selectedUnit ? "underline" : "none"
                            }
                          >
                            acre
                          </Text>
                        </HStack>
                      </VStack>
                    </Center>
                    <Center>
                      <VStack alignItems="start">
                        <Text as="span" color="gray.400" fontSize="12pt">
                          Price per sqft.
                        </Text>
                        <Text fontSize="20pt" fontWeight="bold">
                          $
                          {Math.round(
                            propertyData["current_estimate"] /
                              propertyData["property_description"]["prop_sqft"]
                          )}
                        </Text>
                      </VStack>
                    </Center>
                  </VStack>
                </HStack>
              </GridItem>

              <GridItem colSpan={1} w="100%" h="100%">
                <VStack spacing={5}>
                  <HStack
                    justifyContent="space-between"
                    minW="250px"
                    maxW="250px"
                  >
                    <VStack>
                      <Text
                        as="span"
                        fontSize="12pt"
                        color="gray.400"
                        alignSelf="start"
                      >
                        Rent Score
                      </Text>
                      <Tooltip
                        hasArrow
                        label={`Rent Score (${rentScore}/5)`}
                        bg="gray.300"
                        color="black"
                      >
                        {rentScore == null ? (
                          <Spinner />
                        ) : rentScore == -1 ? (
                          <Text>Error Getting Data</Text>
                        ) : (
                          <Box display="flex" alignItems="center">
                            {mobile ? (
                              Array(5)
                                .fill("")
                                .map((_, i) => {
                                  if (i < parseInt(rentScore)) {
                                    return (
                                      <StarIcon key={i} color="yellow.500" />
                                    );
                                  } else if (i === parseInt(rentScore)) {
                                    return (
                                      <HalfStarContainer
                                        key={i}
                                        percentage={
                                          (rentScore % parseInt(rentScore)) *
                                          100
                                        }
                                      >
                                        <StarIcon color="yellow.500" />
                                        <StarIcon color="gray.300" />
                                      </HalfStarContainer>
                                    );
                                  } else {
                                    return (
                                      <StarIcon key={i} color="gray.300" />
                                    );
                                  }
                                })
                            ) : (
                              <Text
                                fontSize="20pt"
                                fontWeight="bold"
                                display="inline-flex"
                              >
                                <Text color={evalColor(rentScore)}>
                                  {rentScore}
                                </Text>
                                /5
                              </Text>
                            )}
                          </Box>
                        )}
                      </Tooltip>
                    </VStack>
                    <VStack>
                      <Text
                        as="span"
                        fontSize="12pt"
                        color="gray.400"
                        alignSelf="start"
                      >
                        Flip Score
                      </Text>
                      <Tooltip
                        hasArrow
                        label={`Flip Score (${flipScore}/5)`}
                        bg="gray.300"
                        color="black"
                      >
                        {flipScore == null ? (
                          <Spinner />
                        ) : flipScore == -1 ? (
                          <Text>Error Getting Data</Text>
                        ) : (
                          <Box display="flex" alignItems="center">
                            {mobile ? (
                              Array(5)
                                .fill("")
                                .map((_, i) => {
                                  if (i < parseInt(flipScore)) {
                                    return (
                                      <StarIcon key={i} color="blue.500" />
                                    );
                                  } else if (i === parseInt(flipScore)) {
                                    return (
                                      <HalfStarContainer
                                        key={i}
                                        percentage={
                                          (flipScore % parseInt(flipScore)) *
                                          100
                                        }
                                      >
                                        <StarIcon color="blue.500" />
                                        <StarIcon color="gray.300" />
                                      </HalfStarContainer>
                                    );
                                  } else {
                                    return (
                                      <StarIcon key={i} color="gray.300" />
                                    );
                                  }
                                })
                            ) : (
                              <Text
                                fontSize="20pt"
                                fontWeight="bold"
                                display="inline-flex"
                              >
                                <Text color={evalColor(flipScore)}>
                                  {flipScore}
                                </Text>
                                /5
                              </Text>
                            )}
                          </Box>
                        )}
                      </Tooltip>
                    </VStack>
                  </HStack>
                  <HStack
                    justifyContent="space-between"
                    minW="250px"
                    maxW="250px"
                  >
                    <VStack>
                      <Text
                        as="span"
                        fontSize="12pt"
                        color="gray.400"
                        alignSelf="start"
                      >
                        Area Score
                      </Text>
                      <Tooltip
                        hasArrow
                        label="Area Score: Location Outlook (1-5)"
                        bg="gray.300"
                        color="black"
                      >
                        <Box display="flex" alignItems="center">
                          {mobile ? (
                            Array(5)
                              .fill("")
                              .map((_, i) => (
                                <StarIcon
                                  key={i}
                                  color={i < 4 ? "teal.500" : "gray.300"}
                                />
                              ))
                          ) : (
                            <Text
                              fontSize="20pt"
                              fontWeight="bold"
                              display="inline-flex"
                            >
                              <Text color={evalColor(4)}>
                                {(4.0).toFixed(1)}
                              </Text>
                              /5
                            </Text>
                          )}
                        </Box>
                      </Tooltip>
                    </VStack>
                    {!mobile ? (
                      <VStack>
                        <Text
                          as="span"
                          fontSize="12pt"
                          color="gray.400"
                          alignSelf="start"
                        >
                          Profile Fit Level
                        </Text>
                        <Center alignSelf="end">
                          <Tooltip
                            hasArrow
                            label="Location Fit w/ Criteria (Bad, Medium, Good)"
                            bg="gray.300"
                            color="black"
                          >
                            <Text fontWeight="bold" fontSize="xl">
                              <Tag
                                size="lg"
                                key={"sm"}
                                variant="outline"
                                colorScheme="yellow"
                              >
                                <TagLabel>Medium Fit</TagLabel>
                              </Tag>
                            </Text>
                          </Tooltip>
                        </Center>
                      </VStack>
                    ) : null}
                  </HStack>
                </VStack>
              </GridItem>
            </Grid>

            <HStack w="80%" mt="5vh">
              <Center w="100%" justifyContent="space-between">
                <Link
                  as={NextLink}
                  href={propertyData["mls_listing"]}
                  rel="noopener noreferrer"
                  target="_blank"
                  w={!mobile ? "48%" : "full"}
                >
                  <Image
                    src={propertyData["photo"]}
                    alt={"House Photo"}
                    w="100%"
                    h="40vh"
                    borderRadius="lg"
                    _hover={{ cursor: "pointer" }}
                  />
                </Link>
                {!mobile ? (
                  <Box
                    bg="white"
                    w="48%"
                    h="40vh"
                    alignSelf="start"
                    overflow="hidden"
                    borderRadius="lg"
                  >
                    <>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "AIzaSyAryVPH3MLio2aysuqxM4HI5w8UhhaAljA",
                          language: "en",
                        }}
                        defaultCenter={defaultProps?.center}
                        defaultZoom={defaultProps?.zoom}
                      >
                        <MapPin
                          onClick={() => {}}
                          key={0}
                          index={0}
                          lat={defaultProps.center.lat}
                          lng={defaultProps.center.lng}
                        />
                      </GoogleMapReact>
                    </>
                  </Box>
                ) : null}
              </Center>
            </HStack>

            <HStack alignSelf="start" mt="5vh" spacing="5vw" ml="10vw">
              <VStack alignItems="start" spacing={1}>
                <Text as="span" color="gray.400">
                  Property Type
                </Text>
                <Text fontSize="20pt" fontWeight="bold">
                  {formatPropertyType(
                    propertyData["property_description"]["type"]
                  )}
                </Text>
              </VStack>
              <VStack alignItems="start" spacing={1}>
                <Text as="span" color="gray.400">
                  Crime Grade
                </Text>
                <Text fontSize="20pt" fontWeight="bold">
                  {["A-", "A", "B+"][Math.floor(Math.random() * 3)]}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Center>
      ) : (
        <Text>no info</Text>
      )}
    </Layout>
  );
};

export default withRouter(PropertyInfo);
