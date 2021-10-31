import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import { HiTemplate } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { ImLink } from "react-icons/im";
import { IoLogOutOutline } from "react-icons/io5";
import SideProfile from "../components/SideProfile";
import { Row } from "react-bootstrap";

export default function Navigation() {
  const [state, dispatch] = useContext(UserContext);

  let history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    history.push("/");
  };

  return (
    <div className="sidebar bg-light hover">
      <SideProfile />
      <nav className="mt-5">
        <ul className="d-flex flex-column justify-content-evenly">
          <Row>
            <Link
              className="list-group-item mt-2 mb-4 border-0 bg-transparent"
              to="/template"
            >
              <HiTemplate />
              <span className="ms-3">Template</span>
            </Link>
            <Link
              className="list-group-item mt-2 mb-4 border-0 bg-transparent"
              to="/profile"
            >
              <CgProfile />
              <span className="ms-3">Profile</span>
            </Link>
            <Link
              className="list-group-item mt-2 mb-4 border-0 bg-transparent"
              to="/my-link"
            >
              <ImLink />
              <span className="ms-3">My Link</span>
            </Link>
          </Row>
          <Row>
            <Link
              className="list-group-item mt-2 mb-4 border-0 bg-transparent"
              onClick={handleLogout}
            >
              <IoLogOutOutline />
              <span className="ms-3">Logout</span>
            </Link>
          </Row>
        </ul>
      </nav>
    </div>
  );
}
