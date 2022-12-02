import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { v4 } from "uuid";
import { Items } from "../data/indexs";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AiFillEyeInvisible } from "react-icons/ai";
import CheckBox from "./UI/CheckBox";
import { VscTriangleDown } from "react-icons/vsc";

interface SubTaskProps {
  item: Items;
}

const SubTask: FC<SubTaskProps> = ({ item }) => {
  const initialState = { id: v4(), body: "", completed: false };
  const [subTask, setSubTask] = useState(initialState);
  const [visibleInput, setVisibleInput] = useState<boolean>(false);
  const [visibleOptions, setVisibleOptions] = useState<boolean>(false);
  const dispatch = useDispatch();
  const state = useTypedSelector((state) => state.todo);
  const addSubTask = () => {
    if (subTask.body === "") return false;
    dispatch({ type: "ADD_SUB_TASK", payload: [item, subTask] });
    setSubTask({ ...initialState, id: v4() });
  };
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);
  return (
    <div>
      {!visibleInput ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AddTaskBtn
            style={{ cursor: "pointer" }}
            onClick={() => setVisibleInput((prev) => !prev)}
          >
            +
          </AddTaskBtn>
        </div>
      ) : (
        <AddSubTask>
          <Input
            value={subTask.body}
            onChange={(e) => setSubTask({ ...subTask, body: e.target.value })}
            autoFocus
            type="text"
          />
          <div style={{ display: "flex" }}>
            <AddBtn onClick={addSubTask}>+</AddBtn>
            <AiFillEyeInvisible
              cursor={"pointer"}
              onClick={() => setVisibleInput(false)}
            >
              -
            </AiFillEyeInvisible>
          </div>
        </AddSubTask>
      )}
      {item.options.map((el, index) => (
        <>
          {index === 0 && (
            <div
              style={{
                color: "grey",
                display: "flex",
                justifyContent: "space-between",
                width: "150px",
              }}
              key={el.id}
            >
              <CheckBox elem={el} item={item}></CheckBox>
            </div>
          )}
          {visibleOptions && index !== 0 && (
            <div
              style={{
                color: "grey",
                display: "flex",
                justifyContent: "space-between",
                width: "150px",
              }}
              key={el.id}
            >
              <CheckBox elem={el} item={item}></CheckBox>
            </div>
          )}
        </>
      ))}
      <div>
        <div
          style={{
            color: "gray",
            cursor: "pointer",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            fontSize: "10px",
          }}
          onClick={() => setVisibleOptions((prev) => !prev)}
        >
          <span style={{ marginRight: "5px" }}>
            {visibleOptions ? "Hide" : "Visible"} task
          </span>
          {visibleOptions ? (
            <VscTriangleDown
              style={{ transform: "rotate(180deg)" }}
              size={12}
            ></VscTriangleDown>
          ) : (
            <>
              <span style={{ fontSize: "13px" }}>
                ({item.options.length === 0 ? 0 : item.options.length - 1})
              </span>
              <VscTriangleDown size={12}></VscTriangleDown>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const AddSubTask = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const AddBtn = styled.span`
  margin-right: 10px;
  cursor: pointer;
  color: black;
  font-weight: 700;
`;

const Input = styled.input`
  background-color: inherit;
  border: none;
  outline: none;
`;

const AddTaskBtn = styled.div`
  margin-top: 5px;
  width: 50px;
  height: 20px;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px black dashed;
`;

export default SubTask;
