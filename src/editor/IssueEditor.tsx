import React, { FC } from "react";
import ErrorNotification from "../shared/ErrorNotification";
import useConnection from "./useConnection";
import { BugShot, Screenshot } from "../api/types";
import CreateIssue from "./CreateIssue";
import { TemplateEntry } from "./useTemplates";

type Props = {
  bugshot?: BugShot;
  screenshot: Screenshot;
  templates: TemplateEntry[];
};

const IssueEditor: FC<Props> = ({ bugshot, screenshot, templates }) => {
  const { connection, isLoading } = useConnection();

  if (isLoading || !bugshot) {
    return <p>Loading ...</p>;
  }

  if (!connection) {
    return <ErrorNotification error="Connection not configured" />;
  }

  return (
    <CreateIssue
      connection={connection}
      bugshot={bugshot}
      screenshot={screenshot}
      templates={templates}
    />
  );
};

export default IssueEditor;
