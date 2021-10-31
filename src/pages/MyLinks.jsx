import React from "react";
import { Container } from "react-bootstrap";
import Layout from "./Layout";

export default function MyLinks() {
  const title = "My Links";
  return (
    <>
      <Layout value={title}>
        <Container>
          <div className="flex-column flex-wrap">
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
                    placeholder="Find link"
                    name="search"
                  />
                </div>
                <button className="mb-2 me-3 btn-warning w-auto rad text-light">
                  Search
                </button>
              </div>
            </form>
          </div>
        </Container>
      </Layout>
    </>
  );
}
