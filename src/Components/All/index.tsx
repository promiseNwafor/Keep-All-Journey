import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useItemsContext } from "../../context";
import { useAuthContext } from "../../context/AuthContext";
import Item from "./Item";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Skeleton from "@mui/material/Skeleton";

const All = () => {
  const { items, getItems, itemsLoading } = useItemsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
  }, [user]);

  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
    bgColor: "blue",
  };

  return (
    <Container>
      {itemsLoading && (
        <>
          <Skeleton height={100} sx={{ backgroundColor: "#f0f0f0" }} />
          <Skeleton height={100} sx={{ backgroundColor: "#f0f0f0" }} />
          <Skeleton height={100} sx={{ backgroundColor: "#f0f0f0" }} />
        </>
      )}
      {items?.map((item) => {
        return <Item key={item.id} item={item} />;
      })}

      <Fab
        onClick={() => navigate(`/add`)}
        sx={fabStyle}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default All;
