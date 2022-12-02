import React, { FC, useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Items } from "../../data/indexs";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type CheckBoxProps = {
  item: Items;
  elem: any;
};

const CheckBox: FC<CheckBoxProps> = ({ item, elem }) => {
  const state = useTypedSelector((state) => state.todo);
  const [completed, setCompleted] = useState<boolean>();
  const dispatch = useDispatch();
  useEffect(() => {
    let indexCompletedSub = state.findIndex((el) => el.title === item.status);
    state[indexCompletedSub].items.forEach((el) => {
      if (el.id === item.id) {
        el.options.forEach((element: any) => {
          if (element.id === elem.id) {
            setCompleted(
              element.completed === undefined ? false : element.completed
            );
          }
        });
      }
    });
  }, []);
  useMemo(() => {
    dispatch({
      type: "COMPLETED_SUB_TASK",
      payload: [item, elem, completed],
    });
  }, [completed]);
  return (
    <>
      <span>{elem.body}</span>
      <input
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
        type="checkbox"
      />
    </>
  );
};

export default CheckBox;
