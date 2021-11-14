import { Screenshot } from "./Screenshot";

export type Connection = {
  url: string;
  apiKey: string;
};

type UploadResponse = {
  upload: {
    token: string;
  };
};

export type CustomField = {
  id: number;
  value: string;
};

export type Upload = {
  token: string;
  filename: string;
  content_type: string;
};

export type Issue = {
  project_id: number;
  tracker_id: number;
  status_id: number;
  priority_id: number;
  category_id: number;
  subject: string;
  description: string;
  custom_fields: CustomField[];
  uploads: Upload[];
};

const createRedmineApi = (connection: Connection) => {
  let baseUrl = connection.url;
  if (!baseUrl.endsWith("/")) {
    baseUrl += "/";
  }

  const get = (uri: string) =>
    fetch(`${baseUrl}/${uri}`, {
      headers: {
        "X-Redmine-API-Key": connection.apiKey,
      },
      // do not prompt for basic auth if key authentication failed
      credentials: "omit",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("request failed");
      }
      return response.json();
    });

  const upload = (screenshot: Screenshot, filename: string) =>
    screenshot
      .toBlob()
      .then((blob) => {
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
      .then((upload: UploadResponse) => upload.upload.token);

  const create = (issue: Issue) =>
    fetch(`${baseUrl}issues.json`, {
      method: "POST",
      headers: {
        "X-Redmine-API-Key": connection.apiKey,
        "Content-Type": "application/json",
      },
      // do not prompt for basic auth if key authentication failed
      credentials: "omit",
      body: JSON.stringify({ issue }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to create issue");
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => ({
        id: data.issue.id,
        url: `${baseUrl}issues/${data.issue.id}`,
      }));

  return {
    me: () => get("my/account.json"),
    upload,
    create,
  };
};

export default createRedmineApi;
