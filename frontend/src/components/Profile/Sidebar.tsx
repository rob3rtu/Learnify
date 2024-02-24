import { Button, Flex, Image, Select } from "@chakra-ui/react";
import { colors } from "../../theme";
import ProfileSVG from "../../assets/profile.svg";
import { Logout } from "../../assets/customChakraIcons/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { courseFiltersObkect } from "../Course/types";
import { RootState } from "../../Store";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state: RootState) => state.auth.account);
  const filters = useSelector((state: RootState) => state.course.filters);

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
      alignItems={"center"}
    >
      <Select
        value={filters.section}
        variant={"outline"}
        color={colors.white}
        onChange={(e) => {
          dispatch({
            type: "course/setFilters",
            payload: { section: e.target.value },
          });
        }}
      >
        {courseFiltersObkect.map((section) => {
          return (
            <option key={section} value={section}>
              {section === "forum"
                ? "All"
                : section[0].toUpperCase() + section.slice(1)}
            </option>
          );
        })}
      </Select>

      {user?.role === "admin" && (
        <Button
          variant={"link"}
          color={"white"}
          onClick={() => {
            nav("/users");
          }}
        >
          Manage users
        </Button>
      )}

      <Image src={ProfileSVG} position="absolute" left={0} bottom="20vh" />
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
