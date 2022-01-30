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

interface ISidebarProps {
  handleSidebarState: () => void;
  sidebarExpand: boolean;
}

const Sidebar: FC<ISidebarProps> = ({ handleSidebarState, sidebarExpand }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownToggle = () => setDropdownOpen((prevState) => !prevState);
  let { pathname } = useLocation();

  return (
    <div className={`Sidebar ${sidebarExpand ? "" : "sidebar-compress"}`}>
      <i onClick={handleSidebarState} className="fas fa-bars menu-bar"></i>
      <div className="sidebar-items">
        {SidebarData.map((data) => {
          return (
            <>
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
            </>
          );
        })}
      </div>
      <div className="sidebar-item sidebar-foot">
        <Link to={`/`} className="d-flex align-items-center">
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
                <DropdownItem header>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
          <p className="m-3">
            <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle}>
              <DropdownToggle caret>Account</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
