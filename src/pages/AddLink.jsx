import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "./Layout";
import defUpload from "../assets/img/upload.png";
import template from "../data/template";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../config/api";

export default function AddLink() {
  const title = "Template";
  let history = useHistory();
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [idData, setIdData] = useState(null);
  const [brand, setBrand] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [addForm, setAddForm] = useState([
    {
      title: "",
      url: "",
      logo: "",
      previewImage: "",
    },
    {
      title: "",
      url: "",
      logo: "",
      previewImage: "",
    },
  ]);

  console.log(addForm);

  const handleOnChange = (e, index) => {
    e.preventDefault();
    const values = [...addForm];
    if (e.target.name === `title${index}`) {
      values[index].title = e.target.value;
      setAddForm(values);
    }
    if (e.target.name === `url${index}`) {
      values[index].url = e.target.value;
      setAddForm(values);
    }
    if (e.target.name === `logo${index}` && e.target.files[0]) {
      let url = URL.createObjectURL(e.target.files[0]);
      values[index].previewImage = url;
      setAddForm(values);
    }
    if (e.target.name === `logo${index}` && e.target.files[0]) {
      let url = e.target.files;
      values[index].logo = url;
      setAddForm(values);
    }
  };

  const addBrandFunc = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("name", brand.name);
      formData.set("description", brand.description);
      formData.set("image", brand.image[0], brand.image[0].name);
      addForm.map((item) => {
        formData.append("title", item.title);
        formData.append("url", item.url);
        formData.append("logo", item.logo[0]);
      });

      const response = await API.post("/brand/", formData, config);
      console.log(response);
      setIdData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePush = (e) => {
    e.preventDefault();
    addBrandFunc();
    alert("Data successfully added");
    history.push(`/my-link`);
  };

  const handleClick = () => {
    const values = [...addForm];
    values.push({ title: "", url: "", logo: "", previewImage: "" });
    setAddForm(values);
  };

  useEffect(() => {
    if (template.length > 0) {
      const tmp = template.find((item) => item.id === parseInt(id));
      setData(tmp);
    }
  }, []);

  const handleChange = (e) => {
    setBrand({
      ...brand,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.name === "image") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  return (
    <>
      <Layout value={title}>
        <Container>
          <Row className="mb-3">
            <Col>
              <h2>Create Link</h2>
            </Col>
            <Col>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-warning text-light w-auto"
                  onClick={handlePush}
                >
                  Publish Link
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mb-5">
              <div className="p-3 rad bg-light">
                <form>
                  <div className="mb-5">
                    <span className="mt-3 me-5 mb-3">
                      {preview !== null ? (
                        <img
                          className="w-25 h-25"
                          src={preview}
                          alt="preview"
                        />
                      ) : (
                        <img src={defUpload} alt="preview" />
                      )}
                    </span>
                    <label htmlFor="image" className="p-e">
                      <input
                        type="file"
                        name="image"
                        hidden
                        id="image"
                        onChange={handleChange}
                      />
                      <span className="mt-3 btn btn-warning text-light w-auto">
                        Upload
                      </span>
                    </label>
                  </div>
                  <div className="mb-5">
                    <label className="text-muted mb-2">Title</label>
                    <input
                      type="text"
                      name="name"
                      className="bg-transparent no-border form-control"
                      placeholder="ex. Your Name"
                      value={brand.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="text-muted mb-2">Description</label>
                    <input
                      type="text"
                      className="bg-transparent no-border form-control"
                      placeholder="ex. Your Description"
                      name="description"
                      value={brand.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="over-auto">
                    {addForm.map((item, index) => {
                      return (
                        <div className="p-3 rad mb-2 bg-gray">
                          <Row key={index}>
                            <Col md={4}>
                              <div className="mb-5">
                                <span className="mt-3 me-5 mb-3">
                                  {item.previewImage !== "" ? (
                                    <img
                                      className="w-100 h-100"
                                      src={item.previewImage}
                                      alt="logo"
                                    />
                                  ) : (
                                    <img src={defUpload} alt="logo" />
                                  )}
                                </span>
                                <input
                                  type="file"
                                  name={`logo${index}`}
                                  hidden
                                  id={`idLogo${index}`}
                                  onChange={(e) => handleOnChange(e, index)}
                                />
                                <label
                                  htmlFor={`idLogo${index}`}
                                  className="p-e"
                                >
                                  <span className="mt-3 btn btn-warning text-light w-auto">
                                    Upload
                                  </span>
                                </label>
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-3">
                                <label className="text-dark mb-2">
                                  Title Link
                                </label>
                                <input
                                  type="text"
                                  name={`title${index}`}
                                  className="bg-transparent no-border form-control"
                                  placeholder="ex. Example"
                                  value={item.title}
                                  onChange={(e) => handleOnChange(e, index)}
                                />
                              </div>
                              <div>
                                <label className="text-dark mb-2">Link</label>
                                <input
                                  type="text"
                                  className="bg-transparent no-border form-control"
                                  placeholder="ex. www.example.com"
                                  name={`url${index}`}
                                  value={item.url}
                                  onChange={(e) => handleOnChange(e, index)}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleClick}
                    type="button"
                    className="btn btn-warning text-light w-100"
                  >
                    Add New Link
                  </button>
                </form>
              </div>
            </Col>
            <Col>
              <div className="text-center">
                <img src={data?.image} alt="template" />
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}
