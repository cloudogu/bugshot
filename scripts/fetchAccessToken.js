/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

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

export default fetchAccessToken;
