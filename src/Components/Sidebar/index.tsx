import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { useLocation } from "react-router-dom";
import "./styles.css";
import { useAuthContext } from "../../context/AuthContext";

interface ISidebarProps {
  handleSidebarState: () => void;
  sidebarExpand: boolean;
}

const Sidebar: FC<ISidebarProps> = ({ handleSidebarState, sidebarExpand }) => {
  const { logOut, errors } = useAuthContext();
  let { pathname } = useLocation();

  const handleLogOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    await logOut();
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className={`Sidebar ${sidebarExpand ? "" : "sidebar-compress"}`}>
      <i onClick={handleSidebarState} className="fas fa-bars menu-bar"></i>
      <div className="sidebar-items">
        {SidebarData.map((data) => {
          return (
            <div
              className={`sidebar-item ${
                pathname === data.path ? "active" : ""
              }`}
              key={data.id}
            >
              <Link to={`${data.path}`} className="d-flex align-items-center">
                <i className={`${data.iconClass}`}></i>
                <p className="m-3">{data.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="sidebar-item sidebar-foot">
        <div className="d-flex align-items-center">
          <i className="fas fa-user"></i>
          {/* {error && <p>Error logging out</p>} */}
          <p className="m-3" onClick={(e) => handleLogOut(e)}>
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
