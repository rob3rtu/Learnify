import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AnyAction } from "redux";
import { RootState } from "../../Store";
import NotFoundSVG from "../../assets/not-found.svg";
import { colors } from "../../theme";
import { apiClient } from "../../utils/apiClient";
import { NavBar } from "../Navbar/NavBar";
import { Feed } from "./Feed";
import { SideBar } from "./Sidebar";
import { getCurrentCourse } from "./api";
import { Forum } from "./Forum";

export const Course = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.home.courses);
  const loading = useSelector((state: RootState) => state.course.loading);
  const course = useSelector((state: RootState) => state.course.course);
  const filters = useSelector((state: RootState) => state.course.filters);

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
    dispatch({
      type: "course/setFilters",
      payload: { section: "materials" },
    });
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

        {course === null ? (
          <Flex
            flex={1}
            width="100vw"
            align="center"
            justify="center"
            direction="column"
          >
            <Image src={NotFoundSVG} width={400} maxW={"80vw"} />
            <Text
              marginTop={5}
              fontFamily="WorkSans-SemiBold"
              fontSize={25}
              color={colors.white}
            >
              Course not found...
            </Text>
          </Flex>
        ) : filters.section === "forum" ? (
          <Forum courseId={course.id} />
        ) : (
          <Flex width={"100vw"} height={"83vh"} direction={"row"} flex={1}>
            <SideBar
              handleDeleteCourse={handleDeleteCourse}
              classId={course.id}
            />
            <Feed posts={course.posts} />
          </Flex>
        )}
      </Flex>
    </>
  );
};
