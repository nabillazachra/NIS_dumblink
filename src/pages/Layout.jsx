import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import NavbarHome from "../components/NavbarHome";
import Navigation from "../components/Navigation";

export default function Layout({ children, value }) {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Row>
            <Col>
              <Navigation />
            </Col>
            <Col md={10}>
              <NavbarHome value={value} />
              <div className="mt-5">{children}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
