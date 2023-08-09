import {
  AspectRatio,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Icon,
  Select,
  Tooltip,
  VStack,
  useBreakpointValue,
  useMediaQuery,
  Text,
  useToast,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import PropertyCard from "../components/PropertyCard";
import { BsFilterLeft } from "react-icons/bs";
import PropertyFilters from "../components/PropertyFilters";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { METRO_AREAS, ZIPCODES } from "../utils/zipCodes";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";
import GetCenterFromDegrees from "../utils/calcCenterCoordinate";
import PaginationUI from "../components/PaginationUI";
import CustomSlider from "../components/CustomSlider";
import { useRouter } from "next/router";

const onChildMouseEnter = () => {};
const onChildMouseLeave = () => {};

const MapPin = ({ onClick, hoverArr, index }: any) => {
  return (
    <Icon
      as={HiLocationMarker}
      onClick={() => {}}
      boxSize="4vh"
      color={hoverArr ? (hoverArr[index] ? "red.500" : "black") : "black"}
      //   _hover={{
      //     color: "gray.500",
      //     cursor: "pointer",
      //     zIndex: 99,
      //   }}
      zIndex={1}
      _hover={{
        color: "gray.500",
      }}
    />
  );
};

const PropertySearch = () => {
  const layout = useBreakpointValue({ base: 0, md: 1, lg: 2 });
  const [mobile] = useMediaQuery("(max-width: 500px)");
  const [propertyData, setPropertyData] = useState(null);
  const [allPropertyData, setAllPropertyData] = useState(null);
  const [allPropertyKeys, setAllPropertyKeys] = useState([]);
  const [pins, setPins] = useState(null);
  const [maxPages, setMaxPages] = useState(0);
  const [defaultProps, setDefaultProps] = useState(null);
  const [page, setPage] = useState(0);
  const [profileNames, setProfileNames] = useState([]);
  const [propMap, setPropMap] = useState(false);
  const router = useRouter();
  const [hoverArr, setHoverArr] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [filterReady, setFilterReady] = useState("0");
  const [filter, setFliter] = useState("0");
  const toast = useToast();

  const setPageValues = () => {
    const start = page == -1 ? 0 : (page - 1) * 9;
    const end = start + 9;

    const keys = allPropertyKeys.slice(start, end);
    let obj = {};

    for (const key of keys) {
      if (propMap && allPropertyData instanceof Map) {
        obj[key] = allPropertyData.get(key);
        continue;
      }
      obj[key] = allPropertyData[key];
    }

    setPropertyData(obj);
  };

  useEffect(() => {
    if (!allPropertyData || !allPropertyKeys || page == 0 || maxPages == 0) {
      // console.log(allPropertyData);
      // console.log(allPropertyKeys);
      // console.log(page);
      // console.log(maxPages);
      return;
    }

    if (Math.floor(allPropertyKeys.length / 9) > 0) {
      setMaxPages(Math.floor(allPropertyKeys.length / 9));

      setPageValues();
    }
  }, [page, propMap, filterReady]);

  useEffect(() => {
    axios
      .get("https://seashell-app-dxi4j.ondigitalocean.app/getProfileNames", {
        withCredentials: true,
      })
      .then((response) => {
        if (!response.data.error) {
          setProfileNames(response.data.profileNames);
        }
      });

    axios
      .get("https://seashell-app-dxi4j.ondigitalocean.app/property")
      .then((response) => {
        if (response.status == 200 && !response.data.error) {
          setMaxPages(Math.floor(response.data.length / 9));
          setAllPropertyKeys(Object.keys(response.data));
          setAllPropertyData(response.data);
          setPage(1);
        }
      });
  }, []);

  useEffect(() => {
    if (!allPropertyData) {
      return;
    }

    setPropMap(true);

    if (filter == "0") {
      if (!selectedProfile) {
        toast({
          title: "Error",
          description: "Select Profile to View Results",
          status: "error",
          colorScheme: "red",
          duration: 2000,
          isClosable: true,
        });
        setFliter("1");
        return;
      }
      let entries = Object.entries(allPropertyData);

      if (entries.length == 0 && allPropertyData instanceof Map) {
        //entries = Object.fromEntries(allPropertyData.entries());
        entries = Object.entries(Object.fromEntries(allPropertyData.entries()));
      }

      // Sort the array based on the "Fit Score"
      entries.sort((a, b) => b[1]["Fit Score"] - a[1]["Fit Score"]);

      // Create a new Map from the sorted array
      const sortedMap = new Map(entries);

      setMaxPages(Math.floor(sortedMap.size / 9));
      setAllPropertyKeys(Array.from(sortedMap.keys()));
      setAllPropertyData(sortedMap);

      setPage(1);
    } else if (filter == "1") {
      let entries = Object.entries(allPropertyData);

      if (entries.length == 0 && allPropertyData instanceof Map) {
        //entries = Object.fromEntries(allPropertyData.entries());
        entries = Object.entries(Object.fromEntries(allPropertyData.entries()));
      }

      // Sort the array based on the "Fit Score"
      entries.sort(
        (a, b) => b[1]["current_estimate"] - a[1]["current_estimate"]
      );

      // Create a new Map from the sorted array
      const sortedMap = new Map(entries);

      setMaxPages(Math.floor(sortedMap.size / 9));
      setAllPropertyKeys(Array.from(sortedMap.keys()));
      setAllPropertyData(sortedMap);

      setPage(1);
    } else if (filter == "2") {
      let entries = Object.entries(allPropertyData);

      if (entries.length == 0 && allPropertyData instanceof Map) {
        //entries = Object.fromEntries(allPropertyData.entries());
        entries = Object.entries(Object.fromEntries(allPropertyData.entries()));
      }

      // Sort the array based on the "Fit Score"
      entries.sort(
        (a, b) =>
          b[1]["property_description"]["beds"] -
          a[1]["property_description"]["beds"]
      );

      // Create a new Map from the sorted array
      const sortedMap = new Map(entries);

      setMaxPages(Math.floor(sortedMap.size / 9));
      setAllPropertyKeys(Array.from(sortedMap.keys()));
      setAllPropertyData(sortedMap);

      setPage(1);
    } else if (filter == "3") {
      let entries = Object.entries(allPropertyData);

      if (entries.length == 0 && allPropertyData instanceof Map) {
        //entries = Object.fromEntries(allPropertyData.entries());
        entries = Object.entries(Object.fromEntries(allPropertyData.entries()));
      }

      // Sort the array based on the "Fit Score"
      entries.sort(
        (a, b) =>
          b[1]["property_description"]["baths"] -
          a[1]["property_description"]["baths"]
      );

      // Create a new Map from the sorted array
      const sortedMap = new Map(entries);

      setMaxPages(Math.floor(sortedMap.size / 9));
      setAllPropertyKeys(Array.from(sortedMap.keys()));
      setAllPropertyData(sortedMap);

      setPage(1);
    } else if (filter == "4") {
      let entries = Object.entries(allPropertyData);

      if (entries.length == 0 && allPropertyData instanceof Map) {
        //entries = Object.fromEntries(allPropertyData.entries());
        entries = Object.entries(Object.fromEntries(allPropertyData.entries()));
      }

      // Sort the array based on the "Fit Score"
      entries.sort(
        (a, b) =>
          b[1]["property_description"]["prop_sqft"] -
          a[1]["property_description"]["prop_sqft"]
      );

      // Create a new Map from the sorted array
      const sortedMap = new Map(entries);

      setMaxPages(Math.floor(sortedMap.size / 9));
      setAllPropertyKeys(Array.from(sortedMap.keys()));
      setAllPropertyData(sortedMap);

      setPage(1);
    }

    setFilterReady(filter);
  }, [filter]);

  useEffect(() => {
    if (!propertyData) {
      return;
    }

    let coordinateArr = [];

    let pins = Object.keys(propertyData).map((key, i) => {
      if (!propertyData[key]["location"]["coordinates"]) {
        return;
      }

      if (i > 8) {
        return;
      }

      let lat = propertyData[key]["location"]["coordinates"][0]["lat"];
      let lon = propertyData[key]["location"]["coordinates"][0]["lon"];

      coordinateArr.push([lat, lon]);

      return (
        <MapPin
          onClick={() => {}}
          key={i}
          index={i}
          onChildMouseEnter={onChildMouseEnter}
          onChildMouseLeave={onChildMouseLeave}
          //   handlePinClick={this.handleOnClick}
          //   facility={facility}
          //   hover={this.state.hover}
          lat={lat}
          lng={lon}
        />
      );
    });

    let centerLatLon = GetCenterFromDegrees(coordinateArr);

    setDefaultProps({
      center: { lat: centerLatLon[0], lng: centerLatLon[1] },
      zoom: 12,
    });

    setPins(pins);
  }, [propertyData]);

  useEffect(() => {
    if (router.query.profileName) {
      setSelectedProfile(router.query.profileName as string);

      axios
        .get(
          "https://seashell-app-dxi4j.ondigitalocean.app/getPropertiesByProfile",
          {
            params: { name: router.query.profileName as string },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status == 200 && !response.data.error) {
            let newObj = {};

            for (let obj of response.data) {
              let key = Object.keys(obj)[0];

              newObj[key] = obj[key];
            }

            const entries = Object.entries(newObj);

            // Sort the array based on the "Fit Score"
            entries.sort((a, b) => b[1]["Fit Score"] - a[1]["Fit Score"]);

            // Create a new Map from the sorted array
            const sortedMap = new Map(entries);

            setMaxPages(Math.floor(sortedMap.size / 9));
            setAllPropertyKeys(Array.from(sortedMap.keys()));
            setAllPropertyData(sortedMap);
            setPropMap(true);

            setPage(1);

            //setPage(2);
          }
        });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!propertyData) {
      return;
    }

    let coordinateArr = [];

    let pins = Object.keys(propertyData).map((key, i) => {
      if (!propertyData[key]["location"]["coordinates"]) {
        return;
      }

      if (i > 8) {
        return;
      }

      let lat = propertyData[key]["location"]["coordinates"][0]["lat"];
      let lon = propertyData[key]["location"]["coordinates"][0]["lon"];

      coordinateArr.push([lat, lon]);

      return (
        <MapPin
          onClick={() => {}}
          key={i}
          index={i}
          onChildMouseEnter={onChildMouseEnter}
          onChildMouseLeave={onChildMouseLeave}
          //   handlePinClick={this.handleOnClick}
          //   facility={facility}
          //   hover={this.state.hover}
          lat={lat}
          lng={lon}
          hoverArr={hoverArr}
        />
      );
    });

    let centerLatLon = GetCenterFromDegrees(coordinateArr);

    setDefaultProps({
      center: { lat: centerLatLon[0], lng: centerLatLon[1] },
      zoom: 12,
    });

    setPins(pins);
  }, [hoverArr]);

  return (
    <Layout bgColor="#23272a" forceFill>
      <Center>
        {propertyData && defaultProps && pins ? (
          <VStack ml={4} spacing={5} mt={4}>
            <HStack w="100%">
              <Select
                placeholder={"Select Profile"}
                minW="15vw"
                maxW="15rem"
                onChange={(e) => {
                  setSelectedProfile(e.target.value);

                  const profile = e.target.value;

                  if (profile == "Select Profile") {
                    return;
                  }

                  axios
                    .get(
                      "https://seashell-app-dxi4j.ondigitalocean.app/getPropertiesByProfile",
                      { params: { name: profile }, withCredentials: true }
                    )
                    .then((response) => {
                      if (response.status == 200 && !response.data.error) {
                        let newObj = {};

                        for (let obj of response.data) {
                          let key = Object.keys(obj)[0];

                          newObj[key] = obj[key];
                        }

                        const entries = Object.entries(newObj);

                        // Sort the array based on the "Fit Score"
                        entries.sort(
                          (a, b) => b[1]["Fit Score"] - a[1]["Fit Score"]
                        );

                        // Create a new Map from the sorted array
                        const sortedMap = new Map(entries);

                        setMaxPages(Math.floor(sortedMap.size / 9));
                        setAllPropertyKeys(Array.from(sortedMap.keys()));
                        setAllPropertyData(sortedMap);
                        setPropMap(true);

                        setPage(1);

                        //setPage(2);
                      }
                    });
                }}
              >
                {profileNames.map((value, i) => {
                  if (i == 0) {
                    return (
                      <option
                        key={i}
                        selected={selectedProfile == value.toString()}
                      >
                        {value.toString()}
                      </option>
                    );
                  } else {
                    return (
                      <option
                        key={i}
                        selected={selectedProfile == value.toString()}
                      >
                        {value.toString()}
                      </option>
                    );
                  }
                })}
              </Select>
              <Select placeholder="Select Metro Area" minW="15vw" maxW="15rem">
                {METRO_AREAS.map((value, i) => {
                  if (i == 0) {
                    return <option key={i}>{value.toString()}</option>;
                  } else {
                    return <option key={i}>{value.toString()}</option>;
                  }
                })}
              </Select>
              <PropertyFilters
                aria-label="filters_button"
                value={filter}
                setValue={setFliter}
              />
              {layout == 2 ? (
                <PaginationUI
                  pageNum={page}
                  updatePage={setPage}
                  maxPages={maxPages}
                />
              ) : null}
            </HStack>

            {layout > -1 ? (
              <>
                <Grid
                  h="100%"
                  w="100vw"
                  templateRows={"1.1fr 1.1fr 1.1fr"}
                  templateColumns={
                    layout == 2
                      ? "0.7fr 0.7fr 0.7fr 1fr"
                      : layout == 1
                      ? "1fr 1fr 1fr"
                      : layout == 0 && mobile
                      ? "1fr"
                      : "1fr 1fr"
                  }
                  columnGap={3}
                  rowGap={4}
                  overflow="hidden"
                >
                  {propertyData
                    ? Object.keys(propertyData).map((key, i) => {
                        if (i > 2) {
                          return;
                        }

                        return (
                          <GridItem rowSpan={1} colSpan={1} key={i}>
                            <PropertyCard
                              profileFit={
                                propertyData[key]["Fit Score"]
                                  ? propertyData[key]["Fit Score"]
                                  : -1
                              }
                              selectedProfile={selectedProfile}
                              apiInfo={propertyData[key]}
                              imageUrl={propertyData[key]["photo"]}
                              city={`${propertyData[key]["location"]["city"]}, ${propertyData[key]["location"]["state_code"]}`}
                              imageAlt="property image"
                              propId={key}
                              formattedPrice={
                                propertyData[key]["current_estimate"]
                              }
                              beds={
                                propertyData[key]["property_description"][
                                  "beds"
                                ]
                              }
                              baths={
                                propertyData[key]["property_description"][
                                  "baths"
                                ]
                              }
                              title={propertyData[key]["location"]["line"]}
                              key={i}
                              index={i}
                              hoverArr={hoverArr}
                              setHoverArr={setHoverArr}
                              type={
                                propertyData[key]["property_description"][
                                  "type"
                                ]
                              }
                            />
                          </GridItem>
                        );
                      })
                    : null}
                  {layout > 1 ? (
                    <GridItem rowSpan={3}>
                      <Box
                        position="fixed"
                        h="130%"
                        w="50%"
                        overflow="hidden"
                        top={0}
                      >
                        {defaultProps ? (
                          <GoogleMapReact
                            bootstrapURLKeys={{
                              key: "AIzaSyAryVPH3MLio2aysuqxM4HI5w8UhhaAljA",
                              language: "en",
                            }}
                            defaultCenter={defaultProps?.center}
                            defaultZoom={defaultProps?.zoom}
                          >
                            {pins}
                          </GoogleMapReact>
                        ) : null}
                      </Box>
                    </GridItem>
                  ) : null}

                  {propertyData
                    ? Object.keys(propertyData).map((key, i) => {
                        if (i < 3) {
                          return;
                        }

                        return (
                          <GridItem rowSpan={1} colSpan={1} key={i}>
                            <PropertyCard
                              profileFit={
                                propertyData[key]["Fit Score"]
                                  ? propertyData[key]["Fit Score"]
                                  : -1
                              }
                              propId={key}
                              selectedProfile={selectedProfile}
                              apiInfo={propertyData[key]}
                              imageUrl={propertyData[key]["photo"]}
                              imageAlt="property image"
                              city={`${propertyData[key]["location"]["city"]}, ${propertyData[key]["location"]["state_code"]}`}
                              formattedPrice={
                                propertyData[key]["current_estimate"]
                              }
                              beds={
                                propertyData[key]["property_description"][
                                  "beds"
                                ]
                              }
                              baths={
                                propertyData[key]["property_description"][
                                  "baths"
                                ]
                              }
                              title={propertyData[key]["location"]["line"]}
                              key={i}
                              index={i}
                              hoverArr={hoverArr}
                              setHoverArr={setHoverArr}
                              type={
                                propertyData[key]["property_description"][
                                  "type"
                                ]
                              }
                            />
                          </GridItem>
                        );
                      })
                    : null}
                </Grid>
              </>
            ) : layout == 1 ? (
              <>
                <Grid
                  h="100%"
                  w="100vw"
                  templateRows="repeat(3, 1fr)"
                  templateColumns="repeat(3, 1fr)"
                  columnGap={3}
                  rowGap={4}
                >
                  {propertyData
                    ? Object.keys(propertyData).map((key, i) => {
                        return (
                          <GridItem rowSpan={1} colSpan={1} key={i}>
                            <PropertyCard
                              profileFit={
                                propertyData[key]["Fit Score"]
                                  ? propertyData[key]["Fit Score"]
                                  : -1
                              }
                              propId={key}
                              selectedProfile={selectedProfile}
                              apiInfo={propertyData[key]}
                              city={`${propertyData[key]["location"]["city"]}, ${propertyData[key]["location"]["state_code"]}`}
                              imageUrl={propertyData[key]["photo"]}
                              imageAlt="property image"
                              formattedPrice={
                                propertyData[key]["current_estimate"]
                              }
                              beds={
                                propertyData[key]["property_description"][
                                  "beds"
                                ]
                              }
                              baths={
                                propertyData[key]["property_description"][
                                  "baths"
                                ]
                              }
                              title={propertyData[key]["location"]["line"]}
                              key={i}
                              index={i}
                              type={
                                propertyData[key]["property_description"][
                                  "type"
                                ]
                              }
                            />
                          </GridItem>
                        );
                      })
                    : null}
                </Grid>
              </>
            ) : null}
          </VStack>
        ) : null}
      </Center>
      {layout < 2 ? (
        <Box pt="1vh">
          <PaginationUI
            pageNum={page}
            updatePage={setPage}
            maxPages={maxPages}
          />
        </Box>
      ) : null}
    </Layout>
  );
};

export default PropertySearch;
