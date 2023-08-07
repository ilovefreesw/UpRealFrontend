import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Checkbox,
  VStack,
  Box,
  Center,
} from "@chakra-ui/react";
import { BsFilterLeft } from "react-icons/bs";

const PropertyFilters = ({}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        position="relative"
        alignSelf="start"
        leftIcon={<BsFilterLeft size="3vh" />}
        w="10rem"
      >
        Show Filters
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => {
          onClose();

          // add logging here
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <VStack alignItems="start">
                <VStack alignItems="start">
                  <Checkbox>Profile Fit</Checkbox>
                </VStack>
                <Text fontSize="15pt" fontWeight="bold">
                  Property Type
                </Text>
                <VStack alignItems="start" ml="4vw">
                  <Checkbox defaultChecked>Single Family</Checkbox>
                  <Checkbox>Multi- Family</Checkbox>
                  <Checkbox>Land</Checkbox>
                </VStack>
                <Text fontSize="15pt" fontWeight="bold">
                  Sort By
                </Text>
                <VStack alignItems="start" ml="4vw">
                  <Text fontSize="13pt" fontWeight="semibold">
                    Property
                  </Text>
                  <VStack alignItems="start" ml="2vw">
                    <Checkbox defaultChecked>Price</Checkbox>
                    <Checkbox>Beds</Checkbox>
                    <Checkbox>Baths</Checkbox>
                    <Checkbox>Size (sqft)</Checkbox>
                  </VStack>
                </VStack>
              </VStack>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PropertyFilters;
