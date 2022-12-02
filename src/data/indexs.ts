export interface Items {
  id: string;
  title: string;
  body: string;
  dateOfCreation: object;
  endDate: object;
  status: string;
  file: any;
  options: any[];
}

export interface initialStateProps {
  title: string;
  items: any[];
}

export const initialState: initialStateProps[] = [
  {
    title: "Queue",
    items: [],
  },
  {
    title: "Development",
    items: [],
  },
  {
    title: "Done",
    items: [],
  },
];
