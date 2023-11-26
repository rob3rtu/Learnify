import { Avatar, Flex, Text } from "@chakra-ui/react";
import { colors } from "../../theme";
import { AccountInterface } from "../Login/types";

interface ProfileNavInterface {
  user: AccountInterface | null;
}

export const ProfileNav: React.FC<ProfileNavInterface> = ({ user }) => {
  return (
    <Flex
      position="absolute"
      top={0}
      zIndex={999}
      bg={colors.black}
      height="17vh"
      width="100vw"
      borderBottomColor={colors.white}
      borderBottomWidth={1}
      direction="column"
      alignItems="center"
      padding={5}
    >
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding="0 20px 15px 20px"
        width="100%"
      >
        <Text
          fontFamily="WorkSans-BoldItalic"
          color={colors.white}
          fontSize={25}
        >
          LEARNIFY
        </Text>
        <Avatar
          fontFamily="WorkSans-Regular"
          cursor="pointer"
          name={user?.fullName ?? user?.email.split("@")[0]}
          size="md"
          bg={colors.blue}
          onClick={() => {
            //TO DO: CHANGE PROFILE PICTURE
          }}
        ></Avatar>
      </Flex>
      <Flex
        position="absolute"
        alignSelf="center"
        flexDirection="column"
        alignItems="center"
      >
        <Text fontFamily="WorkSans-Bold" color="white" fontSize={30}>
          {user?.fullName ?? user?.email.split("@")[0]}
        </Text>
        <Text fontFamily="WorkSans-Regular" color={colors.white} fontSize={20}>
          {user?.role}
        </Text>
      </Flex>
    </Flex>
  );
};
