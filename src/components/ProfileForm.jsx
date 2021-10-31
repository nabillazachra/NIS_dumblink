import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

import { API } from "../config/api";
import { UserContext } from "../context/userContext";

export default function ProfileForm() {
  let history = useHistory();
  const [state] = useContext(UserContext);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
  });

  const getUser = async (id) => {
    try {
      const response = await API.get("/user/" + id);

      setForm({
        ...form,
        fullname: response.data.data.user.fullname,
        email: response.data.data.user.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const formData = {
        fullname: form.fullname,
        email: form.email,
      };

      const response = await API.patch(
        "/user/" + state.user.id,
        formData,
        config
      );
      history.push("/template");
    } catch (error) {
      console.log();
    }
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      const response = await API.delete("/user/" + state.user.id);
      console.log(response.data.data.user);
      localStorage.removeItem("token");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser(state.user.id);
  }, []);
  return (
    <>
      <Container fluid className="p-3 rad bg-light">
        <form>
          <div className="mb-3">
            <label className="text-muted mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              className="bg-transparent no-border form-control"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <label className="text-muted mb-2">Fullname</label>
            <input
              type="text"
              className="bg-transparent no-border form-control"
              placeholder="fullname"
              name="fullname"
              onChange={handleChange}
              value={form.fullname}
            />
          </div>
          <div className="mb-3 mt-2 text-end">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-reg me-2 mb-2 auto"
            >
              Save Account
            </button>
            <button onClick={handleDelete} className="btn-danger me-2 auto">
              Delete Account
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}
