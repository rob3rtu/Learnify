import { Flex, Text } from "@chakra-ui/react";
import { colors } from "../../theme";
import { NavBar } from "../Home/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_COURSE } from "../../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";

export const Course = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [deleteCourse] = useMutation(DELETE_COURSE);
  const courses = useSelector((state: RootState) => state.home.courses);

  const handleDeleteCourse = async () => {
    try {
      await deleteCourse({ variables: { id } });
      dispatch({
        type: "home/setCourses",
        payload: courses.filter((course) => course.id !== id),
      });
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        bg={colors.black}
        minH="100vh"
      >
        <NavBar />

        <Text
          color={colors.white}
          marginTop={10}
          cursor={"pointer"}
          onClick={handleDeleteCourse}
        >
          {id}
        </Text>
      </Flex>
    </>
  );
};
