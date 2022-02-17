import { FC, useState } from "react";
import { IItems } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue, pink } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useItemsContext } from "../../context";
import Chip from "@mui/material/Chip";

interface ItemProps {
  item: IItems;
}

const Item: FC<ItemProps> = ({ item }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { deleteItem } = useItemsContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

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

  return (
    <>
      <Card
        elevation={0}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          my: 4,
          pt: 2,
          pr: 2,
          border: `1px solid #fee`,

          "&:hover": { border: `1px solid ${pink[100]}` },
        }}
      >
        <CardHeader
          sx={{ cursor: "pointer", width: "100%" }}
          onClick={() => navigate(`items/${item.id}`, { state: { item } })}
          avatar={
            <Avatar
              variant="rounded"
              sx={{
                color: "primary.main",
                width: 60,
                height: 60,
                bgcolor: "secondary.main",
              }}
              aria-label="recipe"
            >
              {item.title[0].toUpperCase()}
            </Avatar>
          }
          action={<Typography>{item.date}</Typography>}
          title={
            <Stack direction="row" spacing={1}>
              <Typography variant="h6" pb={1}>
                {item.title}
              </Typography>
              <Chip
                label="category"
                size="small"
                color="primary"
                sx={{ backgroundColor: blue[300] }}
              />
            </Stack>
          }
          subheader={
            <Typography noWrap sx={{ maxWidth: "30vw" }}>
              {item.body}
            </Typography>
          }
        />
        <CardActions
          sx={{
            py: 0,
            height: 25,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleOpen}>
            <DeleteIcon sx={{ width: hovered ? 20 : 0 }} />
          </IconButton>
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
    </>
  );
};

export default Item;
