import { Button, Flex, Text } from "@chakra-ui/react";
import { colors } from "../../theme";
import { filterBy, sortBy } from "./data";

export const SideBar = () => {
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
      >
        New post
      </Button>
    </Flex>
  );
};
