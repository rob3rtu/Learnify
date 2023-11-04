import { Flex, Text, Avatar, Divider } from "@chakra-ui/react";
import { colors } from "../../theme";
import { AccountInterface } from "../Login/types";
import { NavTabs } from "./NavTabs";

interface NavBarProps {
  user: AccountInterface | null;
}

export const NavBar: React.FC<NavBarProps> = ({ user }) => {
  return (
    <Flex
      position="fixed"
      top={0}
      bg={colors.darkerGrey}
      height="17vh"
      width="100vw"
      borderRadius="0 0 30px 30px"
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
        // border="1px solid "
        // borderColor={colors.white}
        // borderRadius="40px"
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
          name={user?.fullName}
          size="md"
        ></Avatar>
      </Flex>

      <Divider width="100%" padding="0 20px 0 20px" opacity={0.2} />

      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        padding="15px 20px 5px 20px"
      >
        <NavTabs tabs={["MATE", "INFO", "CTI"]} />
        <NavTabs tabs={["AN I", "AN II", "AN III", "AN IV"]} />
        <NavTabs tabs={["SEM I", "SEM II"]} />
      </Flex>
    </Flex>
  );
};
