import React, { useState, useContext } from "react";
import { Modal, Form, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { UserContext } from "../context/userContext";

import { API, setAuthToken } from "../config/api";

export default function ModalLogin(props) {
  let history = useHistory();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });

      localStorage.setItem("token", response.data.data.user.token);
      setAuthToken(response.data.data.user.token);

      history.push(
        response.data.data.user.role === "admin" ? "/admin" : "/template"
      );

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
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
            Login
          </Modal.Title>
          {message && message}
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Password"
              />
            </Form.Group>
            <button className="btn-reg auto w-100 mb-3" type="submit">
              Login
            </button>
            <p className="text-center">
              Don't have an account? Klik
              <span className="fw-bold p-e" onClick={props.onRedirectRegis}>
                &nbsp;Here
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
