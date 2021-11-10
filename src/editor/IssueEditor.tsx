import React from "react";
import useConnection from "./useConnection";
import CreateConnection from "./CreateConnection";

const IssueEditor = () => {
  const { connection, isLoading, update } = useConnection();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (!connection) {
    return <CreateConnection {...update} />;
  }

  return (
    <>
      <h2>Was geht?</h2>
      <p>{JSON.stringify(connection)}</p>
    </>
  );
};

export default IssueEditor;
