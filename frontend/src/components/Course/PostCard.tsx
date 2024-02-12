import { colors } from "../../theme";
import { PostInterface } from "./types";
import { Avatar, Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

interface PostCardProps {
  post: PostInterface;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Flex
      width={"100%"}
      borderRadius={10}
      bgColor={colors.black}
      boxShadow="0px 0px 7px 1px rgba(255,255,255,0.25)"
      p={5}
      pb={0}
      direction={"column"}
      gap={3}
    >
      <Flex justifyContent={"space-between"} width={"100%"}>
        <Flex alignItems={"center"} gap={2}>
          {" "}
          <Avatar
            src={post.user?.profileImage ?? undefined}
            fontFamily="WorkSans-Regular"
            name={post.user?.fullName}
            size="sm"
            bg={colors.blue}
            onClick={() => {}}
          />
          <Text color={colors.grey} fontFamily={"WorkSans-SemiBold"}>
            {post.user.fullName}
          </Text>
        </Flex>

        <Flex alignItems={"center"}>
          <Text fontFamily={"WorkSans-Regular"} color={colors.white}>
            0
          </Text>
          <IconButton
            icon={<FaRegHeart />}
            aria-label="like"
            variant={"link"}
            size={"lg"}
          />
        </Flex>
      </Flex>

      <Flex direction={"column"} alignItems={"flex-start"}>
        <Text color={colors.white} fontFamily={"WorkSans-Bold"} fontSize={20}>
          {post.title}
        </Text>
        <Text color={colors.grey} fontFamily={"WorkSans-Regular"} fontSize={15}>
          {post.description}
        </Text>
      </Flex>

      <Flex
        justifyContent={"space-around"}
        borderTop={"1px solid"}
        borderColor={colors.darkerGrey}
      >
        <Box
          py={3}
          textAlign={"center"}
          width={"50%"}
          cursor={"pointer"}
          _hover={{
            bgColor: "#1d1d1d",
          }}
        >
          <Text color={colors.grey} fontFamily={"WorkSans-Regular"}>
            Comments
          </Text>
        </Box>
        <Box
          py={3}
          textAlign={"center"}
          width={"50%"}
          cursor={"pointer"}
          _hover={{
            bgColor: "#1d1d1d",
          }}
        >
          <Text color={colors.grey} fontFamily={"WorkSans-Bold"}>
            Download
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
