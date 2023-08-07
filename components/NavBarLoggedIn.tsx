import { AddIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
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
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import isLoggedIn from "../utils/isLoggedIn";
import { parseCookies } from "../utils/parseCookies";

const NavBarLoggedIn = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const router = useRouter();
  const [buttonOpen, setButtonOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const initals = localStorage.getItem("initals");
    setName(initals ?? "");
  }, []);

  return (
    <React.Fragment>
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
              mr={1}
              color="brand.500"
              display={{
                base: "none",
                md: "inline-flex",
              }}
              spacing={5}
              justifyContent="flex-end"
              w="30vw"
            >
              <Button
                bg="black"
                onClick={() => {
                  router.push("/profiles");
                }}
              >
                Profiles
              </Button>
              <Button
                bg="black"
                onClick={() => {
                  router.push("/propertySearch");
                }}
              >
                Property Explorer
              </Button>
              <Menu placement="right-start" closeOnBlur={false}>
                <MenuButton
                  as={Button}
                  borderRadius="full"
                  rightIcon={
                    buttonOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
                  }
                  h="100%"
                  onClick={() => setButtonOpen(!buttonOpen)}
                >
                  <Avatar
                    ml={-4}
                    size="md"
                    name={name}
                    bg="teal.300"
                    alignSelf="start"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      setButtonOpen(!buttonOpen);
                      router.push("/settings");
                    }}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem onClick={() => setButtonOpen(!buttonOpen)}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>

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

                <Button
                  w="full"
                  bg="black"
                  onClick={() => router.push("/profile")}
                >
                  Account Settings
                </Button>
                <Button
                  w="full"
                  bg="black"
                  onClick={() => router.push("/propertySearch")}
                >
                  Property Explorer
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default NavBarLoggedIn;
