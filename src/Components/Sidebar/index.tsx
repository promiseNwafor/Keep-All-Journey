import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import "./styles.css";
import { useAuthContext } from "../../context/AuthContext";

interface ISidebarProps {
  handleSidebarState: () => void;
  sidebarExpand: boolean;
}

const Sidebar: FC<ISidebarProps> = ({ handleSidebarState, sidebarExpand }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownToggle = () => setDropdownOpen((prevState) => !prevState);
  const { logOut } = useAuthContext();
  let { pathname } = useLocation();

  const handleLogOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await logOut();
      localStorage.removeItem("user");
      window.location.reload();
    } catch (err) {
      console.log(err, "error");
    }
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
          <p className="m-3" onClick={(e) => handleLogOut(e)}>
            Logout
          </p>
        </div>

        {/* <Link to={`/`} className="d-flex align-items-center">
          {sidebarExpand ? (
            <i className="fas fa-user"></i>
          ) : (
            <Dropdown
              style={{ right: 10 }}
              isOpen={dropdownOpen}
              toggle={dropdownToggle}
            >
              <DropdownToggle caret></DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>
                  <p onClick={(e) => handleLogOut(e)}>Logout</p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
          <p onClick={(e) => handleLogOut(e)} className="m-3">
            <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle}>
              <DropdownToggle caret>Account</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </p>
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
