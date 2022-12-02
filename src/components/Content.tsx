import React, { FC } from "react";
import styled from "styled-components";
import { initialStateProps } from "../data/indexs";
import Column from "./Column";

interface ContentProps {
  state: initialStateProps[];
}

const Content: FC<ContentProps> = ({ state }) => {
  return (
    <ContentContainer>
      {state.map((elem) => (
        <Column key={elem.title} elem={elem}></Column>
      ))}
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  display: flex;
  gap: 25px;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
export default Content;
