import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PostInterface } from "./types";
import SadSVG from "../../assets/sad.svg";
import { colors } from "../../theme";
import { PostCard } from "./PostCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { NewPostModal } from "./NewPostModal";
import { CommentsModal } from "./CommentsModal";
import { apiClient } from "../../utils/apiClient";
import { ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";

interface FeedProps {
  posts: PostInterface[];
  fakeReload?: () => void;
}

export const Feed: React.FC<FeedProps> = ({ posts, fakeReload }) => {
  const toast = useToast();
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
  const [search, setSearch] = useState<string>("");
  const [refetchFeed, setRefetchFeed] = useState(false);
  const searchRef = useRef<null | HTMLInputElement>(null);
  const [showGoUp, setShowGoUp] = useState(false);

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
          search,
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
        .post("user/posts", { section: filters.section, search })
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
  }, [sideSorting, sideFilters, filters, refetchFeed]);

  useEffect(() => {
    setFilteredPosts(course?.posts ?? []);
  }, [course]);

  useEffect(() => {
    // dispatch({
    //   type: "course/setFilters",
    //   payload: { section: "materials" },
    // });

    setCanSkip(filteredPosts.length === 10);

    const handleShowGoUp = () => {
      const searchElement = searchRef.current?.getBoundingClientRect();

      setShowGoUp((searchElement?.top ?? 0) < 0);
    };

    document
      ?.getElementById("feedArea")
      ?.addEventListener("scroll", handleShowGoUp);

    handleShowGoUp();

    return () => {
      document
        .getElementById("feedArea")
        ?.removeEventListener("scroll", handleShowGoUp);
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

  //used to optimize the search functionality over pagination
  //executes the function `callback` after `time` ms
  const debounce = (callback: () => void, time: number) => {
    let timerId: any;
    return () => {
      clearTimeout(timerId);
      timerId = setTimeout(callback, time);
    };
  };

  //need for useCallback because of the way React works
  const debounceSearch = useCallback(
    debounce(() => {
      setRefetchFeed((prev) => !prev);
    }, 500),
    []
  );

  return (
    <Flex
      id="feedArea"
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

      <InputGroup ref={searchRef}>
        <InputLeftElement pointerEvents={"none"}>
          <SearchIcon color={"white"} />
        </InputLeftElement>
        <Input
          width={"50%"}
          placeholder="Search by name"
          color={"white"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            debounceSearch();
          }}
        />
      </InputGroup>

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
            There are no posts.
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

          <Box height={5} />
          <IconButton
            display={showGoUp ? "flex" : "none"}
            position={"absolute"}
            bottom={5}
            right={10}
            isRound={true}
            variant="solid"
            bgColor={colors.blue}
            aria-label="go up"
            fontSize="40px"
            size={"lg"}
            icon={<ChevronUpIcon color={"whhite"} />}
            onClick={() => {
              document
                .getElementById("feedArea")
                ?.scroll({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </Flex>
  );
};
