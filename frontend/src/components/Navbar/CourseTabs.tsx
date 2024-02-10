import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { colors } from "../../theme";
import { useState } from "react";

export const CourseTabs = () => {
  const [index, setIndex] = useState<number>(0);
  return (
    <Tabs
      index={index}
      onChange={(i) => {
        setIndex(i);
      }}
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
