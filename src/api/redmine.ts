import { Connection, Enumeration, CreateIssueRequest, Project, Screenshot, UploadResponse, Issue } from "./types";

const createRedmineApi = (connection: Connection) => {
  let baseUrl = connection.url;
  if (!baseUrl.endsWith("/")) {
    baseUrl += "/";
  }

  const get = (uri: string) => {
    let request = uri;
    if (!uri.includes("://")) {
      request = `${baseUrl}/${uri}`;
    }

    console.log(uri, request);

    return fetch(request, {
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
    })
  };

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

  const create = (issue: CreateIssueRequest) =>
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
    projects: (): Promise<Project[]> =>
      get("projects.json?include=trackers,issue_categories").then(
        (json) => json.projects
      ),
    priorities: (): Promise<Enumeration[]> =>
      get("enumerations/issue_priorities.json").then(
        (json) => json.issue_priorities
      ),
    upload,
    create,
    issue: (url: string): Promise<Issue> => get(url).then((json) => json.issue)
  };
};

export default createRedmineApi;
