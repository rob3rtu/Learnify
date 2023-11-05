export interface CourseInterface {
  shortName: string;
  longName: string;
}

export interface FiltersInterface {
  domain: "mate" | "info" | "cti";
  year: 1 | 2 | 3 | 4;
  semester: 1 | 2;
}

export const defaultFilters: FiltersInterface = {
  domain: "mate",
  year: 1,
  semester: 1,
};
