import { EditIcon } from "@chakra-ui/icons";

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
  Button,
  useDisclosure,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Input,
  Select,
} from "@chakra-ui/react";

import CustomSlider from "./CustomSlider";
import { useState } from "react";

const EditProfileDetail = ({ profile_attr }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Common attributes to all profiles

  const [profileType, setProfileType] = useState(
    profile_attr.profile_type.value
  );
  const [profileName, setProfileName] = useState(
    profile_attr.profile_name.value
  );
  const [creationDate, setCreationDate] = useState(
    profile_attr.creation_date.value
  );
  const [metroLocation, setMetroLocation] = useState(
    profile_attr.metro_location.value
  );
  const [riskAppetite, setRiskAppetite] = useState(
    profile_attr.risk_appetite.value
  );

  const [budget, setBudget] = useState([
    profile_attr.purchase_budget.value_low,
    profile_attr.purchase_budget.value_high,
  ]);
  const [cashOnCash, setCashOnCash] = useState([
    profile_attr.cash_on_cash_target.value_low,
    profile_attr.cash_on_cash_target.value_high,
  ]);

  // Rental-specific attributes
  const [appreciationTarget, setAppreciationTarget] = useState([]);
  const [holdPeriod, setHoldPeriod] = useState([]);
  const [cashFlowTarget, setCashFlowTarget] = useState([]);
  const [maintenanceSpend, setMaintenanceSpend] = useState([]);

  // Fix-and-flip specific attributes
  const [afterRepairValueTarget, setAfterRepairValueTarget] = useState([]);
  const [repairCostsTarget, setRepairCostTarget] = useState([]);

  if (!profile_attr) {
    console.log("In Profile.tsx - No profile_attr");
    // Add logic to create a new profile
    return;
  }

  const handleClose = () => {
    // console.log("In Handle Close");
    // console.log("Profile Type: " + profileType);
    // console.log("Profile Name: " + profileName);
    // console.log("Creation Date: " + creationDate);
    // console.log("Metro Location: " + metroLocation);
    // console.log("Risk Appetite: " + riskAppetite);
    // console.log("Budget: " + "Low: " + budget[0] + " - High: " + budget[1]);
    // console.log("CashOnCash: " + "Low: " + cashOnCash[0] + " - High: " + cashOnCash[1]);

    // if (profileType == 'Rental') {
    //     console.log("Appreciation Target: " + "Low: " + appreciationTarget[0] + " - High: " + appreciationTarget[1]);
    //     console.log("Hold Period: " + "Low: " + holdPeriod[0] + " - High: " + holdPeriod[1]);
    //     console.log("Cash Flow Target: " + "Low: " + cashFlowTarget[0] + " - High: " + cashFlowTarget[1]);
    //     console.log("Maintenance Spend: " + "Low: " + maintenanceSpend[0] + " - High: " + maintenanceSpend[1]);
    // } else {
    //     console.log("After Repair Value Target: " + "Low: " + afterRepairValueTarget[0] + " - High: " + afterRepairValueTarget[1]);
    //     console.log("Repair Costs Target: " + "Low: " + repairCostsTarget[0] + " - High: " + repairCostsTarget[1]);
    // }

    onClose();
  };

  if (profile_attr.profile_type.value == "Rental") {
    // setAppreciationTarget([profile_attr.appreciation_target.value_low, profile_attr.appreciation_target.value_high])

    return (
      <>
        <Tooltip label="View Profile Detail">
          <IconButton
            aria-label="Profile Detail"
            icon={<EditIcon />}
            onClick={onOpen}
          >
            {" "}
          </IconButton>
        </Tooltip>

        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <TableContainer>
                <Table variant="simple" size="sm">
                  <Tbody>
                    <Tr>
                      <Td> {profile_attr.profile_type.title} </Td>
                      <Td> {profile_attr.profile_type.value} </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.profile_name.title} </Td>
                      <Td>
                        {" "}
                        <Input
                          placeholder={profile_attr.profile_name.value}
                          size="sm"
                          variant="filled"
                          onChange={(state) => {
                            setProfileName(state.target.value);
                          }}
                        />{" "}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.metro_location.title} </Td>
                      <Td>
                        <Select
                          placeholder={profile_attr.metro_location.value}
                          size="sm"
                          variant="filled"
                          onChange={(state) => {
                            setMetroLocation(state.target.value);
                          }}
                        >
                          <option value="Dallas - Fort Worth">
                            {" "}
                            Dallas - Fort Worth{" "}
                          </option>
                          <option value="Austin"> Austin </option>
                          <option value="Houston"> Houston </option>
                          <option value="San Antonio"> San Antonio </option>
                        </Select>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.risk_appetite.title} </Td>
                      <Td>
                        <Select
                          placeholder={profile_attr.risk_appetite.value}
                          size="sm"
                          variant="filled"
                          onChange={(state) => {
                            setRiskAppetite(state.target.value);
                          }}
                        >
                          <option value="Low"> Low </option>
                          <option value="Medium"> Medium </option>
                          <option value="High"> High </option>
                        </Select>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.purchase_budget.title} </Td>
                      <Td>
                        <CustomSlider
                          min={50000}
                          max={5000000}
                          step={1000}
                          symbol="$"
                          defaultValue={[budget[0], budget[1]]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setBudget(state);
                          }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.cash_on_cash_target.title} </Td>
                      <Td>
                        <CustomSlider
                          min={5}
                          max={50}
                          step={0.1}
                          symbol="%"
                          defaultValue={[cashOnCash[0], cashOnCash[1]]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setCashOnCash(state);
                          }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.appreciation_target.title} </Td>
                      <Td>
                        <CustomSlider
                          min={1}
                          max={100}
                          step={0.1}
                          symbol="%"
                          defaultValue={[
                            profile_attr.appreciation_target.value_low,
                            profile_attr.appreciation_target.value_high,
                          ]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setAppreciationTarget(state);
                          }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {" "}
                        {profile_attr.hold_period.title + " " + "(Years)"}{" "}
                      </Td>
                      <Td>
                        <CustomSlider
                          min={1}
                          max={10}
                          step={1}
                          symbol="Years"
                          defaultValue={[
                            profile_attr.hold_period.value_low,
                            profile_attr.hold_period.value_high,
                          ]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setHoldPeriod(state);
                          }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.cash_flow_target.title} </Td>
                      <Td>
                        <CustomSlider
                          min={100}
                          max={10000}
                          step={100}
                          symbol="$"
                          defaultValue={[
                            profile_attr.cash_flow_target.value_low,
                            profile_attr.cash_flow_target.value_high,
                          ]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setCashFlowTarget(state);
                          }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {" "}
                        {profile_attr.maintenance_spend.title +
                          " " +
                          "(Annual)"}{" "}
                      </Td>
                      <Td>
                        <CustomSlider
                          min={1}
                          max={10}
                          step={0.1}
                          symbol="%"
                          defaultValue={[
                            profile_attr.maintenance_spend.value_low,
                            profile_attr.maintenance_spend.value_high,
                          ]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setMaintenanceSpend(state);
                          }}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleClose}>
                Save
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Tooltip label="View Profile Detail">
          <IconButton
            aria-label="Profile Detail"
            icon={<EditIcon />}
            onClick={onOpen}
          >
            {" "}
          </IconButton>
        </Tooltip>

        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <TableContainer>
                <Table variant="simple" size="sm">
                  <Tbody>
                    <Tr>
                      <Td> {profile_attr.profile_type.title} </Td>
                      <Td> {profile_attr.profile_type.value} </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.profile_name.title} </Td>
                      <Td>
                        {" "}
                        <Input
                          placeholder={profile_attr.profile_name.value}
                          size="sm"
                          variant="filled"
                          onChange={(state) => {
                            setProfileName(state.target.value);
                          }}
                        />{" "}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.metro_location.title} </Td>
                      <Td>
                        <Select
                          placeholder={profile_attr.metro_location.value}
                          size="sm"
                          variant="filled"
                          onChange={(state) => {
                            setMetroLocation(state.target.value);
                          }}
                        >
                          <option value="Dallas - Fort Worth">
                            {" "}
                            Dallas - Fort Worth{" "}
                          </option>
                          <option value="Austin"> Austin </option>
                          <option value="Houston"> Houston </option>
                          <option value="San Antonio"> San Antonio </option>
                        </Select>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.risk_appetite.title} </Td>
                      <Td>
                        <Select
                          placeholder={profile_attr.risk_appetite.value}
                          size="sm"
                          variant="filled"
                          onChange={(state) => {
                            setRiskAppetite(state.target.value);
                          }}
                        >
                          <option value="Low"> Low </option>
                          <option value="Medium"> Medium </option>
                          <option value="High"> High </option>
                        </Select>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.purchase_budget.title} </Td>
                      <Td>
                        <CustomSlider
                          min={50000}
                          max={5000000}
                          step={1000}
                          symbol="$"
                          defaultValue={[budget[0], budget[1]]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setBudget(state);
                          }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.cash_on_cash_target.title} </Td>
                      <Td>
                        <CustomSlider
                          min={5}
                          max={50}
                          step={0.1}
                          symbol="%"
                          defaultValue={[cashOnCash[0], cashOnCash[1]]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setCashOnCash(state);
                          }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td> {profile_attr.after_repair_value_target.title} </Td>
                      <Td>
                        <CustomSlider
                          min={50000}
                          max={5000000}
                          step={1000}
                          symbol="$"
                          defaultValue={[
                            profile_attr.after_repair_value_target.value_low,
                            profile_attr.after_repair_value_target.value_high,
                          ]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setAfterRepairValueTarget(state);
                          }}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {" "}
                        {profile_attr.repair_costs_target.title +
                          " " +
                          "(Annual)"}{" "}
                      </Td>
                      <Td>
                        <CustomSlider
                          min={1}
                          max={10}
                          step={0.1}
                          symbol="%"
                          defaultValue={[
                            profile_attr.repair_costs_target.value_low,
                            profile_attr.repair_costs_target.value_high,
                          ]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setRepairCostTarget(state);
                          }}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleClose}>
                Save
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};

export default EditProfileDetail;
