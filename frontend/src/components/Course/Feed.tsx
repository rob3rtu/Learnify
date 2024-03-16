import {
  Button,
  Flex,
  Image,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PostInterface } from "./types";
import SadSVG from "../../assets/sad.svg";
import { colors } from "../../theme";
import { PostCard } from "./PostCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { NewPostModal } from "./NewPostModal";
import { CommentsModal } from "./CommentsModal";
import { apiClient } from "../../utils/apiClient";

interface FeedProps {
  posts: PostInterface[];
  fakeReload?: () => void;
}

export const Feed: React.FC<FeedProps> = ({ posts, fakeReload }) => {
  const toast = useToast();
  const user = useSelector((state: RootState) => state.auth.account);
  const course = useSelector((state: RootState) => state.course.course);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredPosts, setFilteredPosts] = useState<PostInterface[]>(posts);
  const filters = useSelector((state: RootState) => state.course.filters);
  const sideSorting = useSelector(
    (state: RootState) => state.course.sideSorting
  );
  const sideFilters = useSelector(
    (state: RootState) => state.course.sideFilters
  );
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(10);
  const [canSkip, setCanSkip] = useState(true);
  const [loadingSkip, setLoadingSkip] = useState(false);

  const [editValues, setEditValues] = useState<
    | {
        title: string;
        description: string;
        postId: string;
      }
    | undefined
  >(undefined);

  //used for comments modal
  const [currentPost, setCurrentPost] = useState<PostInterface | null>(null);
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (fakeReload === undefined) {
      apiClient
        .post(`course/${course?.id}`, {
          section: filters.section,
          sortBy: sideSorting.sortBy,
          filterBy: sideFilters.filterBy,
        })
        .then((res) => {
          dispatch({
            type: "course/setCourse",
            payload: res.data,
          });

          setCanSkip(res.data.posts.length === 10);
          setSkip(10);
        })
        .catch((err) => {
          toast({
            title: "Error!",
            description: "Something went wrong.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      apiClient
        .post("user/posts", { section: filters.section })
        .then((res) => {
          setFilteredPosts(res.data.posts);
          setCanSkip(res.data.posts.length === 10);
          setSkip(10);
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
    }
  }, [sideSorting, sideFilters, filters]);

  useEffect(() => {
    setFilteredPosts(course?.posts ?? []);
  }, [course]);

  useEffect(() => {
    // dispatch({
    //   type: "course/setFilters",
    //   payload: { section: "materials" },
    // });

    setCanSkip(filteredPosts.length === 10);

    return () => {
      dispatch({ type: "course/setSideSorting", payload: { sortBy: null } });
      dispatch({ type: "course/setSideFilters", payload: { filterBy: null } });
    };
  }, []);

  useEffect(() => {
    if (editValues) {
      onOpen();
    }
  }, [editValues]);

  useEffect(() => {
    if (currentPost) {
      setCommentsOpen(true);
    }
  }, [currentPost]);

  const openCommentsModal = (post: PostInterface) => {
    setCurrentPost(post);
  };

  const openEditModal = (initialValues: {
    title: string;
    description: string;
    postId: string;
  }) => {
    setEditValues(initialValues);
  };

  const handleCloseComments = () => {
    setCommentsOpen(false);
    setCurrentPost(null);
  };

  const handleFetchMorePosts = async () => {
    setLoadingSkip(true);
    if (fakeReload === undefined)
      apiClient
        .post(`course/${course?.id}`, {
          section: filters.section,
          sortBy: sideSorting.sortBy,
          filterBy: sideFilters.filterBy,
          skip,
        })
        .then((res) => {
          dispatch({
            type: "course/setCourse",
            payload: {
              ...course,
              posts: [...(course?.posts ?? []), ...res.data.posts],
            },
          });

          setCanSkip(res.data.posts.length === 10);
          setSkip(skip + 10);
        })
        .catch((err) => {
          toast({
            title: "Error!",
            description: "Something went wrong.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoadingSkip(false);
        });
    else
      apiClient
        .post("user/posts", { section: filters.section, skip })
        .then((res) => {
          setFilteredPosts([...filteredPosts, ...res.data.posts]);
          setCanSkip(res.data.posts.length === 10);
          setSkip(skip + 10);
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
          setLoadingSkip(false);
        });
  };

  return (
    <Flex
      direction={"column"}
      maxH={"83vh"}
      width={"80vw"}
      flex={1}
      overflowY={"scroll"}
      p={10}
      gap={10}
    >
      <NewPostModal
        isOpen={isOpen}
        onClose={onClose}
        classId={""}
        userId={""}
        initialValues={editValues}
        fakeReload={fakeReload}
      />

      <CommentsModal
        isOpen={commentsOpen}
        onClose={handleCloseComments}
        post={currentPost}
        fakeReload={fakeReload}
      />

      {loading ? (
        <Flex flex={1} width="100%" align="center" justify="center">
          <Spinner color="white" />
        </Flex>
      ) : filteredPosts.length === 0 ? (
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
          {filteredPosts.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                openEditModal={openEditModal}
                openCommentsModal={openCommentsModal}
                fakeReload={fakeReload}
              />
            );
          })}
          {loadingSkip ? (
            <Flex alignItems={"center"} justify={"center"} w={"100%"}>
              <Spinner color="white" />
            </Flex>
          ) : (
            canSkip && (
              <Flex alignItems={"center"} justify={"center"} w={"100%"}>
                <Button
                  variant={"link"}
                  color={"white"}
                  opacity={0.7}
                  fontFamily={"WorkSans-Medium"}
                  onClick={handleFetchMorePosts}
                >
                  load more
                </Button>
              </Flex>
            )
          )}
        </>
      )}
    </Flex>
  );
};
