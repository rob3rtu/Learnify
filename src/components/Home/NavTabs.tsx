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
            _selected={{ backgroundColor: colors.blue }}
            color={colors.white}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};
