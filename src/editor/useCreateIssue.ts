import { useState } from "react";
import { Screenshot } from "./Screenshot";
import useConnection from "./useConnection";

export type Issue = {
  subject: string;
  description: string;
};

export type CreatedIssue = {
  id: string;
  url: string;
};

type UploadResponse = {
  upload: {
    token: string;
  };
};

const useCreateIssue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { connection } = useConnection();

  const create = (
    issue: Issue,
    screenshot: Screenshot,
    bugshot: BugShot,
    callback: (issue: CreatedIssue) => void
  ) => {
    setIsLoading(true);

    if (!connection) {
      throw new Error("connection is not defined");
    }

    let baseUrl = connection.url;
    if (!baseUrl.endsWith("/")) {
      baseUrl += "/";
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
    screenshot
      .toBlob()
      .then(blob => {
        if (!blob) {
          throw new Error("failed to retrieve blob from screenshot");
        }
        return blob;
      })
      .then((blob) => 
        fetch(`${baseUrl}uploads.json?filename=${filename}`, {
          headers: {
            "X-Redmine-API-Key": connection.apiKey,
            "Content-Type": "application/octet-stream",
          },
          // do not prompt for basic auth if key authentication failed
          credentials: "omit",
          method: "POST",
          body: blob,
        })
      )
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to upload");
        }
        return response;
      })
      .then((response) => response.json())
      .then((upload: UploadResponse) => ({
        issue: {
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
          uploads: [
            { token: upload.upload.token, filename, content_type: "image/png" },
          ],
        },
      }))
      .then((body) =>
        fetch(`${baseUrl}issues.json`, {
          method: "POST",
          headers: {
            "X-Redmine-API-Key": connection.apiKey,
            "Content-Type": "application/json",
          },
          // do not prompt for basic auth if key authentication failed
          credentials: "omit",
          body: JSON.stringify(body),
        })
      )
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("failed to create issue");
        }
        return resp.json();
      })
      .then((data) => ({
        id: data.issue.id,
        url: `${baseUrl}issues/${data.issue.id}`,
      }))
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
