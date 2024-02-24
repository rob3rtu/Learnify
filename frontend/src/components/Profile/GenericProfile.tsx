import { useParams } from "react-router-dom";
import { Flex, Spinner, useToast, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { colors } from "../../theme";
import { apiClient } from "../../utils/apiClient";
import { Feed } from "../Course/Feed";
import { ProfileNav } from "./ProfileNav";
import { Sidebar } from "./Sidebar";
import { AccountInterface } from "../Login/types";
import NotFoundSVG from "../../assets/not-found.svg";

export const GenericProfile = () => {
  const { id } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [fakeReload, setFakeReload] = useState<boolean>(false);
  const [user, setUser] = useState<AccountInterface | null>(null);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: "Could not get user data.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fakeReload]);

  if (loading)
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg={colors.black}
        height="100vh"
      >
        <Spinner size="xl" color={colors.white} />
      </Flex>
    );

  if (user === null)
    return (
      <Flex
        height={"100vh"}
        bgColor={colors.black}
        width="100vw"
        align="center"
        justify="center"
        direction="column"
      >
        <Image src={NotFoundSVG} width={400} maxW={"80vw"} />
        <Text
          marginTop={5}
          fontFamily="WorkSans-SemiBold"
          fontSize={25}
          color={colors.white}
        >
          User not found...
        </Text>
      </Flex>
    );

  return (
    <Flex
      direction={"column"}
      alignItems="center"
      justifyContent="center"
      bg={colors.black}
      minH="100vh"
    >
      <ProfileNav otherUser={user} />

      <Flex width={"100vw"} height={"83vh"} direction={"row"} flex={1}>
        <Sidebar />
        <Feed
          posts={user.posts}
          fakeReload={() => {
            setFakeReload(!fakeReload);
          }}
        />
      </Flex>
    </Flex>
  );
};
