import React, { useEffect, useState } from "react";
import { useParams, useHistory} from "react-router-dom";
import { Container } from "react-bootstrap";
import { API } from "../config/api";

export default function Published() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  let history = useHistory();

  const getBrand = async (id) => {
    try {
      const response = await API.get(`/brand/${id}`);
      setBrand(response.data.data.brand);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectURL = (url) => {
    window.open(`https://${url}`, "_blank");
  };

  useEffect(() => {
    getBrand(id);
  }, []);

  return (
    <>
      <Container fluid>
        <div className="mt-5 text-center">
          <div onClick={() => history.push("/my-link")}>
            <img
              className="w-25 p-e rad"
              src={brand?.image}
              alt={brand?.name}
            />
          </div>
          <h4 className="fw-bold mt-3">{brand?.name}</h4>
          <h5 className="text-muted">{brand?.description}</h5>
          <Container>
            {brand?.link.map((item, index) => (
              <div className="bg-dark p-1 mb-2">
                <p
                  onClick={() => redirectURL(item.url)}
                  className="text-light my-auto p-e"
                >
                  {item.title}
                </p>
              </div>
            ))}
          </Container>
        </div>
      </Container>
    </>
  );
}
