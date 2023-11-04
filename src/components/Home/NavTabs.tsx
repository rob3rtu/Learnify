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
            fontFamily="WorkSans-Light"
            _selected={{
              backgroundColor: colors.blue,
              fontFamily: "WorkSans-Bold",
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
