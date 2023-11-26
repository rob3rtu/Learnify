import { Button, Flex, Image } from "@chakra-ui/react";
import { colors } from "../../theme";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { ProfileNav } from "./ProfileNav";
import { Logout } from "../../assets/customChakraIcons/Logout";
import ProfileSVG from "../../assets/profile.svg";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const account = useSelector((state: RootState) => state.auth.account);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("uid");
        dispatch({ type: "login/setAccount", payload: null });
        nav("/");
        console.log("Successfully log out!");
      })
      .catch((err) => {
        console.log("Log out error: ", err);
      });
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={colors.black}
      minH="100vh"
    >
      <ProfileNav user={account} />

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
