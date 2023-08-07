import { AddIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import isLoggedIn from "../utils/isLoggedIn";
import NavBarLoggedIn from "./NavBarLoggedIn";

const NavBar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    isLoggedIn().then((response) => {
      setLoggedIn(response);
    });
  }, []);

  return (
    <React.Fragment>
      {loggedIn ? (
        <NavBarLoggedIn />
      ) : (
        <chakra.header
          bg="#2C3135"
          w="full"
          px={{
            base: 2,
            sm: 4,
          }}
          h="9vh"
          py={4}
          shadow="md"
          pos="fixed"
          zIndex={99}
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Flex>
              <chakra.a
                href="/"
                title="UpReal Home Page"
                display="flex"
                alignItems="center"
              >
                <AddIcon />
                <VisuallyHidden>UpReal</VisuallyHidden>
              </chakra.a>
              <chakra.h1
                fontSize="2xl"
                fontWeight="medium"
                ml="2"
                _hover={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push("/");
                }}
              >
                UpReal
              </chakra.h1>
            </Flex>
            <HStack display="flex" alignItems="center" spacing={5}>
              <HStack
                spacing={5}
                mr={1}
                color="brand.500"
                display={{
                  base: "none",
                  md: "inline-flex",
                }}
              >
                {" "}
                <Button bg="black">Solutions</Button>
                <Button bg="black">Products</Button>
              </HStack>
              <Button
                bg="#850032"
                size="md"
                _hover={{ bg: "#7afffc", textColor: "black" }}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Log In
              </Button>
              <Box
                display={{
                  base: "inline-flex",
                  md: "none",
                }}
              >
                <IconButton
                  display={{
                    base: "flex",
                    md: "none",
                  }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color="gray.800"
                  _dark={{
                    color: "inherit",
                  }}
                  variant="ghost"
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />

                <VStack
                  pos="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  p={2}
                  pb={4}
                  m={2}
                  bg={bg}
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                >
                  <CloseButton
                    aria-label="Close menu"
                    onClick={mobileNav.onClose}
                  />

                  <Button w="full" bg="black">
                    Solutions
                  </Button>
                  <Button w="full" bg="black">
                    Products
                  </Button>
                  <Button
                    w="full"
                    bg="#850032"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Log in
                  </Button>
                </VStack>
              </Box>
            </HStack>
          </Flex>
        </chakra.header>
      )}
    </React.Fragment>
  );
};

export default NavBar;
