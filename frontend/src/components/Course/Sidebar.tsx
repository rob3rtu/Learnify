import {
  Button,
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { colors } from "../../theme";
import { filterBy, sortBy } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { NewPostModal } from "./NewPostModal";
import { IoIosPeople } from "react-icons/io";
import { useEffect, useState } from "react";
import { TeachersModal } from "./TeachersModal";

interface SideBarProps {
  handleDeleteCourse: () => void;
  classId: string;
}

export const SideBar: React.FC<SideBarProps> = ({
  handleDeleteCourse,
  classId,
}) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state: RootState) => state.auth.account);
  const sideSorting = useSelector(
    (state: RootState) => state.course.sideSorting
  );
  const sideFilters = useSelector(
    (state: RootState) => state.course.sideFilters
  );
  const [teachersOpen, setTeachersOpen] = useState<boolean>(false);
  const [buttonsTexts, setButtonsTexts] = useState<{
    newPost: string;
    teschers: string;
    delete: string;
  }>({ newPost: "New post", teschers: "Teachers", delete: "Delete" });

  useEffect(() => {
    function handleWindowsResize() {
      if (window.innerWidth < 670) {
        setButtonsTexts({
          newPost: "",
          teschers: "",
          delete: "",
        });
      } else {
        setButtonsTexts({
          newPost: "New post",
          teschers: "Teachers",
          delete: "Delete",
        });
      }
    }

    window.addEventListener("resize", handleWindowsResize);

    return () => window.removeEventListener("resize", handleWindowsResize);
  }, []);

  return (
    <Flex
      direction={"column"}
      height={"83vh"}
      width={"20vw"}
      gap={10}
      borderRight={"1px solid"}
      borderColor={colors.darkerGrey}
      p={10}
      position={"relative"}
    >
      <Flex direction={"column"} alignItems={"flex-start"} gap={3}>
        <Text fontFamily="WorkSans-SemiBold" fontSize={20} color={colors.white}>
          Sort by:
        </Text>
        <Flex direction={"column"} alignItems={"flex-start"} gap={1}>
          {sortBy.map((filter) => {
            const filterKey = filter.toLowerCase().split(" ").join("");

            if (sideSorting.sortBy === filterKey)
              return (
                <Tag key={filter} bgColor={colors.blue}>
                  <TagLabel
                    fontFamily="WorkSans-SemiBold"
                    fontSize={15}
                    color={colors.white}
                    cursor={"pointer"}
                  >
                    {filter}
                  </TagLabel>
                  <TagCloseButton
                    color={"white"}
                    onClick={() => {
                      dispatch({
                        type: "course/setSideSorting",
                        payload: {
                          sortBy: null,
                        },
                      });
                    }}
                  />
                </Tag>
              );

            return (
              <Text
                key={filter}
                fontFamily="WorkSans-Regular"
                fontSize={15}
                color={colors.white}
                cursor={"pointer"}
                onClick={() => {
                  dispatch({
                    type: "course/setSideSorting",
                    payload: {
                      sortBy: filterKey,
                    },
                  });
                }}
              >
                {filter}
              </Text>
            );
          })}
        </Flex>
      </Flex>

      <Flex direction={"column"} alignItems={"flex-start"} gap={3}>
        <Text fontFamily="WorkSans-SemiBold" fontSize={20} color={colors.white}>
          Filter by:
        </Text>
        <Flex direction={"column"} alignItems={"flex-start"} gap={1}>
          {filterBy.map((filter) => {
            const filterKey = filter.toLowerCase().split(" ").join("");

            if (sideFilters.filterBy === filterKey)
              return (
                <Tag key={filter} bgColor={colors.blue}>
                  <TagLabel
                    fontFamily="WorkSans-SemiBold"
                    fontSize={15}
                    color={colors.white}
                    cursor={"pointer"}
                  >
                    {filter}
                  </TagLabel>
                  <TagCloseButton
                    color={"white"}
                    onClick={() => {
                      dispatch({
                        type: "course/setSideFilters",
                        payload: {
                          sortBy: null,
                        },
                      });
                    }}
                  />
                </Tag>
              );

            return (
              <Text
                key={filter}
                fontFamily="WorkSans-Regular"
                fontSize={15}
                color={colors.white}
                cursor={"pointer"}
                onClick={() => {
                  dispatch({
                    type: "course/setSideFilters",
                    payload: {
                      filterBy: filterKey,
                    },
                  });
                }}
              >
                {filter}
              </Text>
            );
          })}
        </Flex>
      </Flex>

      <Flex
        position={"absolute"}
        bottom={0}
        alignSelf={"center"}
        width={"100%"}
        direction={"column"}
        alignItems={"center"}
        justify={"center"}
        pb={5}
        gap={5}
      >
        <Button
          variant={"outline"}
          color={colors.blue}
          borderColor={colors.blue}
          fontFamily={"WorkSans-Medium"}
          width={"80%"}
          _hover={{
            backgroundColor: colors.black,
          }}
          rightIcon={<AddIcon />}
          onClick={onOpen}
        >
          {buttonsTexts.newPost}
        </Button>

        <Button
          variant="outline"
          color={"white"}
          borderColor={"white"}
          _hover={{
            backgroundColor: colors.black,
          }}
          aria-label="teachers"
          fontFamily={"WorkSans-Medium"}
          width={"80%"}
          rightIcon={<IoIosPeople />}
          onClick={() => {
            setTeachersOpen(true);
          }}
        >
          {buttonsTexts.teschers}
        </Button>

        {user?.role === "admin" && (
          <Button
            variant="outline"
            colorScheme={"red"}
            _hover={{
              backgroundColor: colors.black,
            }}
            aria-label="delete"
            fontFamily={"WorkSans-Medium"}
            width={"80%"}
            rightIcon={<DeleteIcon />}
            onClick={handleDeleteCourse}
          >
            {buttonsTexts.delete}
          </Button>
        )}
      </Flex>

      <NewPostModal
        isOpen={isOpen}
        onClose={onClose}
        userId={user?.id ?? ""}
        classId={classId}
      />

      <TeachersModal
        isOpen={teachersOpen}
        setIsOpen={setTeachersOpen}
        classId={classId}
      />
    </Flex>
  );
};
