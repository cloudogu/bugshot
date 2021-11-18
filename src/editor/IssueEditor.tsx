import React, { FC } from "react";
import ErrorNotification from "../form/ErrorNotification";
import useConnection from "./useConnection";
import { Screenshot } from "../api/types";
import CreateIssue from "./CreateIssue";
import "twin.macro";

type Props = {
  bugshot?: BugShot;
  screenshot: Screenshot;
};

const IssueEditor: FC<Props> = ({ bugshot, screenshot }) => {
  const { connection, isLoading } = useConnection();

  if (isLoading || !bugshot) {
    return <p>Loading ...</p>;
  }

  if (!connection) {
    return <ErrorNotification error="Connection not configured" />
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
