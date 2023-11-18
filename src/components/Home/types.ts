export interface CourseInterface {
  id: string;
  shortName: string;
  longName: string;
  year: number;
  semester: number;
  domain: string;
}

export interface FiltersInterface {
  domain: "mate" | "info" | "cti";
  year: 1 | 2 | 3 | 4;
  semester: 1 | 2;
}

//OBJECTS

export const defaultFilters: FiltersInterface = {
  domain: "mate",
  year: 1,
  semester: 1,
};

export const filtersObject = {
  domain: ["mate", "info", "cti"],
  year: [1, 2, 3, 4],
  semester: [1, 2],
};

export const yearsObject: { [key: number]: string } = {
  1: "AN I",
  2: "AN II",
  3: "AN III",
  4: "AN IV",
};

export const semesterObject: { [key: number]: string } = {
  1: "SEM I",
  2: "SEM II",
};
