import React from "react";
import List from "../components/List";
import Layout from "./Layout";

export default function Template() {
  const title = "Template";
  return (
    <>
      <Layout value={title}>
        <List />
      </Layout>
    </>
  );
}
