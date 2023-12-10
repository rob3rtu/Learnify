import { Flex, Spinner } from "@chakra-ui/react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { colors } from "../../theme";
import { useLoginApi } from "./useLoginApi";

export const ConfirmEmail = () => {
  const nav = useNavigate();
  const { setUserAccount } = useLoginApi();

  //if the user open the link on another device, ask the user to input the email again
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("userEmail");
      if (!email) {
        email = window.prompt("Please enter your email for confirmation");
      }

      signInWithEmailLink(auth, email ?? "", window.location.href)
        .then(async (res) => {
          //actual login
          console.log(res.user);
          setUserAccount({
            email: res.user.email ?? "",
            displayName: res.user.displayName ?? "",
            uid: res.user.uid,
          });
          localStorage.setItem("uid", res.user.uid);
          localStorage.removeItem("userEmail");
          nav("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={colors.black}
      height="100vh"
    >
      <Spinner size="xl" color={colors.white} />
    </Flex>
  );
};
