import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { colors } from "../../theme";
import { PostInterface } from "./types";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiClient } from "../../utils/apiClient";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase-config";

interface PostCardProps {
  post: PostInterface;
  openEditModal: (val: {
    title: string;
    description: string;
    postId: string;
  }) => void;
  fakeReload?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  openEditModal,
  fakeReload,
}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.account);
  const course = useSelector((state: RootState) => state.course.course);
  const [isHover, setisHover] = useState<boolean>(false);
  const [canShowMenu, setCanShowMenu] = useState<boolean>(false);

  useEffect(() => {
    setCanShowMenu(
      user?.id === post.userId ||
        user?.role === "teacher" ||
        user?.role === "admin"
    );
  }, []);

  const handleSelectPost = () => {
    window.open(
      post.resourceUrl.includes("https://")
        ? post.resourceUrl
        : "https://" + post.resourceUrl,
      "_blank"
    );
  };

  const handleDelete = async () => {
    apiClient
      .delete(`post/${post.id}`)
      .then(async (res) => {
        if (post.resourceType === "document") {
          const documentRef = ref(storage, post.resourceUrl);

          await deleteObject(documentRef);
        }

        dispatch({
          type: "course/setCourse",
          payload: {
            ...course,
            posts: course?.posts.filter((postt) => postt.id !== post.id),
          },
        });
        toast({
          title: "Success!",
          description: "Post deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fakeReload?.();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error!",
          description: "Could not delete post",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      width={"100%"}
      borderRadius={10}
      bgColor={colors.black}
      boxShadow="0px 0px 7px 1px rgba(255,255,255,0.25)"
      onMouseEnter={() => {
        setisHover(true);
      }}
      onMouseLeave={() => {
        setisHover(false);
      }}
    >
      <Flex width={"100%"} p={5} pb={0} direction={"column"} gap={3}>
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
          <Text
            color={colors.grey}
            fontFamily={"WorkSans-Regular"}
            fontSize={15}
          >
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
            onClick={handleSelectPost}
          >
            <Text color={colors.grey} fontFamily={"WorkSans-Bold"}>
              Open
            </Text>
          </Box>
        </Flex>
      </Flex>

      {isHover && canShowMenu && (
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: colors.darkerGrey,
            borderRadius: 10,
            overflow: "hidden",
          }}
          animate={{
            paddingLeft: 10,
            paddingRight: 10,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {user?.id === post.userId && (
            <IconButton
              icon={<EditIcon />}
              aria-label="edit"
              variant={"link"}
              size={"lg"}
              p={2}
              color={colors.white}
              onClick={() => {
                openEditModal({
                  title: post.title,
                  description: post.description,
                  postId: post.id,
                });
              }}
            />
          )}
          <IconButton
            icon={<DeleteIcon />}
            aria-label="delete"
            variant={"link"}
            size={"lg"}
            p={2}
            color={colors.white}
            onClick={handleDelete}
          />
        </motion.div>
      )}
    </Flex>
  );
};
