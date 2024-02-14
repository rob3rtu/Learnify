import {
  Button,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { colors } from "../../theme";
import { filterBy, sortBy } from "./data";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { DeleteIcon } from "@chakra-ui/icons";
import { NewPostModal } from "./NewPostModal";

interface SideBarProps {
  handleDeleteCourse: () => void;
  classId: string;
}

export const SideBar: React.FC<SideBarProps> = ({
  handleDeleteCourse,
  classId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state: RootState) => state.auth.account);

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
            return (
              <Text
                key={filter}
                fontFamily="WorkSans-Regular"
                fontSize={15}
                color={colors.white}
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
            return (
              <Text
                key={filter}
                fontFamily="WorkSans-Regular"
                fontSize={15}
                color={colors.white}
              >
                {filter}
              </Text>
            );
          })}
        </Flex>
      </Flex>

      <Button
        position={"absolute"}
        bottom={5}
        left={"23%"}
        bgColor={colors.blue}
        color={colors.white}
        fontFamily={"WorkSans-Medium"}
        px={10}
        _hover={{
          backgroundColor: colors.blue,
        }}
        onClick={onOpen}
      >
        New post
      </Button>

      {user?.role === "admin" && (
        <IconButton
          position={"absolute"}
          bottom={8}
          right={2}
          variant="link"
          colorScheme="red"
          aria-label="delete"
          fontSize="20px"
          icon={<DeleteIcon />}
          onClick={handleDeleteCourse}
        />
      )}

      <NewPostModal
        isOpen={isOpen}
        onClose={onClose}
        userId={user?.id ?? ""}
        classId={classId}
      />
    </Flex>
  );
};
