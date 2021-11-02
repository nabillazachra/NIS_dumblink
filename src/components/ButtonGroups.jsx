import React, { useState } from "react";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";

export default function ButtonGroups() {
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
    <div className="btn-group">
      <button
        bg="light"
        className="bg-transparent radius ws fw-bold"
        onClick={() => setModalLogin(true)}
      >
        Login
      </button>
      <ModalLogin
        show={modalLogin}
        onHide={() => setModalLogin(false)}
        onRedirectRegis={RedirectToRegis}
      />
      <button
        className="btn-reg radius ws fw-bold"
        onClick={() => setModalReg(true)}
      >
        Register
      </button>
      <ModalRegister
        show={modalReg}
        onHide={() => setModalReg(false)}
        onRedirectLogin={RedirectToLogin}
      />
    </div>
  );
}
