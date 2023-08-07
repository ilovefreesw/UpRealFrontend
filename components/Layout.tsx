import { Box, Center, useBreakpointValue } from "@chakra-ui/react";
import { useEffect } from "react";
import NavBar from "./NavBar";

const Layout = ({ bgColor, overflow, children }: any) => {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

  return (
    <Box
      w="100vw"
      h="100vh"
      overflow={overflow ? overflow : "auto"}
      bg={bgColor}
    >
      <NavBar />
      <Box mt="9vh">{children}</Box>
    </Box>
  );
};

export default Layout;
