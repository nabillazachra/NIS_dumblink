import React, { useState, useContext } from "react";
import { Modal, Form, Alert } from "react-bootstrap";

import { UserContext } from "../context/userContext";

import { API } from "../config/api";

export default function ModalRegister(props) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const { fullname, email, password } = form;

  const handleChange = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);

      if (response.data.status === "send") {
        const alert = (
          <Alert variant="success" className="py-1">
            Register success, you can login now
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Register Failed please fill it correctly
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
    }
  };
  return (
    <div>
      <Modal {...props} centered size="sm">
        <Modal.Body>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="mb-4 fw-bold"
          >
            Register
          </Modal.Title>
          {message && message}
          <Form onSubmit={handleRegistSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                name="email"
                value={email}
                type="email"
                id="email"
                placeholder="Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                name="password"
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                onChange={handleChange}
                name="fullname"
                type="fullname"
                id="fullname"
                value={fullname}
                placeholder="Fullname"
                required
              />
            </Form.Group>
            <button className="btn-reg auto w-100 mb-3" type="submit">
              Register
            </button>
            <p className="text-center">
              Already have an account? Klik
              <span className="fw-bold p-e" onClick={props.onRedirectLogin}>
                &nbsp;Here
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
