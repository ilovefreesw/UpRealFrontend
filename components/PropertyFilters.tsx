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
  Radio,
  VStack,
  Box,
  Center,
  RadioGroup,
} from "@chakra-ui/react";
import { BsFilterLeft } from "react-icons/bs";

const PropertyFilters = ({ value, setValue }: any) => {
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
        Sort By
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
          <ModalHeader>All Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <VStack alignItems="start">
                <RadioGroup onChange={setValue} value={value}>
                  <VStack alignItems="start">
                    <Radio value="0">Profile Fit</Radio>
                  </VStack>
                  {/* <Text fontSize="15pt" fontWeight="bold">
                  Property Type
                </Text> */}
                  {/* <VStack alignItems="start" ml="4vw">
                  <Radio
                    defaultChecked
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSingleClicked(true);
                      }
                    }}
                  >
                    Single Family
                  </Radio>
                  <Radio
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSingleClicked(true);
                      }
                    }}
                  >
                    Multi- Family
                  </Radio>
                  <Radio
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSingleClicked(true);
                      }
                    }}
                  >
                    Land
                  </Radio>
                </VStack> */}
                  <Text fontSize="15pt" fontWeight="bold">
                    Sort By
                  </Text>
                  <VStack alignItems="start" ml="4vw">
                    <Text fontSize="13pt" fontWeight="semibold">
                      Property
                    </Text>
                    <VStack alignItems="start" ml="2vw">
                      <Radio value="1">Price</Radio>
                      <Radio value="2">Beds</Radio>
                      <Radio value="3">Baths</Radio>
                      <Radio value="4">Size (sqft)</Radio>
                    </VStack>
                  </VStack>
                </RadioGroup>
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
