import { Flex, Image, Text } from "@chakra-ui/react";
import { PostInterface } from "./types";
import SadSVG from "../../assets/sad.svg";
import { colors } from "../../theme";
import { PostCard } from "./PostCard";

interface FeedProps {
  posts: PostInterface[];
}

export const Feed: React.FC<FeedProps> = ({ posts }) => {
  return (
    <Flex
      direction={"column"}
      height={"83vh"}
      width={"80vw"}
      overflowY={"scroll"}
      p={10}
      gap={10}
    >
      {posts.length === 0 ? (
        <Flex
          flex={1}
          width="100%"
          align="center"
          justify="center"
          direction="column"
        >
          <Image src={SadSVG} />
          <Text
            marginTop={5}
            fontFamily="WorkSans-SemiBold"
            fontSize={20}
            color={colors.white}
          >
            There are no posts yet.
          </Text>
        </Flex>
      ) : (
        <>
          {posts.map((post) => {
            return <PostCard post={post} />;
          })}
        </>
      )}
    </Flex>
  );
};
