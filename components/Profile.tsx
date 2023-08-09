import { DeleteIcon, EditIcon, Search2Icon, ViewIcon } from "@chakra-ui/icons";
import {
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";

import ViewProfileDetail from "./ViewProfileDetail";
import EditProfileDetail from "./EditProfileDetail";
import { useRouter } from "next/router";
import { useState } from "react";

const Profile = ({ profile_attr }) => {
  // No profile attributes - return
  if (!profile_attr) {
    return;
  }

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card>
      <CardHeader>
        <Text as="b">{profile_attr.profile_name.value}</Text>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table variant="simple" size="sm" colorScheme="teal">
            <Tbody>
              <Tr>
                <Td> {profile_attr.profile_type.title} </Td>
                <Td> {profile_attr.profile_type.value} </Td>
              </Tr>
              <Tr>
                <Td> {profile_attr.creation_date.title} </Td>
                <Td> {profile_attr.creation_date.value} </Td>
              </Tr>
              <Tr>
                <Td> {profile_attr.metro_location.title} </Td>
                <Td> {profile_attr.metro_location.value} </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
      <CardFooter>
        <HStack display="flex" ml="auto" spacing={5} pr="10px">
          <ViewProfileDetail profile_attr={profile_attr} />

          <Tooltip label="Secrch properties with Profile">
            <IconButton
              aria-label="Profile Detail"
              icon={isLoading ? <Spinner /> : <Search2Icon />}
              onClick={() => {
                if (isLoading) {
                  return;
                }

                localStorage.setItem(
                  "currentProfile",
                  profile_attr.profile_name.value
                );

                setIsLoading(true);

                setTimeout(
                  () =>
                    router.push(
                      `/propertySearch?profileName=${profile_attr.profile_name.value}`
                    ),
                  1000
                );
              }}
            ></IconButton>
          </Tooltip>

          <EditProfileDetail profile_attr={profile_attr} />

          <Tooltip label="Delete Profile">
            <IconButton aria-label="Profile Detail" icon={<DeleteIcon />}>
              {" "}
            </IconButton>
          </Tooltip>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default Profile;
