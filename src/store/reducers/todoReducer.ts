import { initialState, initialStateProps } from "../../data/indexs";

export const todoReducer = (
  state: any[] = initialState,
  action: any
): initialStateProps[] => {
  switch (action.type) {
    case "UPDATE_STATE":
      return (state = action.payload);
    case "ADD_TASK":
      return [...state].map((el) => {
        if (el.title === "Queue") {
          return { ...el, items: [...el.items, action.payload] };
        }
        return el;
      });
    case "DELETE_TASK":
      let index = state.findIndex((el) => el.title === action.payload.status);
      let newState = state[index].items.filter((el: any) =>
        el.id === action.payload.id ? false : true
      );
      return [...state].map((el) => {
        if (el.title === action.payload.status) {
          return { ...el, items: newState };
        }
        return el;
      });
    case "CHANGE_TASK":
      let indexChange = state.findIndex(
        (el) => el.title === action.payload.status
      );
      let changeState = state[indexChange].items.map((el: any) => {
        if (el.id === action.payload.id) {
          return {
            ...el,
            title: action.payload.title,
            body: action.payload.body,
          };
        }
        return el;
      });
      return [...state].map((el) => {
        if (el.title === action.payload.status) {
          return { ...el, items: changeState };
        }
        return el;
      });
    case "SEARCH_TAKS":
      if (action.payload === "") return state;
      const newStateSearch = [...state].map((el) => {
        const newArr = el.items.filter((item: any) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );
        return { ...el, items: newArr };
      });
      return newStateSearch;
    case "ADD_SUB_TASK":
      let indexSub = state.findIndex(
        (el) => el.title === action.payload[0].status
      );
      const newSubTask = state[indexSub].items.map((el: any) => {
        if (el.id === action.payload[0].id) {
          return { ...el, options: [...el.options, action.payload[1]] };
        }
        return el;
      });
      return [...state].map((el) => {
        if (el.title === action.payload[0].status) {
          return { ...el, items: newSubTask };
        }
        return el;
      });
    case "COMPLETED_SUB_TASK":
      let indexCompletedSub = state.findIndex(
        (el) => el.title === action.payload[0].status
      );
      const completedSubTask = state[indexCompletedSub].items.map((el: any) => {
        if (el.id === action.payload[0].id) {
          const arr = el.options.map((item: any) => {
            if (item.id === action.payload[1].id) {
              return { ...item, completed: action.payload[2] };
            }
            return item;
          });
          return { ...el, options: arr };
        }
        return el;
      });
      return state.map((el) => {
        if (el.title === action.payload[0].status) {
          return { ...el, items: completedSubTask };
        }
        return el;
      });
    default:
      return state;
  }
};
