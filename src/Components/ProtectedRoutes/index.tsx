import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../componentss/organisms/Sidebar";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useAuthContext } from "../../context/AuthContext";
import MenuDropping from "../../componentss/molecules/MenuDropping";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useItemsContext } from "../../context";

const ProtectedRoutes = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarExpand, setSidebarExpand] = useState<boolean>(true);
  const { logOut, user } = useAuthContext();
  let currentUser = localStorage.getItem("user");
  const { items, setItems, getItems } = useItemsContext();

  const handleSidebarState = () => {
    setSidebarExpand(!sidebarExpand);
  };

  const handleLogOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    await logOut();
    localStorage.removeItem("user");
    window.location.reload();
  };
  const searchFilter = (q: string) => {
    let query = q.toLowerCase();
    const searched = items.filter((item) => {
      if (
        item.body.toLocaleLowerCase().includes(query) ||
        item.title.toLocaleLowerCase().includes(query)
      ) {
        return item;
      }
    });
    searched.length > 0 && setItems(searched);
  };

  return currentUser ? (
    <Box bgcolor={"#f7f7f7"} component={"div"} display="flex">
      <Sidebar
        handleSidebarState={handleSidebarState}
        sidebarExpand={sidebarExpand}
      />
      <Box width={"100%"} component={"div"}>
        <Box
          py={2}
          sx={{ bgcolor: "#fff", borderBottom: "1px solid #eee" }}
          component={"nav"}
        >
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Paper
              component="form"
              sx={{
                p: "0px 6px",
                display: "flex",
                alignItems: "center",
                width: "40%",
                borderRadius: 30,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search items"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <IconButton
                onClick={() => searchFilter(searchQuery)}
                sx={{}}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <Box display={"flex"} sx={{}} component={"div"}>
              <IconButton aria-label="menu">
                <NotificationsActiveIcon fontSize="inherit" />
              </IconButton>
              <MenuDropping user={user} handleLogOut={handleLogOut} />
            </Box>
          </Container>
        </Box>
        <Outlet />
      </Box>
    </Box>
  ) : (
    <Navigate to="auth" />
  );
};

export default ProtectedRoutes;
