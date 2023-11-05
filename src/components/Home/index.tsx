import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { colors } from "../../theme";
import { NavBar } from "./NavBar";
import { CourseInterface, FiltersInterface, defaultFilters } from "./types";
import { CourseCard } from "./CourseCard";
import { useState } from "react";

export const Home = () => {
  const account = useSelector((state: RootState) => state.auth.account);
  const [filters, setFilters] = useState<FiltersInterface>(defaultFilters);

  const temporaryCourses: CourseInterface[] = [
    {
      shortName: "PAO",
      longName: "Programare Avansata pe Obiecte",
    },
    {
      shortName: "PAO",
      longName: "Programare Avansata pe Obiecte",
    },
    {
      shortName: "PAO",
      longName: "Programare Avansata pe Obiecte",
    },
    {
      shortName: "PAO",
      longName: "Programare Avansata pe Obiecte",
    },
    {
      shortName: "PAO",
      longName: "Programare Avansata pe Obiecte",
    },
  ];

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={colors.black}
      minH="100vh"
    >
      <NavBar user={account} />

      {temporaryCourses.length ? (
        <SimpleGrid
          width="100vw"
          padding={20}
          spacing={20}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {temporaryCourses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </SimpleGrid>
      ) : (
        <Text
          marginTop={20}
          fontFamily="WorkSans-SemiBold"
          fontSize={30}
          color={colors.white}
        >
          There is no course available.
        </Text>
      )}
    </Flex>
  );
};
