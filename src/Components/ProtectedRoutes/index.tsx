import { Box, Container } from "@mui/material";
import { useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../componentss/organisms/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import MenuDropping from "../../componentss/molecules/MenuDropping";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useItemsContext } from "../../context";
import Settings from "@mui/icons-material/Settings";
import { blue, pink } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import Popover from "@mui/material/Popover";
import { ListItemIcon } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { SidebarData } from "../../componentss/organisms/Sidebar/SidebarData";

const ProtectedRoutes = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarExpand, setSidebarExpand] = useState<boolean>(true);
  const { logOut, user } = useAuthContext();
  let currentUser = localStorage.getItem("user");
  const { items, setItems } = useItemsContext();
  let { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = useState<boolean>(false);

  const handleToggle = () => {
    setAnchorEl(!anchorEl);
  };

  const listItemStyle = {
    style: {
      borderBottom: "1px solid #eee",
    },
    activeStyle: {
      backgroundColor: pink[400],
      color: "white",
    },
    hoverStyle: {
      borderBottom: "1px solid #eee",
      "&:hover": {
        backgroundColor: pink[50],
        color: pink[600],
      },
    },
  };

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
    return searched;
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
            <IconButton
              // aria-describedby={id}
              onClick={handleToggle}
              sx={{
                fontSize: 30,
                display: "none",
                "@media(max-width: 600px)": {
                  display: "flex",
                },
              }}
              aria-label="menu"
            >
              <MenuIcon fontSize="inherit" />
            </IconButton>
            <Paper
              component="form"
              sx={{
                p: "0px 6px",
                display: "flex",
                alignItems: "center",
                width: "50%",
                maxWidth: 400,
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
              <IconButton sx={{ backgroundColor: blue[50] }} aria-label="menu">
                {/* <NotificationsActiveIcon fontSize="inherit" /> */}
                <Settings fontSize="inherit" />
              </IconButton>
              <MenuDropping user={user} handleLogOut={handleLogOut} />
            </Box>
          </Container>
        </Box>
        <Outlet />
      </Box>
      <Popover
        open={anchorEl}
        onClose={handleToggle}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          top: 50,
          left: -15,
        }}
      >
        <Box width={"50vw"} minHeight={"80vh"}>
          <List sx={{}}>
            {SidebarData.map((data) => {
              return (
                <Link to={`${data.path}`} onClick={handleToggle} key={data.id}>
                  <ListItem
                    sx={
                      pathname === data.path
                        ? listItemStyle.activeStyle
                        : listItemStyle.hoverStyle
                    }
                  >
                    <ListItemIcon>
                      <data.icon
                        sx={{
                          color: pathname === data.path ? "white" : "",
                        }}
                      />
                    </ListItemIcon>
                    {sidebarExpand && <ListItemText>{data.title}</ListItemText>}
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Box>
      </Popover>
    </Box>
  ) : (
    <Navigate to="auth" />
  );
};

export default ProtectedRoutes;
