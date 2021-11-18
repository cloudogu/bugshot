import { Connection, Enumeration, CreateIssueRequest, Project, Screenshot, UploadResponse, Issue, InitialConnection, Me } from "./types";

type RemdineConnection = Connection | InitialConnection;

const isInitialConnection = (connection: RemdineConnection): connection is InitialConnection => {
  return (connection as InitialConnection).username !== undefined;
}

const createRedmineApi = (connection: RemdineConnection) => {
  let baseUrl = connection.url;
  if (!baseUrl.endsWith("/")) {
    baseUrl += "/";
  }

  let headers: HeadersInit;
  if (isInitialConnection(connection)) {
    headers = {
      Authorization: 'Basic ' + btoa(connection.username + ":" + connection.password)
    }
  } else {
    headers = {
      "X-Redmine-API-Key": connection.apiKey,
    }
  }
  
  const get = (uri: string) => {
    let request = uri;
    if (!uri.includes("://")) {
      request = `${baseUrl}/${uri}`;
    }

    return fetch(request, {
      headers: headers,
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
            ...headers,
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
        ...headers,
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
    me: (): Promise<Me> => get("my/account.json").then(json => json.user),
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
