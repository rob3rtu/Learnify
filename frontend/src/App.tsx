import { Flex, Spinner } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { ConfirmEmail } from "./components/Login/ConfirmEmail";
import { NotFound } from "./components/NotFound";
import { colors } from "./theme";
import { Profile } from "./components/Profile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store";
import { apiClient } from "./components/Utils/apiClient";

function App() {
  const user = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("learnifyToken");
    //if i just logged in the use is set and i dont want to make another
    //useless request
    if (user === null) {
      apiClient
        .post("", {
          query: `
          query {
            verifyToken(token: "${token}") {
              id
              fullName
              email
              role
            }
          }
        `,
        })
        .then((res) => {
          const potentialUser = res.data.data.verifyToken;
          if (potentialUser !== null) {
            dispatch({
              type: "login/setAccount",
              payload: { ...potentialUser },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
