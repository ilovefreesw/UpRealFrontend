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
  FormHelperText,
  FormErrorMessage,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import validateUsernameOrEmail from "../utils/validateUsernameOrEmail";
import validatePassword from "../utils/validatePassword";
import SuccessAlert from "../components/alerts/successAlert";
import axios from "axios";

const LogIn = () => {
  const loggedIn = false;

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

  const router = useRouter();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleUsernameOrEmailChange = (e) => {
    setShowErrors(true);
    setUsernameOrEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setShowErrors(true);
    setPassword(e.target.value);
  };

  let [usernameMsg, setUsernameMsg] = useState("");
  let [passwordMsg, setPasswordMsg] = useState("");

  const usernameValidationResp = validateUsernameOrEmail(usernameOrEmail);
  const passwordValidationRep = validatePassword(password);

  let isUsernameError = usernameValidationResp[0];
  let isPasswordError = passwordValidationRep[0];

  if (!usernameMsg) {
    setUsernameMsg(usernameValidationResp[1] as string);
  }

  if (!passwordMsg) {
    setPasswordMsg(passwordValidationRep[1] as string);
  }

  const [isServerUsernameOrEmailError, setIsServerUsernameOrEmailError] =
    useState(false);
  const [isServerPasswordError, setIsServerPasswordError] = useState(false);

  const toast = useToast();

  return (
    <Layout bgColor="#23272a">
      <Center mt="-5vh" minH={"100vh"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Log in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              get started with your{" "}
              <Link color={"blue.400"}> investment journey</Link>
            </Text>
          </Stack>
          <Box rounded={"lg"} bg="#2c3135" boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl
                id="usernameOrEmail"
                isRequired
                isInvalid={
                  isServerUsernameOrEmailError ||
                  (showErrors && (isUsernameError as boolean))
                }
              >
                <FormLabel>Username / Email </FormLabel>
                <Input
                  type="text"
                  placeholder="johndoe or john.doe@gmail.com"
                  onChange={handleUsernameOrEmailChange}
                />
                {!isUsernameError && !isServerUsernameOrEmailError ? (
                  <></>
                ) : (
                  <FormErrorMessage>{usernameMsg}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="password"
                isRequired
                isInvalid={
                  isServerPasswordError ||
                  (showErrors && (isPasswordError as boolean))
                }
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Must have at least 6 characters"
                  onChange={handlePasswordChange}
                />
                {!isPasswordError && !isServerPasswordError ? (
                  <></>
                ) : (
                  <FormErrorMessage>{passwordMsg}</FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                    Remember me
                  </Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={async () => {
                    if (isPasswordError || isUsernameError) {
                      return;
                    }

                    setIsLoading(true);
                    const response = await axios.post(
                      "https://hook.12122012.xyz/login",
                      {
                        usernameOrEmail: usernameOrEmail,
                        password: password,
                      },
                      {
                        headers: { "Content-Type": "multipart/form-data" },
                        withCredentials: true,
                      }
                    );

                    if (response.data.error) {
                      setIsLoading(false);
                      const serverError = response.data.error;

                      if (serverError.includes("Username")) {
                        setIsServerPasswordError(false);
                        setIsServerUsernameOrEmailError(true);

                        setUsernameMsg(serverError);
                        return;
                      }

                      if (serverError.includes("Password")) {
                        setIsServerUsernameOrEmailError(false);
                        setIsServerPasswordError(true);

                        setPasswordMsg(serverError);
                        return;
                      }

                      return;
                    }

                    toast({
                      render: () => <SuccessAlert text="Logged In!" />,
                      duration: 800,
                    });

                    if (!response.data.error) {
                      localStorage.setItem("loginVerified", "1");
                      localStorage.setItem("initals", response.data["initals"]);
                      localStorage.setItem(
                        "fullName",
                        response.data["fullName"]
                      );
                      document.cookie = "login_token=snjh3fiuluidwu";
                    } else {
                      localStorage.setItem("loginVerified", "0");
                    }

                    router.push("/");
                  }}
                >
                  {isLoading ? <Spinner /> : "Log in"}
                </Button>
                <Center>
                  <Text>
                    Not registered?{" "}
                    <Link
                      color={"blue.400"}
                      onClick={() => router.push("/signup")}
                    >
                      Sign Up
                    </Link>
                  </Text>
                </Center>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Center>
    </Layout>
  );
};

export default LogIn;
