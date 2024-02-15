import { Button, Flex, Image } from "@chakra-ui/react";
import { colors } from "../../theme";
import ProfileSVG from "../../assets/profile.svg";
import { Logout } from "../../assets/customChakraIcons/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("learnifyToken");
    dispatch({ type: "login/setAccount", payload: null });
    nav("/");
  };

  return (
    <Flex
      direction={"column"}
      height={"83vh"}
      width={"20vw"}
      gap={10}
      borderColor={colors.darkerGrey}
      p={10}
      position={"relative"}
    >
      <Image src={ProfileSVG} position="absolute" left={0} top="20vh" />
      <Button
        position="absolute"
        bottom={5}
        left={8}
        onClick={handleLogOut}
        leftIcon={<Logout />}
        variant="link"
        color={colors.white}
      >
        Log out
      </Button>
    </Flex>
  );
};
