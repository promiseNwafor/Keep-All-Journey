import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useItemsContext } from "../../context";
import { IItems } from "../../utils/interfaces";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { Container, Paper, TextField } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const SingleItem = () => {
  const { state }: any = useLocation();
  const item: IItems = state.item;
  const { editItem, deleteItem } = useItemsContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id: string) => {
    deleteItem(id);
    window.location.reload();
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    py: 3,
  };

  const [editState, setEditState] = useState<IItems>({
    id: item.id,
    title: item.title,
    body: item.body,
    date: item.date,
  });
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const toggleEdit = () => setShowEdit(!showEdit);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editItem(item.id as string, editState);
    toggleEdit();
    navigate(`/`);
  };

  return (
    <>
      <Container>
        <Card
          elevation={0}
          sx={{
            my: 4,
            pt: 2,
            pr: 2,
            border: `1px solid #fee`,
          }}
        >
          <CardHeader
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`items/${item.id}`, { state: { item } })}
            avatar={
              <Avatar
                variant="rounded"
                sx={{
                  color: "primary.main",
                  width: 60,
                  height: 60,
                  bgcolor: "secondary.main",
                  "@media(max-width: 600px)": {
                    display: "none",
                  },
                }}
                aria-label="recipe"
              >
                R
              </Avatar>
            }
            action={
              <Typography
                sx={{
                  "@media(max-width: 600px)": {
                    fontSize: 12,
                  },
                }}
              >
                {item.date}
              </Typography>
            }
            title={
              <Stack direction="row" spacing={1}>
                <Typography variant="h6" pb={1}>
                  {item.title}
                </Typography>
                <Chip label="category" size="small" color="secondary" />
              </Stack>
            }
            subheader={<Typography>{item.body}</Typography>}
          />
          <CardActions
            sx={{
              justifyContent: "flex-end",
            }}
          >
            <Stack direction="row" spacing={1}>
              <Chip
                label="Delete"
                variant="outlined"
                size="small"
                color="error"
                onClick={handleOpen}
                onDelete={handleOpen}
              />
              <Chip
                label="Edit"
                variant="outlined"
                onClick={toggleEdit}
                onDelete={toggleEdit}
                deleteIcon={<EditRoundedIcon />}
                size="small"
                color="success"
              />
            </Stack>
          </CardActions>
        </Card>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              textAlign={"center"}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Are you sure?
            </Typography>
            <Stack mt={3} direction="row" spacing={2}>
              <Button color="secondary">Secondary</Button>
              <Button
                onClick={() => handleDelete(item.id)}
                variant="contained"
                color="success"
              >
                Yes
              </Button>
              <Button onClick={handleClose} variant="contained" color="error">
                No
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Modal
          open={showEdit}
          onClose={toggleEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper
            sx={{
              maxWidth: 600,
              margin: "auto",
              marginTop: 3,
              p: 4,
            }}
          >
            <form onSubmit={(e) => handleEdit(e)}>
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
                  value={editState?.title}
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
                  value={editState?.body}
                />
                <TextField
                  id="date"
                  type={"date"}
                  fullWidth
                  name="date"
                  onChange={handleInputChange}
                  value={editState?.date}
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
        </Modal>
      </Container>
    </>
  );
};

export default SingleItem;
