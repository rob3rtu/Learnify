import { Flex, Image, Text } from "@chakra-ui/react";
import { PostInterface } from "./types";
import SadSVG from "../../assets/sad.svg";
import { colors } from "../../theme";
import { PostCard } from "./PostCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { NewPostModal } from "./NewPostModal";

interface FeedProps {
  posts: PostInterface[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const Feed: React.FC<FeedProps> = ({
  posts,
  isOpen,
  onOpen,
  onClose,
}) => {
  const [filteredPosts, setFilteredPosts] = useState<PostInterface[]>(posts);
  const filters = useSelector((state: RootState) => state.course.filters);
  const [editValues, setEditValues] = useState<
    | {
        title: string;
        description: string;
        postId: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) => post.classSection === filters.section)
    );
  }, [filters, posts]);

  const openEditModal = (initialValues: {
    title: string;
    description: string;
    postId: string;
  }) => {
    setEditValues(initialValues);
  };

  useEffect(() => {
    if (editValues) {
      onOpen();
    }
  }, [editValues]);

  return (
    <Flex
      direction={"column"}
      height={"83vh"}
      width={"80vw"}
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
              />
            );
          })}
        </>
      )}
    </Flex>
  );
};
