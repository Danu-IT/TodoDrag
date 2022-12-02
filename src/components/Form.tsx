import React, { useState, FC, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Box, Button } from "@mui/material";
import { DateRange, MobileDateRangePicker } from "@mui/x-date-pickers-pro";
import { Dayjs } from "dayjs";
import { v4 } from "uuid";
import styled from "styled-components";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Items } from "../data/indexs";

interface FormProps {
  addTask: (task: Items) => void;
}

const fileToDataUri = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

const Form: FC<FormProps> = ({ addTask }) => {
  const [date, setDate] = useState<DateRange<Dayjs>>([null, null]);
  const [time, setTime] = React.useState<Dayjs | null>(null);
  const [dataUri, setDataUri] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const [state, setState] = useState<any>({ title: "", body: "" });

  useEffect(() => {
    setError(false);
  }, [date, time, dataUri, state]);

  const formHandler = (e: any) => {
    e.preventDefault();
    let creation = new Date(`${date[0]}`);
    let timeCreation = new Date(`${time}`);
    creation.setHours(timeCreation.getHours());
    creation.setMinutes(timeCreation.getMinutes());
    creation.setSeconds(timeCreation.getSeconds());

    const end = new Date(`${date[1]}`);
    const title = state.title;
    const body = state.body;
    if (!title || !body) {
      setError(true);
      return false;
    }
    const newState: Items = {
      id: v4(),
      title: title,
      body: body,
      dateOfCreation: creation,
      endDate: end,
      status: "Queue",
      options: [],
      file: dataUri,
    };
    addTask(newState);
    setState({ title: "", body: "" });
    setDate([null, null]);
    setTime(null);
  };
  const fileAddState = (event: any) => {
    const file = event.target.files[0];
    if (!file) {
      setDataUri("");
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri);
    });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={formHandler}>
        <ContainerForm>
          <Title>Creating a post</Title>
          <span style={{ fontSize: "10px", color: "gray" }}>
            The project always ends at 12 o'clock at night
          </span>
        </ContainerForm>
        <div>
          <SubTitle>Select the start and end dates of the project</SubTitle>
          <MobileDateRangePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField size="small" {...startProps} />
                <Box sx={{ mx: 1 }}> to </Box>
                <TextField size="small" {...endProps} />
              </div>
            )}
          />
          <TimePicker
            value={time}
            onChange={(newValue) => setTime(newValue)}
            renderInput={(params) => (
              <TextField
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 50px 0 50px",
                }}
                size="small"
                {...params}
              />
            )}
          />
        </div>
        <div style={{ marginTop: "15px" }}>
          <SubTitle>Enter the content of the post</SubTitle>
          <TextField
            placeholder="Title"
            style={{ width: "100%" }}
            size="small"
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
          />
          <TextField
            style={{ width: "100%", marginTop: "15px" }}
            placeholder="Body"
            variant="outlined"
            multiline
            rows={5}
            value={state.body}
            onChange={(e) => setState({ ...state, body: e.target.value })}
          />
        </div>
        <input onChange={fileAddState} type="file" />
        {error && <span>Заполните все поля</span>}
        <Button type="submit" fullWidth style={{ margin: "10px 0" }}>
          Create
        </Button>
      </form>
    </LocalizationProvider>
  );
};

const ContainerForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h3``;

const SubTitle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

export default Form;
