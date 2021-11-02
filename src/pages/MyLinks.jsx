import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useHistory } from "react-router";
import Layout from "./Layout";
import ModalDelete from "../components/ModalDelete";
import { API } from "../config/api";

export default function MyLinks() {
  const title = "My Links";
  let history = useHistory();
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResult, setFilteredResult] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getBrands = async () => {
    try {
      const response = await API.get("/brands");
      setBrands(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchData = (value) => {
    setSearchTerm(value);
    if (searchTerm !== "") {
      const filteredData = brands.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredResult(filteredData);
    } else {
      setFilteredResult(brands);
    }
  };

  const deleteBrand = async (id) => {
    try {
      const response = await API.delete(`/brand/${id}`);
      getBrands();
    } catch (error) {
      console.log(error);
    }
  };

  const updateViewCount = async (id) => {
    try {
      const response = await API.patch(`/brand/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectView = (id) => {
    updateViewCount(id);
    history.push("/published/" + id);
  };

  const deleteModal = (id) => {
    deleteBrand(id);
    setShow(false);
  };

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      <Layout value={title}>
        <Container>
          <div className="flex-column flex-wrap mb-5">
            <form>
              <div className="form-group row">
                <div className="p-2 mb-2 mx-3 w-auto">
                  <span className="fw-bold me-3">All Links</span>{" "}
                  <span className="p-2 bg-warning text-light rad w-auto">
                    0
                  </span>
                </div>
                <div class="col-sm-9">
                  <input
                    type="text"
                    className="mb-2 me-3 bg-transparent form-control no-border"
                    placeholder="Find your link"
                    name="search"
                    onChange={(e) => searchData(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={searchData}
                  className="mb-2 me-3 btn-warning w-auto rad text-light"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          {searchTerm.length > 1
            ? filteredResult.map((item) => {
                return (
                  <Row className="mb-3">
                    <Col>
                      <img
                        className="w-50 h-auto"
                        src={item.image}
                        alt={item.name}
                      />
                    </Col>
                    <Col className="my-3" md={2}>
                      <Row>
                        <span className="fw-bolder">{item.name}</span>
                      </Row>
                      <Row>
                        <span className="text-muted">
                          http://localhost:3000
                        </span>
                      </Row>
                    </Col>
                    <Col className="my-3">
                      <Row>
                        <span className="fw-bolder text-center">
                          {item.viewCount}
                        </span>
                      </Row>
                      <Row>
                        <span className="text-muted text-center">Visit</span>
                      </Row>
                    </Col>
                    <Col className="my-3">
                      <Row>
                        <Col>
                          <span>
                            <AiOutlineEye
                              onClick={() => redirectView(item.id)}
                              size={30}
                              className="text-muted p-e"
                            />
                          </span>
                        </Col>
                        <Col>
                          <AiOutlineEdit size={30} className="text-muted p-e" />
                        </Col>
                        <Col>
                          <span onClick={handleShow}>
                            <AiOutlineDelete
                              size={30}
                              className="text-muted p-e"
                            />
                          </span>
                          <ModalDelete
                            show={show}
                            onHide={handleClose}
                            deleteBrand={() => deleteModal(item.id)}
                            handleClose={handleClose}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              })
            : brands?.map((item, index) => (
                <Row key={index} className="mb-3">
                  <Col>
                    <img
                      className="w-50 h-auto"
                      src={item.image}
                      alt={item.name}
                    />
                  </Col>
                  <Col className="my-3" md={2}>
                    <Row>
                      <span className="fw-bolder">{item.name}</span>
                    </Row>
                    <Row>
                      <span className="text-muted">http://localhost:3000</span>
                    </Row>
                  </Col>
                  <Col className="my-3">
                    <Row>
                      <span className="fw-bolder text-center">
                        {item.viewCount}
                      </span>
                    </Row>
                    <Row>
                      <span className="text-muted text-center">Visit</span>
                    </Row>
                  </Col>
                  <Col className="my-3">
                    <Row>
                      <Col>
                        <span onClick={() => redirectView(item.id)}>
                          <AiOutlineEye size={30} className="text-muted p-e" />
                        </span>
                      </Col>
                      <Col>
                        <AiOutlineEdit size={30} className="text-muted p-e" />
                      </Col>
                      <Col>
                        <span onClick={handleShow}>
                          <AiOutlineDelete
                            size={30}
                            className="text-muted p-e"
                          />
                        </span>
                        <ModalDelete
                          show={show}
                          onHide={handleClose}
                          deleteBrand={() => deleteModal(item.id)}
                          handleClose={handleClose}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
        </Container>
      </Layout>
    </>
  );
}
