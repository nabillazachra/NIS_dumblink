import React from "react";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import template from "../data/template";

export default function List() {
  let history = useHistory();

  return (
    <>
      <Row>
        {template?.map((item, index) => (
          <Col key={index} className="mb-5">
            <img
              className="mb-3 p-e"
              onClick={() => {
                history.push("/add-link/" + item.id);
              }}
              src={item.image}
              alt={item.id}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
