import { useState } from "react";
import { Screenshot } from "./Screenshot";
import useRedmineApi from "./useRedmineApi";

export type Issue = {
  subject: string;
  description: string;
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
    screenshot: Screenshot,
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
      .upload(screenshot, filename)
      .then((token) =>
        api.create({
          project_id: 1,
          tracker_id: 1,
          status_id: 1,
          priority_id: 1,
          category_id: 57,
          subject: issue.subject,
          description: description,
          custom_fields: [
            {
              id: 1,
              value: "ITZ TAM",
            },
            {
              id: 36,
              value: "Team SCM",
            },
            {
              id: 38,
              value: "Created with bugshot!",
            },
          ],
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
