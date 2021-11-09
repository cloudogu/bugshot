import React from "react";
import { useConnection } from "./connection";
import CreateConnection from "./CreateConnection";

const IssueEditor = () => {
  const { connection, isLoading } = useConnection();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (!connection) {
    return <CreateConnection />;
  }

  return (
    <>
      <h2>Was geht?</h2>
      <p>{JSON.stringify(connection)}</p>
    </>
  );
};

export default IssueEditor;
