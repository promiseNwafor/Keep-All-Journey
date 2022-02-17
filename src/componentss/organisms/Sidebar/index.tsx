import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { useLocation } from "react-router-dom";
import { Box, ListItemIcon, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { pink } from "@mui/material/colors";

interface ISidebarProps {
  handleSidebarState: () => void;
  sidebarExpand: boolean;
}

const Sidebar: FC<ISidebarProps> = ({ handleSidebarState, sidebarExpand }) => {
  let { pathname } = useLocation();

  const sideBarBoxStyle = {
    width: sidebarExpand ? 260 : 60,
    minHeight: "100vh",
    backgroundColor: "white",
    borderRight: "1px solid #ddd",
    transition: "width ease-in-out 200ms",
  };

  const iconStyle = {
    fontSize: 30,
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

  return (
    <Box pt={1} component={"div"} sx={sideBarBoxStyle}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={sidebarExpand ? "space-between" : "center"}
        component={"div"}
      >
        {sidebarExpand && (
          <Typography pl={2} variant="h4" children={"KeepUp"} />
        )}
        <IconButton
          sx={iconStyle}
          onClick={handleSidebarState}
          aria-label="menu"
        >
          <MenuIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <List sx={{ mt: 1.5 }}>
        {SidebarData.map((data) => {
          return (
            <Link to={`${data.path}`} key={data.id}>
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
  );
};

export default Sidebar;
