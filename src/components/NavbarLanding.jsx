import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "../assets/img/logo.png";
import ButtonGroups from "./ButtonGroups";

export default function NavbarLanding() {
  return (
    <>
      <Navbar bg="light" className="w-auto">
        <Container>
          <Navbar.Brand>
            <img src={Logo} alt="wayslink" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <ButtonGroups />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
