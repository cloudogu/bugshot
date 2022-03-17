/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const fetch = require("isomorphic-fetch");
const config = require("./config");
const fetchAccessToken = require("./fetchAccessToken");

const publishPackage = async (accessToken) => {
  const response = await fetch(`https://www.googleapis.com/chromewebstore/v1.1/items/${config.itemId}/publish`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "x-goog-api-version": "2",
      "Content-Length": "0"
    },
  });

  if (!response.ok) {
    console.log("Failed to publish package:");
    console.log(` - status: ${response.status} ${response.statusText}`);
    const body = await response.text();
    console.log(` - body: ${body}`);

    throw new Error("Failed to publish package");
  }
}

const publish = async () => {
  console.log("... fetch access token");
  const accessToken = await fetchAccessToken();

  console.log("... publish package");
  await publishPackage(accessToken)
};

publish();
