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
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiClient } from "../../utils/apiClient";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import moment from "moment";

interface PostCardProps {
  post: PostInterface;
  openEditModal: (val: {
    title: string;
    description: string;
    postId: string;
  }) => void;
  openCommentsModal: (val: PostInterface) => void;
  fakeReload?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  openEditModal,
  openCommentsModal,
  fakeReload,
}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.account);
  const course = useSelector((state: RootState) => state.course.course);
  const [isHover, setisHover] = useState<boolean>(false);
  const [canShowMenu, setCanShowMenu] = useState<boolean>(false);
  const [localPost, setLocalPost] = useState<PostInterface>(post);

  useEffect(() => {
    setCanShowMenu(
      user?.id === localPost.userId ||
        user?.role === "teacher" ||
        user?.role === "admin"
    );
  }, []);

  useEffect(() => {
    setLocalPost(post);
  }, [post]);

  const handleSelectPost = () => {
    window.open(
      localPost.resourceUrl.includes("https://")
        ? localPost.resourceUrl
        : "https://" + localPost.resourceUrl,
      "_blank"
    );
  };

  const handleDelete = async () => {
    apiClient
      .delete(`post/${localPost.id}`)
      .then(async (res) => {
        if (localPost.resourceType === "document") {
          const documentRef = ref(storage, localPost.resourceUrl);

          await deleteObject(documentRef);
        }
        dispatch({
          type: "course/setCourse",
          payload: {
            ...course,
            posts: course?.posts.filter((postt) => postt.id !== localPost.id),
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

  const handleToggleLike = async () => {
    apiClient
      .post(`post/toggle-like/${localPost.id}`)
      .then((res) => {
        setLocalPost(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error!",
          description: "Something went wrong",
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
              src={localPost.user?.profileImage ?? undefined}
              fontFamily="WorkSans-Regular"
              name={localPost.user?.fullName}
              size="sm"
              bg={colors.blue}
              onClick={() => {}}
            />
            <Text color={colors.grey} fontFamily={"WorkSans-SemiBold"}>
              {localPost.user.fullName}
              {" - "}
              {moment(localPost.createdAt)
                .format("DD.MMM.YYYY")
                .toLocaleString()}
            </Text>
          </Flex>

          <Flex alignItems={"center"}>
            <Text fontFamily={"WorkSans-Regular"} color={colors.white}>
              {localPost.likes.length}
            </Text>
            <IconButton
              icon={
                localPost.likes
                  .map((like) => like.userId)
                  .includes(user?.id ?? "") ? (
                  <FaHeart fill="red" />
                ) : (
                  <FaRegHeart />
                )
              }
              aria-label="like"
              variant={"link"}
              size={"lg"}
              onClick={handleToggleLike}
            />
          </Flex>
        </Flex>

        <Flex direction={"column"} alignItems={"flex-start"}>
          <Text color={colors.white} fontFamily={"WorkSans-Bold"} fontSize={20}>
            {localPost.title}
          </Text>
          <Text
            color={colors.grey}
            fontFamily={"WorkSans-Regular"}
            fontSize={15}
          >
            {localPost.description}
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
            onClick={() => {
              openCommentsModal(localPost);
            }}
          >
            <Text color={colors.grey} fontFamily={"WorkSans-Regular"}>
              Comments{" "}
              {localPost.comments.length > 0 &&
                `(${localPost.comments.length})`}
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
          {user?.id === localPost.userId && (
            <IconButton
              icon={<EditIcon />}
              aria-label="edit"
              variant={"link"}
              size={"lg"}
              p={2}
              color={colors.white}
              onClick={() => {
                openEditModal({
                  title: localPost.title,
                  description: localPost.description,
                  postId: localPost.id,
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
