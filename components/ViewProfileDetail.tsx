import { ViewIcon } from "@chakra-ui/icons";
import {
  Tooltip,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const ViewProfileDetail = ({ profile_attr }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!profile_attr) {
    return;
  }

  if (profile_attr.profile_type.value == "Rental") {
    return (
      <>
        <Tooltip label="View Profile Detail">
          <IconButton
            aria-label="Profile Detail"
            icon={<ViewIcon />}
            onClick={onOpen}
          >
            {" "}
          </IconButton>
        </Tooltip>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{profile_attr.profile_name.value}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
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
                    <Tr>
                      <Td> {profile_attr.risk_appetite.title} </Td>
                      <Td> {profile_attr.risk_appetite.value} </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.purchase_budget.title} </Td>
                      <Td>
                        {" "}
                        $
                        {profile_attr.purchase_budget.value_low.toLocaleString(
                          "en-US"
                        )}{" "}
                        - $
                        {profile_attr.purchase_budget.value_high.toLocaleString(
                          "en-US"
                        )}{" "}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.cash_on_cash_target.title} </Td>
                      <Td>
                        {" "}
                        {profile_attr.cash_on_cash_target.value_low.toLocaleString(
                          "en-US"
                        )}
                        % -{" "}
                        {profile_attr.cash_on_cash_target.value_high.toLocaleString(
                          "en-US"
                        )}
                        %{" "}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.appreciation_target.title} </Td>
                      <Td>
                        {" "}
                        {profile_attr.appreciation_target.value_low.toLocaleString(
                          "en-US"
                        )}
                        % -{" "}
                        {profile_attr.appreciation_target.value_high.toLocaleString(
                          "en-US"
                        )}
                        %{" "}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.hold_period.title} </Td>
                      <Td>
                        {" "}
                        {profile_attr.hold_period.value_low} -{" "}
                        {profile_attr.hold_period.value_high} Years{" "}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.cash_flow_target.title} </Td>
                      <Td>
                        {" "}
                        $
                        {profile_attr.cash_flow_target.value_low.toLocaleString(
                          "en-US"
                        )}{" "}
                        - $
                        {profile_attr.cash_flow_target.value_high.toLocaleString(
                          "en-US"
                        )}{" "}
                        /Mo{" "}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.maintenance_spend.title} </Td>
                      <Td>
                        {" "}
                        {profile_attr.maintenance_spend.value_low.toLocaleString(
                          "en-US"
                        )}
                        % -{" "}
                        {profile_attr.maintenance_spend.value_high.toLocaleString(
                          "en-US"
                        )}
                        % /Year{" "}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
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
  } else {
    // Currently only two profile types supported - need to additional types here
    return (
      <>
        <Tooltip label="View Profile Detail">
          <IconButton
            aria-label="Profile Detail"
            icon={<ViewIcon />}
            onClick={onOpen}
          >
            {" "}
          </IconButton>
        </Tooltip>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{profile_attr.profile_name.value}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
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
                    <Tr>
                      <Td> {profile_attr.risk_appetite.title} </Td>
                      <Td> {profile_attr.risk_appetite.value} </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.purchase_budget.title} </Td>
                      <Td>
                        {" "}
                        $
                        {profile_attr.purchase_budget.value_low.toLocaleString(
                          "en-US"
                        )}{" "}
                        - $
                        {profile_attr.purchase_budget.value_high.toLocaleString(
                          "en-US"
                        )}{" "}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.cash_on_cash_target.title} </Td>
                      <Td>
                        {" "}
                        {profile_attr.cash_on_cash_target.value_low.toLocaleString(
                          "en-US"
                        )}
                        % -{" "}
                        {profile_attr.cash_on_cash_target.value_high.toLocaleString(
                          "en-US"
                        )}
                        %{" "}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.after_repair_value_target.title} </Td>
                      <Td>
                        {" "}
                        $
                        {profile_attr.after_repair_value_target.value_low.toLocaleString(
                          "en-US"
                        )}{" "}
                        - $
                        {profile_attr.after_repair_value_target.value_high.toLocaleString(
                          "en-US"
                        )}{" "}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.repair_costs_target.title} </Td>
                      <Td>
                        {" "}
                        {profile_attr.repair_costs_target.value_low.toLocaleString(
                          "en-US"
                        )}
                        % -{" "}
                        {profile_attr.repair_costs_target.value_high.toLocaleString(
                          "en-US"
                        )}
                        %{" "}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
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
  }
};

export default ViewProfileDetail;
