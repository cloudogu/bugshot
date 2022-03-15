/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const { access } = require("fs/promises");
const { createReadStream, constants } = require("fs");
const fetch = require("isomorphic-fetch");
const config = require("./config");

// https://developer.chrome.com/docs/webstore/using_webstore_api/

const refreshToken = process.env.BUGSHOT_REFRESH_TOKEN;
if (!refreshToken) {
  throw new Error("Could not find oauth refresh token environment variable BUGSHOT_REFRESH_TOKEN");
}

const fetchAccessToken = async () => {
  const request = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };

  const response = await fetch("https://www.googleapis.com/oauth2/v4/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve access token");
  }

  const oauth = await response.json();
  return oauth.access_token;
};

const upload = async (accessToken, package) => {
  const response = await fetch(`https://www.googleapis.com/upload/chromewebstore/v1.1/items/${config.itemId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "x-goog-api-version": "2"
    },
    body: package
  });

  if (!response.ok) {
    throw new Error("Failed to upload package");
  }
};

const publish = async (accessToken) => {
  const response = await fetch(`https://www.googleapis.com/chromewebstore/v1.1/items/$${config.itemId}/publish`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "x-goog-api-version": "2",
      "Content-Length": "0"
    },
  });

  if (!response.ok) {
    throw new Error("Failed to publish package");
  }
}

const deploy = async () => {
  try {
    await access(config.package, constants.R_OK);
  } catch {
    console.log(`could not read package ${config.package}`);
    return;
  }

  const accessToken = await fetchAccessToken();
  await upload(accessToken, createReadStream(config.package));
  await publish(accessToken)
};

deploy();
