import { Icon } from "@chakra-ui/icons";
import { Spacer, Stack, HStack, IconButton, Box, Text } from "@chakra-ui/react";
import { AiOutlineClockCircle } from "react-icons/ai";

const MoreInfoSection = () => {
  return (
    <>
      <Spacer h="40vh" />
      <Box>
        <Stack spacing={5}>
          <Text fontSize={35} fontWeight="bold">
            What can UpReal do for you?
          </Text>
          <Text fontSize={25}>Turn Research into Results</Text>
          <Text fontSize={15}>
            Find the potential returns that investing in a property can
            <br />
            yield with a variety of strategies including renting, resale,
            <br />
            and vacation rentals
          </Text>
          <HStack>
            <IconButton
              aria-label="show-icon"
              boxSize="15vh"
              borderRadius="full"
              bg="white"
              _hover={{
                cursor: "default",
                bg: "white",
              }}
              icon={
                <Icon
                  as={AiOutlineClockCircle}
                  zIndex={5}
                  boxSize="10vh"
                  color="black"
                />
              }
              disabled
            />
          </HStack>
        </Stack>
      </Box>
    </>
  );
};

export default MoreInfoSection;
