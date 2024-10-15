import { StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  Icon,
  IconButton,
  Image,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import format from "format-number";
import { useHover } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

interface PropertyCardProps {
  imageUrl: string;
  imageAlt: string;
  beds: number;
  index: number;
  baths: number;
  type: string;
  title: string;
  formattedPrice: number;
  hoverArr?: Array<any>;
  setHoverArr?: any;
  apiInfo: any;
  city: string;
  propId: string;
  small?: boolean;
  selectedProfile: string;
  profileFit: number;
}

const PropertyCard = ({
  imageUrl,
  imageAlt,
  beds,
  baths,
  title,
  formattedPrice,
  index,
  hoverArr,
  type,
  setHoverArr,
  apiInfo,
  city,
  propId,
  small,
  selectedProfile,
  profileFit,
}: PropertyCardProps) => {
  const property = {
    imageUrl,
    imageAlt,
    beds,
    baths,
    title,
    formattedPrice,
    type,
    city,
    propId,
  };

  const hoverRef = useRef(null);
  const hover = useHover(hoverRef);

  const [clicked, setClicked] = useState(small ? true : false);
  const toast = useToast();

  const flipScore = 3.0;
  const rentScore = 4.0;
  const fitNum = profileFit;
  const fit: string = fitNum > 80 ? "Strong" : fitNum > 40 ? "Medium" : "Weak";

  useEffect(() => {
    if (!hoverArr || !setHoverArr) {
      return;
    }

    let n = [];

    for (let i = 0; i < 9; i++) {
      if (i == index) {
        n.push(true);
      } else {
        n.push(false);
      }
    }

    setHoverArr(n);
  }, [hover]);

  const router = useRouter();

  return (
    <Box
      w={!small ? "100%" : "65%"}
      maxH={small ? "350px" : null}
      h="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow={small ? "auto" : "hidden"}
      ref={hoverRef}
      _hover={{ cursor: "pointer" }}
    >
      <Box position="relative" w="100%">
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          w="100%"
          h="100%"
          minH={small ? "200px" : "250px"}
          maxH={small ? "200px" : "250px"}
          onClick={() => {
            router.push(
              {
                pathname: "/propertyInfo",
                query: { data: JSON.stringify(apiInfo) },
              },
              "/propertyInfo"
            );
          }}
        />
        <IconButton
          position="absolute"
          top="3%"
          right="3%"
          bgColor="#23272a"
          p="1vh 1vh 1vh 1vh"
          _hover={{ bgColor: "white", color: "black" }}
          cursor="pointer"
          borderRadius="md"
          aria-label="like"
          icon={
            <Icon as={clicked ? AiFillHeart : AiOutlineHeart} boxSize="3vh" />
          }
          color={clicked ? "red.500" : ""}
          onClick={async () => {
            if (!selectedProfile) {
              toast({
                title: "Error",
                description: "Select Profile to Like Property",
                status: "error",
                colorScheme: "red",
                duration: 2000,
                isClosable: true,
              });
              return;
            }

            setClicked(!clicked);

            await axios.post(
              "https://backend.upreal.us/setLike",
              {
                propId,
                imageUrl,
                imageAlt,
                beds,
                baths,
                title,
                formattedPrice,
                type,
                city,
                apiInfo: JSON.stringify(apiInfo),
                profileName: selectedProfile,
              },
              {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
              }
            );
          }}
        />
      </Box>

      <Grid
        templateColumns="0.63fr 0.37fr"
        onClick={() => {
          router.push(
            {
              pathname: "/propertyInfo",
              query: { data: JSON.stringify(apiInfo) },
            },
            "/propertyInfo"
          );
        }}
      >
        <Box pl="4" pt="3">
          <Box display="flex" alignItems="baseline">
            {apiInfo["listing_information"]["flags"]["is_new_listing"] ? (
              <Badge borderRadius="full" px="2" colorScheme="teal" mr={2}>
                New
              </Badge>
            ) : null}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              {property.beds} beds &bull; {property.baths} baths
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {property.title}.
          </Box>
          <Box noOfLines={1}>{property.city}</Box>

          <HStack spacing={2}>
            <Text fontWeight="semibold" color="teal.300">
              {format({ prefix: "$" })(property.formattedPrice)}
            </Text>
          </HStack>
        </Box>

        <VStack spacing={2} alignItems="start" pt="3">
          <Tooltip
            hasArrow
            label={"Rent Score: " + `${rentScore.toFixed(1)}/5`}
            bg="gray.300"
            color="black"
          >
            <Tag
              size="md"
              colorScheme={
                rentScore > 3 ? "green" : rentScore < 2 ? "darkred" : "yellow"
              }
              borderRadius="full"
            >
              <TagLabel>Rent Score: {rentScore.toFixed(1)}</TagLabel>
            </Tag>
          </Tooltip>

          <Tooltip
            hasArrow
            label={"Flip Score: " + `${flipScore.toFixed(1)}/5`}
            bg="gray.300"
            color="black"
          >
            <Tag
              size="md"
              colorScheme={
                flipScore > 3 ? "green" : flipScore < 2 ? "darkred" : "yellow"
              }
              borderRadius="full"
            >
              <TagLabel>Flip Score: {flipScore.toFixed(1)}</TagLabel>
            </Tag>
          </Tooltip>
          {fitNum == -1 ? null : (
            <Tooltip
              hasArrow
              label={"Fit with profile " + `${fitNum.toString()}/100`}
              bg="gray.300"
              color="black"
            >
              <Tag
                size="md"
                key={"sm"}
                variant="outline"
                colorScheme={
                  fitNum > 80 ? "green" : fitNum > 40 ? "yellow" : "red"
                }
              >
                <TagLabel>{fit} Fit</TagLabel>
              </Tag>
            </Tooltip>
          )}
        </VStack>
      </Grid>
    </Box>
  );
};

export default PropertyCard;
