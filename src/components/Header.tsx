import React, { FC } from "react";
import styled from "styled-components";
import Search from "./Search";
import { BsQuestionLg } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <CustomHeader>
      <Search></Search>
      <Icons>
        <a data-tip="Todo">
          <BsQuestionLg></BsQuestionLg>
        </a>
        <ReactTooltip place="bottom" type="dark" effect="solid" />
        <AiOutlineBell></AiOutlineBell>
      </Icons>
    </CustomHeader>
  );
};

const CustomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: gray;
  height: 90px;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Icons = styled.div`
  display: flex;
  * {
    margin-left: 15px;
    cursor: pointer;
    transition-duration: 300ms;
    &:hover {
      color: black;
      transition-duration: 300ms;
    }
  }
`;

export default Header;
