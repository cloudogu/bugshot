import { useState } from "react";
import { Screenshot } from "../api/types";
import { Template } from "../api/types";
import useRedmineApi from "./useRedmineApi";

export type Issue = {
  subject: string;
  description: string;
  template: Template;
  screenshot: Screenshot;
};

export type CreatedIssue = {
  id: string;
  url: string;
};

const useCreateIssue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const api = useRedmineApi();

  const create = (
    issue: Issue,
    bugshot: BugShot,
    callback: (issue: CreatedIssue) => void
  ) => {
    setIsLoading(true);

    if (!api) {
      throw new Error("api is not defined");
    }

    let description = issue.description;
    description += "\n\n---\n";
    if (bugshot.url) {
      description += `**URL:** ${bugshot.url}\n`;
    }
    if (bugshot.resolution) {
      description += `**Resolution:** ${bugshot.resolution.width}x${bugshot.resolution.height}`;
    }

    const filename = `bugshot-${new Date().toISOString()}.png`;
    api
      .upload(issue.screenshot, filename)
      .then((token) =>
        api.create({
          ...issue.template,
          subject: issue.subject,
          description: description,
          uploads: [{ token: token, filename, content_type: "image/png" }],
        })
      )
      .then(callback)
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  return {
    create,
    isLoading,
    error,
  };
};

export default useCreateIssue;
