import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Items } from "../data/indexs";
import { Title } from "./Column";
import { AiOutlinePaperClip } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { TbExchange } from "react-icons/tb";
import { GiExitDoor } from "react-icons/gi";
import { useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";
import { AiOutlineCheck } from "react-icons/ai";
import SubTask from "./SubTask";
import { VscTriangleDown } from "react-icons/vsc";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";

interface CardProps {
  item: Items;
}

const Card: FC<CardProps> = ({ item }) => {
  const [visibleSettings, setVisibleSettings] = useState<boolean>(false);
  const [changeLayout, setChangeLayout] = useState<boolean>(true);
  const state = useTypedSelector((state) => state.todo);
  const [visibleOptions, setVisibleOptions] = useState<boolean>(false);
  const navigate = useNavigate();
  const [changeInput, setChangeInput] = useState({
    title: item.title,
    body: item.body,
    id: item.id,
    status: item.status,
  });
  const dispatch = useDispatch();
  const openTask = () => {
    setVisibleOptions((prev) => !prev);
  };
  const deleteTask = () => {
    dispatch({ type: "DELETE_TASK", payload: item });
  };
  const changeLayoutCustom = () => {
    setChangeLayout(true);
    dispatch({ type: "CHANGE_TASK", payload: changeInput });
  };
  const colorChange = () => {
    if (item.status === "Queue") return "red";
    else if (item.status === "Development") return "blue";
    return "green";
  };
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);
  const cardPage = () => {
    console.log(item);
    navigate("./task", { state: { item } });
  };
  return (
    <CardContainer onDoubleClick={cardPage}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {changeLayout ? (
          <TitleText background={() => colorChange()}>{item.title}</TitleText>
        ) : (
          <ChangeInput
            value={changeInput.title}
            autoFocus
            onChange={(e) =>
              setChangeInput({ ...changeInput, title: e.target.value })
            }
            type="text"
          ></ChangeInput>
        )}
        {!visibleSettings ? (
          <Title>
            <AiOutlinePaperClip
              onClick={() => setVisibleSettings(true)}
              cursor="pointer"
            ></AiOutlinePaperClip>
          </Title>
        ) : (
          <Title>
            {changeLayout ? (
              <Icons>
                <AiFillDelete
                  data-tip="delete"
                  onClick={deleteTask}
                  cursor={"pointer"}
                  style={{ marginRight: "10px" }}
                ></AiFillDelete>
                <TbExchange
                  data-tip="change"
                  onClick={() => setChangeLayout((prev) => !prev)}
                  cursor={"pointer"}
                  style={{ marginRight: "10px" }}
                ></TbExchange>
                <div
                  data-tip="download file"
                  style={{ cursor: "pointer", marginRight: "10px" }}
                >
                  <a
                    href={item.file}
                    style={{ textDecoration: "none", color: "black" }}
                    download
                  >
                    +
                  </a>
                </div>
                <GiExitDoor
                  data-tip="close"
                  cursor={"pointer"}
                  onClick={() => setVisibleSettings(false)}
                ></GiExitDoor>
                <ReactTooltip place="top" type="light" effect="solid" />
              </Icons>
            ) : (
              <AiOutlineCheck cursor={"pointer"} onClick={changeLayoutCustom}>
                +
              </AiOutlineCheck>
            )}
          </Title>
        )}
      </div>
      {changeLayout ? (
        <Content>{item.body}</Content>
      ) : (
        <ChangeTextarea
          value={changeInput.body}
          onChange={(e) =>
            setChangeInput({ ...changeInput, body: e.target.value })
          }
          rows={3}
        ></ChangeTextarea>
      )}
      <div>
        <Visible onClick={openTask}>
          <span style={{ marginRight: "5px" }}>
            {visibleOptions ? "Сlose" : "Open"} sub task{" "}
          </span>
          {visibleOptions ? (
            <VscTriangleDown
              style={{ marginTop: "5px", transform: "rotate(180deg)" }}
              size={12}
            ></VscTriangleDown>
          ) : (
            <>
              <VscTriangleDown
                size={12}
                style={{ marginTop: "5px" }}
              ></VscTriangleDown>
            </>
          )}
        </Visible>
        {visibleOptions && <SubTask item={item}></SubTask>}
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background: yellow;
  border-radius: 5px;
  padding: 10px;
`;

const Content = styled.div`
  margin-top: 20px;
  position: relative;
  word-wrap: break-word;
`;

const Icons = styled.div`
  display: flex;
`;

interface TitleTextProps {
  background: () => string;
}

const ChangeInput = styled.input`
  width: 60%;
  height: 20px;
  background: inherit;
  border: none;
  outline: none;
`;

const ChangeTextarea = styled.textarea`
  width: 60%;
  resize: none;
  background: inherit;
  border: none;
  outline: none;
`;

const Visible = styled.div`
  color: red;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  alignitems: center;
`;

const TitleText = styled.div<TitleTextProps>`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 7px;
    right: -10px;
    width: 6px;
    height: 6px;
    background-color: ${(b) => b.background};
    border-radius: 50%;
  }
`;

export default Card;
