import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { colors } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { filtersObject, semesterObject, yearsObject } from "../Home/types";

interface NavTabsProps {
  type: "domain" | "year" | "semester";
}

export const NavTabs: React.FC<NavTabsProps> = ({ type }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.home.filters);

  const handleChangeFilters = (index: number) => {
    dispatch({
      type: "home/setFilters",
      payload: {
        ...filters,
        [type]: filtersObject[type][index],
      },
    });
  };

  return (
    <Tabs
      index={filtersObject[type].indexOf(filters[type] as never)}
      onChange={handleChangeFilters}
      variant="solid-rounded"
      size="sm"
    >
      <TabList>
        {filtersObject[type].map((tab) => (
          <Tab
            key={tab}
            fontFamily="WorkSans-ExtraLight"
            _selected={{
              backgroundColor: colors.blue,
              fontFamily: "WorkSans-Medium",
            }}
            color={colors.white}
          >
            {(() => {
              switch (type) {
                case "domain":
                  return tab.toString().toUpperCase();
                case "year":
                  return yearsObject[tab as number];
                case "semester":
                  return semesterObject[tab as number];
                default:
                  return null;
              }
            })()}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};
