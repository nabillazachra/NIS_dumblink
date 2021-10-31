import React from "react";
import { Container, Navbar } from "react-bootstrap";

export default function NavbarHome({ value }) {
  return (
    <>
      <Navbar bg="light" className="w-auto">
        <Container fluid>
          <h5 className="my-1 fw-bold">{value}</h5>
        </Container>
      </Navbar>
    </>
  );
}
