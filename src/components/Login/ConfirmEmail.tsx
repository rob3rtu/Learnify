import { Flex, Spinner } from "@chakra-ui/react";
import { colors } from "../../theme";
import { useEffect } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { search } = useLocation();

  //if the user open the link on another device, ask the user to input the email again
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("userEmail");
      if (!email) {
        email = window.prompt("Please enter your email for confirmation");
      }

      signInWithEmailLink(auth, email ?? "", window.location.href)
        .then((res) => {
          console.log(res.user);
          dispatch({
            type: "login/setAccount",
            payload: {
              email: res.user.email,
              name: res.user.displayName,
              uid: res.user.uid,
            },
          });
          localStorage.setItem("uid", res.user.uid);
          localStorage.removeItem("userEmail");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    nav("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={colors.black}
      height="100vh"
    >
      <Spinner color={colors.white} />
    </Flex>
  );
};
