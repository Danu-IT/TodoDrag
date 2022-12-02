import moment from "moment";
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Container } from "./Home";
interface TaskProps {}

const Task: FC<TaskProps> = () => {
  const { state } = useLocation();
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Task</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container
        style={{
          background: "yellow",
          position: "relative",
          margin: "100px auto 0 auto",
          minHeight: "200px",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <TitleTask>{state.item.title}</TitleTask>
        <CreateTime>
          <span>Date create - </span>
          {state.item.dateOfCreation}
        </CreateTime>
        <EndTime>
          <span>Date end - </span>
          {state.item.dateOfCreation}
        </EndTime>
        <span>Status - {state.item.status}</span>
        <Body>{state.item.body}</Body>
      </Container>
    </div>
  );
};

const TitleTask = styled.h3`
  text-align: center;
`;

const Body = styled.div`
  text-align: center;
`;
const CreateTime = styled.div`
  position: absolute;
  top: 10px;
`;
const EndTime = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
export default Task;
