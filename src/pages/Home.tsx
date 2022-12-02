import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Content from "../components/Content";
import Form from "../components/Form";
import Header from "../components/Header";
import Modal from "../components/UI/Modal";
import { Items } from "../data/indexs";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Helmet } from "react-helmet";

const App = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const state = useTypedSelector((state) => state.todo);
  const dispatch = useDispatch();
  const reorderColumnList = (
    sourseColumn: any,
    startIndex: number,
    endIndex: number
  ) => {
    const newTaskId = Array.from(sourseColumn.items);
    const [removed] = newTaskId.splice(startIndex, 1);
    newTaskId.splice(endIndex, 0, removed);
    const newColumn = {
      ...sourseColumn,
      items: newTaskId,
    };
    return newColumn;
  };

  const onDragEnd = (result: DropResult, provided: any) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const sourceColumn = state.find((o) => o.title === source.droppableId);
    const destinationColumn = state.find(
      (o) => o.title === destination.droppableId
    );
    if (sourceColumn?.title === destinationColumn?.title) {
      const newColumn = reorderColumnList(
        sourceColumn,
        source.index,
        destination.index
      );
      const newState = [...state].map((el) => {
        if (el.title === newColumn.title) {
          return newColumn;
        }
        return el;
      });
      dispatch({ type: "UPDATE_STATE", payload: newState });
      localStorage.setItem("state", JSON.stringify(newState));
      return;
    }
    if (sourceColumn && destinationColumn) {
      const startTaskIndex = Array.from(sourceColumn?.items);
      const [removed] = startTaskIndex.splice(source.index, 1);
      removed.status = destinationColumn.title;
      const newStartColumn = {
        ...sourceColumn,
        items: startTaskIndex,
      };
      const endTaskIndex = Array.from(destinationColumn.items);
      endTaskIndex.splice(destination.index, 0, removed);
      const newEndColumn = {
        ...destinationColumn,
        items: endTaskIndex,
      };
      const newState = [...state].map((el) => {
        if (el.title === newEndColumn.title) {
          return newEndColumn;
        } else if (el.title === newStartColumn.title) {
          return newStartColumn;
        }
        return el;
      });
      dispatch({ type: "UPDATE_STATE", payload: newState });
      localStorage.setItem("state", JSON.stringify(newState));
    }
  };

  const addTask = (task: Items) => {
    dispatch({ type: "ADD_TASK", payload: task });
    setVisibleModal(false);
  };

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Header></Header>
          <Projects>
            <HeaderTask>
              <Title>Projects</Title>
              <Add onClick={() => setVisibleModal(true)}>+</Add>
            </HeaderTask>
            <Modal
              setVisibleModal={setVisibleModal}
              visibleModal={visibleModal}
            >
              <Form addTask={addTask}></Form>
            </Modal>
            <Content state={state}></Content>
          </Projects>
        </Container>
      </DragDropContext>
    </div>
  );
};

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  @media (max-width: 1024px) {
    padding: 0 10px;
  }
`;

const HeaderTask = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Projects = styled.div``;
const Title = styled.h3`
  font-size: 30px;
`;

const Add = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6ee9d4;
  padding: 5px 8px;
  cursor: pointer;
  border-radius: 50%;
  transition-duration: 300ms;
  margin-left: 20px;
  :hover {
    opacity: 0.7;
  }
`;
export default App;
