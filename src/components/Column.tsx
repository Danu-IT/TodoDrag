import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { initialStateProps } from "../data/indexs";
import Card from "./Card";

interface ColumnProps {
  elem: initialStateProps;
}

const Column: FC<ColumnProps> = ({ elem }) => {
  return (
    <ColumnContainer>
      <Title>
        <div>{elem.title}</div>
        <Count>{elem.items.length}</Count>
      </Title>
      <Droppable droppableId={elem.title}>
        {(provided, droppableSnapshot) => (
          <CardList ref={provided.innerRef} {...provided.droppableProps}>
            {elem.items.map((item, index) => (
              <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                {(provided, draggbleSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card item={item}></Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  flex-direction: column;
  display: flex;
  background-color: #b2fff2;
  padding: 10px;
  width: 30%;
  border-radius: 10px;
  height: fit-content;
  @media (max-width: 1024px) {
    width: 60%;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Count = styled.div`
  background-color: #6ee9d4;
  padding: 3px 5px;
  border-radius: 5px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default Column;
