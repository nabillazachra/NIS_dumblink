import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Phone from "../assets/img/Phone.png";
import PC from "../assets/img/PC.png";
import NavbarLanding from "../components/NavbarLanding";
import ModalRegister from "../components/ModalRegister";
import ModalLogin from "../components/ModalLogin";
export default function Landing() {
  const [modalReg, setModalReg] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);

  const RedirectToLogin = () => {
    setModalReg(false);
    setModalLogin(true);
  };

  const RedirectToRegis = () => {
    setModalReg(true);
    setModalLogin(false);
  };
  return (
    <>
      <div className="landing">
        <div className="back">
          <NavbarLanding />
          <Container fluid>
            <Row className="left-section">
              <Col className="text-landing">
                <div className="mb-4">
                  <h1 className="fw-bold">
                    The Only Link <br />
                    You'll Ever Need
                  </h1>
                </div>
                <div className="mb-5">
                  <p>
                    Add a link for your Social Bio and optimize
                    <br />
                    your social media traffic.{" "}
                  </p>
                  <p>safe, fast and easy to use</p>
                </div>
                <button onClick={() => setModalReg(true)} className="btn-start">
                  Get Started For Free
                </button>
                <ModalRegister
                  show={modalReg}
                  onHide={() => setModalReg(false)}
                  onRedirectLogin={RedirectToLogin}
                />
                <ModalLogin
                  show={modalLogin}
                  onHide={() => setModalLogin(false)}
                  onRedirectRegis={RedirectToRegis}
                />
              </Col>
              <Col>
                <Row>
                  <Col>
                    <img className="w-25" src={Phone} alt="phone" />
                    <img className="w-75" src={PC} alt="PC" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
