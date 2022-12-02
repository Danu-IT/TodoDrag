import { FC, useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { initialStateProps } from "../data/indexs";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const state = useTypedSelector((state) => state.todo);
  let globalState;
  const search = () => {
    let saveState: initialStateProps[];
    if (!localStorage.state) return state;
    saveState = JSON.parse(localStorage.state);
    if (value === "") return saveState;
    const newStateSearch = saveState.map((el: any) => {
      const newArr = el.items.filter((item: any) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      return { ...el, items: newArr };
    });
    return newStateSearch;
  };
  useEffect(() => {
    globalState = search();
    dispatch({ type: "UPDATE_STATE", payload: globalState });
  }, [value]);
  return (
    <SearchCustom>
      <BsSearch cursor={"pointer"}></BsSearch>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Search"
      />
    </SearchCustom>
  );
};

const SearchCustom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  outline: none;
  border: none;
  margin-left: 20px;
  font-size: 25px;
  color: gray;
  width: 70%;
`;

export default Search;
