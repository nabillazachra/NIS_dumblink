import React from "react";
import { Container } from "react-bootstrap";
import Layout from "./Layout";
import ProfileForm from "../components/ProfileForm";

export default function Profile() {
  const title = "My Account";
  return (
    <>
      <Layout value={title}>
        <Container>
          <h2 className="my-5">My Information</h2>
          <ProfileForm />
        </Container>
      </Layout>
    </>
  );
}
