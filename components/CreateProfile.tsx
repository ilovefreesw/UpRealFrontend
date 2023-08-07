import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tooltip,
  Tr,
  Input,
  useDisclosure,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { useState } from "react";
import CustomSlider from "./CustomSlider";
import axios from "axios";
import { useRouter } from "next/router";

const CreateProfile = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Common attributes to all profiles

  const [profileType, setProfileType] = useState("Rental");
  const [profileName, setProfileName] = useState("Default Name");
  const [creationDate, setCreationDate] = useState("");
  const [metroLocation, setMetroLocation] = useState("Dallas - Fort Worth");
  const [riskAppetite, setRiskAppetite] = useState("Low");
  const [isLoading, setIsLoading] = useState(false);

  const [budget, setBudget] = useState([200000, 1000000]);
  const [cashOnCash, setCashOnCash] = useState([5, 10]);

  // Rental-specific attributes
  const [appreciationTarget, setAppreciationTarget] = useState([]);
  const [holdPeriod, setHoldPeriod] = useState([]);
  const [cashFlowTarget, setCashFlowTarget] = useState([]);
  const [maintenanceSpend, setMaintenanceSpend] = useState([]);

  // Fix-and-flip specific attributes
  const [afterRepairValueTarget, setAfterRepairValueTarget] = useState([]);
  const [repairCostsTarget, setRepairCostTarget] = useState([]);

  const router = useRouter();

  const handleClose = () => {
    // console.log("In Handle Close");
    // console.log("Profile Type: " + profileType);
    // console.log("Profile Name: " + profileName);
    // console.log("Creation Date: " + creationDate);
    // console.log("Metro Location: " + metroLocation);
    // console.log("Risk Appetite: " + riskAppetite);
    // console.log("Budget: " + "Low: " + budget[0] + " - High: " + budget[1]);
    // console.log(
    //   "CashOnCash: " + "Low: " + cashOnCash[0] + " - High: " + cashOnCash[1]
    // );

    if (profileType == "Rental") {
      //   console.log(
      //     "Appreciation Target: " +
      //       "Low: " +
      //       appreciationTarget[0] +
      //       " - High: " +
      //       appreciationTarget[1]
      //   );
      //   console.log(
      //     "Hold Period: " + "Low: " + holdPeriod[0] + " - High: " + holdPeriod[1]
      //   );
      //   console.log(
      //     "Cash Flow Target: " +
      //       "Low: " +
      //       cashFlowTarget[0] +
      //       " - High: " +
      //       cashFlowTarget[1]
      //   );
      //   console.log(
      //     "Maintenance Spend: " +
      //       "Low: " +
      //       maintenanceSpend[0] +
      //       " - High: " +
      //       maintenanceSpend[1]
      //   );
      // } else {
      //   console.log(
      //     "After Repair Value Target: " +
      //       "Low: " +
      //       afterRepairValueTarget[0] +
      //       " - High: " +
      //       afterRepairValueTarget[1]
      //   );
      //   console.log(
      //     "Repair Costs Target: " +
      //       "Low: " +
      //       repairCostsTarget[0] +
      //       " - High: " +
      //       repairCostsTarget[1]
      //   );
    }

    onClose();
  };

  return (
    <>
      <Tooltip label="Create new Profile">
        <IconButton
          aria-label="Profile Detail"
          icon={<AddIcon />}
          size="lg"
          isRound
          onClick={onOpen}
        >
          {" "}
        </IconButton>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Profile</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Tbody>
                  <Tr>
                    <Td> Profile Type </Td>
                    <Td>
                      <Select
                        size="sm"
                        variant="filled"
                        onChange={(state) => {
                          setProfileType(state.target.value);
                        }}
                      >
                        <option value="Rental"> Rental </option>
                        <option value="Fix-and-Flip"> Fix-and-Flip </option>
                      </Select>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td> Profile Name </Td>
                    <Td>
                      {" "}
                      <Input
                        size="sm"
                        variant="filled"
                        defaultValue="Default Name"
                        onChange={(state) => {
                          setProfileName(state.target.value);
                        }}
                      />{" "}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td> Metro Location </Td>
                    <Td>
                      <Select
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
                    <Td> Risk Appetite </Td>
                    <Td>
                      <Select
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
                    <Td> Purchase Budget </Td>
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
                    <Td> Cash-on-Cash Target </Td>
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
                  {profileType == "Rental" && (
                    <Tr>
                      <Td> Target Appreciation for Sale </Td>
                      <Td>
                        <CustomSlider
                          min={1}
                          max={100}
                          step={0.1}
                          symbol="%"
                          defaultValue={[5, 10]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setAppreciationTarget(state);
                          }}
                        />
                      </Td>
                    </Tr>
                  )}
                  {profileType == "Rental" && (
                    <Tr>
                      <Td> Hold Period (Years) </Td>
                      <Td>
                        <CustomSlider
                          min={1}
                          max={10}
                          step={1}
                          symbol="Years"
                          defaultValue={[1, 5]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setHoldPeriod(state);
                          }}
                        />
                      </Td>
                    </Tr>
                  )}
                  {profileType == "Rental" && (
                    <Tr>
                      <Td> Target Cash Flow </Td>
                      <Td>
                        <CustomSlider
                          min={100}
                          max={10000}
                          step={100}
                          symbol="$"
                          defaultValue={[1000, 3000]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setCashFlowTarget(state);
                          }}
                        />
                      </Td>
                    </Tr>
                  )}
                  {profileType == "Rental" && (
                    <Tr>
                      <Td> Maintenance Spend (Annual) </Td>
                      <Td>
                        <CustomSlider
                          min={1}
                          max={10}
                          step={0.1}
                          symbol="%"
                          defaultValue={[1, 3]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setMaintenanceSpend(state);
                          }}
                        />
                      </Td>
                    </Tr>
                  )}
                  {profileType == "Fix-and-Flip" && (
                    <Tr>
                      <Td> After Repair Value Target </Td>
                      <Td>
                        <CustomSlider
                          min={50000}
                          max={5000000}
                          step={1000}
                          symbol="$"
                          defaultValue={[100000, 500000]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setAfterRepairValueTarget(state);
                          }}
                        />
                      </Td>
                    </Tr>
                  )}
                  {profileType == "Fix-and-Flip" && (
                    <Tr>
                      <Td> Target Repair Costs </Td>
                      <Td>
                        <CustomSlider
                          min={1}
                          max={10}
                          step={0.1}
                          symbol="%"
                          defaultValue={[5, 15]}
                          aria-label={["min", "max"]}
                          onChange={(state) => {
                            setRepairCostTarget(state);
                          }}
                        />
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={async () => {
                if (isLoading) {
                  return;
                }

                if (profileType == "Rental") {
                  await axios.post(
                    "https://seashell-app-dxi4j.ondigitalocean.app/setProfile",
                    {
                      profile_type: profileType,
                      location: metroLocation,
                      risk: riskAppetite,
                      budgetHigh: budget[1],
                      budgetLow: budget[0],
                      appHigh: appreciationTarget[1],
                      appLow: appreciationTarget[0],
                      cashflowHigh: cashFlowTarget[1],
                      cashflowLow: cashFlowTarget[0],
                      cocHigh: cashOnCash[1],
                      cocLow: cashOnCash[0],
                      mainHigh: maintenanceSpend[1],
                      mainLow: maintenanceSpend[0],
                      holdHigh: holdPeriod[1],
                      holdLow: holdPeriod[0],
                      name: profileName,
                    },
                    {
                      headers: { "Content-Type": "multipart/form-data" },
                      withCredentials: true,
                    }
                  );
                } else if (profileType == "Fix-and-Flip") {
                  setIsLoading(true);
                  await axios.post(
                    "https://seashell-app-dxi4j.ondigitalocean.app/setProfile",
                    {
                      profile_type: "Fix and Flip",
                      location: metroLocation,
                      risk: riskAppetite,
                      budgetHigh: budget[1],
                      budgetLow: budget[0],
                      afterRepairHigh: afterRepairValueTarget[1],
                      afterRepairLow: afterRepairValueTarget[0],
                      repairCostHigh: repairCostsTarget[1],
                      repairCostLow: repairCostsTarget[0],
                      cocHigh: cashOnCash[1],
                      cocLow: cashOnCash[0],
                      name: profileName,
                    },
                    {
                      headers: { "Content-Type": "multipart/form-data" },
                      withCredentials: true,
                    }
                  );
                }
                setIsLoading(false);
                handleClose();

                router.reload();
              }}
            >
              {isLoading ? <Spinner /> : <Text>Save</Text>}
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProfile;
