import Layout from "../components/Layout";

import {
  Center,
  VStack,
  Text,
  HStack,
  IconButton,
  Button,
  Avatar,
  Spacer,
  Heading,
  Card,
  CardBody,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import formatPropertyType from "../utils/formatPropertyType";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "../utils/parseCookies";

const Settings = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const parsedCookies = parseCookies(document.cookie);

    if (!parsedCookies || !parsedCookies["login_token"]) {
      return;
    }

    axios
      .get("https://seashell-app-dxi4j.ondigitalocean.app/getUserInfo", {
        params: { token: parsedCookies["login_token"] },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.error) {
          return;
        }

        setUserInfo(response.data);
      });
  }, []);
  return (
    <Layout bgColor="#23272a">
      <Center>
        <HStack spacing="5vw" justifyContent="center">
          <VStack
            ml="5vw"
            mt="15vh"
            alignItems="center"
            bgColor="rgba(0, 128, 128, 0.3)"
            minW="30vw"
            overflow="auto"
            p="3vh"
            borderRadius="lg"
          >
            <Center>
              <Avatar
                size="lg"
                name={`${userInfo["firstName"]} ${userInfo["lastName"]}`}
                bg="teal.300"
                color="black"
                alignSelf="start"
              />
            </Center>
            <Center>
              <VStack alignItems="center" justifyContent="center">
                <Text fontSize="13pt">
                  Joined {userInfo ? userInfo["createdAt"] : <Spinner />}
                </Text>
              </VStack>
            </Center>

            <Spacer mt="5vh" />

            <Heading>Your Details</Heading>
            <VStack alignItems="start" w="100%">
              <Text fontSize="13pt" fontWeight="semibold" ml="7vw">
                Email: {userInfo ? userInfo["email"] : <Spinner />}
              </Text>
              <Text fontSize="13pt" fontWeight="semibold" ml="7vw">
                Username: {userInfo ? userInfo["username"] : <Spinner />}
              </Text>
              <Text fontSize="13pt" fontWeight="semibold" ml="7vw">
                First Name: {userInfo ? userInfo["firstName"] : <Spinner />}
              </Text>
              <Text fontSize="13pt" fontWeight="semibold" ml="7vw">
                Last Name: {userInfo ? userInfo["lastName"] : <Spinner />}
              </Text>
              <HStack ml="7vw">
                <Text fontSize="13pt" fontWeight="semibold">
                  Password
                </Text>
                <Button borderRadius="full">Change</Button>
              </HStack>
            </VStack>
          </VStack>
        </HStack>
      </Center>
    </Layout>
  );
};

export default Settings;
