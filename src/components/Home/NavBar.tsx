import { Flex, Text, Avatar } from "@chakra-ui/react";
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
        padding="5px 20px 5px 20px"
        width="100%"
        border="1px solid "
        borderColor={colors.white}
        borderRadius="40px"
      >
        <Text
          fontFamily="WorkSans-BoldItalic"
          color={colors.white}
          fontSize={20}
        >
          LEARNIFY
        </Text>
        <Avatar name={user?.fullName} size="md"></Avatar>
      </Flex>

      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        padding="15px 25px 5px 25px"
      >
        <NavTabs tabs={["MATE", "INFO", "CTI"]} />
        <NavTabs tabs={["AN I", "AN II", "AN III", "AN IV"]} />
        <NavTabs tabs={["SEM I", "SEM II"]} />
      </Flex>
    </Flex>
  );
};
