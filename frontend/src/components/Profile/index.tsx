import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { colors } from "../../theme";
import { apiClient } from "../../utils/apiClient";
import { Feed } from "../Course/Feed";
import { PostInterface } from "../Course/types";
import { ProfileNav } from "./ProfileNav";
import { Sidebar } from "./Sidebar";

export const Profile = () => {
  const toast = useToast();
  const account = useSelector((state: RootState) => state.auth.account);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [fakeReload, setFakeReload] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("user/posts")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: "Could not get posts.",
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

  return (
    <Flex
      direction={"column"}
      alignItems="center"
      justifyContent="center"
      bg={colors.black}
      minH="100vh"
    >
      <ProfileNav user={account} />

      <Flex width={"100vw"} height={"83vh"} direction={"row"} flex={1}>
        <Sidebar />
        <Feed
          posts={posts}
          fakeReload={() => {
            setFakeReload(!fakeReload);
          }}
        />
      </Flex>
    </Flex>
  );
};
