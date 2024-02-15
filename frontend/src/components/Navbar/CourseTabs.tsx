import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { colors } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { courseFiltersObkect } from "../Course/types";

export const CourseTabs = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.course.filters);

  const handleChangeFilters = (index: number) => {
    dispatch({
      type: "course/setFilters",
      payload: {
        section: courseFiltersObkect[index],
      },
    });
  };

  return (
    <Tabs
      index={courseFiltersObkect.indexOf(filters.section)}
      onChange={handleChangeFilters}
      variant="solid-rounded"
      size="sm"
    >
      <TabList>
        {["Materials", "Courses", "Seminars", "Laboratory", "Forum"].map(
          (tab) => (
            <Tab
              key={tab}
              fontFamily="WorkSans-ExtraLight"
              _selected={{
                backgroundColor: colors.blue,
                fontFamily: "WorkSans-Medium",
              }}
              color={colors.white}
            >
              {tab}
            </Tab>
          )
        )}
      </TabList>
    </Tabs>
  );
};
