import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { CourseInterface } from "./types";
import { colors } from "../../theme";
import { useState } from "react";

interface CourseCardProps {
  course: CourseInterface;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [isHover, setisHover] = useState<boolean>(false);

  return (
    <Card
      bg={colors.black}
      height={300}
      borderRadius={17}
      style={{ transition: "box-shadow 0.3s ease-in-out" }}
      boxShadow={
        isHover
          ? "0px 0px 29px 2px #0099FC"
          : "0px 0px 7px 5px rgba(255, 255, 255, 0.25)"
      }
      align="center"
      onMouseEnter={() => {
        setisHover(true);
      }}
      onMouseLeave={() => {
        setisHover(false);
      }}
      cursor="pointer"
    >
      <CardHeader
        borderBottomWidth={1}
        borderColor={colors.darkerGrey}
        textAlign="center"
      >
        <Heading
          size="4xl"
          color={isHover ? colors.blue : colors.darkerGrey}
          style={{ transition: "color 0.3s ease-in-out" }}
          fontFamily="WorkSans-SemiBold"
        >
          {course.shortName}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text
          style={{ transition: "color 0.3s ease-in-out" }}
          color={isHover ? colors.grey : colors.white}
          fontFamily="WorkSans-Medium"
          textAlign="center"
        >
          {course.longName}
        </Text>
      </CardBody>
      <CardFooter paddingBottom={10}>
        <Button
          style={{ transition: "background-color 0.3s ease-in-out" }}
          bg={isHover ? colors.blue : colors.darkerGrey}
          color={colors.white}
          borderRadius={19}
          padding="5px 20px 5px 20px"
          _hover={{
            bg: colors.blue,
          }}
        >
          EXPLORE
        </Button>
      </CardFooter>
    </Card>
  );
};
