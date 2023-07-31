import classNames from "classnames";
import FeatherIcon from "feather-icons-react";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAppStore } from "../store";

interface ProfileMenuItem {
  label: string;
  icon: string;
  redirectTo: string;
}

interface ProfileDropdownProps {
  menuItems: Array<ProfileMenuItem>;
  profilePic?: string;
  username: string;
}

const ProfileDropdown = (props: ProfileDropdownProps) => {
  const profilePic = props.profilePic || null;
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const { removeAuth } = useAppStore();
  const { push } = useHistory();

  /*
   * toggle profile-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClick = () => {
    removeAuth();
    push("/");
  };
  const handleChangepass = () => {
    push("/admin/change-password");
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-profile"
        as="a"
        onClick={toggleDropdown}
        className={classNames(
          "nav-link",
          "nav-user",
          "me-0",
          "cursor-pointer",
          { show: dropdownOpen }
        )}
      >
        <img src={profilePic!} className="rounded-circle" alt="" />
        <span className="pro-user-name ms-2">
          {props.username} <i className="uil uil-angle-down"></i>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-end profile-dropdown">
        <div onClick={toggleDropdown}>
          <div className="dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome ! {props.username}</h6>
          </div>
          {false &&
            (props.menuItems || []).map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {i === props.menuItems.length - 1 && (
                    <div className="dropdown-divider"></div>
                  )}
                  <Link
                    to={item.redirectTo}
                    className="dropdown-item notify-item"
                    key={i + "-profile-menu"}
                  >
                    <FeatherIcon
                      icon={item.icon}
                      className="icon-dual icon-xs me-1"
                    />
                    <span>{item.label}</span>
                  </Link>
                </React.Fragment>
              );
            })}

          <Link
            to={"#"}
            className="dropdown-item notify-item"
            key={"id" + "-profile-menu"}
            onClick={handleClick}
          >
            <FeatherIcon icon={"log-out"} className="icon-dual icon-xs me-1" />
            <span>Logout</span>
          </Link>

          {/* <Link
            to={"#"}
            className="dropdown-item notify-item"
            key={"id" + "-profile-menu"}
            onClick={handleChangepass}
          >
            <FeatherIcon icon={"lock"} className="icon-dual icon-xs me-1" />
            <span>Change Password</span>
          </Link> */}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
