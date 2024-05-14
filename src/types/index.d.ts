export type DropdownProps = {
  options: Array<string>;
  title: string;
  useState: [Array<string>, (value: Array<string>) => void];
};

export type Filters = {
  role: Array<string>;
  location: Array<string>;
  billable: Array<string>;
  from: Date | null;
  to: Date | null;
};
