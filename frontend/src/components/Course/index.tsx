import { Flex, Spinner, Text } from "@chakra-ui/react";
import { colors } from "../../theme";
import { NavBar } from "../Navbar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { apiClient } from "../../utils/apiClient";
import { useEffect } from "react";
import { AnyAction } from "redux";
import { getCurrentCourse } from "./api";

export const Course = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.home.courses);
  const loading = useSelector((state: RootState) => state.course.loading);
  const course = useSelector((state: RootState) => state.course.course);

  const handleDeleteCourse = async () => {
    try {
      await apiClient.delete(`course/delete/${id}`);
      dispatch({
        type: "home/setCourses",
        payload: courses.filter((course) => course.id !== id),
      });
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getCurrentCourse(id ?? "") as unknown as AnyAction);
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
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        bg={colors.black}
        minH="100vh"
      >
        <NavBar courseName={course?.longName} />

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
