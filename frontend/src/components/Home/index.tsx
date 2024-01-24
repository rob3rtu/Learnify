import {
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { RootState } from "../../Store";
import { colors } from "../../theme";
import { CourseCard } from "./CourseCard";
import { NavBar } from "./NavBar";
import { getAllCourses } from "./api";
import { CourseInterface } from "./types";
import SadSVG from "../../assets/sad.svg";
import { CreateCourseModal } from "./CreateCourseModal";

export const Home = () => {
  const account = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.home.loading);
  const courses = useSelector((state: RootState) => state.home.courses);
  const filteredCourses = useSelector(
    (state: RootState) => state.home.filteredCourses
  );
  const filters = useSelector((state: RootState) => state.home.filters);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(getAllCourses() as unknown as AnyAction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch({
      type: "home/setFilteredCourses",
      payload: courses.filter((course) => {
        return (
          course.domain === filters.domain &&
          course.year === filters.year &&
          course.semester === filters.semester
        );
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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

        <CreateCourseModal
          filters={filters}
          isOpen={isOpen}
          onClose={onClose}
        />

        {loading ? (
          <Spinner color="white" marginTop={20} />
        ) : filteredCourses.length ? (
          <SimpleGrid
            width="100vw"
            padding={20}
            spacing={20}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {filteredCourses.map((course: CourseInterface) => (
              <CourseCard key={course.id} course={course} />
            ))}
            {account?.role === "admin" && (
              <CourseCard
                key={"add-course"}
                course={filteredCourses[0]}
                createCard
                onClick={onOpen}
              />
            )}
          </SimpleGrid>
        ) : (
          <Flex
            flex={1}
            width="100vw"
            align="center"
            justify="center"
            direction="column"
          >
            <Image src={SadSVG} />
            <Text
              marginTop={5}
              fontFamily="WorkSans-SemiBold"
              fontSize={20}
              color={colors.white}
            >
              There is no course available.
            </Text>
          </Flex>
        )}
        {account?.role === "admin" && filteredCourses.length === 0 && (
          <Button
            position={"absolute"}
            bottom={10}
            colorScheme="blue"
            fontSize={15}
            onClick={onOpen}
          >
            + Add course
          </Button>
        )}
      </Flex>
    </>
  );
};
