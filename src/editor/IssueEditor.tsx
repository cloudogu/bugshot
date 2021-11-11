import React, { FC } from "react";
import useConnection from "./useConnection";
import CreateConnection from "./CreateConnection";
import { Screenshot } from "./Screenshot";
import CreateIssue from "./CreateIssue";
import "twin.macro";

type Props = {
  screenshot: Screenshot;
};

const Editor: FC<Props> = ({ screenshot }) => {
  const { connection, isLoading, update } = useConnection();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (!connection) {
    return <CreateConnection {...update} />;
  }

  return <CreateIssue screenshot={screenshot} connection={connection} />;
};

const IssueEditor: FC<Props> = ({ screenshot }) => (
  <div tw="p-8 max-w-md">
    <Editor screenshot={screenshot} />
  </div>
);

export default IssueEditor;
