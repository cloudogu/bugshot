import React, { FC } from "react";
import useConnection from "./useConnection";
import CreateConnection from "./CreateConnection";
import { Screenshot } from "./Screenshot";
import CreateIssue from "./CreateIssue";
import "twin.macro";

type Props = {
  bugshot?: BugShot;
  screenshot: Screenshot;
};

const IssueEditor: FC<Props> = ({ bugshot, screenshot }) => {
  const { connection, isLoading, update } = useConnection();

  if (isLoading || !bugshot) {
    return <p>Loading ...</p>;
  }

  if (!connection) {
    return <CreateConnection {...update} />;
  }

  return (
    <CreateIssue
      connection={connection}
      bugshot={bugshot}
      screenshot={screenshot}
    />
  );
};

export default IssueEditor;
