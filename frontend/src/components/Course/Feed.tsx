import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { PostInterface } from "./types";
import SadSVG from "../../assets/sad.svg";
import { colors } from "../../theme";
import { PostCard } from "./PostCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { NewPostModal } from "./NewPostModal";
import { CommentsModal } from "./CommentsModal";

interface FeedProps {
  posts: PostInterface[];
  fakeReload?: () => void;
}

export const Feed: React.FC<FeedProps> = ({ posts, fakeReload }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredPosts, setFilteredPosts] = useState<PostInterface[]>(posts);
  const filters = useSelector((state: RootState) => state.course.filters);
  const sideSorting = useSelector(
    (state: RootState) => state.course.sideSorting
  );

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
    switch (sideSorting.sortBy) {
      case "newest":
        const sortedNew = [...posts].sort((a, b) => {
          const aDate = new Date(a.createdAt);
          const bDate = new Date(b.createdAt);

          return aDate > bDate ? -1 : 1;
        });
        setFilteredPosts(sortedNew);
        break;

      case "oldest":
        const sortedOld = [...posts].sort((a, b) => {
          const aDate = new Date(a.createdAt);
          const bDate = new Date(b.createdAt);

          return aDate < bDate ? -1 : 1;
        });
        setFilteredPosts(sortedOld);
        break;

      case "leastlikes":
        const sortedLeastLikes = [...posts].sort((a, b) => {
          return a.likes.length - b.likes.length;
        });
        setFilteredPosts(sortedLeastLikes);
        break;

      case "mostlikes":
        const sortedMostLikes = [...posts].sort((a, b) => {
          return b.likes.length - a.likes.length;
        });
        setFilteredPosts(sortedMostLikes);
        break;

      default:
        setFilteredPosts(
          posts.filter((post) => post.classSection === filters.section)
        );
        break;
    }
  }, [sideSorting]);

  useEffect(() => {
    return () => {
      dispatch({ type: "course/setSideSorting", payload: { sortBy: null } });
    };
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) => post.classSection === filters.section)
    );
  }, [filters, posts]);

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

  return (
    <Flex
      direction={"column"}
      // height={"83vh"}
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
      />

      {filteredPosts.length === 0 ? (
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
        </>
      )}
    </Flex>
  );
};
