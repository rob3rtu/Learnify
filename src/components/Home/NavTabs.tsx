import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { colors } from "../../theme";

interface NavTabsProps {
  tabs: string[];
}

export const NavTabs: React.FC<NavTabsProps> = ({ tabs }) => {
  return (
    <Tabs variant="solid-rounded" size="sm">
      <TabList>
        {tabs.map((tab) => (
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
        ))}
      </TabList>
    </Tabs>
  );
};
