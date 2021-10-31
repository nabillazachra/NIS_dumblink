import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

import Logo from "../assets/img/logo.png";

import { API } from "../config/api";

export default function SideProfile() {
  const [state] = useContext(UserContext);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await API.get("/user/" + state.user.id);
      setUser(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="text-center mt-2">
        <Link to="/template">
          <img src={Logo} className="wow" alt="template" />
        </Link>
      </div>
    </>
  );
}
