import Layout from "../components/Layout";
import Profile from "../components/Profile";
import CreateProfile from "../components/CreateProfile";

import {
  SimpleGrid,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Center,
  AbsoluteCenter,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { parseCookies } from "../utils/parseCookies";

// Temporary import test profiles from local file for testing
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";

const ProfileCards = () => {
  const [profileList, setProfileList] = useState(null);
  const [profileError, setProfileError] = useState("");

  // Test method to get profile list
  useEffect(() => {
    const parsedCookies = parseCookies(document.cookie);
    if (!parsedCookies || !parsedCookies["login_token"]) {
      return;
    }

    // loadProfileFromFile(); // retrieve json data from file
    axios
      .get("https://backend.upreal.us/getProfileList", {
        withCredentials: true,
      })
      .then((response) => {
        if (!response.data.error) {
          setProfileList({ profile_list: response.data.profiles });
        } else {
          setProfileError(response.data.error);
        }
      });
  }, []);

  return (
    <Layout bgColor="#23272a">
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing="40px"
        padding="20px"
      >
        {profileList && profileList.profile_list
          ? profileList.profile_list.map((item, i) => {
              return <Profile profile_attr={item} key={i}></Profile>;
            })
          : null}
        <Card>
          <CardBody>
            <AbsoluteCenter>
              <CreateProfile />
              {profileError ? (
                <Text color="red">
                  {profileError.includes("No Profiles Found")
                    ? null
                    : profileError}
                </Text>
              ) : null}
            </AbsoluteCenter>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Layout>
  );

  /*
    return (     
        <Layout bgColor="#23272a">
            { console.log(profileList.profile_list) }
            <SimpleGrid columns={{sm:1, md:2, lg: 3}} spacing='40px' padding='20px'>
                <Profile profile_attr={profileList.profile_list ? profileList.profile_list[0] : null}>
                </Profile>
            </SimpleGrid>
        </Layout>
    );
    */
};

export default ProfileCards;
