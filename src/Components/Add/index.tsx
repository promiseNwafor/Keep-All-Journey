import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
// import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../context";
import { IItems, IItemsState } from "../../utils/interfaces";

const Add = () => {
  const [state, setState] = useState<IItemsState>({
    title: "",
    body: "",
    date: new Date().toString(),
  });
  const titleRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { addItem } = useItemsContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addItem(state as IItems);
    navigate("/");
    (titleRef.current as HTMLInputElement).value = "";
    (bodyRef.current as HTMLInputElement).value = "";
  };

  return (
    <>
      <Paper
        sx={{
          maxWidth: 600,
          margin: "auto",
          marginTop: 3,
          p: 4,
        }}
      >
        <form onSubmit={(e) => handleAddItem(e)}>
          <Typography align="center" children={"Add Item"} variant="h4" />
          <Box my={4} component={"div"}>
            <TextField
              id="title"
              type={"text"}
              label="Title"
              fullWidth
              name="title"
              sx={{ marginBottom: 2 }}
              onChange={handleInputChange}
              value={state?.title}
            />
            <TextField
              id="body"
              type={"text"}
              label="Detail"
              multiline
              rows={5}
              fullWidth
              name="body"
              sx={{ marginBottom: 2 }}
              onChange={handleInputChange}
              value={state?.body}
            />
            <TextField
              id="date"
              type={"date"}
              fullWidth
              name="date"
              onChange={handleInputChange}
              value={state?.date}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            children={"Add"}
            sx={{
              fontSize: 20,
            }}
          />
        </form>
      </Paper>
    </>
  );
};

export default Add;
