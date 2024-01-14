import { Flex, Spinner } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { ConfirmEmail } from "./components/Login/ConfirmEmail";
import { NotFound } from "./components/NotFound";
import { colors } from "./theme";
import { Profile } from "./components/Profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store";
import { useQuery } from "@apollo/client";
import { VERIFY_TOKEN } from "./graphql/queries";

function App() {
  const user = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();

  const token = localStorage.getItem("learnifyToken");

  const { data, error, loading } = useQuery(VERIFY_TOKEN, {
    variables: { token },
  });

  useEffect(() => {
    if (data) {
      console.log(data);

      const potentialUser = data.verifyToken;
      if (potentialUser !== null && potentialUser !== undefined) {
        dispatch({
          type: "login/setAccount",
          payload: { ...potentialUser },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) {
    console.log(error);
    dispatch({
      type: "login/setAccount",
      payload: null,
    });
  }

  if (loading)
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

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
