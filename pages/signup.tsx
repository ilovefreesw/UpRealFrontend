import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Text,
  Link,
  Center,
  HStack,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import validateUsername from "../utils/validateUsername";
import validatePassword from "../utils/validatePassword";
import validateConfirmPassword from "../utils/validateConfirmPassword";
import validateName from "../utils/validateName";
import validateEmail from "../utils/validateEmail";
import SuccessAlert from "../components/alerts/successAlert";
import axios from "axios";

const SignUp = () => {
  const loggedIn = false;

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setShowErrors(true);
    setUsername(e.target.value);
  };
  const handleFirstNamehange = (e) => {
    setShowErrors(true);
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setShowErrors(true);
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setShowErrors(true);
    setEmail(e.target.value);
  };
  const handleCompanyChange = (e) => {
    setShowErrors(true);
    setCompany(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setShowErrors(true);
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setShowErrors(true);
    setConfirmPassword(e.target.value);
  };

  let [usernameMsg, setUsernameMsg] = useState("");
  let [emailMsg, setEmailMsg] = useState("");

  let clientUsernameError = validateUsername(username);
  let clientEmailError = validateEmail(email);

  let isUsernameError = clientUsernameError[0];

  if (!usernameMsg) {
    setUsernameMsg(clientUsernameError[1] as string);
  }

  let isEmailError = clientEmailError[0];

  if (!emailMsg) {
    setEmailMsg(clientEmailError[1] as string);
  }

  let [isFirstNameError, firstNameMsg] = validateName("First name", firstName);
  let [isLastNameError, lastNameMsg] = validateName("Last name", lastName);
  let [isPasswordError, passwordMsg] = validatePassword(password);
  let [isConfirmPasswordError, confirmPasswordMsg] = validateConfirmPassword(
    password,
    confirmPassword
  );
  let [isUsernameServerError, setIsUsernameServerError] = useState(false);
  let [isEmailServerError, setIsEmailServerError] = useState(false);
  const toast = useToast();

  return (
    <Layout bgColor="#23272a" forceFill>
      <Center minH={"100vh"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to kick off your investment journey
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={"#2c3135"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl
                    id="firstName"
                    isRequired
                    isInvalid={showErrors && (isFirstNameError as boolean)}
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" onChange={handleFirstNamehange} />
                    {!isFirstNameError ? (
                      <></>
                    ) : (
                      <FormErrorMessage>{firstNameMsg}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    id="lastName"
                    isRequired
                    isInvalid={showErrors && (isLastNameError as boolean)}
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" onChange={handleLastNameChange} />
                    {!isLastNameError ? (
                      <></>
                    ) : (
                      <FormErrorMessage>{lastNameMsg}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl
                    id="username"
                    isRequired
                    isInvalid={
                      isUsernameServerError ||
                      (showErrors && (isUsernameError as boolean))
                    }
                  >
                    <FormLabel>Username</FormLabel>
                    <Input type="text" onChange={handleUsernameChange} />
                    {!isUsernameError && !isUsernameServerError ? (
                      <></>
                    ) : (
                      <FormErrorMessage>{usernameMsg}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    id="email"
                    isRequired
                    isInvalid={
                      isEmailServerError ||
                      (showErrors && (isEmailError as boolean))
                    }
                  >
                    <FormLabel>Email address</FormLabel>
                    <Input type="text" onChange={handleEmailChange} />
                    {!isEmailError && !isEmailServerError ? (
                      <></>
                    ) : (
                      <FormErrorMessage>{emailMsg}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="company">
                <FormLabel>Company (opt.)</FormLabel>
                <Input type="text" onChange={handleCompanyChange} />
              </FormControl>
              <FormControl
                id="password"
                isRequired
                isInvalid={showErrors && (isPasswordError as boolean)}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {!isPasswordError ? (
                  <></>
                ) : (
                  <FormErrorMessage>{passwordMsg}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="confrim_password"
                isRequired
                isInvalid={showErrors && (isConfirmPasswordError as boolean)}
              >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleConfirmPasswordChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {!isConfirmPasswordError ? (
                  <></>
                ) : (
                  <FormErrorMessage>{confirmPasswordMsg}</FormErrorMessage>
                )}
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={async () => {
                    if (
                      isFirstNameError ||
                      isLastNameError ||
                      isUsernameError ||
                      isEmailError ||
                      isPasswordError ||
                      isConfirmPasswordError
                    ) {
                      return;
                    }

                    setIsLoading(true);

                    const response = await axios.post(
                      "https://backend.upreal.us/signup",
                      {
                        firstname: firstName,
                        lastname: lastName,
                        username,
                        email,
                        company,
                        password,
                      },
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        withCredentials: true,
                      }
                    );

                    if (response.data.error) {
                      const serverError = response.data.error;
                      setIsLoading(false);

                      if (serverError.includes("Username")) {
                        setIsUsernameServerError(true);
                        setIsEmailServerError(false);
                        setUsernameMsg(serverError);
                        return;
                      }

                      if (serverError.includes("Email")) {
                        setIsEmailServerError(true);
                        setIsUsernameServerError(false);
                        setEmailMsg(serverError);
                        return;
                      }

                      return;
                    }

                    if (!response.data.error) {
                      localStorage.setItem("loginVerified", "1");
                      localStorage.setItem("initals", response.data["initals"]);
                      localStorage.setItem(
                        "fullName",
                        response.data["fullName"]
                      );
                      document.cookie = "login_token=snjh3fiuluidwu";
                      document.cookie = "login_token=snjh3fiuluidwu";
                    } else {
                      localStorage.setItem("loginVerified", "0");
                    }

                    toast({
                      render: () => (
                        <SuccessAlert text="Account Creation Successful!" />
                      ),
                      duration: 800,
                    });

                    router.push("/");
                  }}
                >
                  {isLoading ? <Spinner /> : "Sign up"}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link
                    color={"blue.400"}
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Center>
    </Layout>
  );
};

export default SignUp;
